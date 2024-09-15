import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
    const userId = parseInt(params.userId, 10); // Convierte el userId a número

    if (isNaN(userId)) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    try {
        // Obtener los links asociados al userId
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
        });

        return NextResponse.json({ "user": user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
};
