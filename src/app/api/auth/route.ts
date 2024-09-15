import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    const { email, password } = await req.json();

    try {
        // Buscar el usuario por email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Comparar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
        }

        // Generar token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            "MY_SECRET_TOKEN_IN_MY_API",
            { expiresIn: '1h' }
        );

        return NextResponse.json({ __id: user.id, message: 'Inicio de sesión exitoso', token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
    }
};
