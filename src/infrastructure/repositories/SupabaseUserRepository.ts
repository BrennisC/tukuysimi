import { CreateUserRequest, User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { supabase } from '../database/supabase';

export class SupabaseUserRepository implements UserRepository {

    async findById(id: number): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return null;

        return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.firt_name,
            last_name: data.last_Name,
            avatarUrl: data.avatarUrl,
            bio: data.bio,
            email_verified: data.email_verified,
            is_active: data.is_active,
            createdAt: new Date(data.created_at)
        };
    }

    async findByUsername(username: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (error || !data) return null;

        return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.firt_name,
            last_name: data.last_Name,
            avatarUrl: data.avatarUrl,
            bio: data.bio,
            email_verified: data.email_verified,
            is_active: data.is_active,
            createdAt: new Date(data.created_at)
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) return null;

        return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.firt_Name,
            last_name: data.lastName,
            avatarUrl: data.avatarUrl,
            bio: data.bio,
            email_verified: data.email_verified,
            is_active: data.is_active,
            createdAt: new Date(data.created_at)
        };
    }

    async create(userData: CreateUserRequest): Promise<User> {
        const { data, error } = await supabase
            .from('users')
            .insert({
                username: userData.username,
                email: userData.email,
                firt_name: userData.first_name,
                last_name: userData.last_name,
                password: userData.password
            })
            .select()
            .single();

        if (error || !data) {
            throw new Error(`Failed to create user: ${error?.message}`);
        }

        return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.firt_name,
            last_name: data.last_name,
            createdAt: new Date(data.created_at)
        };
    }

    async update(id: number, userData: Partial<User>): Promise<User> {
        const updateData: any = {};

        if (userData.username) updateData.username = userData.username;
        if (userData.email) updateData.email = userData.email;
        if (userData.password) updateData.password = userData.password;

        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error || !data) {
            throw new Error(`Failed to update user: ${error?.message}`);
        }

        return {
            id: data.id,
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.firt_name,
            last_name: data.last_name,
            avatarUrl: data.avatarUrl,
            bio: data.bio,
            email_verified: data.email_verified,
            createdAt: new Date(data.created_at)
        };
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        return !error;
    }

    async validateCredentials(credentials: { username: string; password: string }): Promise<User | null> {
        return this.findByUsername(credentials.username);
    }
}
