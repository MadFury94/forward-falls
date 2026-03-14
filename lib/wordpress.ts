import { env } from 'process';

// Securely load environment variables
const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://azure-dugong-563921.hostingersite.com/wp-json/wp/v2';
const WP_USERNAME = process.env.WORDPRESS_AUTH_USERNAME || 'admin';
const WP_PASSWORD = process.env.WORDPRESS_AUTH_PASSWORD || 'iLTrxF^0YWh9s*fLx9lPGszj';

// Create Basic Auth header
const getAuthHeader = (): string => {
    const credentials = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');
    return `Basic ${credentials}`;
};

interface WordPressUser {
    id: number;
    username: string;
    email: string;
    roles: string[];
    name: string;
}

/**
 * Create a new WordPress user with admin role
 * Requires existing admin credentials
 */
export async function createWordPressUser(
    username: string,
    email: string,
    password: string,
    role: string = 'administrator'
): Promise<WordPressUser | null> {
    try {
        const response = await fetch(`${WP_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Authorization': getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                roles: [role],
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Failed to create user:', error);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating WordPress user:', error);
        return null;
    }
}

/**
 * Get all WordPress users
 */
export async function getWordPressUsers(): Promise<WordPressUser[]> {
    try {
        const response = await fetch(`${WP_API_URL}/users`, {
            headers: {
                'Authorization': getAuthHeader(),
            },
        });

        if (!response.ok) {
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

/**
 * Delete a WordPress user by ID
 */
export async function deleteWordPressUser(userId: number): Promise<boolean> {
    try {
        const response = await fetch(`${WP_API_URL}/users/${userId}?force=true`, {
            method: 'DELETE',
            headers: {
                'Authorization': getAuthHeader(),
            },
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

/**
 * Test WordPress connection and authentication
 */
export async function testWordPressConnection(): Promise<boolean> {
    try {
        const response = await fetch(`${WP_API_URL}/users/me`, {
            headers: {
                'Authorization': getAuthHeader(),
            },
        });

        return response.ok;
    } catch (error) {
        console.error('WordPress connection test failed:', error);
        return false;
    }
}

export { WP_API_URL, WP_USERNAME, WP_PASSWORD };