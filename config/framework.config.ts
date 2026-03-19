// ─────────────────────────────────────────────────────────────
// framework.config.ts
// All org-specific values live here. Edit this file to rebrand
// the entire site for a new organisation.
// ─────────────────────────────────────────────────────────────

const config = {
    // Organisation identity
    org: {
        name: "Forward Falls Initiative",
        shortName: "FORWARD FALLS",
        adminLabel: "FFI Admin",
        tagline: "A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities for conflict-affected communities.",
        logo: "/FFI.png",
        favicon: "/FFI.png",
        ogImage: "/og-default.jpg",
    },

    // Public site URLs
    site: {
        url: "https://forwardfalls.com",
        metadataBase: "https://forwardfallsinitiative.org",
    },

    // Contact details
    contact: {
        email: "forwardfalls@gmail.com",
        phone: "+234 702 082 9533",
        address: "Nigeria - Serving Borno, Kano, Kaduna, Lagos & Abuja",
    },

    // Social media links (set to "" to hide)
    social: {
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
    },

    // Public navigation links
    nav: [
        { name: "About Us", href: "/about" },
        { name: "Programs", href: "/programs" },
        { name: "Blog", href: "/blog" },
        { name: "Leadership", href: "/board-and-team" },
        { name: "Contact", href: "/contact" },
    ],

    // CTA button in header/hero
    cta: {
        label: "DONATE NOW",
        href: "/donate",
    },

    // Footer quick links
    footerLinks: [
        { label: "Our Why", href: "/about" },
        { label: "Programs", href: "/programs" },
        { label: "Blog", href: "/blog" },
        { label: "Advisory Board", href: "/board-and-team" },
    ],

    // Partners list (shown in footer + partners page)
    partners: [
        "O2 International Dynamic Ltd",
        "Federal Capital Territory Secondary Education Board",
        "Future Prowess Islamic Foundation",
        "Isaac Moghalu Foundation",
        "Wudil Model Primary School",
        "Dec International School",
        "GGSS Dutse-Alhaji",
        "GSS Lifecamp, Abuja",
    ],

    // Brand colours (mirrors Tailwind CSS variables — update both here and globals.css)
    colors: {
        primary: "#00baa3",
        secondary: "#efc94c",
        accent: "#d55342",
        dark: "#2d2d2d",
    },

    // SEO defaults
    seo: {
        defaultTitle: "Forward Falls Initiative | Democratizing Education",
        titleTemplate: "%s | Forward Falls Initiative",
        description:
            "A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities.",
    },
} as const;

export default config;
