"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Linkedin, Mail, Twitter } from 'lucide-react';

const BoardPage = () => {
    const advisoryBoard = [
        {
            name: "Prof Chidi Odinkalu",
            role: "Chairman",
            desc: "Professor of Practice in International Human Rights Law at the Fletcher School of Law and Diplomacy, Tufts University.",
            image: null
        },
        {
            name: "Mrs Maryanne Moghalu",
            role: "Executive Director",
            desc: "Executive Director, Isaac Moghalu Foundation.",
            image: null
        },
        {
            name: "Prof Offornze Amucheazi",
            role: "Senior Advocate",
            desc: "Senior Advocate of Nigeria and esteemed legal practitioner.",
            image: null
        }
    ];

    const coreTeam = [
        { name: "Ijeoma Seraphie Obiedelu", role: "Founder", bio: "Leading the vision for educational democratization." },
        { name: "Tobechukwu Onyeji", role: "Cofounder", bio: "Driving strategic growth and impact." },
        { name: "Ozioma Okafor", role: "Chief Operating Officer", bio: "Managing day-to-day excellence." },
        { name: "Faith Adeyanju", role: "Social Media Manager", bio: "Amplifying our voice and advocacy." },
        { name: "Oluwatoyin Oloidi", role: "Administrative Officer", bio: "Ensuring organizational stability." },
        { name: "Sandra Kennedy", role: "Development & Programs Director", bio: "Designing impactful curricula and outreach." }
    ];

    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="bg-dark-grey text-white py-24">
                <div className="container mx-auto px-6">
                    <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Leadership</span>
                    <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6">Board & <span className="text-primary-yellow">Team</span></h1>
                    <div className="w-24 h-1 bg-primary-yellow mb-8"></div>
                    <p className="max-w-2xl text-gray-400 text-lg">
                        Guided by experts and driven by passionate young leaders committed to social change.
                    </p>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Advisory Board</h2>
                        <div className="w-20 h-1 bg-primary-green mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {advisoryBoard.map((member, i) => (
                            <div key={i} className="bg-light-bg rounded-3xl p-10 border-t-8 border-primary-yellow shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                                <div className="w-24 h-24 bg-primary-yellow/20 rounded-2xl flex items-center justify-center text-primary-yellow font-bold text-3xl mb-8">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-2xl font-bold text-dark-grey mb-2">{member.name}</h3>
                                <span className="text-primary-green font-bold uppercase text-xs tracking-widest mb-6 block">{member.role}</span>
                                <p className="text-gray-500 leading-relaxed italic mb-8 flex-grow">"{member.desc}"</p>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-dark-grey/5 flex items-center justify-center text-dark-grey hover:bg-primary-green hover:text-white transition-colors cursor-pointer"><Linkedin size={14} /></div>
                                    <div className="w-8 h-8 rounded-full bg-dark-grey/5 flex items-center justify-center text-dark-grey hover:bg-primary-green hover:text-white transition-colors cursor-pointer"><Twitter size={14} /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Executive/Core Team */}
            <section className="py-24 bg-light-bg">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Meet the Team</h2>
                        <div className="w-20 h-1 bg-primary-green mx-auto"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreTeam.map((member, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl group hover:-translate-y-2 transition-all border-l-8 border-primary-green shadow-sm">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-dark-grey font-bold text-xl group-hover:bg-primary-green group-hover:text-white transition-all">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey leading-tight">{member.name}</h4>
                                        <span className="text-[10px] text-primary-green font-bold uppercase tracking-wider">{member.role}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">{member.bio}</p>
                                <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end gap-3 grayscale group-hover:grayscale-0 transition-all">
                                    <Linkedin size={14} className="text-gray-300 hover:text-primary-green cursor-pointer" />
                                    <Mail size={14} className="text-gray-300 hover:text-primary-green cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default BoardPage;
