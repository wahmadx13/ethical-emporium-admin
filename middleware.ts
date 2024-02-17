import { NextResponse, NextRequest } from "next/server";
import { verifyRequestInMiddleware } from "./utils/verifyRequestMiddleware";

export default async function middleware(request: NextRequest) {
    try {
        console.log('\nMiddleware called before verification');

        const data = await verifyRequestInMiddleware(request);
        console.log('\nMiddleware after verification');
        if (!data?.data) {
            return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/auth/sign-in`, request.url));
        }

        if (request.url.includes('/auth')) {
            return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/admin/dashboard`, request.url));
        }

        const response = NextResponse.next();

        response.headers.set('USER-DATA', JSON.stringify(data.data))
        response.headers.set("JWT-TOKEN", data.jwtToken);

        return response
    } catch (err) {
        console.log('Error in Middleware: ', err)
        console.log('Request url', request.url);

        if (err.toString().includes('Token expired')) {
            console.log('Token expired redirecting to refresh-auth')
            return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/refresh-auth`, request.url))
        }

        if (request.url.includes('/auth')) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/auth/sign-in`, request.url));
    }
}

export const config = {
    matcher: [
        '/auth/:path*',
        '/settings/:path*',
        '/admin/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|whiteLogo.svg|v|s|http|https|refresh-auth).*)',
    ],
}