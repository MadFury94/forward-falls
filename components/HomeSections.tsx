'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false });
const AdoptionsSection = dynamic(() => import('@/components/AdoptionsSection'), { ssr: false });
const Programs = dynamic(() => import('@/components/Programs'), { ssr: false });
const Team = dynamic(() => import('@/components/Team'), { ssr: false });
const Partners = dynamic(() => import('@/components/Partners'), { ssr: false });
const PhotoMosaic = dynamic(() => import('@/components/PhotoMosaic'), { ssr: false });
const BlogSection = dynamic(() => import('@/components/BlogSection'), { ssr: false });

export { Hero, AboutSection, AdoptionsSection, Programs, Team, Partners, PhotoMosaic, BlogSection };
