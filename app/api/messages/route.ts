import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const messages = await prisma.message.findMany({
            where: {
                time: {
                    gte: currentDate,
                    lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
                },
            },
            include: {
                user: true,
            },
            orderBy: {
                date_created: 'desc',
            },
        });

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(request : any) {

    
}