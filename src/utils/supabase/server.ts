import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemo) {
    // A fully functional mock that behaves like a real Supabase client (returns Promises)
    const mockSupabase = {
      auth: {
        getUser: async () => ({ 
          data: { user: { id: 'demo-user', email: 'muhammadshahzaib.cui@gmail.com' } }, 
          error: null 
        }),
        getSession: async () => ({
          data: { session: { user: { id: 'demo-user', email: 'muhammadshahzaib.cui@gmail.com' } } },
          error: null
        })
      },
      from: (table: string) => ({
        select: (_columns: string = '*') => ({
          eq: (_column: string, _value: unknown) => ({
            order: (_col: string, _options: unknown) => ({
              range: (_from: number, _to: number) => Promise.resolve({ data: [], error: null }),
              single: () => {
                if (table === 'users') {
                  return Promise.resolve({ data: { role: 'Super Admin' }, error: null });
                }
                return Promise.resolve({ data: null, error: null });
              },
              // @ts-expect-error - Mock implementation for demo mode
              then: (onfulfilled) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
            }),
            single: () => {
              if (table === 'users') {
                return Promise.resolve({ data: { role: 'Super Admin' }, error: null });
              }
              return Promise.resolve({ data: null, error: null });
            },
            // @ts-expect-error - Mock implementation for demo mode
            then: (onfulfilled) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
          }),
          order: (_col: string, _options: unknown) => ({
            range: (_from: number, _to: number) => Promise.resolve({ data: [], error: null }),
            // @ts-expect-error - Mock implementation for demo mode
            then: (onfulfilled) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
          }),
          insert: (payload: any) => ({
            select: () => ({
              single: () => Promise.resolve({ data: { id: 'mock-id', ...payload }, error: null })
            })
          }),
          update: (payload: any) => ({
            eq: () => ({
              select: () => ({
                single: () => Promise.resolve({ data: { id: 'mock-id', ...payload }, error: null })
              })
            })
          }),
          delete: () => ({
            eq: () => Promise.resolve({ error: null })
          }),
          // @ts-expect-error - Mock implementation for demo mode
          then: (onfulfilled) => {



            // For simple selects like .from('packages').select('*')
            if (table === 'packages') {
              return Promise.resolve({ 
                data: [
                  { id: '1', name: 'Premium Package', duration_days: 30, price: 99, is_active: true },
                  { id: '2', name: 'Standard Package', duration_days: 15, price: 49, is_active: true }
                ], 
                error: null 
              }).then(onfulfilled);
            }
            return Promise.resolve({ data: [], error: null }).then(onfulfilled);
          }
        }),
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mockSupabase as any;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

