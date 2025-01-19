'use client'
import React, { useEffect } from 'react'

const Page = () => {
    const makeMessage = async () => {
        try {
            console.log("Making Message");
            const res = await fetch('api/messages', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    userId: 1,
                    user_prompt: 'What is your favorite color?',
                    ai_response: 'My favorite color is blue.'
                })
            });
            const data = await res.json();
            console.log("Created Message:", data);

        } catch (error) {

            console.log("Error:", error);
        }

    }

    useEffect(() => {
        console.log('yo fam');
        makeMessage().then(() => {

        }, () => {

        })
    }, []);
    return (
        <div>
        <p>hi</p>
        </div>
    )
}

export default Page;
