"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Twitter, Linkedin, Facebook, Globe } from "lucide-react";

/* ── Types ── */
interface ProfileCard {
    subtitle: string;
    name: string;
    description: string;
    bgColor: string;
}

interface SlideData {
    images: string[];
    topCard: ProfileCard;
    bottomCard: ProfileCard;
}

const slides: SlideData[] = [
    {
        images: [
            "/group.jpg",
            "/single.jpg",
            "/group.jpg",
            "/single.jpg",
            "/kid11.jpg",
            "/kidd.jpg",
            "/group2.jpg",
            "/kidn.jpg",
            "/teacher.jpg",
            "/about.jpg",
            "/kids4.jpg",
            "/kiid.jpg",
        ],
        topCard: {
            subtitle: "PROGRAM",
            name: "Forward Scholars",
            description:
                "UTME prep, scholarships, and mentorship for underserved youth — building pathways to higher education.",
            bgColor: "bg-[#7fc8b6]/90",
        },
        bottomCard: {
            subtitle: "TESTIMONIAL",
            name: "Aisha, Student",
            description:
                "\"Forward Scholars changed my life — I passed my exams and got a scholarship to university.\"",
            bgColor: "bg-[#e88a9a]/90",
        },
    },
    {
        images: [
            "/group.jpg",
            "/group.jpg",
            "/single.jpg",
            "/kid11.jpg",
            "/kidd.jpg",
            "/group2.jpg",
            "/kidn.jpg",
            "/teacher.jpg",
            "/about.jpg",
            "/kids4.jpg",
            "/kiid.jpg",
        ],
        topCard: {
            subtitle: "PROGRAM",
            name: "Community Outreach",
            description:
                "Local outreach and awareness campaigns connecting families with education, health, and civic resources.",
            bgColor: "bg-[#d4a574]/90",
        },
        bottomCard: {
            subtitle: "TESTIMONIAL",
            name: "Chinedu, Parent",
            description:
                "\"The community sessions helped my children access free tutoring and health checks — we are grateful.\"",
            bgColor: "bg-[#e8c84a]/90",
        },
    },
    {
        images: [
            "/group.jpg",
            "/single.jpg",
            "/kid11.jpg",
            "/kidd.jpg",
            "/group2.jpg",
            "/kidn.jpg",
            "/teacher.jpg",
            "/about.jpg",
            "/kids4.jpg",
            "/kiid.jpg",
        ],
        topCard: {
            subtitle: "PROGRAM",
            name: "Volunteer Training",
            description:
                "Equipping volunteers with teaching, mentoring, and community mobilization skills to scale impact.",
            bgColor: "bg-[#7fb6d4]/90",
        },
        bottomCard: {
            subtitle: "TESTIMONIAL",
            name: "Samuel, Volunteer",
            description:
                "\"Training gave me the confidence to mentor youth and lead community sessions regularly.\"",
            bgColor: "bg-[#c7a3e8]/90",
        },
    },
];

/* ── Social Icons ── */
const SocialIcons = () => (
    <div className="flex gap-4 mt-4">
        {[Twitter, Linkedin, Facebook, Globe].map((Icon, i) => (
            <a
                key={i}
                href="#"
                className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
                <Icon size={18} />
            </a>
        ))}
    </div>
);

/* ── Info Card tile (full colored card) ── */
const InfoTile = ({ card, bgImage }: { card: ProfileCard; bgImage?: string }) => (
    <div className={`${card.bgColor} text-white p-6 md:p-8 flex flex-col justify-center h-full relative overflow-hidden`}>
        {bgImage && (
            <div className="absolute inset-0 -z-10 opacity-20">
                <Image src={bgImage} alt="bg" fill className="object-cover" />
            </div>
        )}
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase opacity-90 mb-2 block">
            {card.subtitle}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{card.name}</h3>
        <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
        <SocialIcons />
    </div>
);

/* ── Image Tile ── */
const ImgTile = ({ src, alt }: { src: string; alt: string }) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    return (
        <div className="relative w-full h-full overflow-hidden group">
            <Image
                src={imgSrc}
                alt={alt}
                fill
                onError={() => setImgSrc('/file.svg')}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
            />
        </div>
    );
};

/* ── Drag threshold ── */
const DRAG_THRESHOLD = 50;

