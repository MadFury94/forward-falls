"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const BORDER_COLORS = ['border-primary-green', 'border-primary-yellow', 'border-secondary-orange'];

const DonatePage = () => {
    const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
    const [bankAccounts, setBankAccounts] = useState<any[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);

    useEffect(() => {
        fetch("/api/accounts")
            .then(r => r.json())
            .then(data => {
                if (data.success && Array.isArray(data.accounts)) {
                    setBankAccounts(data.accounts.map((a: any) => ({
                        id: String(a.id),
                        bank: a.acf?.bank_name || a.title?.rendered || "",
                        accountNumber: a.acf?.account_number || "",
                        accountName: a.acf?.account_name || "",
                    })));
                }
            })
            .finally(() => setLoadingAccounts(false));
    }, []);

    const handleCopy = (accountNumber: string, accountId: string) => {
        navigator.clipboard.writeText(accountNumber);
        setCopiedAccount(accountId);
        setTimeout(() => setCopiedAccount(null), 2000);
    };

    return (
        <main className="min-h-screen font-poppins">
            <Header />

            {/* Page Header */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/donate.jpg"
                        alt="Donate background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                    <Link href="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity text-white">
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold uppercase mb-6 text-white">Make a <span className="text-primary-yellow">Donation</span></h1>
                    <div className="w-24 h-1 bg-white mb-8"></div>
                    <p className="max-w-2xl text-white/90 text-lg font-medium">
                        Your generous contribution helps us transform lives and create opportunities in underserved communities.
                    </p>
                </div>
            </section>

            {/* Donation Content */}
            <section className="py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 mb-16">
                        {/* Impact Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-dark-grey uppercase">Your Impact <span className="text-primary-green">Matters</span></h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center text-primary-green font-bold flex-shrink-0">₦</div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey mb-2">₦5,000</h4>
                                        <p className="text-gray-600 text-sm">Provides learning materials for 5 students</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-yellow/10 rounded-lg flex items-center justify-center text-primary-yellow font-bold flex-shrink-0">₦</div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey mb-2">₦10,000</h4>
                                        <p className="text-gray-600 text-sm">Supports one student's monthly tuition</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-secondary-orange/10 rounded-lg flex items-center justify-center text-secondary-orange font-bold flex-shrink-0">₦</div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey mb-2">₦50,000</h4>
                                        <p className="text-gray-600 text-sm">Funds a complete scholarship for one student</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center text-primary-green font-bold flex-shrink-0">₦</div>
                                    <div>
                                        <h4 className="font-bold text-dark-grey mb-2">₦100,000+</h4>
                                        <p className="text-gray-600 text-sm">Supports community programs and initiatives</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bank Accounts Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-dark-grey uppercase">Bank <span className="text-primary-yellow">Details</span></h2>

                            <div className="space-y-6">
                                {loadingAccounts ? (
                                    <div className="flex items-center gap-2 text-gray-400 py-4">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span className="text-sm">Loading bank details...</span>
                                    </div>
                                ) : bankAccounts.length === 0 ? (
                                    <p className="text-gray-400 text-sm">No bank accounts available.</p>
                                ) : (
                                    bankAccounts.map((account, i) => (
                                        <div
                                            key={account.id}
                                            className={`bg-light-bg p-6 rounded-2xl border-l-4 ${BORDER_COLORS[i % BORDER_COLORS.length]} hover:shadow-lg transition-all`}
                                        >
                                            <h3 className="font-bold text-dark-grey mb-4">{account.bank}</h3>
                                            <div className="space-y-3 mb-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Account Name</p>
                                                    <p className="text-dark-grey font-medium">{account.accountName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Account Number</p>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-dark-grey font-mono font-bold text-lg">{account.accountNumber}</p>
                                                        <button
                                                            onClick={() => handleCopy(account.accountNumber, account.id)}
                                                            className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-primary-green"
                                                            title="Copy account number"
                                                        >
                                                            {copiedAccount === account.id ? (
                                                                <Check size={18} className="text-primary-green" />
                                                            ) : (
                                                                <Copy size={18} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-8 p-4 bg-primary-green/10 border border-primary-green/20 rounded-xl">
                                <p className="text-sm text-dark-grey">
                                    <span className="font-bold">Note:</span> Please include your name or contact information in the transfer reference so we can send you a receipt and thank you message.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Ways to Help */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-light-bg p-12 rounded-3xl"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-dark-grey uppercase text-center">Other Ways to <span className="text-primary-green">Help</span></h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-green text-2xl">👥</div>
                                <h3 className="font-bold text-dark-grey mb-2">Volunteer</h3>
                                <p className="text-gray-600 text-sm">Join our team and contribute your skills and time to our programs.</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-yellow text-2xl">🤝</div>
                                <h3 className="font-bold text-dark-grey mb-2">Partner With Us</h3>
                                <p className="text-gray-600 text-sm">Organizations can partner with us to amplify our impact.</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-secondary-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary-orange text-2xl">📢</div>
                                <h3 className="font-bold text-dark-grey mb-2">Spread the Word</h3>
                                <p className="text-gray-600 text-sm">Share our mission with your network and help us reach more people.</p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/contact">
                                <button className="bg-primary-green text-white px-8 py-4 rounded-full font-semibold hover:bg-dark-grey transition-all">
                                    GET IN TOUCH
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default DonatePage;
