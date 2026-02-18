"use client";

import React from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Youtube, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Leadership', href: '/board-and-team' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="w-full font-poppins sticky top-0 z-50 shadow-sm">
            {/* Top Bar */}
            <div className="bg-dark-grey text-white py-2">
                <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center text-xs md:text-sm">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <Mail size={14} className="text-primary-yellow" />
                            <span>forwardfalls@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone size={14} className="text-primary-yellow" />
                            <span>+234 702 082 9533</span>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4 items-center">
                        <Facebook size={14} className="hover:text-primary-yellow cursor-pointer transition-colors" />
                        <Twitter size={14} className="hover:text-primary-yellow cursor-pointer transition-colors" />
                        <Instagram size={14} className="hover:text-primary-yellow cursor-pointer transition-colors" />
                        <Youtube size={14} className="hover:text-primary-yellow cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                            F
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg md:text-xl leading-none text-dark-grey tracking-tight">FORWARD FALLS</span>
                            <span className="text-[10px] md:text-xs text-primary-green font-bold tracking-[0.2em] uppercase">Initiative</span>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-dark-grey uppercase h-full">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`transition-all duration-300 py-4 h-full flex items-center border-b-2 ${isActive
                                        ? 'text-primary-green border-primary-green'
                                        : 'text-dark-grey border-transparent hover:text-primary-green'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <div className="flex items-center gap-2 ml-4">
                            <Search size={20} className="text-gray-400 hover:text-primary-green cursor-pointer" />
                            <button className="bg-primary-green text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-dark-grey transition-all shadow-md">
                                DONATE NOW
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Icon Placeholder */}
                    <div className="lg:hidden">
                        <div className="w-6 h-0.5 bg-dark-grey mb-1"></div>
                        <div className="w-6 h-0.5 bg-dark-grey mb-1"></div>
                        <div className="w-6 h-0.5 bg-dark-grey"></div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
