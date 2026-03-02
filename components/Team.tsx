"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Team = () => {
    const featuredTeam = [
        { name: "Ijeoma Seraphie Obiedelu", role: "Founder", color: "border-primary-green" },
        { name: "Tobechukwu Onyeji", role: "Cofounder", color: "border-primary-yellow" },
        { name: "Ozioma Okafor", role: "Chief Operating Officer", color: "border-secondary-orange" },
        { name: "Faith Adeyanju", role: "Social Media Manager", color: "border-primary-green" }
    ];

    return (
        <section id="team" className="py-24 bg-light-bg font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">The Engine Room</span>
                    <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Meet the Team</h2>
                    <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        A collective of young, vibrant professionals and volunteers driving educational change across communities.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {featuredTeam.map((member, i) => (
                        <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group border-t-4 ${member.color}`}>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-dark-grey font-bold text-xl group-hover:bg-dark-grey group-hover:text-white transition-all mx-auto mb-4">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h4 className="font-bold text-dark-grey group-hover:text-primary-green transition-colors mb-2">{member.name}</h4>
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/board-and-team"
                        className="inline-flex items-center gap-2 bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all hover:gap-4 group"
                    >
                        View Full Leadership Team
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Team;
