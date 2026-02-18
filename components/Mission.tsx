"use client";

import React from 'react';
import { Target, Heart, Shield, GraduationCap, Users, Globe, Scale } from 'lucide-react';

const MissionAndFocus = () => {
    return (
        <div className="font-poppins">
            {/* Quick Cards Section */}
            <section className="relative -mt-16 z-20 max-w-[1200px] mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-0 shadow-2xl rounded-lg overflow-hidden">
                    <div className="bg-primary-yellow p-10 text-dark-grey">
                        <Target size={48} className="mb-6 opacity-80" />
                        <h3 className="text-2xl font-bold mb-4 uppercase">Our Vision</h3>
                        <p className="text-sm leading-relaxed opacity-90 font-medium">
                            To build a society where young people are empowered to find purpose from adversity and make meaning of their lives regardless of their circumstances, enabling them to "fall forward" into a future of opportunities and success.
                        </p>
                    </div>
                    <div className="bg-primary-green p-10 text-white">
                        <Heart size={48} className="mb-6 opacity-80" />
                        <h3 className="text-2xl font-bold mb-4 uppercase">Our Mission</h3>
                        <p className="text-sm leading-relaxed opacity-90 font-medium">
                            To improve access to learning through formal and informal methods, ensuring that education remains a tool for empowerment and transformation.
                        </p>
                    </div>
                    <div className="bg-secondary-orange p-10 text-white">
                        <Shield size={48} className="mb-6 opacity-80" />
                        <h3 className="text-2xl font-bold mb-4 uppercase">Core Values</h3>
                        <ul className="text-sm space-y-2 opacity-90 font-bold uppercase tracking-wider">
                            <li>• Integrity</li>
                            <li>• Accountability</li>
                            <li>• Volunteerism</li>
                            <li>• Inclusivity</li>
                            <li>• Resilience</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Focus Areas Section */}
            <section id="about" className="py-24 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">What We Do</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark-grey leading-tight">OUR SDG FOCUS AREAS</h2>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* SDG 4 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-primary-green hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center text-primary-green mb-6 group-hover:bg-primary-green group-hover:text-white transition-all">
                                <GraduationCap size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-dark-grey">SDG 4 - Quality Education</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Ensuring inclusive and equitable education through traditional and non-traditional means.
                            </p>
                        </div>

                        {/* SDG 5 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-primary-yellow hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-primary-yellow/10 rounded-full flex items-center justify-center text-primary-yellow mb-6 group-hover:bg-primary-yellow group-hover:text-white transition-all">
                                <Users size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-dark-grey">SDG 5 - Gender Equality</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Advocating for equal rights and opportunities for all genders while promoting gender equity.
                            </p>
                        </div>

                        {/* SDG 10 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-secondary-orange hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-secondary-orange/10 rounded-full flex items-center justify-center text-secondary-orange mb-6 group-hover:bg-secondary-orange group-hover:text-white transition-all">
                                <Globe size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-dark-grey">SDG 10 - Reduced Inequalities</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Supporting underprivileged students and marginalized communities through educational programs.
                            </p>
                        </div>

                        {/* SDG 16 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-dark-grey hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-dark-grey/10 rounded-full flex items-center justify-center text-dark-grey mb-6 group-hover:bg-dark-grey group-hover:text-white transition-all">
                                <Scale size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-dark-grey">SDG 16 - Peace & Justice</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Promoting civic engagement, voter education, and leadership development among youth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MissionAndFocus;
