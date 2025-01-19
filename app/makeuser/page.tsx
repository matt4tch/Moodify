'use client'
import React, { useEffect } from 'react'

const Page = () => {

    const makeUser = async () => {
        const res = await fetch('api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                display_name: 'JosephMaltese',
                email: 'joesammich12@gmail.com',
            })
        });
        const data = await res.json();
        console.log("Created User:", data);
    }

    useEffect(() => { makeUser()}, [])
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default Page;
