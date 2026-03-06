"use client";

import React from 'react';
import { Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const SDG10Page = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-orange to-red-500 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <Globe size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">SDG 10</p>
                            <h1 className="text-5xl font-bold">Reduced Inequalities</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Supporting Underprivileged Communities</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Forward Falls Initiative is dedicated to reducing educational inequalities by supporting underprivileged students and marginalized communities through comprehensive educational programs. We believe that every young person, regardless of their socioeconomic background, deserves access to quality education.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">The Challenge</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Many young people from low-income backgrounds face systemic barriers that prevent them from accessing higher education. Financial constraints, lack of guidance, and limited resources force many to abandon their dreams of tertiary education, leaving them vulnerable to unemployment, social exclusion, and exploitation.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Approach</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We bridge the gap by providing comprehensive support to students completing high school but lacking resources to pursue post-secondary education. Our programs are specifically designed for underserved students in conflict-affected communities.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What We Offer</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Financial Aid:</strong> Scholarships and fee waivers for deserving students</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Academic Resources:</strong> Free preparatory classes and study materials</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Mentorship:</strong> Guidance from professionals and successful alumni</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Career Support:</strong> Counseling and job placement assistance</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Geographic Focus</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We currently serve students across multiple states in Nigeria, with special focus on conflict-affected regions:
                            </p>
                            <ul className="space-y-2 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Lagos</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Kano</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Kaduna</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Abuja</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Borno</span>
                                </li>
                            </ul>

                            <div className="bg-secondary-orange/10 border-l-4 border-secondary-orange p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold">
                                    "Inequality is not inevitable. By investing in education for underprivileged youth, we create pathways to opportunity and break cycles of poverty."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Help Reduce Inequalities</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Support our mission to provide equal educational opportunities for all young people, regardless of their background.
                    </p>
                    <Link href="/contact">
                        <button className="bg-secondary-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all">
                            DONATE NOW
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SDG10Page;
