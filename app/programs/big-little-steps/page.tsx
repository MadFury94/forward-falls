"use client";

import React from 'react';
import { Heart, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

const BigLittleStepsPage = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-orange to-red-500 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/programs" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Programs</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <Heart size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">Community Outreach</p>
                            <h1 className="text-5xl font-bold">Big Little Steps</h1>
                        </div>
                    </div>
                    <p className="text-white/90 text-lg">Empowering Girls, Empowering World</p>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Direct Community Impact and Girl Child Empowerment</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Big Little Steps is our direct outreach program focused on empowering girls and young women in underserved communities. Through partnerships with organizations like Whanyinna Children Foundation, we bring educational support, mentorship, and inspiration directly to those who need it most.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Mission</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We believe that every girl deserves the opportunity to dream big and achieve her potential. Big Little Steps recognizes that meaningful change often starts with small, direct actions in communities. By working with local organizations and schools, we create lasting impact at the grassroots level.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">International Day of the Girl Child</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Each year on October 11, we celebrate the International Day of the Girl Child with the theme "Empowered Girls, Empowered World." This global observance recognizes the rights of girls and the unique challenges they face. Our celebrations combine awareness-raising with practical support and mentorship.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What We Do</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Direct Outreach:</strong> Visiting schools and community centers to engage with girls directly</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Mentorship Programs:</strong> Connecting girls with mentors who can guide them through challenges</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Educational Workshops:</strong> Providing training on leadership, life skills, and career development</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Resource Distribution:</strong> Providing school supplies, books, and educational materials</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">•</span>
                                    <span><strong>Community Partnerships:</strong> Collaborating with local organizations to maximize impact</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Our Partners</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We work with dedicated organizations like Whanyinna Children Foundation that share our commitment to girl child education and empowerment. These partnerships allow us to reach more girls and create sustainable change in communities.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">The Power of Small Steps</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We call this program "Big Little Steps" because we believe that small, consistent actions create big change. A single mentor, one scholarship, or a supportive conversation can transform a girl's trajectory and inspire her to reach for her dreams.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Get Involved</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Become a mentor and guide a girl through her educational journey</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Donate school supplies or educational materials</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Volunteer at our outreach events</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-orange font-bold">→</span>
                                    <span>Partner with us if you represent an organization</span>
                                </li>
                            </ul>

                            <div className="bg-secondary-orange/10 border-l-4 border-secondary-orange p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold flex items-center gap-2">
                                    <Sparkles size={20} className="text-secondary-orange" />
                                    "Every girl has the potential to change the world. Big Little Steps helps her find her power."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Support Girl Child Empowerment</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Help us reach more girls and provide them with the support, mentorship, and resources they need to thrive.
                    </p>
                    <button className="bg-secondary-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all">
                        DONATE NOW
                    </button>
                </div>
            </section>
        </div>
    );
};

export default BigLittleStepsPage;