/* ── Main Component ── */
const PhotoMosaic = () => {
    const [current, setCurrent] = useState(0);
    const dragStartX = useRef(0);
    const isDragging = useRef(false);
    const [dragDelta, setDragDelta] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const containerWidth = useRef(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToIndex = (index: number) => {
        const clamped = (index + slides.length) % slides.length;
        setCurrent(clamped);
        setIsTransitioning(true);
    };

    useEffect(() => {
        const el = containerRef.current;
        const measure = () => {
            if (el) containerWidth.current = el.clientWidth;
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragStartX.current = e.clientX;
        isDragging.current = true;
        setIsTransitioning(false);
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const delta = e.clientX - dragStartX.current;
        setDragDelta(delta);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        (e.target as Element).releasePointerCapture?.(e.pointerId);
        const delta = e.clientX - dragStartX.current;
        if (delta < -DRAG_THRESHOLD) goToIndex(current + 1);
        else if (delta > DRAG_THRESHOLD) goToIndex(current - 1);
        setIsTransitioning(true);
        setDragDelta(0);
    };

    const ROW_HEIGHT = "clamp(220px, 35vw, 360px)";

    const trackWidthStyle: React.CSSProperties = { width: `${slides.length * 100}%` };
    const childWidthPercent = 100 / slides.length;
    const translate = containerWidth.current ? -current * containerWidth.current + dragDelta : 0;
    const trackTransform = { transform: `translateX(${translate}px)`, transition: isTransitioning ? "transform 600ms cubic-bezier(.22,.9,.3,1)" : "none" } as React.CSSProperties;

    return (
        <>
            <section
                className="w-full overflow-hidden bg-white cursor-grab active:cursor-grabbing select-none"
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={() => { isDragging.current = false; setDragDelta(0); }}
            >
                <div className="relative w-full">
                    <div className="relative" style={{ overflow: 'hidden' }}>
                        <div style={{ ...trackWidthStyle, display: 'flex', willChange: 'transform', ...trackTransform }} onTransitionEnd={() => setIsTransitioning(false)}>
                            {slides.map((s, idx) => (
                                <div key={idx} style={{ width: `${childWidthPercent}%`, flexShrink: 0 }}>
                                    {/* Row 1 */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[500px] md:h-[clamp(220px,35vw,360px)]">
                                        <div className="hidden md:block h-full">
                                            <ImgTile src={s.images[0]} alt={`Impact ${idx}-1`} />
                                        </div>
                                        <div className="hidden md:block h-full">
                                            <ImgTile src={s.images[1]} alt={`Impact ${idx}-2`} />
                                        </div>
                                        <div className="hidden md:block h-full">
                                            <ImgTile src={s.images[2]} alt={`Impact ${idx}-3`} />
                                        </div>
                                        {/* paired container: image + info tile with no gap */}
                                        <div className="h-full md:col-span-2 flex flex-col md:flex-row col-span-1" style={{ gap: 0 }}>
                                            <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                                <ImgTile src={s.images[3]} alt={`Impact ${idx}-4`} />
                                            </div>
                                            <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                                <InfoTile card={s.topCard} bgImage={s.images[3]} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6 h-[500px] md:h-[clamp(220px,35vw,360px)]">
                                        <div className="h-full md:col-span-2 flex flex-col-reverse md:flex-row col-span-1" style={{ gap: 0 }}>
                                            <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                                <InfoTile card={s.bottomCard} bgImage={s.images[5]} />
                                            </div>
                                            <div className="w-full h-1/2 md:w-1/2 md:h-full">
                                                <ImgTile src={s.images[5]} alt={`Impact ${idx}-6`} />
                                            </div>
                                        </div>
                                        <div className="hidden md:block h-full">
                                            <ImgTile src={s.images[6]} alt={`Impact ${idx}-7`} />
                                        </div>
                                        <div className="hidden md:block h-full">
                                            <ImgTile src={s.images[7]} alt={`Impact ${idx}-8`} />
                                        </div>
                                        <div className="hidden md:block h-full">
                                            <ImgTile src={s.images[8]} alt={`Impact ${idx}-9`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* pagination dots (hidden visually but kept in DOM for accessibility) */}
            <div className="sr-only flex items-center justify-center gap-3 mt-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToIndex(i)}
                        className={`w-2 h-2 rounded-full ${i === current ? 'bg-gray-800' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </>
    );
};

export default PhotoMosaic;

