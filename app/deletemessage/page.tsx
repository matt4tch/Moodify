'use client'
import React, { useEffect } from 'react';

const Page = () => {


    const deleteMessage = async () => {
        try {
            console.log("Deleting Message");
            const res = await fetch('api/messages', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({
                    userId: 1, // Provide userId dynamically if necessary
                    day: 18,
                    month: 1,
                    year: 2025,
                }),
            });
            const data = await res.json();
            console.log("Deleted Message:", data);

        } catch (error) {

            console.log("Error:", error);
        }

    }

    useEffect(() => {
        deleteMessage().then(() => {

        }, () => {

        })
    }, []);

    return (
        <div>
        <p>hi</p>
        </div>
    )
}

export default Page
