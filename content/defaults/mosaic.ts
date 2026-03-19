// Org-specific slide data for the PhotoMosaic component.
// Replace images, names, and testimonials for a new org.

export interface ProfileCard {
    subtitle: string;
    name: string;
    description: string;
    bgColor: string;
}

export interface MosaicSlide {
    images: string[];
    topCard: ProfileCard;
    bottomCard: ProfileCard;
}

export const mosaicSlides: MosaicSlide[] = [
    {
        images: [
            "/images/5.jpg", "/images/awards.jpg", "/images/1.jpg", "/images/home.jpg",
            "/kid11.jpg", "/kidd.jpg", "/images/group2.jpg", "/kidn.jpg",
            "/teacher.jpg", "/about.jpg", "/kids4.jpg", "/kiid.jpg",
        ],
        topCard: {
            subtitle: "PROGRAM",
            name: "Forward Scholars",
            description: "UTME prep, scholarships, and mentorship for underserved youth — building pathways to higher education.",
            bgColor: "bg-[#7fc8b6]/90",
        },
        bottomCard: {
            subtitle: "TESTIMONIAL",
            name: "Aisha, Student",
            description: "\"Forward Scholars changed my life — I passed my exams and got a scholarship to university.\"",
            bgColor: "bg-[#e88a9a]/90",
        },
    },
    {
        images: [
            "/images/group2.jpg", "/group.jpg", "/single.jpg", "/kid11.jpg",
            "/kidd.jpg", "/images/2.jpg", "/kidn.jpg", "/teacher.jpg",
            "/about.jpg", "/kids4.jpg", "/kiid.jpg",
        ],
        topCard: {
            subtitle: "PROGRAM",
            name: "Community Outreach",
            description: "Local outreach and awareness campaigns connecting families with education, health, and civic resources.",
            bgColor: "bg-[#d4a574]/90",
        },
        bottomCard: {
            subtitle: "TESTIMONIAL",
            name: "Chinedu, Parent",
            description: "\"The community sessions helped my children access free tutoring and health checks — we are grateful.\"",
            bgColor: "bg-[#e8c84a]/90",
        },
    },
    {
        images: [
            "/images/group2.jpg", "/images/2.jpg", "/kid11.jpg", "/kidd.jpg",
            "/group2.jpg", "/kidn.jpg", "/teacher.jpg", "/about.jpg",
            "/kid4.jpg", "/kiid.jpg",
        ],
        topCard: {
            subtitle: "PROGRAM",
            name: "Volunteer Training",
            description: "Equipping volunteers with teaching, mentoring, and community mobilization skills to scale impact.",
            bgColor: "bg-[#7fb6d4]/90",
        },
        bottomCard: {
            subtitle: "TESTIMONIAL",
            name: "Samuel, Volunteer",
            description: "\"Training gave me the confidence to mentor youth and lead community sessions regularly.\"",
            bgColor: "bg-[#c7a3e8]/90",
        },
    },
];
