"use client";

import React from 'react';
import { TrendingUp, ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';

const SixteenDaysPage = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-green to-blue-600 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/programs" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Programs</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">Global Campaign</p>
                            <h1 className="text-5xl font-bold">16 Days of Activism</h1>
                        </div>
                    </div>
                    <p className="text-white/90 text-lg">Against Gender-Based Violence</p>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Standing Against Gender-Based Violence</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                The 16 Days of Activism Against Gender-Based Violence is a global campaign that runs annually from November 25 (International Day for the Elimination of Violence Against Women) to December 10 (International Human Rights Day). Forward Falls Initiative actively participates in this crucial movement to raise awareness and promote advocacy against gender-based violence.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Campaign Focus</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We conduct high-impact social media campaigns that advocate against gender-based violence, reaching thousands of young people and encouraging them to become advocates for change within their communities. Our campaigns combine awareness-raising with actionable steps for prevention and support.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What We Do</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Social Media Advocacy:</strong> Daily posts, stories, and campaigns highlighting the issue and promoting awareness</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Educational Content:</strong> Sharing resources about recognizing and preventing gender-based violence</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Community Engagement:</strong> Mobilizing young people to share their stories and support survivors</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Survivor Support:</strong> Providing resources and information for those affected by violence</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Policy Advocacy:</strong> Calling for stronger protections and accountability measures</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Why This Matters</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Gender-based violence remains a significant barrier to development and human rights. By raising awareness and promoting advocacy, we help create a culture where violence is not tolerated and survivors are supported. Young people play a crucial role in this transformation.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Get Involved</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Whether you're a survivor, an ally, or simply someone who believes in equality and safety, there are many ways to participate:
                            </p>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">→</span>
                                    <span>Follow and share our campaign content</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">→</span>
                                    <span>Share your story or support a survivor</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">→</span>
                                    <span>Educate others about prevention and support</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">→</span>
                                    <span>Advocate for policy changes in your community</span>
                                </li>
                            </ul>

                            <div className="bg-primary-green/10 border-l-4 border-primary-green p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold flex items-center gap-2">
                                    <Heart size={20} className="text-primary-green" />
                                    "Ending gender-based violence requires all of us. Together, we can create a world where everyone is safe and respected."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Join the Movement</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Follow us on social media to stay updated on our campaigns and join thousands of advocates working to end gender-based violence.
                    </p>
                    <button className="bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all">
                        FOLLOW US
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SixteenDaysPage;
