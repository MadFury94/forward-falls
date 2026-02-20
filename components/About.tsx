"use client";

import React from 'react';

const About = () => {
    return (
        <section id="about-us" className="py-24 bg-white font-poppins overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                            <div className="bg-gray-200 w-full h-[500px] flex items-center justify-center text-gray-400 font-bold italic">
                                [Community Impact Image Placeholder]
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-yellow/20 rounded-full -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary-green/20 rounded-full -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

                        <div className="absolute bottom-10 left-10 bg-white p-6 rounded-xl shadow-xl z-20 max-w-[200px] border-l-4 border-primary-green">
                            <span className="text-3xl font-bold text-primary-green block">95%</span>
                            <span className="text-[10px] font-bold text-dark-grey uppercase tracking-wider leading-tight">Transition success for participants</span>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Democratizing Education</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark-grey leading-tight uppercase">
                            BRIDGING THE GAP TO <span className="text-primary-yellow">HIGHER</span> LEARNING
                        </h2>

                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                Nigeria faces a significant education crisis, with one of the highest numbers of out-of-school children globally. While attention is given to basic education, an often-overlooked issue is the large number of students who complete high school but are unable to transition to higher education due to financial and systemic barriers.
                            </p>
                            <div className="bg-light-bg p-6 rounded-xl border-l-4 border-primary-yellow italic text-dark-grey">
                                "Many of these students, despite their potential, drop out and miss out on opportunities to realize their dreams. This challenge is even more severe in conflict-affected communities."
                            </div>
                            <p>
                                Recognizing this gap, <strong>Forward Falls Initiative</strong> seeks to bridge it by supporting underserved students who lack the resources to pursue post-secondary education. Through our Scholars Program, we provide a pathway for students to access tertiary education and achieve their full potential.
                            </p>
                        </div>

                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                        IMG
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-dark-grey">
                                JOINED BY <span className="text-primary-green underline">2000+</span> YOUNG SCHOLARS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
