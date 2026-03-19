"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import config from '@/config/framework.config';

const Footer = () => {
    const partners = config.partners;

    return (
        <footer id="contact" className="bg-dark-grey text-white pt-20 pb-10 font-poppins">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src={config.org.logo}
                                alt={`${config.org.name} Logo`}
                                width={50}
                                height={50}
                                className="h-12 w-12"
                            />
                            <span className="font-bold text-lg tracking-tight">{config.org.shortName}</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            {config.org.tagline}
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
                            <li className="text-primary-green font-bold mt-2">
                                <Link href="/partners" className="hover:text-white transition-colors">
                                    View All Partners
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-primary-yellow">Quick Links</h4>
                        <ul className="text-sm text-gray-400 space-y-4">
                            {config.footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-primary-green transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-primary-yellow">Contact Us</h4>
                        <div className="space-y-4 text-sm text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-green shrink-0 mt-1" />
                                <span>{config.contact.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-green shrink-0" />
                                <span>{config.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-primary-green shrink-0" />
                                <span>{config.contact.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} {config.org.name}. All Rights Reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart size={12} className="text-primary-green" /> for educational equity
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
