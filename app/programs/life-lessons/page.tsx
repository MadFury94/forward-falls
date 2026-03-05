"use client";

import React from 'react';
import { Video, ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';

const LifeLessonsPage = () => {
    return (
        <div className="font-poppins">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-yellow to-orange-400 text-dark-grey py-16">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link href="/programs" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <ArrowLeft size={20} />
                        <span>Back to Programs</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-dark-grey/10 rounded-full flex items-center justify-center">
                            <Video size={32} />
                        </div>
                        <div>
                            <p className="text-sm opacity-90 mb-2">Interview Series</p>
                            <h1 className="text-5xl font-bold">Life Lessons</h1>
                        </div>
                    </div>
                    <p className="text-dark-grey/90 text-lg">Stories of Resilience and Transformation</p>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold mb-6 text-dark-grey">Inspiring Stories of Overcoming Adversity</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Life Lessons is a live interview series featuring individuals who have navigated profound adversity and emerged stronger. These powerful conversations showcase the resilience, courage, and determination of people who embody our "fall forward" philosophy—turning challenges into opportunities for growth and transformation.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">What is Life Lessons?</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Through candid, in-depth interviews, we bring together individuals from diverse backgrounds who have overcome significant obstacles. Their stories inspire thousands of young people to believe in their own potential and to see challenges not as endpoints, but as stepping stones to success.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Why These Stories Matter</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span><strong>Relatability:</strong> Young people see themselves in these stories and realize that overcoming adversity is possible</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span><strong>Practical Insights:</strong> Guests share concrete strategies and lessons learned from their experiences</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span><strong>Motivation:</strong> These stories provide hope and encouragement during difficult times</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">•</span>
                                    <span><strong>Community Building:</strong> Viewers connect with each other through shared experiences and challenges</span>
                                </li>
                            </ul>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">Featured Guests</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our guests include scholarship beneficiaries, community leaders, educators, entrepreneurs, and individuals who have overcome personal, financial, or systemic barriers. Each brings a unique perspective on resilience and transformation.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">The "Fall Forward" Philosophy</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                At the heart of Life Lessons is our core belief: everyone falls, but not everyone falls forward. The difference lies in perspective, support, and determination. Our guests demonstrate how to transform setbacks into comebacks and adversity into advantage.
                            </p>

                            <h3 className="text-2xl font-bold text-dark-grey mt-10 mb-4">How to Engage</h3>
                            <ul className="space-y-3 mb-6 text-gray-600">
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">→</span>
                                    <span>Watch our latest episodes on our social media channels</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">→</span>
                                    <span>Share your own story or nominate someone for an interview</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">→</span>
                                    <span>Join our community discussions and connect with others</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary-yellow font-bold">→</span>
                                    <span>Apply to be a guest if you have a story to share</span>
                                </li>
                            </ul>

                            <div className="bg-primary-yellow/10 border-l-4 border-primary-yellow p-6 mt-10 rounded">
                                <p className="text-dark-grey font-semibold flex items-center gap-2">
                                    <Lightbulb size={20} className="text-primary-yellow" />
                                    "Your story has the power to inspire someone else to fall forward. Share it with us."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-light-bg">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-dark-grey">Watch the Series</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Be inspired by real stories of resilience, courage, and transformation. New episodes released regularly.
                    </p>
                    <button className="bg-primary-yellow text-dark-grey px-8 py-4 rounded-full font-semibold hover:bg-dark-grey hover:text-white transition-all">
                        WATCH NOW
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LifeLessonsPage;
