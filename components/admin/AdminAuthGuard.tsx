'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('wp_token');
        if (!token) {
            router.replace('/admin-login');
        } else {
            // Keep cookie in sync with localStorage for middleware
            document.cookie = `wp_token=${token}; path=/; max-age=86400; SameSite=Lax`;
            setChecked(true);
        }
    }, [router]);

    if (!checked) return null;
    return <>{children}</>;
}
