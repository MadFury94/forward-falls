"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
        title: "BUILDING PURPOSE\nFROM ADVERSITY",
        description: "ENSURING EDUCATION REMAINS A TOOL FOR EMPOWERMENT",
        buttonText: "FORWARD SCHOLARS PROGRAM",
        buttonLink: "/programs"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
        title: "FALL FORWARD\nINTO SUCCESS",
        description: "TRANSFORMING LIVES IN CONFLICT-AFFECTED COMMUNITIES",
        buttonText: "JOIN OUR MISSION",
        buttonLink: "/about"
    }
];

const HeroSlider = () => {
    return (
        <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden font-poppins">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative h-full w-full">
                        {({ isActive }) => (
                            <>
                                {/* Background with Ken Burns Effect */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <motion.div
                                        key={isActive ? `bg-${slide.id}` : `bg-inactive-${slide.id}`}
                                        initial={{ scale: 1.2 }}
                                        animate={isActive ? { scale: 1 } : { scale: 1.2 }}
                                        transition={{ duration: 7, ease: "easeOut" }}
                                        className="h-full w-full"
                                    >
                                        <div
                                            className="h-full w-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${slide.image})` }}
                                        >
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/60"></div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex h-full items-center">
                                    <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center">
                                        <div className="max-w-3xl">
                                            {/* Title with Mask Animation */}
                                            <div className="overflow-hidden mb-4">
                                                <AnimatePresence mode="wait">
                                                    {isActive && (
                                                        <motion.h1
                                                            key={`title-${slide.id}`}
                                                            initial={{ x: "100%" }}
                                                            animate={{ x: 0 }}
                                                            exit={{ x: "-100%" }}
                                                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                                            className="text-5xl md:text-5xl lg:text-6xl font-light leading-tight uppercase whitespace-pre-line text-white"

                                                        >
                                                            {slide.title}
                                                        </motion.h1>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Description */}
                                            <AnimatePresence mode="wait">
                                                {isActive && (
                                                    <motion.p
                                                        key={`desc-${slide.id}`}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.8, delay: 0.8 }}
                                                        className="text-sm md:text-lg font-light tracking-[4px] uppercase mb-8 text-white/90"
                                                    >
                                                        {slide.description}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>

                                            {/* Button */}
                                            <AnimatePresence mode="wait">
                                                {isActive && (
                                                    <motion.div
                                                        key={`btn-${slide.id}`}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.6, delay: 1.2 }}
                                                    >
                                                        <Link
                                                            href={slide.buttonLink}
                                                            className="inline-block border-2 border-primary-green bg-primary-green/10 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-primary-green hover:text-white transition-all duration-300 uppercase tracking-widest"
                                                        >
                                                            {slide.buttonText}
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Styling */}
            <style jsx global>{`
                .swiper-button-next, .swiper-button-prev {
                    color: white !important;
                    width: 50px !important;
                    height: 50px !important;
                    background: rgba(0,0,0,0.2);
                    border-radius: 50%;
                    transform: scale(0.7);
                    transition: all 0.3s ease;
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 20px !important;
                    font-weight: bold;
                }
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    background: rgba(0,186,163,0.8);
                    transform: scale(0.8);
                }
                .swiper-pagination-bullet {
                    background: white !important;
                    opacity: 0.5;
                }
                .swiper-pagination-bullet-active {
                    background: #00baa3 !important;
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
