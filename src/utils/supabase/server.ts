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
      from: (table: string) => {
        const chain = {
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
                then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
              }),
              single: () => {
                if (table === 'users') {
                  return Promise.resolve({ data: { role: 'Super Admin' }, error: null });
                }
                return Promise.resolve({ data: null, error: null });
              },
              then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
            }),
            order: (_col: string, _options: unknown) => ({
              range: (_from: number, _to: number) => Promise.resolve({ data: [], error: null }),
              then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
            }),
            then: (onfulfilled: any) => {
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
          insert: (payload: any) => {
            const result = { data: { id: 'mock-' + Math.random().toString(36).substr(2, 9), ...payload }, error: null };
            return {
              select: () => ({
                single: () => Promise.resolve(result),
                then: (onfulfilled: any) => Promise.resolve(result).then(onfulfilled),
              }),
              then: (onfulfilled: any) => Promise.resolve(result).then(onfulfilled),
            };
          },
          update: (payload: any) => ({
            eq: () => ({
              select: () => ({
                single: () => Promise.resolve({ data: { id: 'mock-id', ...payload }, error: null }),
                then: (onfulfilled: any) => Promise.resolve({ data: { id: 'mock-id', ...payload }, error: null }).then(onfulfilled),
              }),
              then: (onfulfilled: any) => Promise.resolve({ data: { id: 'mock-id', ...payload }, error: null }).then(onfulfilled),
            })
          }),
          delete: () => ({
            eq: () => Promise.resolve({ error: null }),
            then: (onfulfilled: any) => Promise.resolve({ error: null }).then(onfulfilled),
          }),
        };
        return chain;
      },
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

