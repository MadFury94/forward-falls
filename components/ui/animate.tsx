"use client";

import React, { useEffect, useRef, useState } from 'react';

interface AnimateProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
}

export function Animate({
    children,
    className = '',
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.8,
    threshold = 0.1,
    once = true
}: AnimateProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, once]);

    const animationClasses = {
        fadeIn: 'opacity-0',
        fadeInUp: 'opacity-0 translate-y-4',
        fadeInDown: 'opacity-0 -translate-y-4',
        fadeInLeft: 'opacity-0 -translate-x-4',
        fadeInRight: 'opacity-0 translate-x-4',
        scaleIn: 'opacity-0 scale-95'
    };

    const baseClass = animationClasses[animation];
    const visibleClass = isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : '';

    return (
        <div
            ref={ref}
            className={`transition-all ${baseClass} ${visibleClass} ${className}`}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {children}
        </div>
    );
}

// Simple motion.div replacement
export function MotionDiv({
    children,
    className = '',
    initial = {},
    animate = {},
    transition = {},
    ...props
}: any) {
    // Convert framer-motion style props to CSS
    const style: React.CSSProperties = {};

    // Handle initial/animate transforms
    if (initial.opacity !== undefined) style.opacity = initial.opacity;
    if (initial.y !== undefined) style.transform = `translateY(${initial.y}px)`;
    if (initial.x !== undefined) style.transform = `translateX(${initial.x}px)`;
    if (initial.scale !== undefined) style.transform = `scale(${initial.scale})`;

    // For simplicity, just use the Animate component
    return (
        <Animate
            className={className}
            animation={
                initial.x === -50 ? 'fadeInLeft' :
                    initial.x === 50 ? 'fadeInRight' :
                        initial.y === 30 ? 'fadeInUp' :
                            initial.scale === 0 ? 'scaleIn' : 'fadeInUp'
            }
            delay={transition.delay || 0}
            duration={transition.duration || 0.8}
            {...props}
        >
            {children}
        </Animate>
    );
}