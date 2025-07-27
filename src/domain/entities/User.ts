export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    avatarUrl?: string;
    bio?: string;
    email_verified?: boolean;
    is_active?: boolean;
    createdAt: Date;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: Omit<User, 'password'>;
    token?: string;
    success: boolean;
    message?: string;
}
