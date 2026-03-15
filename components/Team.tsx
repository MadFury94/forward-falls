"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTeamMemberImage, getTeamMemberRole, getTeamMemberName, WPTeamMember } from '@/lib/wordpress-api';

const getInitials = (name: string): string =>
    name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);

const BORDER_COLORS = [
    "border-primary-green",
    "border-primary-yellow",
    "border-secondary-orange",
];

const Team = () => {
    const [members, setMembers] = useState<WPTeamMember[]>([]);
    const [status, setStatus] = useState<"loading" | "done">("loading");

    useEffect(() => {
        fetch("/api/team")
            .then(r => r.json())
            .then(data => {
                if (data.success && Array.isArray(data.members)) {
                    setMembers([...data.members].sort((a: any, b: any) => (a.acf?.order ?? 999) - (b.acf?.order ?? 999)));
                }
                setStatus("done");
            })
            .catch(() => setStatus("done"));
    }, []);

    // Show skeleton while loading
    if (status === "loading") {
        return (
            <section id="team" className="py-24 bg-light-bg font-poppins">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">The Engine Room</span>
                        <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Meet the Team</h2>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                                <div className="w-full h-64 bg-gray-200" />
                                <div className="p-6">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                                    <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

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
                    {members.slice(0, 4).map((member, i) => {
                        const name = getTeamMemberName(member);
                        const role = getTeamMemberRole(member);
                        const img = getTeamMemberImage(member);
                        return (
                            <div key={member.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all group border-t-4 overflow-hidden ${BORDER_COLORS[i % BORDER_COLORS.length]}`}>
                                <div className="w-full h-64 relative bg-gray-100 overflow-hidden">
                                    {img ? (
                                        <Image
                                            src={img}
                                            alt={`${name} - ${role}`}
                                            fill
                                            priority={i === 0}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            style={{ objectPosition: 'center 20%' }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-green/20 to-primary-yellow/20">
                                            <span className="text-6xl font-bold text-dark-grey/30 group-hover:text-dark-grey/50 transition-colors">
                                                {getInitials(name)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 text-center">
                                    <h4 className="font-bold text-dark-grey group-hover:text-primary-green transition-colors mb-2">{name}</h4>
                                    <p className="text-xs text-primary-green font-semibold uppercase tracking-wider">{role}</p>
                                </div>
                            </div>
                        );
                    })}
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
