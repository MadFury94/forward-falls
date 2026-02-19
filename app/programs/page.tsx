"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Award, Users, TrendingUp, Heart, Globe, Video, ExternalLink } from 'lucide-react';
import { motion } from "framer-motion";

const ProgramsPage = () => {
    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/program.jpg"
                        alt="Programs background"
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
                        <span className="text-white font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Impact</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Programs & <span className="text-primary-yellow">Initiatives</span></h1>
                        <div className="w-24 h-1 bg-white mb-8"></div>
                        <p className="max-w-2xl text-white/90 text-lg font-medium">
                            Empowering youth through targeted educational support, mentorship, and civic engagement.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Forward Scholars Program (Detailed) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Flagship Initiative</span>
                            <h2 className="text-4xl font-bold mb-8 text-dark-grey uppercase">Forward Scholars <span className="text-primary-green">Program</span></h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
                                <p>
                                    Designed to level the playing field for underserved secondary school students, including non-traditional students and those who previously left school due to systemic barriers.
                                </p>
                                <p>
                                    Through intensive preparatory classes for the Unified Tertiary Matriculation Examination (UTME), career counseling, and targeted scholarships, we support hundreds of students annually.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 mb-10">
                                <div className="bg-light-bg p-6 rounded-2xl border-t-4 border-primary-yellow">
                                    <BookOpen className="text-primary-yellow mb-4" size={32} />
                                    <h4 className="font-bold text-dark-grey mb-2 uppercase text-sm">UTME Prep</h4>
                                    <p className="text-xs text-gray-400">Intensive classes for Nigerian university entrance exams.</p>
                                </div>
                                <div className="bg-light-bg p-6 rounded-2xl border-t-4 border-primary-green">
                                    <Award className="text-primary-green mb-4" size={32} />
                                    <h4 className="font-bold text-dark-grey mb-2 uppercase text-sm">Scholarships</h4>
                                    <p className="text-xs text-gray-400">Refunded fees for top scorers and undergraduate funding.</p>
                                </div>
                            </div>

                            <div className="bg-dark-grey p-8 rounded-2xl text-white">
                                <h4 className="font-bold mb-4 uppercase tracking-wider text-primary-yellow">Current Achievements</h4>
                                <ul className="space-y-4 text-sm">
                                    <li className="flex gap-3">
                                        <span className="text-primary-green font-bold">●</span>
                                        <span><strong>2000+</strong> students supported across Lagos, Kano, Kaduna, Abuja, and Borno.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-green font-bold">●</span>
                                        <span><strong>70%</strong> of students gained deeper career path understanding.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-green font-bold">●</span>
                                        <span>Established scholarship fund for top-performing undergraduate students.</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:w-1/2 w-full grid grid-cols-1 gap-6"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-gray-100 h-64 rounded-2xl flex items-center justify-center text-gray-400 font-bold uppercase tracking-[0.2em] border-2 border-dashed border-gray-300">UTME Classes Image</div>
                            <div className="bg-gray-100 h-64 rounded-2xl flex items-center justify-center text-gray-400 font-bold uppercase tracking-[0.2em] border-2 border-dashed border-gray-300">Award Ceremony Image</div>
                            <div className="p-8 bg-primary-green/5 rounded-2xl border-2 border-primary-green/20">
                                <h4 className="font-bold text-dark-grey uppercase text-sm mb-4">Testimonials</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:translate-x-1 transition-transform cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary-green/10 p-2 rounded-lg text-primary-green"><Video size={20} /></div>
                                            <span className="text-xs font-bold uppercase">Ruth - Beneficiary</span>
                                        </div>
                                        <ExternalLink size={16} className="text-gray-300 group-hover:text-primary-green" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:translate-x-1 transition-transform cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary-green/10 p-2 rounded-lg text-primary-green"><Video size={20} /></div>
                                            <span className="text-xs font-bold uppercase">Goodness - Beneficiary</span>
                                        </div>
                                        <ExternalLink size={16} className="text-gray-300 group-hover:text-primary-green" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Other Major Initiatives */}
            <section className="py-24 bg-light-bg">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl font-bold mb-4 text-dark-grey uppercase"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Expanding Our <span className="text-primary-yellow">Reach</span>
                        </motion.h2>
                        <div className="w-20 h-1 bg-primary-green mx-auto"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Activism */}
                        <motion.div
                            className="bg-white p-10 rounded-3xl shadow-sm border-b-8 border-primary-green relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative z-10">
                                <div className="text-primary-green mb-6"><TrendingUp size={48} /></div>
                                <h3 className="text-2xl font-bold mb-4 uppercase">16 Days of Activism</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    A global campaign against gender-based violence. We run high-impact social media advocacy to raise awareness and promote change within communities.
                                </p>
                                <div className="flex items-center gap-2 text-primary-green font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all pointer-events-none">
                                    View Campaign Highlights <TrendingUp size={16} />
                                </div>
                            </div>
                            <div className="absolute top-10 right-10 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform"><TrendingUp size={200} /></div>
                        </motion.div>

                        {/* Life Lessons */}
                        <motion.div
                            className="bg-white p-10 rounded-3xl shadow-sm border-b-8 border-primary-yellow relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="relative z-10">
                                <div className="text-primary-yellow mb-6"><Video size={48} /></div>
                                <h3 className="text-2xl font-bold mb-4 uppercase">Life Lessons Interviews</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    A live series featuring individuals who have navigated profound adversity. Their stories define our "fall forward" philosophy and inspire thousands.
                                </p>
                                <div className="flex items-center gap-2 text-primary-yellow font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all pointer-events-none">
                                    Watch the Series <Video size={16} />
                                </div>
                            </div>
                            <div className="absolute top-10 right-10 opacity-[0.03] -rotate-12 group-hover:rotate-0 transition-transform"><Video size={200} /></div>
                        </motion.div>

                        {/* Outreach */}
                        <motion.div
                            className="bg-white p-10 rounded-3xl shadow-sm border-b-8 border-secondary-orange relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative z-10">
                                <div className="text-secondary-orange mb-6"><Heart size={48} /></div>
                                <h3 className="text-2xl font-bold mb-4 uppercase">Big Little Steps</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    Direct outreach to foundations like Whanyinna Children Foundation. Recent focus: "Empowered Girls, Empowered World" for International Day of the Girl Child.
                                </p>
                                <span className="bg-secondary-orange/10 text-secondary-orange text-[10px] font-bold px-3 py-1 rounded-full uppercase">Community Focus</span>
                            </div>
                            <div className="absolute top-10 right-10 opacity-[0.03] rotate-45 group-hover:rotate-0 transition-transform"><Heart size={200} /></div>
                        </motion.div>

                        {/* Fellowship */}
                        <motion.div
                            className="bg-dark-grey p-10 rounded-3xl shadow-sm border-b-8 border-primary-green relative overflow-hidden group text-white"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="relative z-10">
                                <div className="text-primary-green mb-6"><Globe size={48} /></div>
                                <h3 className="text-2xl font-bold mb-4 uppercase text-white tracking-tight">Forward Fellowship for Africans</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Launching in 2027. Supporting African changemakers (18-35) with leadership training, mentorship, and grants up to $500 for social impact.
                                </p>
                                <div className="inline-block bg-primary-green text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Register for Updates</div>
                            </div>
                            <div className="absolute top-10 right-10 opacity-[0.05] -rotate-12 group-hover:rotate-0 transition-transform"><Globe size={200} /></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ProgramsPage;
