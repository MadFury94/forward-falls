"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, animate, useMotionValue } from 'framer-motion';
import { BookOpen, Award, Users, TrendingUp } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
    const count = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, target, {
                duration,
                ease: "easeOut",
                onUpdate: (latest) => setDisplayValue(Math.round(latest)),
            });
            return controls.stop;
        }
    }, [isInView, count, target, duration]);

    return <span ref={ref}>{displayValue}</span>;
};

const ProgressBar = ({ label, percent, color, delay = 0 }: { label: string; percent: number; color: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className="mb-5">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-dark-grey tracking-wide">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{percent}%</span>
            </div>
            <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percent}%` } : { width: 0 }}
                    transition={{ duration: 1.4, delay, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

const featureIcons = [
    { icon: <BookOpen size={28} />, iconColor: "text-primary-yellow", bgColor: "bg-primary-yellow/10" },
    { icon: <Award size={28} />, iconColor: "text-primary-green", bgColor: "bg-primary-green/10" },
    { icon: <Users size={28} />, iconColor: "text-secondary-orange", bgColor: "bg-secondary-orange/10" },
    { icon: <TrendingUp size={28} />, iconColor: "text-primary-green", bgColor: "bg-primary-green/10" },
];

interface ProgramsContent {
    eyebrow: string;
    heading: string;
    description: string;
    stats: Array<{ value: number; label: string }>;
    progress_bars: Array<{ label: string; percent: number; color: string }>;
    initiatives: Array<{ title: string; description: string; badge: string }>;
}

const Programs = ({ content }: { content: ProgramsContent }) => {
    const { eyebrow, heading, description, stats, progress_bars, initiatives } = content;

    return (
        <section id="programs" className="py-24 bg-white font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                        className="relative w-full lg:w-[50%] min-h-[480px]"
                    >
                        <div className="absolute top-0 left-0 w-[55%] h-[420px] overflow-hidden shadow-xl z-0">
                            <Image src="/kid11.jpg" alt="Students learning" fill priority sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover" style={{ objectPosition: 'left 20%' }} />
                        </div>
                        <div className="absolute top-12 left-[30%] w-[48%] h-[420px] overflow-hidden shadow-xl z-10">
                            <Image src="/kids.jpg" alt="Education impact" fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover" style={{ objectPosition: 'center 20%' }} />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            viewport={{ once: true }}
                            className="absolute top-8 right-0 bg-white shadow-2xl z-20 py-6 px-5 flex flex-col gap-4 min-w-[110px]"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                    <span className="text-2xl font-bold text-dark-grey block leading-none">
                                        <AnimatedCounter target={stat.value} duration={2 + i * 0.3} />
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 w-full"
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">{eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark-grey leading-tight uppercase">{heading}</h2>
                        <p className="text-gray-600 mb-10 leading-relaxed text-base">{description}</p>
                        {progress_bars.map((bar, i) => (
                            <ProgressBar key={i} label={bar.label} percent={bar.percent} color={bar.color} delay={i * 0.15} />
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-100 pt-14"
                >
                    {progress_bars.slice(0, 4).map((bar, i) => {
                        const icon = featureIcons[i] || featureIcons[0];
                        return (
                            <div key={i} className="flex items-start gap-4 group cursor-default">
                                <div className={`${icon.bgColor} ${icon.iconColor} p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    {icon.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-grey text-sm">{bar.label}</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">{bar.percent}% success rate</p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-dark-grey uppercase mb-4">Other Initiatives</h3>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {initiatives.map((item, i) => (
                            <div
                                key={i}
                                className={`p-8 rounded-2xl group transition-all cursor-default ${i === initiatives.length - 1 && item.badge ? 'bg-dark-grey border-2 border-primary-green relative overflow-hidden' : 'bg-light-bg hover:bg-primary-green'}`}
                            >
                                {item.badge && (
                                    <div className="absolute top-4 right-4 bg-primary-green text-white text-[10px] font-bold px-2 py-1 rounded">{item.badge}</div>
                                )}
                                <h4 className={`font-bold mb-4 ${i === initiatives.length - 1 && item.badge ? 'text-white' : 'text-dark-grey group-hover:text-white'}`}>{item.title}</h4>
                                <p className={`text-sm leading-relaxed ${i === initiatives.length - 1 && item.badge ? 'text-gray-400 group-hover:text-white/90' : 'text-gray-500 group-hover:text-white/80'}`}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programs;
