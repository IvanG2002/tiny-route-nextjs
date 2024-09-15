import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: { params: { short_code: string } }) => {
    const { short_code } = params;

    try {
        // Busca la URL original en la base de datos
        const url = await prisma.url.findUnique({
            where: {
                short_code,
            },
        });

        // Si no se encuentra la URL, devuelve un 404
        if (!url) {
            return NextResponse.json({ error: 'Link does not found' }, { status: 404 });
        }

        // Redirige a la URL original
        return NextResponse.redirect(url.original_url);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
};
