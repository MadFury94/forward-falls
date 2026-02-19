"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, animate, useMotionValue } from 'framer-motion';
import { BookOpen, Award, Users, TrendingUp } from 'lucide-react';

/* ── Animated Counter (counts up when scrolled into view) ── */
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

/* ── Animated Progress Bar ── */
const ProgressBar = ({
    label,
    percent,
    color,
    delay = 0,
}: {
    label: string;
    percent: number;
    color: string;
    delay?: number;
}) => {
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

/* ── Main Programs Section ── */
const Programs = () => {
    return (
        <section id="programs" className="py-24 bg-white font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">

                {/* ─── Top Row: Images + Stats │ Text + Progress Bars ─── */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">

                    {/* LEFT: Overlapping images with vertical counter card */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                        className="relative w-full lg:w-[50%] min-h-[480px]"
                    >
                        {/* Back image */}
                        <div className="absolute top-0 left-0 w-[55%] h-[420px] overflow-hidden shadow-xl z-0">
                            <Image
                                src="/kid11.jpg"
                                alt="Students learning"
                                fill
                                className="object-cover"
                                style={{ objectPosition: 'left 20%' }}
                            />
                        </div>

                        {/* Front image (overlapping) */}
                        <div className="absolute top-12 left-[30%] w-[48%] h-[420px] overflow-hidden shadow-xl z-10">
                            <Image
                                src="/kids.jpg"
                                alt="Education impact"
                                fill
                                className="object-cover"
                                style={{ objectPosition: 'center 20%' }}
                            />
                        </div>

                        {/* Counter stats card — vertically stacked on the right edge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            viewport={{ once: true }}
                            className="absolute top-8 right-0 bg-white shadow-2xl z-20 py-6 px-5 flex flex-col gap-4 min-w-[110px]"
                        >
                            {[
                                { value: 2000, label: "STUDENTS" },
                                { value: 76, label: "MENTORS" },
                                { value: 5, label: "STATES" },
                                { value: 4, label: "PROGRAMS" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                    <span className="text-2xl font-bold text-dark-grey block leading-none">
                                        <AnimatedCounter target={stat.value} duration={2 + i * 0.3} />
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Text content + progress bars */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 w-full"
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
                            Education for All
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark-grey leading-tight uppercase">
                            FORWARD SCHOLARS{" "}
                            <span className="text-primary-green">PROGRAM</span>
                        </h2>
                        <p className="text-gray-600 mb-10 leading-relaxed text-base">
                            Our flagship initiative designed to level the playing field for
                            underserved secondary school students. We provide the tools to
                            succeed in university and shape futures with confidence.
                        </p>

                        {/* Progress bars */}
                        <ProgressBar label="UTME Preparation" percent={82} color="#00baa3" delay={0} />
                        <ProgressBar label="Scholarship Awards" percent={50} color="#ebc858" delay={0.15} />
                        <ProgressBar label="Mentorship Reach" percent={65} color="#eb8958" delay={0.3} />
                    </motion.div>
                </div>

                {/* ─── Bottom Row: Feature Icons ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-100 pt-14"
                >
                    {[
                        {
                            icon: <BookOpen size={28} />,
                            iconColor: "text-primary-yellow",
                            bgColor: "bg-primary-yellow/10",
                            title: "Intensive Prep",
                            desc: "UTME entrance examination classes and resources.",
                        },
                        {
                            icon: <Award size={28} />,
                            iconColor: "text-primary-green",
                            bgColor: "bg-primary-green/10",
                            title: "Scholarships",
                            desc: "Financial support for undergraduate education.",
                        },
                        {
                            icon: <Users size={28} />,
                            iconColor: "text-secondary-orange",
                            bgColor: "bg-secondary-orange/10",
                            title: "Mentorship",
                            desc: "Career counseling and professional guidance.",
                        },
                        {
                            icon: <TrendingUp size={28} />,
                            iconColor: "text-primary-green",
                            bgColor: "bg-primary-green/10",
                            title: "Civic Education",
                            desc: "Voter education and leadership training.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 group cursor-default">
                            <div
                                className={`${item.bgColor} ${item.iconColor} p-3 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform`}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-grey text-sm">{item.title}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* ─── Other Initiatives Grid ─── */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-dark-grey uppercase mb-4">Other Initiatives</h3>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-light-bg p-8 rounded-2xl group hover:bg-primary-green transition-all cursor-default">
                            <h4 className="font-bold text-dark-grey group-hover:text-white mb-4">16 Days of Activism</h4>
                            <p className="text-sm text-gray-500 group-hover:text-white/80 leading-relaxed">
                                Social media campaigns advocating against gender-based violence to raise awareness and promote advocacy.
                            </p>
                        </div>
                        <div className="bg-light-bg p-8 rounded-2xl group hover:bg-primary-yellow transition-all cursor-default">
                            <h4 className="font-bold text-dark-grey group-hover:text-white mb-4">Life Lessons</h4>
                            <p className="text-sm text-gray-500 group-hover:text-white/80 leading-relaxed">
                                Live interview series featuring individuals who share experiences of overcoming adversity to inspire others.
                            </p>
                        </div>
                        <div className="bg-light-bg p-8 rounded-2xl group hover:bg-primary-green transition-all cursor-default">
                            <h4 className="font-bold text-dark-grey group-hover:text-white mb-4">Big Little Steps</h4>
                            <p className="text-sm text-gray-500 group-hover:text-white/80 leading-relaxed">
                                Outreach to foundations like Whanyinna, celebrating the International Day of the Girl Child.
                            </p>
                        </div>
                        <div className="bg-dark-grey p-8 rounded-2xl border-2 border-primary-green relative overflow-hidden group">
                            <div className="absolute top-4 right-4 bg-primary-green text-white text-[10px] font-bold px-2 py-1 rounded">COMING 2027</div>
                            <h4 className="font-bold text-white mb-4">Forward Fellowship</h4>
                            <p className="text-sm text-gray-400 group-hover:text-white/90 leading-relaxed">
                                Annual program supporting young African changemakers through leadership training and project funding.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programs;
