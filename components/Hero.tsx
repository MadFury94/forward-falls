"use client";

import React from 'react';
import HeroSlider from './HeroSlider';
import type { HeroSlide } from '@/content/defaults/homepage';

interface HeroProps {
    content: { slides: HeroSlide[] };
}

const Hero = ({ content }: HeroProps) => {
    return <HeroSlider slides={content.slides} />;
};

export default Hero;
