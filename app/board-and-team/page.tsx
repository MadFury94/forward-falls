"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const BoardPage = () => {
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
                        {[
                            {
                                name: "Prof Chidi Odinkalu",
                                role: "Chairman",
                                bio: "Professor of Practice in International Human Rights Law at the Fletcher School of Law and Diplomacy, Tufts University."
                            },
                            {
                                name: "Mrs Maryanne Moghalu",
                                role: "Executive Director",
                                bio: "Executive Director, Isaac Moghalu Foundation."
                            },
                            {
                                name: "Prof Offornze Amucheazi",
                                role: "Senior Advocate",
                                bio: "Senior Advocate of Nigeria and esteemed legal practitioner."
                            },
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                className="bg-light-bg p-8 rounded-2xl border-t-4 border-primary-green hover:shadow-lg transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 mx-auto"></div>
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Ijeoma Seraphie Obiedelu",
                                role: "Founder",
                                bio: "Leading the vision for educational democratization and driving Forward Falls' mission to transform education access for underserved communities.",
                                image: null
                            },
                            {
                                name: "Tobechukwu Onyeji",
                                role: "Cofounder",
                                bio: "Driving strategic growth and impact, ensuring Forward Falls reaches more communities and creates lasting change.",
                                image: null
                            },
                            {
                                name: "Ozioma Okafor",
                                role: "Chief Operating Officer",
                                bio: "Managing day-to-day operations with excellence, ensuring smooth program delivery and organizational efficiency.",
                                image: null
                            },
                            {
                                name: "Faith Adeyanju",
                                role: "Social Media Manager",
                                bio: "Amplifying our voice and advocacy through strategic digital communications and community engagement.",
                                image: null
                            },
                            {
                                name: "Oluwatoyin Oloidi",
                                role: "Administrative Officer",
                                bio: "Ensuring organizational stability through meticulous administrative support and coordination.",
                                image: null
                            },
                            {
                                name: "Sandra Kennedy",
                                role: "Development & Programs Director",
                                bio: "Designing impactful curricula and outreach programs that transform lives and create opportunities.",
                                image: null
                            },
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-8 rounded-2xl border-t-4 border-primary-yellow hover:shadow-lg transition-all"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 mx-auto overflow-hidden">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    )}
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
