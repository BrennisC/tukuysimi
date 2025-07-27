import { CreateUserRequest, LoginRequest, User } from '@domain/entities/User';

export interface UserRepository {
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(user: CreateUserRequest): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
    delete(id: number): Promise<boolean>;
    validateCredentials(credentials: LoginRequest): Promise<User | null>;
}
