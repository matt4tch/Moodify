import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = await request.json();
            const { display_name, email } = body;
    
            const newUser = await prisma.user.create({
                data: {
                    display_name,
                    email,
                }
            });
    
            return res.status(201).json({ user: newUser });
    
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    } else if (req.method === 'GET' ) {
        try {
            const body = await request.json();
            const { userId } = body;
    
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            return res.status(200).json({ user });
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    } else if (req.method === 'PUT') {
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
    
            return res.status(204).json({ user: updatedUser });
    
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    } else if (req.method === 'DELETE') {
        try {
            const body = await request.json();
            const { userId } = body;
    
            const deletedUser = await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
    
            return res.status(200).json({ user: deletedUser });
    
        } catch (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    
    } else {
        return res.status(405).json({ error: 'Method not allowed' });

    }

}

