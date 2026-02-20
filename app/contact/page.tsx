"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from "framer-motion";

const ContactPage = () => {
    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/contact.jpg"
                        alt="Contact background"
                        className="w-full h-full object-cover object-[75%_center]"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary-green font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Get In Touch</span>
                        <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Contact <span className="text-primary-yellow">Forward Falls</span></h1>
                        <div className="w-24 h-1 bg-white mb-8"></div>
                        <p className="max-w-2xl text-gray-200 text-lg font-medium">
                            Have questions or want to collaborate? We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Contact Info */}
                        <motion.div
                            className="lg:w-1/3"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-10 text-dark-grey uppercase">Contact <span className="text-primary-green">Details</span></h2>

                            <div className="space-y-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-bg rounded-xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey uppercase text-xs tracking-widest mb-2">Email Address</h4>
                                        <p className="text-gray-500 font-medium">forwardfalls@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-bg rounded-xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey uppercase text-xs tracking-widest mb-2">Phone Number</h4>
                                        <p className="text-gray-500 font-medium">+2347020829533</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 bg-light-bg rounded-xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey uppercase text-xs tracking-widest mb-2">Our Reach</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            Serving Lagos, Kano, Kaduna, Abuja, and Borno States, Nigeria.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                <h4 className="font-bold text-dark-grey uppercase text-xs tracking-widest mb-6">Follow Our Impact</h4>
                                <div className="flex gap-4">
                                    {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-green hover:border-primary-green transition-all cursor-pointer">
                                            <Icon size={18} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="lg:w-2/3"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-light-bg p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-3xl font-bold mb-8 text-dark-grey uppercase">Send a <span className="text-primary-yellow">Message</span></h2>
                                <form className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Subject</label>
                                        <input type="text" placeholder="Collaboration / Inquiry" className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Message</label>
                                        <textarea rows={5} placeholder="How can we help you?" className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none resize-none"></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <button className="bg-primary-green text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-dark-grey transition-all shadow-lg flex items-center justify-center gap-3 w-full md:w-auto">
                                            Send Message <Send size={18} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] bg-gray-100 w-full flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-300 font-bold uppercase tracking-[0.4em] text-2xl z-10">Interactive Map Preview</div>
                <div className="absolute inset-0 bg-primary-green/5"></div>
            </section>

            <Footer />
        </main>
    );
};

export default ContactPage;
