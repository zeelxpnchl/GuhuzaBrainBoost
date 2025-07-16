'use client';

import { useEffect, useState, useContext } from 'react';
import { setCookie } from 'cookies-next';
import { playerContext } from '@/app/context/playerContext';

export default function LoginButton() {
    const [loginUrl, setLoginUrl] = useState<string>('https://www-guhuza-demo.azurewebsites.net/login');
    const { player } = useContext(playerContext) || {};

    useEffect(() => {
        try {
            const state = Math.random().toString(36).substring(2, 15);
            setCookie('loginState', state, { maxAge: 600, path: '/' });

            const base = process.env.NEXT_PUBLIC_GUHUZA_URL || 'https://www-guhuza-demo.azurewebsites.net';
            const redirect_origin = typeof window !== 'undefined' ? window.location.origin : '';
            const redirect_uri = `${redirect_origin}/api/auth/callback/guhuza`;

            const url = new URL(`${base}/login`);
            url.searchParams.append('state', state);
            url.searchParams.append('redirect_uri', redirect_uri);

            setLoginUrl(url.toString());
        } catch (err) {
            console.error("LoginButton Error:", err);
        }
    }, []);

    return (
        <a
            href={loginUrl}
            className="quizPbtn block text-center"
            role="button"
        >
            Login with Guhuza
        </a>
    );
}
