import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getJWTPayload } from 'lib/jwt'

export async function middleware(request: NextRequest) {
    const { value: AJWT } = request.cookies.get('AJWT')

    if (!AJWT || !(await getJWTPayload(AJWT))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // if (
    //     request.url.includes('/cms') ||
    //     !(await gateAdmin(request, NextResponse))
    // ) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
}

export const config = {
    matcher: ['/user/:path*', '/cart/:path*', '/admin/:path*', '/cms/:path*'],
}
