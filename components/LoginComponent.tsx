'use client'

import React, { useState, useCallback } from 'react';
import Login, { Render } from 'react-login-page';

export default function LoginComponent({ aCloseModal }: { aCloseModal?: () => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (username === "herbert.norman" && password === "password123") {
            console.log("Login successful");
            setError('');
            if (aCloseModal) aCloseModal();
        } else {
            setError('Invalid username or password');
        }
    }, [username, password, aCloseModal]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center font-mono">
            <div className="bg-white rounded-lg w-full max-w-md p-8 mx-4">
                <Login>
                    <Render>
                        {({ fields, buttons, blocks }) => (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <h1 className="text-4xl text-[#4361EE] text-center">
                                    {blocks.title}
                                </h1>
                                <div className="space-y-6">
                                    {fields.username && (
                                        <div className="space-y-3">
                                            <label htmlFor="username" className="block text-base text-gray-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                                value={username}
                                                className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded focus:outline-none focus:border-[#4361EE] focus:ring-0 font-mono"
                                            />
                                        </div>
                                    )}
                                    {fields.password && (
                                        <div className="space-y-3">
                                            <label htmlFor="password" className="block text-base text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                                value={password}
                                                className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded focus:outline-none focus:border-[#4361EE] focus:ring-0 font-mono"
                                            />
                                        </div>
                                    )}
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <div className="flex gap-4">
                                    {buttons.submit && (
                                        <button type="submit"
                                                className="flex-1 bg-[#4361EE] text-white px-6 py-3 rounded hover:bg-[#3651DE]
                                            transition-colors duration-200 text-base font-mono"
                                        >
                                            Sign In
                                        </button>
                                    )}
                                    {buttons.reset && (
                                        <button type="reset"
                                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded hover:bg-gray-200
                                            transition-colors duration-200 text-base font-mono"
                                        >
                                            Sign Up
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </Render>
                    <Login.Block keyname="title" tagName="span">
                        Login
                    </Login.Block>
                    <Login.Input
                        keyname="username"
                        placeholder="Username"
                    />
                    <Login.Input
                        keyname="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Login.Button keyname="submit" type="submit">
                        Sign In
                    </Login.Button>
                    <Login.Button keyname="reset" type="reset">
                        Sign Up
                    </Login.Button>
                </Login>
            </div>
        </div>
    );
}
