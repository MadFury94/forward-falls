"use client";

import React from 'react';
import { Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const SDG16Page = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-dark-grey to-gray-700 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <Scale size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">SDG 16</p>
                            <h1 className="text-5xl font-bold">Peace, Justice & Strong Institutions</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Promoting Civic Engagement and Leadership</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Forward Falls Initiative is committed to strengthening institutions and civic engagement by educating young people about their rights, responsibilities, and the importance of democratic participation. We believe that informed and engaged citizens are essential for building peaceful, just, and inclusive societies.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">The Challenge</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Many young people, particularly in conflict-affected communities, lack understanding of their civic rights and responsibilities. This knowledge gap limits their ability to participate meaningfully in democratic processes and contribute to social development.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Programs</h3>

                            <h4 className="text-xl font-bold text-dark-grey mt-8 mb-3">Voter Education Campaigns</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We conduct comprehensive voter education campaigns that register first-time eligible voters and equip them to educate others on civic engagement. Our initiatives have successfully engaged thousands of young people in the democratic process.
                            </p>

                            <h4 className="text-xl font-bold text-dark-grey mt-8 mb-3">Leadership Training</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Through our programs, we provide leadership training that empowers young people to become agents of change in their communities. We focus on developing critical thinking, communication, and problem-solving skills.
                            </p>

                            <h4 className="text-xl font-bold text-dark-grey mt-8 mb-3">Life Lessons – Live Interview Series</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our interview series features individuals who share their experiences of overcoming adversity and inspire others through their stories. These sessions provide practical insights and motivation for young people facing their own challenges.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What We Teach</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span>Understanding democratic rights and responsibilities</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span>Civic participation and voter registration</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span>Leadership development and community organizing</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span>Conflict resolution and peacebuilding</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span>Social justice and human rights advocacy</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Impact</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>Registered thousands of first-time eligible voters</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>Trained young people to become civic educators in their communities</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>Developed emerging leaders committed to social change</span>
                                </li>
                            </ul>

                            <div className="bg-dark-grey/10 border-l-4 border-dark-grey p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold">
                                    "Democracy thrives when young people are informed, engaged, and empowered to participate. We are building the next generation of civic leaders."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Support Civic Engagement</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Help us build a generation of informed, engaged citizens committed to peace, justice, and strong institutions.
                    </p>
                    <Link href="/contact">
                        <button className="bg-dark-grey text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-green transition-all">
                            DONATE NOW
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SDG16Page;
