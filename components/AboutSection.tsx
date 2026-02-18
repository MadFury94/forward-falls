"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';

const AnimatedCounter = ({ target, duration = 2 }: { target: number, duration?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, target, {
                duration: duration,
                ease: "easeOut",
                onUpdate: (latest) => setDisplayValue(Math.round(latest))
            });
            return controls.stop;
        }
    }, [isInView, count, target, duration]);

    return <span ref={ref}>{displayValue}</span>;
}

const AboutSection = () => {
    return (
        <section className="py-20 px-6 bg-white font-poppins overflow-hidden">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Side: Image with floating stat box */}
                <div className="relative w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="relative z-10"
                    >
                        {/* Main Image */}
                        <div className="relative aspect-[4/5] w-full max-w-[450px] mx-auto lg:ml-0 overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                                alt="Forward Falls Initiative Impact"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Floating Stat Box */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                            className="absolute -bottom-10 -left-6 md:-left-10 bg-secondary-orange text-white p-8 md:p-10 shadow-xl z-20 min-w-[180px]"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold mb-1">
                                +<AnimatedCounter target={76} />
                            </h3>
                            <p className="text-xs md:text-sm font-bold tracking-[2px] uppercase">Successful<br />Transformations</p>
                        </motion.div>
                    </motion.div>

                    {/* Background Decorative Element */}
                    <div className="absolute top-10 right-0 w-full h-full bg-light-bg -z-0 translate-x-10 -translate-y-10 hidden lg:block"></div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary-green text-sm font-bold tracking-[3px] uppercase mb-4 block">OUR BEGINNING</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-grey mb-8 leading-tight">
                            FROM ADVERSITY TO <br /> CONCRETE SUCCESS
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Forward Falls Initiative was born out of a deep-seated commitment to ensure that education remains a tool for empowerment and transformation.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                We specialize in providing specialized support for young people from conflict-affected communities, helping them find their purpose.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Our approach is rooted in the belief that every young person deserves a chance to thrive, regardless of their background or current circumstances.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                By bridge the gap between education and opportunity, we empower the next generation of leaders to build a brighter future for themselves.
                            </p>
                        </div>

                        {/* Author/Director Section */}
                        <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                            <div className="w-16 h-16 rounded-full overflow-hidden relative border-4 border-light-bg">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                                    alt="Director"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-dark-grey m-0">Forward Falls Director</h4>
                                <p className="text-xs text-primary-green font-bold tracking-[2px] uppercase">LEADERSHIP</p>
                            </div>
                            {/* Replicating the signature look with a nice font or italic style if we don't have the SVG */}
                            <div className="ml-auto hidden md:block">
                                <span className="text-3xl font-serif italic text-gray-300 transform -rotate-6 block">Forward Falls</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
