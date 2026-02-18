"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden font-poppins">
            {/* Background Image / Gradient overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
                style={{
                    backgroundImage: 'linear-gradient(rgba(45, 45, 45, 0.7), rgba(45, 45, 45, 0.7)), url("/hero-placeholder.jpg")',
                    backgroundColor: '#2d2d2d'
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-white">
                <div className="max-w-3xl">
                    <span className="bg-primary-yellow text-dark-grey px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                        Fall Forward Into Success
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight uppercase">
                        BUILDING PURPOSE FROM <span className="text-primary-yellow">ADVERSITY</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl">
                        Ensuring that education remains a tool for empowerment and transformation, particularly for young people from conflict-affected communities.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-primary-green text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-primary-green transition-all shadow-xl group">
                            FORWARD SCHOLARS PROGRAM
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-dark-grey transition-all">
                            LEARN MORE
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Bottom Decorative Element */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Hero;
