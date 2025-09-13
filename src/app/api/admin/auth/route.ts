import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Credenciales hasheadas hardcodeadas
const ADMIN_CREDENTIALS = {
  username: 'zaki',
  passwordHash: '$2b$10$mUU88/9cOnRw7auxwYnCxOsXHp4eaKZz5lMiN5zByw5ar3DvD/wRq'
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar usuario
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Crear token JWT simple (en producción usar una librería como jsonwebtoken)
    const token = btoa(JSON.stringify({
      username: ADMIN_CREDENTIALS.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 horas
      iat: Math.floor(Date.now() / 1000)
    }));

    return NextResponse.json({
      success: true,
      token,
      user: { username: ADMIN_CREDENTIALS.username }
    });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
