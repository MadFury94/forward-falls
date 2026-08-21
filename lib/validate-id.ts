import { NextResponse } from 'next/server';

/**
 * Validates that a route param ID is a positive integer.
 * Returns a 400 response if invalid, or the numeric ID if valid.
 */
export function validateId(id: string): { valid: true; numericId: number } | { valid: false; response: ReturnType<typeof NextResponse.json> } {
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) {
        return {
            valid: false,
            response: NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 }),
        };
    }
    return { valid: true, numericId: num };
}
