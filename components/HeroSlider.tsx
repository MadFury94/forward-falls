"use client";

import React from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
        title: "WE LOVE\nALL PEOPLE",
        description: "CHECK OUR LATEST CAUSES AND MISSIONS",
        buttonText: "DONATE NOW",
        buttonLink: "/contact"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
        title: "FALL FORWARD\nINTO SUCCESS",
        description: "TRANSFORMING LIVES IN CONFLICT-AFFECTED COMMUNITIES",
        buttonText: "DONATE NOW",
        buttonLink: "/contact"
    }
];

const HeroSlider = () => {
    const swiperRef = React.useRef<SwiperRef>(null);

    return (
        <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden font-poppins">
            <style>{`
                @keyframes blinkArrow {
                    0% {
                        transform: translateX(-10px);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translateX(10px);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(-10px);
                        opacity: 0.8;
                    }
                }
                .arrow-blink {
                    animation: blinkArrow 2s ease-in-out infinite;
                }
            `}</style>
            
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                navigation={false}
                pagination={false}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative h-full w-full">
                        {({ isActive }) => (
                            <>
                                {/* Background */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <motion.div
                                        key={isActive ? `bg-${slide.id}` : `bg-inactive-${slide.id}`}
                                        initial={{ scale: 1.1 }}
                                        animate={isActive ? { scale: 1 } : { scale: 1.1 }}
                                        transition={{ duration: 7, ease: "easeOut" }}
                                        className="h-full w-full"
                                    >
                                        <div
                                            className="h-full w-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${slide.image})` }}
                                        >
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/50"></div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex h-full items-center">
                                    <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center">
                                        <div className="max-w-2xl w-full">
                                            {/* Title */}
                                            <div className="overflow-hidden mb-6">
                                                <AnimatePresence mode="wait">
                                                    {isActive && (
                                                        <motion.h1
                                                            key={`title-${slide.id}`}
                                                            initial={{ x: "100%", opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            exit={{ x: "-100%", opacity: 0 }}
                                                            transition={{ 
                                                                duration: 1.2, 
                                                                ease: [0.33, 1, 0.68, 1],
                                                                delay: 0.3
                                                            }}
                                                            className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight uppercase whitespace-pre-line text-white"
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
                                                        className="text-xs md:text-sm font-light tracking-[3px] uppercase mb-10 text-white/90"
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
                                                            className="inline-block border-2 border-white text-white px-8 py-3 rounded-full text-xs md:text-sm font-light hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-[2px]"
                                                        >
                                                            {slide.buttonText}
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Blinking Arrow - Right Bottom */}
                                {isActive && (
                                    <motion.button
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.6, delay: 1.4 }}
                                        onClick={() => swiperRef.current?.swiper?.slideNext()}
                                        className="arrow-blink absolute bottom-16 right-12 z-20 text-white hover:text-gray-300 transition-colors"
                                        aria-label="Next slide"
                                    >
                                        <ArrowRight size={48} strokeWidth={1} />
                                    </motion.button>
                                )}

                                {/* Pagination Dots */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                                    {slides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => swiperRef.current?.swiper?.slideTo(idx)}
                                            className={`transition-all duration-300 rounded-full ${
                                                slide.id === slides[idx].id
                                                    ? 'bg-[#00baa3] w-3 h-3'
                                                    : 'bg-white/50 w-2 h-2 hover:bg-white/70'
                                            }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;
