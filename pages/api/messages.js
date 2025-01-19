import prisma from '../../lib/prisma';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = await req.body;
            const { userId, user_prompt, ai_response, summary_character } = body;
    
            //const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
    
            const newMessage = await prisma.messages.create({
                data: {
                    day: currentDay,
                    month: currentMonth,
                    year: currentYear,
                    user_prompt,
                    ai_response,
                    selected_character: summary_character,
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
            const { userId, date, year } = req.query;
            const [currentMonth, currentDay] = date.split('-');
            console.log(currentDay, currentMonth, year);

            const message = await prisma.messages.findFirst({
                where: {
                    day: parseInt(currentDay),
                    month: parseInt(currentMonth),
                    year: parseInt(year),
                    userId: parseInt(userId),
                }
            });
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }

    } else if (req.method === 'PUT') {
        try {
            const body = await req.body;
            const { messageId, new_user_prompt, new_ai_response } = body;
    
            const updatedMessage = await prisma.messages.update({
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
            const { userId, day, month, year } = req.body;
            console.log("Request Body:", { userId, day, month, year })
            
            if (!userId || !day || !month || !year) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
    
            // const deletedMessage = await prisma.messages.delete({
            //     where: {
            //         id: 5,
            //     }
            // });

            const deletedMessage = await prisma.messages.deleteMany({
                where: {
                    userId: parseInt(userId),
                    day: parseInt(day),
                    month: parseInt(month),
                    year: parseInt(year),
                }
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