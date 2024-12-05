import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    id: string;
    exp: number;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {

        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {

        const decoded = jwtDecode<DecodedToken>(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();

        if (isTokenExpired) {

            return NextResponse.redirect(new URL('/login', request.url));
        }


        return NextResponse.next();
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}


export const config = {
    matcher: ['/dashboard/:path*'],
};
