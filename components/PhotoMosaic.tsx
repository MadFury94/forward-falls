"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Twitter, Linkedin, Facebook, Globe } from "lucide-react";
import { mosaicSlides as slides } from "@/content/defaults/mosaic";
import type { ProfileCard } from "@/content/defaults/mosaic";

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
    <div className={`${card.bgColor} text-white p-4 md:p-8 flex flex-col justify-center h-full relative overflow-hidden`}>
        {bgImage && (
            <div className="absolute inset-0 -z-10 opacity-20">
                <Image src={bgImage} alt="bg" fill sizes="25vw" className="object-cover" />
            </div>
        )}
        <span className="text-[9px] md:text-[11px] font-bold tracking-[0.25em] uppercase opacity-90 mb-1 md:mb-2 block">
            {card.subtitle}
        </span>
        <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 leading-tight">{card.name}</h3>
        <p className="text-[11px] md:text-sm leading-relaxed opacity-90 line-clamp-4 md:line-clamp-none">{card.description}</p>
        <div className="hidden md:block">
            <SocialIcons />
        </div>
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

    const ROW_HEIGHT = "clamp(260px, 35vw, 360px)";

    const trackWidthStyle: React.CSSProperties = { width: `${slides.length * 100}%` };
    const childWidthPercent = 100 / slides.length;
    const translate = containerWidth.current ? -current * containerWidth.current + dragDelta : 0;

    // Slower transition on mobile (1200ms), faster on desktop (600ms)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const transitionDuration = isMobile ? '1200ms' : '600ms';
    const trackTransform = {
        transform: `translateX(${translate}px)`,
        transition: isTransitioning ? `transform ${transitionDuration} cubic-bezier(.22,.9,.3,1)` : "none"
    } as React.CSSProperties;

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
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4" style={{ height: ROW_HEIGHT }}>
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
                                        <div className="h-full md:col-span-2 col-span-2 grid grid-cols-2 gap-0">
                                            <div className="h-full">
                                                <ImgTile src={s.images[3]} alt={`Impact ${idx}-4`} />
                                            </div>
                                            <div className="h-full">
                                                <InfoTile card={s.topCard} bgImage={s.images[3]} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mt-3 md:mt-4" style={{ height: ROW_HEIGHT }}>
                                        <div className="h-full md:col-span-2 col-span-2 grid grid-cols-2 gap-0">
                                            <div className="h-full">
                                                <InfoTile card={s.bottomCard} bgImage={s.images[5]} />
                                            </div>
                                            <div className="h-full">
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

