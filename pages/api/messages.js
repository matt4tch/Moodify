import prisma from '../../lib/prisma';


export default async function handler(req, res) {
    if (req.method === 'POST') {
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
    
            return res.status(201).json(newMessage);
    
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(400).json({ error: 'A message already exists for this user on that date' });
            }
            console.error('Database Error:', error);
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }

    } else if (req.method === 'GET') {
        try {
            const url = 'localhost:3000/' + req.url;
            const { searchParams } = new URL(url);
            const currentUserId = searchParams.get('user_id');
            const currentDay = searchParams.get('date').split('-')[1];
            const currentMonth = searchParams.get('date').split('-')[0];
            const currentYear = searchParams.get('year');

            console.log(currentDay, currentMonth, currentYear);
            const message = await prisma.message.findUnique({
                where: {
                    day: currentDay,
                    month: currentMonth,
                    year: currentYear,
                    userId: currentUserId,
                }
            });
            console.log('message', message);
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }

    } else if (req.method === 'PUT') {
        try {
            const body = await request.json();
            const { messageId, new_user_prompt, new_ai_response } = body;
    
            const updatedMessage = await prisma.message.update({
                where: {
                    id: messageId,
                },
                data: {
                    user_prompt: new_user_prompt,
                    ai_response: new_ai_response,
                },
            });
            return res.status(200).json(updatedMessage);
    
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }

    } else if (req.method === 'DELETE') {
        try {
            const body = await request.json();
            const { messageId } = body;
    
            const deletedMessage = await prisma.message.delete({
                where: {
                    id: messageId,
                },
            });
    
            return res.status(200).json(deletedMessage);
    
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }
    
    }
    else {
        res.status(405).end();
    }

}