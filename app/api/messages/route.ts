import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

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


export async function POST(request : Request) {
    try {
        const body = await request.json();
        const { userId, user_prompt, ai_response } = body;

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const newMessage = await prisma.message.create({
            data: {
                day: currentDay,
                month: currentMonth,
                year: currentYear,
                user_prompt,
                ai_response,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            }
        });

        return NextResponse.json({ message: newMessage }, { status: 201 });

    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'A message for this user on this date already exists.' }, { status: 409 });
        }
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
}