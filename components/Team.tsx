"use client";

import React from 'react';

const Team = () => {
    const board = [
        { name: "Prof Chidi Odinkalu", role: "Chairman", desc: "Professor of Practice in International Human Rights Law at the Fletcher School of Law and Diplomacy, Tufts University." },
        { name: "Mrs Maryanne Moghalu", role: "Executive Director", desc: "Executive Director, Isaac Moghalu Foundation" },
        { name: "Prof Offornze Amucheazi", role: "Senior Advocate", desc: "Senior Advocate of Nigeria." }
    ];

    const coreTeam = [
        { name: "Ijeoma Seraphie Obiedelu", role: "Founder", color: "border-primary-green" },
        { name: "Tobechukwu Onyeji", role: "Cofounder", color: "border-primary-yellow" },
        { name: "Ozioma Okafor", role: "Chief Operating Officer", color: "border-secondary-orange" },
        { name: "Faith Adeyanju", role: "Social Media Manager", color: "border-dark-grey" },
        { name: "Oluwatoyin Oloidi", role: "Administrative Officer", color: "border-primary-green" },
        { name: "Sandra Kennedy", role: "Development & Programs Director", color: "border-primary-yellow" }
    ];

    return (
        <section id="advisory-board" className="py-24 bg-light-bg font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Advisory Board */}
                <div className="text-center mb-16">
                    <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Leadership</span>
                    <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Advisory Board</h2>
                    <div className="w-20 h-1 bg-primary-yellow mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {board.map((member, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center border-t-4 border-primary-yellow">
                            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center text-primary-yellow font-bold text-2xl">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h4 className="text-xl font-bold text-dark-grey mb-2">{member.name}</h4>
                            <p className="text-primary-green text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                            <p className="text-sm text-gray-400 italic">"{member.desc}"</p>
                        </div>
                    ))}
                </div>

                {/* Core Team */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Meet the Team</h2>
                    <div className="w-20 h-1 bg-primary-green mx-auto"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreTeam.map((member, i) => (
                        <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group border-l-8 ${member.color}`}>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-dark-grey font-bold text-xl group-hover:bg-dark-grey group-hover:text-white transition-all">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-grey group-hover:text-primary-green transition-colors">{member.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase font-semibold  tracking-wider">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
