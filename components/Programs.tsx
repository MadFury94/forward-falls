"use client";

import React from 'react';
import { BookOpen, Award, Users, TrendingUp } from 'lucide-react';

const Programs = () => {
    return (
        <section id="programs" className="py-24 bg-white font-poppins">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Education for All</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark-grey leading-tight uppercase">
                            FORWARD SCHOLARS <span className="text-primary-green">PROGRAM</span>
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            Our flagship initiative designed to level the playing field for underserved secondary school students. We provide the tools to succeed in university and shape futures with confidence.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-start gap-4">
                                <div className="text-primary-yellow mt-1"><BookOpen size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-dark-grey">Intensive Prep</h4>
                                    <p className="text-sm text-gray-500">UTME entrance examination classes and resources.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-primary-green mt-1"><Award size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-dark-grey">Scholarships</h4>
                                    <p className="text-sm text-gray-500">Financial support for undergraduate education.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-primary-yellow mt-1"><Users size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-dark-grey">Mentorship</h4>
                                    <p className="text-sm text-gray-500">Career counseling and professional guidance.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-primary-green mt-1"><TrendingUp size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-dark-grey">Civic Education</h4>
                                    <p className="text-sm text-gray-500">Voter education and leadership training.</p>
                                </div>
                            </div>
                        </div>

                        <button className="bg-dark-grey text-white px-8 py-4 rounded-full font-bold hover:bg-primary-green transition-all shadow-lg uppercase text-sm">
                            Explore Our Impact
                        </button>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary-green/5 p-8 rounded-2xl border-t-4 border-primary-green text-center">
                                <span className="text-5xl font-bold text-primary-green block mb-2">2000+</span>
                                <span className="text-xs font-bold text-dark-grey uppercase tracking-widest">Students Benefited</span>
                                <p className="text-[10px] text-gray-400 mt-2 uppercase">Lagos, Kano, Kaduna, Abuja, Borno</p>
                            </div>
                            <div className="bg-primary-yellow/5 p-8 rounded-2xl border-t-4 border-primary-yellow text-center mt-8">
                                <span className="text-5xl font-bold text-primary-yellow block mb-2">70%</span>
                                <span className="text-xs font-bold text-dark-grey uppercase tracking-widest">Growth in Career Clarity</span>
                            </div>
                            <div className="bg-primary-yellow/5 p-8 rounded-2xl border-t-4 border-primary-yellow text-center -mt-8">
                                <span className="text-5xl font-bold text-primary-yellow block mb-2">25%</span>
                                <span className="text-xs font-bold text-dark-grey uppercase tracking-widest">Strategic Path Changes</span>
                            </div>
                            <div className="bg-primary-green/5 p-8 rounded-2xl border-t-4 border-primary-green text-center">
                                <span className="text-5xl font-bold text-primary-green block mb-2">100%</span>
                                <span className="text-xs font-bold text-dark-grey uppercase tracking-widest">Free Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Initiatives Grid */}
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
