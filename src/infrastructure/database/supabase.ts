import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: number;
                    username: string;
                    email: string;
                    password: string;
                    created_at: string;
                };
                Insert: {
                    username: string;
                    email: string;
                    password: string;
                    created_at?: string;
                };
                Update: {
                    username?: string;
                    email?: string;
                    password?: string;
                    created_at?: string;
                };
            };
        };
    };
};
