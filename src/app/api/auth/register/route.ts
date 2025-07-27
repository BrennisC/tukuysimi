import { RegisterUseCase } from '@/application/use-cases/RegisterUseCase';
import { SupabaseUserRepository } from '@/infrastructure/repositories/SupabaseUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { username, email, first_name, last_name, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Username, email y password son requeridos' },
                { status: 400 }
            );
        }

        // Validaciones básicas
        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'La contraseña debe tener al menos 6 caracteres' },
                { status: 400 }
            );
        }

        // Inyección de dependencias
        const userRepository = new SupabaseUserRepository();
        const registerUseCase = new RegisterUseCase(userRepository);

        // Ejecutar caso de uso
        const result = await registerUseCase.execute({ first_name, last_name, username, email, password });

        if (!result.success) {
            return NextResponse.json(result, { status: 400 });
        }

        return NextResponse.json(result, { status: 201 });

    } catch (error) {
        console.error('Register API error:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
