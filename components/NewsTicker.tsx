"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
    link: string;
}

const newsItems: NewsItem[] = [
    {
        id: 1,
        title: "New Scholarship Program Launched",
        excerpt: "Forward Falls Initiative announces expanded scholarship opportunities for students in conflict-affected regions.",
        date: "14 Mar",
        category: "PROGRAMS",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        link: "/news/1"
    },
    {
        id: 2,
        title: "Community Impact Report Released",
        excerpt: "Our latest impact report shows 45% increase in students served and 89% graduation rate across all programs.",
        date: "10 Mar",
        category: "IMPACT",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        link: "/news/2"
    },
    {
        id: 3,
        title: "Partnership with Global Education NGO",
        excerpt: "Forward Falls partners with international organization to expand educational initiatives across multiple countries.",
        date: "05 Mar",
        category: "PARTNERSHIP",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        link: "/news/3"
    },
    {
        id: 4,
        title: "Student Success Stories",
        excerpt: "Meet the remarkable students whose lives have been transformed through Forward Falls educational programs.",
        date: "01 Mar",
        category: "TESTIMONIALS",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        link: "/news/4"
    }
];

const NewsTicker = () => {
    const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('left');
    const [isPaused, setIsPaused] = useState(false);

    const categoryColors: { [key: string]: string } = {
        'PROGRAMS': 'bg-[#00baa3]',
        'IMPACT': 'bg-[#efc94c]',
        'PARTNERSHIP': 'bg-[#d55342]',
        'TESTIMONIALS': 'bg-[#2d2d2d]'
    };

    // Duplicate items for infinite scroll effect
    const extendedItems = [...newsItems, ...newsItems];

    return (
        <section className="w-full bg-white py-12 font-poppins border-b border-gray-100">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <p className="text-xs md:text-sm font-light uppercase tracking-[0.2em] text-[#00baa3] mb-3">
                        NEWS & UPDATES
                    </p>
                    <h2 className="text-3xl md:text-4xl font-light text-[#2d2d2d] mb-3">
                        Latest Stories
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-light max-w-2xl mx-auto">
                        Stay informed about our latest initiatives, impact stories, and educational programs transforming lives in conflict-affected communities.
                    </p>
                </div>

                {/* Scrolling Ticker Container */}
                <div 
                    className="relative overflow-hidden rounded-lg"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: scrollDirection === 'left' ? [0, -2400] : [0, 2400]
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                            pause: isPaused ? { while: true } : undefined
                        }}
                    >
                        {extendedItems.map((item, idx) => (
                            <Link
                                key={`${item.id}-${idx}`}
                                href={item.link}
                                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group"
                            >
                                <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden bg-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Date Badge */}
                                        <div className="absolute top-4 right-4 bg-[#00baa3] text-white px-3 py-2 rounded-sm text-xs font-bold">
                                            <div className="text-xs font-bold leading-none">{item.date.split(' ')[0]}</div>
                                            <div className="text-[10px]">{item.date.split(' ')[1]}</div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        {/* Category Badge */}
                                        <div className="mb-3">
                                            <span className={`inline-block ${categoryColors[item.category] || 'bg-gray-400'} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm`}>
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-sm font-semibold text-[#2d2d2d] mb-3 line-clamp-2 group-hover:text-[#00baa3] transition-colors">
                                            {item.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-xs text-gray-600 font-light line-clamp-2 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>

                    {/* Gradient Fade at Edges */}
                    <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />
                </div>

                {/* Controls Info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 font-light">Hover to pause • Scroll to explore latest updates</p>
                </div>

                {/* View All Link */}
                <div className="mt-10 text-center">
                    <Link
                        href="/news"
                        className="inline-block border-2 border-[#00baa3] text-[#00baa3] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#00baa3] hover:text-white transition-all duration-300"
                    >
                        View All News
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewsTicker;