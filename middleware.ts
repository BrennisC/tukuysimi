import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Solo aplicar middleware a rutas protegidas
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('token')?.value ||
            request.headers.get('authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};
