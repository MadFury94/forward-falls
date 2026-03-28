"use client";

import { useEffect, useRef, useState } from 'react';

export function useAnimation(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: 0.1,
                ...options
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return { ref, isVisible };
}

export function useCounterAnimation(target: number, duration = 2, isActive = true) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        let start = 0;
        const increment = target / (duration * 60); // 60fps
        let animationFrameId: number;

        const animate = () => {
            start += increment;
            if (start >= target) {
                setCount(target);
                return;
            }
            setCount(Math.round(start));
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [target, duration, isActive]);

    return count;
}
