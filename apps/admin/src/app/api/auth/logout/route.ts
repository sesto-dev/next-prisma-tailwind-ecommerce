import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
   const response = NextResponse.redirect(new URL(`/login`, req.url))
   response.cookies.delete('token')
   response.cookies.delete('logged-in')
   return response
}
