const WP_URL = process.env.WORDPRESS_SITE_URL || 'https://azure-dugong-563921.hostingersite.com';

export interface JWTUser {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}

/**
 * Get a JWT token from WordPress using username + password
 */
export async function getJWTToken(username: string, password: string): Promise<JWTUser | null> {
    const res = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return null;
    return res.json();
}

/**
 * Validate an existing JWT token
 */
export async function validateJWTToken(token: string): Promise<boolean> {
    const res = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token/validate`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return res.ok;
}

/**
 * Build auth header from stored JWT token
 */
export function getBearerHeader(token: string) {
    return { 'Authorization': `Bearer ${token}` };
}
