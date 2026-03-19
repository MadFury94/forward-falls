// Hardcoded defaults for all homepage sections.
// If ACF Options returns a value, it overrides the default.
// If ACF returns nothing (empty/null), the default is used.

export const heroDefaults = {
    slides: [
        {
            image: "/slide1.jpg",
            title: "WE LOVE\nALL PEOPLE",
            description: "CHECK OUR LATEST CAUSES AND MISSIONS",
            button_text: "DONATE NOW",
            button_link: "/donate",
        },
        {
            image: "/images/2.jpg",
            title: "FALL FORWARD\nINTO SUCCESS",
            description: "TRANSFORMING LIVES IN CONFLICT-AFFECTED COMMUNITIES",
            button_text: "DONATE NOW",
            button_link: "/donate",
        },
    ],
};

export const aboutDefaults = {
    eyebrow: "OUR BEGINNING",
    heading: "FROM ADVERSITY TO\nCONCRETE SUCCESS",
    paragraphs: [
        "Forward Falls Initiative was born out of a deep-seated commitment to ensure that education remains a tool for empowerment and transformation.",
        "We specialize in providing specialized support for young people from conflict-affected communities, helping them find their purpose.",
        "Our approach is rooted in the belief that every young person deserves a chance to thrive, regardless of their background or current circumstances.",
        "By bridge the gap between education and opportunity, we empower the next generation of leaders to build a brighter future for themselves.",
    ],
    stat_number: 76,
    stat_label: "Successful\nTransformations",
    image: "/about.jpg",
};

export const visionMissionDefaults = {
    eyebrow: "FORWARD FALLS",
    heading: "Fall Forward\nInto Success",
    intro: "To build a society where young people are empowered to find purpose from adversity and make meaning of their lives regardless of their circumstances.",
    vision_text:
        "To build a society where young people are empowered to find purpose from adversity and make meaning of their lives regardless of their circumstances.",
    mission_text:
        "To improve access to learning through formal and informal methods, ensuring that education remains a tool for empowerment and transformation.",
    sdg_pillars: [
        {
            category: "SDG 4",
            title: "Quality Education",
            description: "Ensuring inclusive and equitable learning.",
            image: "/kids.jpg",
            link: "/sdg-4",
        },
        {
            category: "SDG 5",
            title: "Gender Equality",
            description: "Advocating for equal rights and opportunities.",
            image: "/kid3.jpg",
            link: "/sdg-5",
        },
        {
            category: "SDG 10",
            title: "Reduced Inequalities",
            description: "Supporting underprivileged students.",
            image: "/kid5.jpg",
            link: "/sdg-10",
        },
    ],
};

export const programsDefaults = {
    eyebrow: "Education for All",
    heading: "FORWARD SCHOLARS PROGRAM",
    description:
        "Our flagship initiative designed to level the playing field for underserved secondary school students. We provide the tools to succeed in university and shape futures with confidence.",
    stats: [
        { value: 2000, label: "STUDENTS" },
        { value: 76, label: "MENTORS" },
        { value: 5, label: "STATES" },
        { value: 4, label: "PROGRAMS" },
    ],
    progress_bars: [
        { label: "UTME Preparation", percent: 82, color: "#00baa3" },
        { label: "Scholarship Awards", percent: 50, color: "#ebc858" },
        { label: "Mentorship Reach", percent: 65, color: "#eb8958" },
    ],
    initiatives: [
        {
            title: "16 Days of Activism",
            description:
                "Social media campaigns advocating against gender-based violence to raise awareness and promote advocacy.",
            badge: "",
        },
        {
            title: "Life Lessons",
            description:
                "Live interview series featuring individuals who share experiences of overcoming adversity to inspire others.",
            badge: "",
        },
        {
            title: "Big Little Steps",
            description:
                "Outreach to foundations like Whanyinna, celebrating the International Day of the Girl Child.",
            badge: "",
        },
        {
            title: "Forward Fellowship",
            description:
                "Annual program supporting young African changemakers through leadership training and project funding.",
            badge: "COMING 2027",
        },
    ],
};

export const partnersDefaults = {
    partners: [
        "O2 International",
        "FCT Secondary Ed",
        "Future Prowess",
        "Isaac Moghalu",
        "Wudil Model",
        "Dec Int School",
        "GGSS Dutse",
        "GSS Lifecamp",
    ],
};

// Types for the merged homepage content
export interface HeroSlide {
    image: string;
    title: string;
    description: string;
    button_text: string;
    button_link: string;
}

export interface SdgPillar {
    category: string;
    title: string;
    description: string;
    image: string;
    link: string;
}

export interface ProgressBar {
    label: string;
    percent: number;
    color: string;
}

export interface Initiative {
    title: string;
    description: string;
    badge: string;
}

export interface HomepageContent {
    hero: typeof heroDefaults;
    about: typeof aboutDefaults;
    visionMission: typeof visionMissionDefaults;
    programs: typeof programsDefaults;
    partners: typeof partnersDefaults;
}
