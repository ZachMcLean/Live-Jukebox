// import helper functions
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(req) {
    // Token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    // Allow the requests if the following is true...
    // 1) Its a request for next-auth session & provider fetching
    // 2) or they have a token 
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }
    // send them back to the login page if they don't have a token And are requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }

}