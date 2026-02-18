"use client";

import React from 'react';

const Partners = () => {
    const partners = [
        "O2 International",
        "FCT Secondary Ed",
        "Future Prowess",
        "Isaac Moghalu",
        "Wudil Model",
        "Dec Int School",
        "GGSS Dutse",
        "GSS Lifecamp"
    ];

    return (
        <section className="py-20 bg-white border-t border-gray-100 font-poppins">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em]">Our Trusted Network</span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                    {partners.map((p, i) => (
                        <div key={i} className="text-xl md:text-2xl font-black text-dark-grey tracking-tighter hover:text-primary-green transition-colors cursor-default">
                            {p.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
