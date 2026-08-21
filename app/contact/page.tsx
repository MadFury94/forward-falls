"use client";

import { useRef, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion } from "framer-motion";

const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const form = formRef.current;
            if (!form) throw new Error("Form not found");

            const formData = new FormData(form);
            const payload = {
                name: formData.get("user_name"),
                email: formData.get("user_email"),
                subject: formData.get("subject"),
                message: formData.get("message"),
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const text = await res.text();

            let result: any = {};
            try {
                result = JSON.parse(text);
            } catch {
                result = { success: false, error: text || "Invalid JSON response" };
            }

            if (!res.ok || !result.success) {
                const errorMsg = result.error || `Request failed with status ${res.status}`;
                setErrorMessage(errorMsg);
                throw new Error(errorMsg);
            }

            setSubmitStatus("success");
            setErrorMessage('');
            form.reset();

            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error: any) {
            const errorMsg = error?.message || "Failed to send message. Please check your connection and try again.";
            setErrorMessage(errorMsg);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                    {[
                                        { Icon: Facebook, href: 'https://facebook.com/forwardfallsinitiative', label: 'Facebook' },
                                        { Icon: Twitter, href: 'https://twitter.com/forwardfalls', label: 'Twitter / X' },
                                        { Icon: Instagram, href: 'https://instagram.com/forwardfallsinitiative', label: 'Instagram' },
                                        { Icon: Youtube, href: 'https://youtube.com/@forwardfallsinitiative', label: 'YouTube' },
                                    ].map(({ Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary-green hover:border-primary-green transition-all"
                                        >
                                            <Icon size={18} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:w-2/3"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="bg-light-bg p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-3xl font-bold mb-8 text-dark-grey uppercase">Send a <span className="text-primary-yellow">Message</span></h2>

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-primary-green/10 border border-primary-green/20 rounded-xl text-primary-green font-medium">
                                        ✓ Message sent successfully! We'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-error-red/10 border border-error-red/20 rounded-xl text-error-red font-medium">
                                        ✗ {errorMessage || "Failed to send message. Please try again or email us directly."}
                                    </div>
                                )}

                                <form ref={formRef} onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            placeholder="John Doe"
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="user_email"
                                            placeholder="john@example.com"
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Collaboration / Inquiry"
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Message</label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            placeholder="How can we help you?"
                                            required
                                            className="w-full bg-white border border-gray-100 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all outline-none resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-primary-green text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-dark-grey transition-all shadow-lg flex items-center justify-center gap-3 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map — embedded Google Maps iframe */}
            <section className="h-[400px] w-full overflow-hidden">
                <iframe
                    title="Forward Falls Initiative — Nigeria"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7!2d3.3792057!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>

            <Footer />
        </main>
    );
};

export default ContactPage;
