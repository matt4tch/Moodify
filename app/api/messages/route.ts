import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
        const currentYear = today.getFullYear();

        const messages = await prisma.message.findMany({
            where: {
                day: currentDay,
                month: currentMonth,
                year: currentYear,
            },
            include: {
                user: true,
            },
            orderBy: {
                id: 'desc', // Using id for ordering since we don't have a timestamp
            },
        });

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
