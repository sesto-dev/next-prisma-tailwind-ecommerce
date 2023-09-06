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

   if (req.nextUrl.pathname.match('/login')) {
      if (!token) return NextResponse.next()
      if (token) return NextResponse.redirect(new URL('/', req.url))
   }

   if (!token) {
      if (req.nextUrl.pathname.startsWith('/api/auth'))
         return NextResponse.next()
      if (isTargetingAPI()) return getErrorResponse(401, 'INVALID TOKEN')
      if (!isTargetingAPI())
         return NextResponse.redirect(new URL('/login', req.url))
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

      if (isTargetingAPI()) {
         return getErrorResponse(401, 'INVALID TOKEN')
      }

      return NextResponse.redirect(new URL(`/login`, req.url))
   }

   const authUser = (req as AuthenticatedRequest).user

   if (!authUser) {
      return NextResponse.redirect(new URL(`/login`, req.url))
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
