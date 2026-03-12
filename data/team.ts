export interface TeamMember {
    name: string;
    role: string;
    color: string;
    image?: string;
    bio?: string;
    featured?: boolean;
}

export interface BoardMember {
    name: string;
    role: string;
    bio: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Ijeoma Seraphie Obiedelu",
        role: "Founder",
        color: "border-primary-green",
        image: "/ijeoma.jpg",
        bio: "Leading the vision for educational democratization and driving Forward Falls' mission to transform education access for underserved communities.",
        featured: true
    },
    {
        name: "Tobechukwu Onyeji",
        role: "Cofounder",
        color: "border-primary-yellow",
        image: "/Tobechukwu.jpg",
        bio: "Driving strategic growth and impact, ensuring Forward Falls reaches more communities and creates lasting change.",
        featured: true
    },
    {
        name: "Ozioma Okafor",
        role: "Chief Operating Officer",
        color: "border-secondary-orange",
        image: "/Ozioma.jpg",
        bio: "Managing day-to-day operations with excellence, ensuring smooth program delivery and organizational efficiency.",
        featured: true
    },
    {
        name: "Faith Adeyanju",
        role: "Social Media Manager",
        color: "border-primary-green",
        image: "/Faith.jpg",
        bio: "Amplifying our voice and advocacy through strategic digital communications and community engagement.",
        featured: true
    },
    {
        name: "Oluwatoyin Oloidi",
        role: "Administrative Officer",
        color: "border-primary-yellow",
        bio: "Ensuring organizational stability through meticulous administrative support and coordination."
    },
    {
        name: "Sandra Kennedy",
        role: "Development and Programs Director",
        color: "border-secondary-orange",
        bio: "Designing impactful curricula and outreach programs that transform lives and create opportunities."
    }
];

export const boardMembers: BoardMember[] = [
    {
        name: "Prof Chidi Odinkalu",
        role: "Chairman",
        bio: "Professor of Practice in International Human Rights Law at the Fletcher School of Law and Diplomacy, Tufts University."
    },
    {
        name: "Mrs Maryanne Moghalu",
        role: "Executive Director",
        bio: "Executive Director, Isaac Moghalu Foundation."
    },
    {
        name: "Prof Offornze Amucheazi",
        role: "Senior Advocate",
        bio: "Senior Advocate of Nigeria and esteemed legal practitioner."
    }
];

// Helper to get featured team members (those with images)
export const featuredTeam = teamMembers.filter(member => member.featured);
