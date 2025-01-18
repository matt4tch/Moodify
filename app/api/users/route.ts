import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request : Request) {
    try {
        const body = await request.json();
        const { userId } = body;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request : Request) {
    try {
        const body = await request.json();
        const { display_name, email } = body;

        const newUser = await prisma.user.create({
            data: {
                display_name,
                email,
            }
        });

        return NextResponse.json({ user: newUser }, { status: 201 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(request : Request) {
    try {
        const body = await request.json();
        const { userId } = body;

        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return NextResponse.json({ user: deletedUser }, { status: 200 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function PUT(request : Request) {
    try {
        const body = await request.json();
        const { userId, display_name } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                display_name,
            },
        });

        return NextResponse.json({ user: updatedUser }, { status: 204 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}