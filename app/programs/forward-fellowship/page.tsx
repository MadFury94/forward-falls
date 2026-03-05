"use client";

import React from 'react';
import { Globe, ArrowLeft, Rocket } from 'lucide-react';
import Link from 'next/link';

const ForwardFellowshipPage = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-dark-grey to-gray-700 text-white py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/programs" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Programs</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <Globe size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">Coming 2027</p>
                            <h1 className="text-5xl font-bold">Forward Fellowship</h1>
                        </div>
                    </div>
                    <p className="text-white/90 text-lg">For Africans - Supporting Changemakers Across the Continent</p>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Empowering African Changemakers</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Forward Fellowship for Africans is an ambitious new initiative launching in 2027. Designed to support young African changemakers, this program provides comprehensive support for individuals aged 18-35 who are committed to creating social impact in their communities and across the continent.
                            </p>

                            <div className="bg-primary-green/10 border-l-4 border-primary-green p-6 mb-8 rounded">
                                <p className="text-dark-grey font-semibold">
                                    <strong>Program Status:</strong> Currently accepting registrations for the 2027 launch. Early registrants will receive priority consideration and exclusive updates.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Who Can Apply?</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>African citizens aged 18-35</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>Passionate about social impact and community development</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>Committed to working on projects aligned with SDG 4, 5, or 16</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">✓</span>
                                    <span>Willing to engage in leadership training and mentorship</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What Fellows Receive</h3>
                            <ul className="space-y-4 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">1.</span>
                                    <div>
                                        <strong>Leadership Training:</strong>
                                        <p className="text-sm mt-1">Comprehensive training in leadership, project management, and social impact strategy</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">2.</span>
                                    <div>
                                        <strong>Mentorship:</strong>
                                        <p className="text-sm mt-1">One-on-one mentorship from experienced leaders and changemakers</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">3.</span>
                                    <div>
                                        <strong>Project Management Training:</strong>
                                        <p className="text-sm mt-1">Skills to design, implement, and evaluate social impact projects</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">4.</span>
                                    <div>
                                        <strong>Networking Opportunities:</strong>
                                        <p className="text-sm mt-1">Connect with other changemakers, organizations, and potential partners across Africa</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">5.</span>
                                    <div>
                                        <strong>Project Funding:</strong>
                                        <p className="text-sm mt-1">Grants of up to $500 for social impact projects aligned with SDG 4, 5, or 16</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">6.</span>
                                    <div>
                                        <strong>Career Advancement:</strong>
                                        <p className="text-sm mt-1">Internship and career advancement opportunities with partner organizations</p>
                                    </div>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Focus Areas</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Forward Fellowship projects must align with one or more of the following UN Sustainable Development Goals:
                            </p>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span><strong>SDG 4 – Quality Education:</strong> Improving access to education and learning opportunities</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span><strong>SDG 5 – Gender Equality:</strong> Promoting equal rights and opportunities for all genders</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">•</span>
                                    <span><strong>SDG 16 – Peace, Justice & Strong Institutions:</strong> Promoting civic engagement and leadership</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Why Forward Fellowship?</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Africa is home to over 400 million young people. Forward Fellowship recognizes that this demographic represents tremendous potential for positive change. By investing in young African leaders and their projects, we amplify impact across the continent and create a network of changemakers committed to sustainable development.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Timeline</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">→</span>
                                    <span><strong>Now:</strong> Registration and interest form</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">→</span>
                                    <span><strong>2027:</strong> Official program launch with first cohort of fellows</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-dark-grey font-bold">→</span>
                                    <span><strong>Ongoing:</strong> Annual cohorts and continuous support for alumni</span>
                                </li>
                            </ul>

                            <div className="bg-dark-grey/10 border-l-4 border-dark-grey p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold flex items-center gap-2">
                                    <Rocket size={20} className="text-dark-grey" />
                                    "Africa's future is being shaped by young changemakers. Forward Fellowship is our commitment to supporting them."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Register Your Interest</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Be among the first to know about Forward Fellowship. Register now to receive updates and priority consideration when applications open in 2027.
                    </p>
                    <button className="bg-dark-grey text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-green transition-all">
                        REGISTER NOW
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ForwardFellowshipPage;
