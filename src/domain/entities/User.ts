export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface CreateUserRequest {
    username: string;
    email: string;
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
