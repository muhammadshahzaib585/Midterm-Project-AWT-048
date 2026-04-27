import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemo) {
    console.log('--- ADFLOW PRO: RUNNING IN PURE DEMO MODE (PERSISTENT) ---');
    
    // Check for existing session in localStorage
    const getLocalUser = () => {
        if (typeof window === 'undefined') return null;
        const saved = localStorage.getItem('adflow_demo_user');
        return saved ? JSON.parse(saved) : null;
    };

    const mockSupabase = {
      auth: {
        signUp: async (params: { email: string }) => {
            const user = { id: 'demo-user', email: params.email };
            localStorage.setItem('adflow_demo_user', JSON.stringify(user));
            return { data: { user, session: { access_token: 'demo', user } }, error: null };
        },
        signInWithPassword: async (params: { email: string }) => {
            const user = { id: 'demo-user', email: params.email };
            localStorage.setItem('adflow_demo_user', JSON.stringify(user));
            return { data: { user, session: { access_token: 'demo', user } }, error: null };
        },
        getUser: async () => {
            const user = getLocalUser();
            return { data: { user }, error: null };
        },
        getSession: async () => {
            const user = getLocalUser();
            return { data: { session: user ? { user, access_token: 'demo' } : null }, error: null };
        },
        signOut: async () => {
            localStorage.removeItem('adflow_demo_user');
            return { error: null };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onAuthStateChange: (callback: (event: string, session: any) => void) => {
            const user = getLocalUser();
            callback('SIGNED_IN', user ? { user, access_token: 'demo' } : null);
            return { data: { subscription: { unsubscribe: () => {} } } };
        },
      },
      from: (table: string) => {
        const chain = {
          select: (_columns: string = '*') => ({
            eq: (_column: string, _value: unknown) => ({
              order: (_col: string, _options: unknown) => ({
                range: (_from: number, _to: number) => Promise.resolve({ data: [], error: null }),
                single: () => Promise.resolve({ data: null, error: null }),
                then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled),
              }),
              single: () => Promise.resolve({ data: null, error: null }),
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

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
