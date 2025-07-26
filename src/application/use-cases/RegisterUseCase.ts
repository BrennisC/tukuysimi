import bcrypt from 'bcryptjs';
import { CreateUserRequest, User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(userData: CreateUserRequest): Promise<{ user: Omit<User, 'password'> | null; success: boolean; message: string }> {
        try {
            // Verificar si el usuario ya existe
            const existingUserByUsername = await this.userRepository.findByUsername(userData.username);
            if (existingUserByUsername) {
                return {
                    user: null,
                    success: false,
                    message: 'El nombre de usuario ya está en uso'
                };
            }

            const existingUserByEmail = await this.userRepository.findByEmail(userData.email);
            if (existingUserByEmail) {
                return {
                    user: null,
                    success: false,
                    message: 'El email ya está registrado'
                };
            }

            // Hashear la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

            // Crear el usuario
            const newUser = await this.userRepository.create({
                ...userData,
                password: hashedPassword
            });

            // Retornar usuario sin password
            const { password: _, ...userWithoutPassword } = newUser;

            return {
                user: userWithoutPassword,
                success: true,
                message: 'Usuario creado exitosamente'
            };

        } catch (error) {
            console.error('Register error:', error);
            return {
                user: null,
                success: false,
                message: 'Error interno del servidor'
            };
        }
    }
}
