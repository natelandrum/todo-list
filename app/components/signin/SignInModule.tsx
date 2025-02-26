"use client";

import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

const handleSignIn = () => {
    signIn('google');
};

export default function SignInModule() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-slate-800 p-8 rounded-lg text-center text-gray-300">
                <h1 className="text-4xl mb-4">Welcome to ToDoList</h1>
                <p className="mb-4 text-lg">Please sign in to continue</p>
                <hr className="border-t-2 border-gray-600 w-full mb-8"/>
                <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleSignIn}
                    sx={{
                        backgroundColor: '#dc2626', // red-600
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#b91c1c' // red-700
                        }
                    }}
                >
                    Sign in with Google
                </Button>
                <p className="text-sm mt-4">By signing in, you agree to our Terms and Conditions and Privacy Policy.</p>
            </div>
        </div>
    )
}