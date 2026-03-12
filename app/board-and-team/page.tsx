"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { teamMembers, boardMembers } from "@/data/team";

const getInitials = (name: string): string => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
};

const BoardPage = () => {
    // Separate featured (with images) and other team members
    const featuredMembers = teamMembers.filter(m => m.featured);
    const otherMembers = teamMembers.filter(m => !m.featured);

    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/board.jpg"
                        alt="Board & Team background"
                        className="w-full h-full object-cover object-[75%_center]"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Leadership</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Board & <span className="text-primary-yellow">Team</span></h1>
                        <div className="w-24 h-1 bg-primary-yellow mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg font-medium">
                            Guided by experts and driven by passionate young leaders committed to social change.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Advisory <span className="text-primary-green">Board</span></h2>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-gray-500">
                            Our board comprises seasoned professionals across education, law, finance, and social development who provide strategic oversight and guidance.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {boardMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                className="bg-light-bg p-8 rounded-2xl border-t-4 border-primary-green hover:shadow-lg transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 mx-auto flex items-center justify-center">
                                    <User size={48} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-dark-grey text-center mb-1 uppercase">{member.name}</h3>
                                <p className="text-primary-green text-xs font-bold uppercase tracking-widest text-center mb-4">{member.role}</p>
                                <p className="text-gray-500 text-center text-sm leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Team */}
            <section className="py-24 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">The Engine Room</span>
                        <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Meet The <span className="text-primary-yellow">Team</span></h2>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-gray-500">
                            We are a collective of young, vibrant professionals and volunteers. From medical students to software engineers, our diverse backgrounds fuel our innovative approach to solving education inequality.
                        </p>
                    </motion.div>

                    {/* Featured Team with Images - Top Row */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {featuredMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all group border-t-4 overflow-hidden ${member.color}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-full h-64 relative bg-gray-100 overflow-hidden">
                                    {member.image && (
                                        <Image
                                            src={member.image}
                                            alt={`${member.name} - ${member.role}`}
                                            fill
                                            unoptimized={member.image.includes('drive.google.com')}
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            style={{ objectPosition: 'center 20%' }}
                                        />
                                    )}
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-dark-grey mb-1 uppercase">{member.name}</h3>
                                    <p className="text-primary-yellow text-xs font-bold uppercase tracking-widest mb-3">{member.role}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Other Team Members */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                className={`bg-white p-8 rounded-2xl border-t-4 ${member.color} hover:shadow-lg transition-all`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-24 h-24 rounded-full mb-6 mx-auto flex items-center justify-center bg-gradient-to-br from-primary-green/20 to-primary-yellow/20">
                                    <span className="text-4xl font-bold text-dark-grey/30">
                                        {getInitials(member.name)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-dark-grey text-center mb-1 uppercase">{member.name}</h3>
                                <p className="text-primary-yellow text-xs font-bold uppercase tracking-widest text-center mb-4">{member.role}</p>
                                <p className="text-gray-500 text-center text-sm leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-16 text-center bg-white p-8 rounded-xl border-l-4 border-primary-green shadow-sm max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-dark-grey font-semibold mb-2">
                            <strong className="text-2xl text-primary-green">50+ Active Volunteers</strong>
                        </p>
                        <p className="text-gray-500">
                            Working across operations, communications, partnerships, and program implementation.
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="italic text-gray-500 text-sm">"Volunteering with Forward Falls has given me a platform to give back while learning critical leadership skills."</p>
                            <p className="text-right text-xs font-bold text-primary-green mt-2 uppercase">- Volunteer Testimony</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default BoardPage;
