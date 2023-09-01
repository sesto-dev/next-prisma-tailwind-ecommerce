import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/jwt'
import { getErrorResponse } from '@/lib/utils'

interface AuthenticatedRequest extends NextRequest {
   user: {
      id: string
   }
}

export async function middleware(req: NextRequest) {
   function isTargetingAPI() {
      return req.nextUrl.pathname.startsWith('/api')
   }

   function getToken() {
      let token: string | undefined

      if (req.cookies.has('token')) {
         token = req.cookies.get('token')?.value
      } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
         token = req.headers.get('Authorization')?.substring(7)
      }

      return token
   }

   const token = getToken()

   if (req.nextUrl.pathname.startsWith('/login') && !token)
      return NextResponse.next()

   if (req.nextUrl.pathname.match('/login') && token) {
      return NextResponse.redirect(new URL('/', req.url))
   }

   if (!token && !isTargetingAPI()) {
      return NextResponse.redirect(new URL('/login', req.url))
   }

   if (!token && isTargetingAPI()) {
      return getErrorResponse(401, "Token is invalid or user doesn't exist")
   }

   const response = NextResponse.next()

   try {
      if (token) {
         const { sub } = await verifyJWT<{ sub: string }>(token)
         response.headers.set('X-USER-ID', sub)
         ;(req as AuthenticatedRequest).user = { id: sub }
      }
   } catch (error) {
      console.error({ error })

      if (req.nextUrl.pathname.startsWith('/api')) {
         return getErrorResponse(401, "Token is invalid or user doesn't exist")
      }

      return NextResponse.redirect(new URL(`/login`, req.url))
   }

   const authUser = (req as AuthenticatedRequest).user

   if (!authUser) {
      return NextResponse.redirect(new URL(`/login`, req.url))
   }

   if (req.url.includes('/login') && authUser) {
      return NextResponse.redirect(new URL('/profile', req.url))
   }

   return response
}

export const config = {
   matcher: [
      '/',
      '/login',
      '/products/:path*',
      '/billboards/:path*',
      '/orders/:path*',
      '/categories/:path*',
      '/payments/:path*',
      '/codes/:path*',
      '/users/:path*',
      '/api/:path*',
   ],
}
