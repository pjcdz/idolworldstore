import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Solo aplicar middleware a rutas de admin API
  if (request.nextUrl.pathname.startsWith('/api/admin') && 
      !request.nextUrl.pathname.includes('/api/admin/auth')) {
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    try {
      const token = authHeader.substring(7);
      const decoded = JSON.parse(atob(token));
      const now = Date.now() / 1000;
      
      if (decoded.exp <= now || decoded.username !== 'zaki') {
        return NextResponse.json(
          { error: 'Token inválido o expirado' },
          { status: 401 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Token malformado' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/admin/:path*'
};
