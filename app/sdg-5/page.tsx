"use client";

import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SDG5Page = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-yellow to-orange-400 text-dark-grey py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-dark-grey/10 rounded-full flex items-center justify-center">
                            <Users size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">SDG 5</p>
                            <h1 className="text-5xl font-bold">Gender Equality</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Advocating for Equal Rights and Opportunities</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Forward Falls Initiative is committed to promoting gender equality by advocating for equal rights and opportunities for all genders while promoting gender equity. We believe that true development is only possible when both men and women have equal access to education, resources, and opportunities.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">The Challenge</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Gender-based violence and discrimination remain significant barriers to education and development, particularly in conflict-affected communities. Many young women face systemic barriers that limit their access to quality education and economic opportunities.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Initiatives</h3>

                            <h4 className="text-xl font-bold text-dark-grey mt-8 mb-3">16 Days of Activism Against Gender-Based Violence</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We conduct social media campaigns advocating against gender-based violence to raise awareness and promote advocacy. This annual initiative reaches thousands of young people, encouraging them to become advocates for change in their communities.
                            </p>

                            <h4 className="text-xl font-bold text-dark-grey mt-8 mb-3">Big Little Steps Outreach</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our outreach programs celebrate the International Day of the Girl Child with the theme "Empowered Girls, Empowered World." Through these initiatives, we empower young girls to recognize their potential and become leaders in their communities.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Commitment</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span>Ensuring equal access to education for all genders</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span>Raising awareness about gender-based violence</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span>Empowering girls and women through leadership training</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span>Advocating for policy changes that promote gender equality</span>
                                </li>
                            </ul>

                            <div className="bg-primary-yellow/10 border-l-4 border-primary-yellow p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold">
                                    "Gender equality is not just a women's issue—it's a human rights issue that benefits everyone. When girls and women are empowered, entire communities thrive."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Support Gender Equality</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Help us create a world where all genders have equal opportunities to thrive and contribute to society.
                    </p>
                    <button className="bg-primary-yellow text-dark-grey px-8 py-4 rounded-full font-semibold hover:bg-dark-grey hover:text-white transition-all">
                        DONATE NOW
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SDG5Page;
