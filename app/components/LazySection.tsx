"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
    children: React.ReactNode;
    rootMargin?: string;
    threshold?: number | number[];
    placeholder?: React.ReactNode;
}

export default function LazySection({
    children,
    rootMargin = "200px",
    threshold = 0.01,
    placeholder,
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin, threshold]);

    return (
        <div ref={sectionRef} className="w-full min-h-[1px]">
            {isVisible ? children : placeholder || <div className="w-full h-20" />}
        </div>
    );
}
