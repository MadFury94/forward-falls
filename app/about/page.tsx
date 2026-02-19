"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Heart, Shield, GraduationCap, Users, Globe, Scale, Milestone, UserCheck } from 'lucide-react';
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/abouth.jpg"
                        alt="About background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Who We Are</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">About <span className="text-primary-yellow">Forward Falls</span></h1>
                        <div className="w-24 h-1 bg-primary-yellow mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg">
                            A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About Us (Our Why) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold mb-8 text-dark-grey uppercase leading-tight">Our <span className="text-primary-green">Why</span></h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                                <p>
                                    Nigeria faces a significant education crisis, with one of the highest numbers of out-of-school children globally. While much attention is given to increasing enrollment in basic education, an often-overlooked issue is the large number of students who manage to complete high school but are unable to transition to higher education due to financial and systemic barriers.
                                </p>
                                <p>
                                    Many of these students, despite their potential and aspirations, drop out and miss out on opportunities to realize their dreams and reach their full potential. This challenge is even more severe in conflict-affected communities, where instability and insecurity further limit access to higher education.
                                </p>
                                <div className="bg-light-bg p-8 rounded-2xl border-l-8 border-primary-yellow italic text-dark-grey font-medium shadow-sm">
                                    "The lack of financial support, guidance, and preparatory resources forces many young people to abandon their dreams of tertiary education, leaving them vulnerable to unemployment, social exclusion, and exploitation."
                                </div>
                                <p>
                                    Recognizing this gap, the Forward Falls Initiative seeks to bridge it by supporting underserved students who are completing high school but lack the resources to pursue post-secondary education.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                                    <img src="/kiid.jpg" alt="Impact Photo 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white mt-12">
                                    <img src="/kidn.jpg" alt="Impact Photo 2" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white -mt-12">
                                    <img src="/kids.jpg" alt="Impact Photo 3" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                                    <img src="/teacher.jpg" alt="Impact Photo 4" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-light-bg">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            className="bg-primary-yellow p-12 rounded-3xl text-dark-grey shadow-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Milestone size={64} className="mb-8 opacity-40 shrink-0" />
                            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">Our Vision</h3>
                            <p className="text-lg leading-relaxed font-medium">
                                To build a society where young people are empowered to find purpose from adversity and make meaning of their lives regardless of their circumstances, enabling them to "fall forward" into a future of opportunities and success.
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-primary-green p-12 rounded-3xl text-white shadow-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <UserCheck size={64} className="mb-8 opacity-40 shrink-0" />
                            <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">Our Mission</h3>
                            <p className="text-lg leading-relaxed font-medium opacity-90">
                                To improve access to learning through formal and informal methods, ensuring that education remains a tool for empowerment and transformation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-bold mb-16 text-dark-grey uppercase"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Core Values
                    </motion.h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {['Integrity', 'Accountability', 'Volunteerism', 'Inclusivity', 'Resilience'].map((val, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-primary-green hover:shadow-lg transition-all group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-12 h-1 bg-primary-green mx-auto mb-6 group-hover:w-full transition-all duration-500"></div>
                                <h4 className="font-bold text-dark-grey uppercase tracking-widest text-sm">{val}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default AboutPage;
