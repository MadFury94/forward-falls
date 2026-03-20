// ─────────────────────────────────────────────────────────────
// config/theme.ts
// Brand colour tokens for the entire site.
//
// HOW TO REBRAND:
// 1. Change the hex values below
// 2. Mirror the same values in the :root block of app/globals.css
//    (--primary-green, --primary-yellow, --secondary-orange, --dark-grey)
// ─────────────────────────────────────────────────────────────

const theme = {
    colors: {
        /** Main brand colour — buttons, links, highlights */
        primary: "#00baa3",

        /** Secondary accent — stat badges, underlines */
        secondary: "#efc94c",

        /** Tertiary accent — error states, call-to-action contrast */
        accent: "#d55342",

        /** Dark text / dark backgrounds */
        dark: "#2d2d2d",

        /** Subtle page backgrounds */
        lightBg: "#f9f9f9",
    },

    fonts: {
        /** Primary typeface — loaded via next/font in app/layout.tsx */
        sans: "Poppins",
    },
} as const;

export default theme;

// ── CSS variable reference ────────────────────────────────────
// These map to the Tailwind utility classes used throughout the codebase:
//
//  theme.colors.primary   → --primary-green  → text-primary-green / bg-primary-green
//  theme.colors.secondary → --primary-yellow → text-primary-yellow / bg-primary-yellow
//  theme.colors.accent    → --error-red       → text-error-red / bg-error-red
//  theme.colors.dark      → --dark-grey       → text-dark-grey / bg-dark-grey
//  theme.colors.lightBg   → --light-bg        → bg-light-bg
