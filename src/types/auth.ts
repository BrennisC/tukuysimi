export interface ValidationErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}