"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SdgPillar {
    category: string;
    title: string;
    description: string;
    image: string;
    link: string;
}

interface VisionMissionContent {
    eyebrow: string;
    heading: string;
    intro: string;
    vision_text: string;
    mission_text: string;
    sdg_pillars: SdgPillar[];
}

const badgeColors = ["bg-primary-green", "bg-primary-yellow", "bg-secondary-orange"];

const AdoptionsSection = ({ content }: { content: VisionMissionContent }) => {
    const { eyebrow, heading, intro, vision_text, mission_text, sdg_pillars } = content;
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
        <section className="py-24 bg-white overflow-hidden font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 items-center mb-20">

                    <div
                        className={`space-y-6 transition-all duration-800 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm block">{eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-dark-grey leading-tight uppercase whitespace-pre-line">
                            {heading}
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg">{intro}</p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-yellow">
                                <Image src="/kid4.jpg" alt="Community Member" fill sizes="64px" className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-grey">Join the Mission</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Empowering Youth</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-800 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                    >
                        <Image src="/kid2.jpg" alt="Forward Falls Impact" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                    </div>

                    <div className="space-y-8">
                        {sdg_pillars.map((pillar, index) => (
                            <Link key={index} href={pillar.link}>
                                <div
                                    className={`flex items-center gap-6 group transition-all duration-600 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                                        <Image src={pillar.image} alt={pillar.title} fill sizes="96px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-grow">
                                        <span className="text-[10px] font-bold tracking-widest text-gray-400 block mb-1 uppercase">{pillar.category}</span>
                                        <h4 className="text-xl font-bold text-dark-grey group-hover:text-primary-green transition-colors">{pillar.title}</h4>
                                        <p className="text-xs text-gray-400 line-clamp-1">{pillar.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div
                        className={`bg-white p-12 shadow-xl rounded-2xl border border-gray-100 flex gap-8 items-start relative group hover:border-primary-yellow transition-colors ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDuration: '600ms' }}
                    >
                        <span className="text-8xl font-black text-primary-yellow/10 absolute -left-4 top-4 select-none group-hover:text-primary-yellow/20 transition-colors">1</span>
                        <div className="relative z-10 space-y-4 pt-12">
                            <h3 className="text-3xl font-bold text-dark-grey">Our Vision</h3>
                            <p className="text-gray-500 lg:text-sm">{vision_text}</p>
                        </div>
                    </div>

                    <div
                        className={`bg-white p-12 shadow-xl rounded-2xl border border-gray-100 flex gap-8 items-start relative group hover:border-primary-green transition-colors ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDuration: '600ms', transitionDelay: '200ms' }}
                    >
                        <span className="text-8xl font-black text-primary-green/10 absolute -left-4 top-4 select-none group-hover:text-primary-green/20 transition-colors">2</span>
                        <div className="relative z-10 space-y-4 pt-12">
                            <h3 className="text-3xl font-bold text-dark-grey">Our Mission</h3>
                            <p className="text-gray-500 lg:text-sm">{mission_text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdoptionsSection;