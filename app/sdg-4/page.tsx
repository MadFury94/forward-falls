"use client";

import React from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SDG4Page = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-green to-blue-600 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">SDG 4</p>
                            <h1 className="text-5xl font-bold">Quality Education</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Our Commitment to Quality Education</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Forward Falls Initiative is dedicated to ensuring inclusive and equitable education through traditional and non-traditional means. We recognize that quality education is the foundation for breaking cycles of poverty and empowering young people to reach their full potential.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">The Challenge</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Nigeria faces a significant education crisis, with one of the highest numbers of out-of-school children globally. While much attention is given to increasing enrollment in basic education, an often-overlooked issue is the large number of students who manage to complete high school but are unable to transition to higher education due to financial and systemic barriers.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Solution: Forward Scholars Program</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                The Forward Scholars Program is our flagship education initiative, designed to level the playing field for underserved secondary school students. Through intensive preparatory classes for the Unified Tertiary Matriculation Examination (UTME), career counseling, and targeted scholarships, we support hundreds of students annually.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What We Provide</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Free Preparatory Classes:</strong> Intensive UTME preparation to ensure students are ready for university entrance exams</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Scholarships:</strong> Financial support for top-performing students to pursue undergraduate education</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Career Counseling:</strong> Guidance sessions helping students understand their career paths and make informed decisions</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">•</span>
                                    <span><strong>Mentorship:</strong> One-on-one support from experienced professionals</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Impact</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">✓</span>
                                    <span>Over 2,000 students across Lagos, Kano, Kaduna, Abuja, and Borno States have benefited</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">✓</span>
                                    <span>Top scorers in Sciences, Arts, and Social Sciences had their UTME fees refunded</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">✓</span>
                                    <span>70% of students gained deeper understanding of their career choices</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-green font-bold">✓</span>
                                    <span>Scholarship fund established for top-performing students' undergraduate education</span>
                                </li>
                            </ul>

                            <div className="bg-primary-green/10 border-l-4 border-primary-green p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold">
                                    "Education is not just about passing exams; it's about empowering young people to become agents of change in their communities."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Support Quality Education</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Help us provide more students with access to quality education and the tools they need to succeed.
                    </p>
                    <button className="bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all">
                        DONATE NOW
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SDG4Page;
