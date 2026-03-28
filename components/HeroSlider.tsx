"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HeroSlide } from '@/content/defaults/homepage';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroSliderProps {
    slides: HeroSlide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
    const swiperRef = React.useRef<SwiperRef>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (swiperRef.current?.swiper) {
            setIsInitialized(true);
        }
    }, []);

    return (
        <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden font-poppins">
            <style>{`
                @keyframes blinkArrow {
                    0% { transform: translateX(-10px); opacity: 0.8; }
                    50% { transform: translateX(10px); opacity: 1; }
                    100% { transform: translateX(-10px); opacity: 0.8; }
                }
                .arrow-blink { animation: blinkArrow 2s ease-in-out infinite; }
                
                @keyframes slideInFromRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideInFromLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes fadeInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .slide-title {
                    animation: slideInFromRight 1.2s cubic-bezier(0.33, 1, 0.68, 1) forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                }
                
                .slide-description {
                    animation: fadeInUp 0.8s ease-out forwards;
                    animation-delay: 0.8s;
                    opacity: 0;
                }
                
                .slide-button {
                    animation: fadeInUp 0.6s ease-out forwards;
                    animation-delay: 1.2s;
                    opacity: 0;
                }
                
                .slide-arrow {
                    animation: fadeInUp 0.6s ease-out forwards;
                    animation-delay: 1.4s;
                    opacity: 0;
                }
                
                .slide-bg {
                    transition: transform 7s ease-out;
                }
                
                .slide-bg.active {
                    transform: scale(1);
                }
                
                .slide-bg:not(.active) {
                    transform: scale(1.1);
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
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative h-full w-full">
                        {({ isActive }) => (
                            <>
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <div
                                        className={`h-full w-full slide-bg ${isActive ? 'active' : ''}`}
                                    >
                                        <div
                                            className="h-full w-full bg-cover bg-center"
                                            style={{ backgroundImage: `url(${slide.image})` }}
                                        >
                                            <div className="absolute inset-0 bg-black/50"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex h-full items-center">
                                    <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center">
                                        <div className="max-w-2xl w-full">
                                            <div className="overflow-hidden mb-6">
                                                {isActive && (
                                                    <h1
                                                        className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight uppercase whitespace-pre-line text-white slide-title"
                                                    >
                                                        {slide.title}
                                                    </h1>
                                                )}
                                            </div>

                                            {isActive && (
                                                <p
                                                    className="text-xs md:text-sm font-light tracking-[3px] uppercase mb-10 text-white/90 slide-description"
                                                >
                                                    {slide.description}
                                                </p>
                                            )}

                                            {isActive && (
                                                <div className="slide-button">
                                                    <Link
                                                        href={slide.button_link}
                                                        className="inline-block border-2 border-white text-white px-8 py-3 rounded-full text-xs md:text-sm font-light hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-[2px]"
                                                    >
                                                        {slide.button_text}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {isActive && (
                                    <button
                                        className="arrow-blink absolute bottom-16 right-12 z-20 text-white hover:text-gray-300 transition-colors slide-arrow"
                                        onClick={() => swiperRef.current?.swiper?.slideNext()}
                                        aria-label="Next slide"
                                    >
                                        <ArrowRight size={48} strokeWidth={1} />
                                    </button>
                                )}

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                                    {slides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => swiperRef.current?.swiper?.slideTo(idx)}
                                            className={`transition-all duration-300 rounded-full ${index === idx ? 'bg-[#00baa3] w-3 h-3' : 'bg-white/50 w-2 h-2 hover:bg-white/70'}`}
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