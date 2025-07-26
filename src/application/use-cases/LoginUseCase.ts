import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class LoginUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            // Buscar usuario por username
            const user = await this.userRepository.findByUsername(credentials.username);

            if (!user) {
                return {
                    user: {} as Omit<User, 'password'>,
                    success: false,
                    message: 'Usuario no encontrado'
                };
            }

            // Verificar contraseña
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

            if (!isPasswordValid) {
                return {
                    user: {} as Omit<User, 'password'>,
                    success: false,
                    message: 'Contraseña incorrecta'
                };
            }

            // Generar JWT token
            const token = jwt.sign(
                {
                    userId: user.id,
                    username: user.username,
                    email: user.email
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // Retornar usuario sin password
            const { password: _, ...userWithoutPassword } = user;

            return {
                user: userWithoutPassword,
                token,
                success: true,
                message: 'Login exitoso'
            };

        } catch (error) {
            console.error('Login error:', error);
            return {
                user: {} as Omit<User, 'password'>,
                success: false,
                message: 'Error interno del servidor'
            };
        }
    }
}
