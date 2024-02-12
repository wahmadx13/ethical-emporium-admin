import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyRequestInMiddleware } from './utils/verifyRequestMiddleware';
import store from './redux/store';

export async function middleware(request: NextRequest) {
    //Redux State
    const state = store.getState()
    const { firstLogin, user } = state.authReducer
    console.log('isFirstRequestSent', firstLogin)
    try {
        console.log('\nMiddleware called before verification');
        const data = await verifyRequestInMiddleware(request);
        console.log('MIDDLEWARE_DATA', data.data)

        console.log("JWTTTTTTTTTTTT", data.jwtToken)

        const response = NextResponse.next();
        response.headers.set('USER-DATA', JSON.stringify(data.data));
        response.headers.set('JWT-TOKEN', JSON.stringify(data.jwtToken))
        response.headers.set('USER-ID', JSON.stringify(data.data.sub))
        response.headers.set('USERNAME', JSON.stringify(data.data.username))

        if (Date.now() > data.data?.exp * 1000) {
            return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/auth/sign-in`))
        }

        console.log('\nMiddleware after verification');

        if (request.url.includes('/auth')) {
            return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/admin/dashboard`, request.url));
        }

        return response;
    } catch (err) {
        console.log('Error in middleware', err);
        console.log('Request url', request.url);

        if (err.toString().includes('Token expired')) {
            console.log('Token expired redirecting to login');
            return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/auth/sign-in`));
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
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|whiteLogo.svg|v|s|http|https|refresh-auth).*)',
    ],
};