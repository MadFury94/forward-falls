"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PartnersPage = () => {
    const partners = [
        "O2 International Dynamic Ltd",
        "Federal Capital Territory Secondary Education Board",
        "Future Prowess Islamic Foundation",
        "Isaac Moghalu Foundation",
        "Wudil Model Primary School",
        "Dec International School",
        "GGSS Dutse-Alhaji",
        "GSS Lifecamp, Abuja"
    ];

    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/kid4.jpg"
                        alt="Partners background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity text-white">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Our <span className="text-primary-yellow">Partners</span></h1>
                    <div className="w-24 h-1 bg-white mb-8"></div>
                    <p className="max-w-2xl text-white/90 text-lg font-medium">
                        We are grateful for the support and collaboration of our partners who share our vision of democratizing education.
                    </p>
                </div>
            </section>

            {/* Partners Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-dark-grey uppercase">Our Valued Partners</h2>
                        <div className="w-20 h-1 bg-primary-yellow mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            These organizations have been instrumental in helping us achieve our mission of providing quality education and opportunities to underserved communities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="bg-light-bg p-8 rounded-xl shadow-sm border-l-4 border-primary-green hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary-green/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-green transition-colors">
                                        <span className="text-primary-green group-hover:text-white font-bold text-lg transition-colors">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-dark-grey group-hover:text-primary-green transition-colors">
                                            {partner}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Supporting our mission to democratize education and empower youth.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-green text-white">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Interested in partnering with Forward Falls Initiative? We welcome collaborations that align with our mission of educational equity and youth empowerment.
                    </p>
                    <Link href="/contact">
                        <button className="bg-white text-primary-green px-8 py-4 rounded-full font-semibold hover:bg-light-bg transition-all">
                            GET IN TOUCH
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default PartnersPage;
