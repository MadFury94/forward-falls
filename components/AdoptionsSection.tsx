"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const pillars = [
    {
        category: "SDG 4",
        title: "Quality Education",
        description: "Ensuring inclusive and equitable learning.",
        amount: "Goal 4",
        image: "/kids.jpg",
        badgeColor: "bg-primary-green"
    },
    {
        category: "SDG 5",
        title: "Gender Equality",
        description: "Advocating for equal rights and opportunities.",
        amount: "Goal 5",
        image: "/kid3.jpg",
        badgeColor: "bg-primary-yellow"
    },
    {
        category: "SDG 10",
        title: "Reduced Inequalities",
        description: "Supporting underprivileged students.",
        amount: "Goal 10",
        image: "/kid5.jpg",
        badgeColor: "bg-secondary-orange"
    }
];

const AdoptionsSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Top Section */}
                <div className="grid lg:grid-cols-3 gap-12 items-center mb-20">

                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm block">FORWARD FALLS</span>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-dark-grey leading-tight uppercase">
                            Fall Forward <br /> Into Success
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            To build a society where young people are empowered to find purpose from adversity and make meaning of their lives regardless of their circumstances.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary-yellow">
                                <Image
                                    src="/kid4.jpg"
                                    alt="Community Member"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-grey">Join the Mission</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Empowering Youth</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] lg:h-[600px]  rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/kid2.jpg"
                            alt="Forward Falls Impact"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Right Columns List */}
                    <div className="space-y-8">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-6 group"
                            >
                                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <span className="text-[10px] font-bold tracking-widest text-gray-400 block mb-1 uppercase">{pillar.category}</span>
                                    <h4 className="text-xl font-bold text-dark-grey group-hover:text-primary-green transition-colors">{pillar.title}</h4>
                                    <p className="text-xs text-gray-400 line-clamp-1">{pillar.description}</p>
                                </div>
                                <div className={`${pillar.badgeColor} text-white text-[10px] whitespace-nowrap font-bold px-3 py-1 rounded-full shadow-lg`}>
                                    {pillar.amount}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Box 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 shadow-xl rounded-2xl border border-gray-100 flex gap-8 items-start relative group hover:border-primary-yellow transition-colors"
                    >
                        <span className="text-8xl font-black text-primary-yellow/10 absolute -left-4 top-4 select-none group-hover:text-primary-yellow/20 transition-colors">1</span>
                        <div className="relative z-10 space-y-4 pt-12">
                            <h3 className="text-3xl font-bold text-dark-grey">Our Vision</h3>
                            <p className="text-gray-500 lg:text-sm">
                                To build a society where young people are empowered to find purpose from adversity and make meaning of their lives regardless of their circumstances.
                            </p>
                        </div>
                    </motion.div>

                    {/* Box 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 shadow-xl rounded-2xl border border-gray-100 flex gap-8 items-start relative group hover:border-primary-green transition-colors"
                    >
                        <span className="text-8xl font-black text-primary-green/10 absolute -left-4 top-4 select-none group-hover:text-primary-green/20 transition-colors">2</span>
                        <div className="relative z-10 space-y-4 pt-12">
                            <h3 className="text-3xl font-bold text-dark-grey">Our Mission</h3>
                            <p className="text-gray-500 lg:text-sm">
                                To improve access to learning through formal and informal methods, ensuring that education remains a tool for empowerment and transformation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AdoptionsSection;
