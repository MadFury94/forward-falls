"use client";

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
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
        <footer id="contact" className="bg-dark-grey text-white pt-20 pb-10 font-poppins">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xl">F</div>
                            <span className="font-bold text-xl tracking-tight">FORWARD FALLS</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            A youth-led non-profit dedicated to democratizing access to post-secondary education and quality learning opportunities for conflict-affected communities.
                        </p>
                        <div className="flex gap-4">
                            <Facebook size={18} className="text-gray-400 hover:text-primary-yellow cursor-pointer" />
                            <Twitter size={18} className="text-gray-400 hover:text-primary-yellow cursor-pointer" />
                            <Instagram size={18} className="text-gray-400 hover:text-primary-yellow cursor-pointer" />
                            <Youtube size={18} className="text-gray-400 hover:text-primary-yellow cursor-pointer" />
                        </div>
                    </div>

                    {/* Partners */}
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-primary-yellow">Our Partners</h4>
                        <ul className="text-sm text-gray-400 space-y-2">
                            {partners.slice(0, 4).map((p, i) => <li key={i}>{p}</li>)}
                            <li className="text-primary-green font-bold mt-2">View All Partners</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-primary-yellow">Quick Links</h4>
                        <ul className="text-sm text-gray-400 space-y-4">
                            <li><Link href="/" className="hover:text-primary-green transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary-green transition-colors">Our Why</Link></li>
                            <li><Link href="/programs" className="hover:text-primary-green transition-colors">Programs</Link></li>
                            <li><Link href="/board-and-team" className="hover:text-primary-green transition-colors">Advisory Board</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-primary-yellow">Contact Us</h4>
                        <div className="space-y-4 text-sm text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-green shrink-0 mt-1" />
                                <span>Nigeria - Serving Borno, Kano, Kaduna, Lagos & Abuja</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-green shrink-0" />
                                <span>+234 702 082 9533</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary-green shrink-0" />
                                <span>forwardfalls@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <p>© 2026 Forward Falls Initiative. All Rights Reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart size={12} className="text-primary-green" /> for educational equity
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
