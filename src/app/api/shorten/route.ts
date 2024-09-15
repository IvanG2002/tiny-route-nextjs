import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    const { original_url, userId } = await req.json();
    const short_code = nanoid(6);

    try {
        // Inserta la URL en la base de datos
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdUrl = await prisma.url.create({
            data: {
                original_url,
                short_code,
                user: {
                    connect: {
                        id: userId, // Vincula la URL con un usuario
                    },
                },
            },
        });

        // Devuelve la URL acortada
        return NextResponse.json({ short_url: `https://tiny-route-app.vercel.app/api/shorten/${short_code}` });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
};
