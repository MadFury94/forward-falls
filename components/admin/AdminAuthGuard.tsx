'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('wp_token');
        if (!token) {
            // Middleware handles the real auth check via HttpOnly cookie.
            // This is a client-side fallback for cases where localStorage
            // was cleared but the cookie is still valid (rare edge case).
            router.replace('/admin-login');
        } else {
            setChecked(true);
        }
    }, [router]);

    if (!checked) return null;
    return <>{children}</>;
}
