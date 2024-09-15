import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { username, email, password } = await req.json();

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        passwordHash: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User registered with success', user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'User not registered' }, { status: 500 });
  }
};
