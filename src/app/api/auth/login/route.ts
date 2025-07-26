import { NextRequest, NextResponse } from 'next/server';
import { LoginUseCase } from '../../../../application/use-cases/LoginUseCase';
import { SupabaseUserRepository } from '../../../../infrastructure/repositories/SupabaseUserRepository';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username y password son requeridos' },
                { status: 400 }
            );
        }

        // Inyección de dependencias
        const userRepository = new SupabaseUserRepository();
        const loginUseCase = new LoginUseCase(userRepository);

        // Ejecutar caso de uso
        const result = await loginUseCase.execute({ username, password });

        if (!result.success) {
            return NextResponse.json(result, { status: 401 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
