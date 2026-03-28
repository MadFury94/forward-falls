"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import config from '@/config/framework.config';

const AnimatedCounter = ({ target, duration = 2 }: { target: number, duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const increment = target / (duration * 60); // 60fps
        let animationFrameId: number;

        const animate = () => {
            start += increment;
            if (start >= target) {
                setDisplayValue(target);
                return;
            }
            setDisplayValue(Math.round(start));
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isInView, target, duration]);

    return <span ref={ref}>{displayValue}</span>;
};

interface AboutContent {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    stat_number: number;
    stat_label: string;
    image: string;
}

interface AboutSectionProps {
    content: AboutContent;
}

const AboutSection = ({ content }: AboutSectionProps) => {
    const { eyebrow, heading, paragraphs, stat_number, stat_label, image } = content;
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.querySelector('section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <section className="py-20 px-6 bg-white font-poppins overflow-hidden">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 items-center">

                <div className="relative w-full lg:w-1/2">
                    <div
                        className={`relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                    >
                        <div className="relative aspect-[4/5] w-full max-w-[450px] mx-auto lg:ml-0 overflow-hidden shadow-2xl">
                            {image ? (
                                <Image
                                    src={image}
                                    alt="Forward Falls Initiative Impact"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-light-bg" />
                            )}
                        </div>

                        <div
                            className={`absolute -bottom-10 -left-6 md:-left-10 bg-secondary-orange text-white p-8 md:p-10 shadow-xl z-20 min-w-[180px] transition-all duration-700 delay-500 ${isInView ? 'scale-100' : 'scale-0'}`}
                            style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                        >
                            <h3 className="text-4xl md:text-5xl font-bold mb-1">
                                +<AnimatedCounter target={stat_number} />
                            </h3>
                            <p className="text-xs md:text-sm font-bold tracking-[2px] uppercase whitespace-pre-line">{stat_label}</p>
                        </div>
                    </div>

                    <div className="absolute top-10 right-0 w-full h-full bg-light-bg -z-0 translate-x-10 -translate-y-10 hidden lg:block"></div>
                </div>

                <div className="w-full lg:w-1/2">
                    <div
                        className={`transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <span className="text-primary-green text-sm font-bold tracking-[3px] uppercase mb-4 block">{eyebrow}</span>
                        <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-dark-grey mb-8 leading-tight whitespace-pre-line">
                            {heading}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {paragraphs.map((para, i) => (
                                <p key={i} className="text-gray-600 leading-relaxed text-sm md:text-base">{para}</p>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                            <div className="w-16 h-16 rounded-full overflow-hidden relative border-4 border-light-bg">
                                <Image src="/teacher.jpg" alt="Director" fill sizes="64px" className="object-cover" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-dark-grey m-0">{config.org.name} Director</h4>
                                <p className="text-xs text-primary-green font-bold tracking-[2px] uppercase">LEADERSHIP</p>
                            </div>
                            <div className="ml-auto hidden md:block">
                                <span className="text-3xl font-serif italic text-gray-300 transform -rotate-6 block">{config.org.shortName}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;