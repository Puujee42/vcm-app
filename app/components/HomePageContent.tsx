"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import LazySection from "./LazySection";
import HeroSlider from "./HeroSlider";

const Hero = dynamic(() => import("./Hero"), { ssr: false });
const EventsSection = dynamic(() => import("./Events"), { ssr: false });
const ShopClient = dynamic(() => import("@/app/[locale]/shop/ShopClient"), { ssr: false });
const UsSection = dynamic(() => import("./UseSection"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: false });

export default function HomePageContent({ shopItems, locale }: { shopItems?: any[], locale?: string }) {
  const [items, setItems] = useState<any[]>(shopItems || []);

  useEffect(() => {
    if (!shopItems || shopItems.length === 0) {
      fetch('/api/shopping')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setItems(data.slice(0, 12));
          }
        })
        .catch(err => console.error("Failed to fetch shop items", err));
    }
  }, [shopItems]);

  return (
    <>
      <Suspense fallback={<div className="w-full h-[100dvh] min-h-[700px] bg-slate-900 animate-pulse" />}>
        <HeroSlider />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[95vh] bg-slate-50 animate-pulse" />}>
        <Hero />
      </Suspense>

      <LazySection placeholder={<div className="w-full h-[800px] bg-slate-50 animate-pulse" />}>
        <Suspense fallback={<div className="w-full h-[800px] bg-slate-50 animate-pulse" />}>
          <UsSection />
        </Suspense>
      </LazySection>

      <LazySection placeholder={<div className="w-full h-[700px] bg-slate-50 animate-pulse" />}>
        <Suspense fallback={<div className="w-full h-[700px] bg-slate-50 animate-pulse" />}>
          <EventsSection />
        </Suspense>
      </LazySection>

      <LazySection placeholder={<div className="w-full h-[600px] bg-slate-50 animate-pulse" />}>
        <Suspense fallback={<div className="w-full h-[600px] bg-slate-50 animate-pulse" />}>
          {items.length > 0 && locale ? (
            <ShopClient items={items} locale={locale} />
          ) : (
            <div className="w-full h-[600px] bg-slate-50 animate-pulse flex items-center justify-center">
               <span className="text-slate-400 font-medium">Дэлгүүр уншиж байна...</span>
            </div>
          )}
        </Suspense>
      </LazySection>

      <LazySection placeholder={<div className="w-full h-[1200px] bg-slate-50 animate-pulse" />}>
        <Suspense fallback={<div className="w-full h-[1200px] bg-slate-50 animate-pulse" />}>
          <WhyChooseUs />
        </Suspense>
      </LazySection>
    </>
  );
}

