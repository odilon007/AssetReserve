import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export default async function proxy(req) {
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) =>
          response.cookies.set({ name, value, ...options }),
        remove: (name, options) =>
          response.cookies.set({ name, value: '', ...options }),
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = req.nextUrl.pathname

  const isProtectedRoute = pathname.startsWith('/site')
  const isAuthPage =
    pathname === '/auth/login' ||
    pathname === '/auth/cadastro'

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/site/ativos', req.url))
  }

  return response
}

export const config = {
  matcher: [
    '/site/:path*',
    '/auth/login',
    '/auth/cadastro',
  ],
}
