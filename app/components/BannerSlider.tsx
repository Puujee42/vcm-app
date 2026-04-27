'use client'; 
 
 import React, { useState, useEffect, useCallback } from 'react'; 
 import Image from 'next/image'; 
 import { m, AnimatePresence, Variants } from 'framer-motion'; 
 import { ChevronLeft, ChevronRight } from 'lucide-react'; 
 
 import { Banner } from '@/models/Banner'; 
 import { getApiUrl } from '@/lib/utils'; 
 import { Motion } from './MotionProxy'; 
 
 const FALLBACK_BANNERS: Banner[] = [
   {
     id: 'fallback-1',
     title: 'Inspiration in Action',
     image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600',
     link: '/about',
     active: true,
   },
   {
     id: 'fallback-2',
     title: 'Shoebox Project Mongolia',
     image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1600',
     link: '/events',
     active: true,
   },
 ];
 
 export default function BannerSlider() { 
   const [banners, setBanners] = useState<Banner[]>([]); 
   const [isLoading, setIsLoading] = useState(true); 
   const [currentIndex, setCurrentIndex] = useState(0); 
   const [direction, setDirection] = useState(0); // -1 for left, 1 for right 
   const [isHovered, setIsHovered] = useState(false); 
 
   const nextSlide = useCallback(() => { 
     if (banners.length === 0) return; 
     setDirection(1); 
     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); 
   }, [banners.length]); 
 
   const prevSlide = useCallback(() => { 
     if (banners.length === 0) return; 
     setDirection(-1); 
     setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length); 
   }, [banners.length]); 
 
   useEffect(() => { 
     if (currentIndex >= banners.length && banners.length > 0) { 
       setCurrentIndex(0); 
     } 
   }, [banners.length, currentIndex]); 
 
   useEffect(() => { 
     const fetchBanners = async () => { 
       try { 
         const response = await fetch(getApiUrl('/api/banners')); 
         if (!response.ok) { 
           throw new Error(`HTTP error! status: ${response.status}`); 
         } 
         
         const contentType = response.headers.get('content-type'); 
         if (!contentType || !contentType.includes('application/json')) { 
           throw new TypeError("Oops, we haven't got JSON!"); 
         } 
 
         const data = await response.json(); 
         if (data.banners && data.banners.length > 0) {
           setBanners(data.banners); 
         } else {
           setBanners(FALLBACK_BANNERS);
         }
       } catch (err) { 
         console.error('Error fetching banners:', err); 
         // Fallback to mock data if fetch fails 
         setBanners(FALLBACK_BANNERS); 
       } finally { 
         setIsLoading(false); 
       } 
     }; 
 
     fetchBanners(); 
   }, []); 
 
   useEffect(() => { 
     if (isHovered || banners.length <= 1) return; 
     const interval = setInterval(nextSlide, 5000); 
     return () => clearInterval(interval); 
   }, [nextSlide, isHovered, banners.length]); 
 
   const variants: Variants = { 
     enter: (_direction: number) => ({ 
       opacity: 0, 
     }), 
     center: { 
       zIndex: 1, 
       opacity: 1, 
     }, 
     exit: (_direction: number) => ({ 
       zIndex: 0, 
       opacity: 0, 
     }), 
   }; 
 
   if (isLoading || banners.length === 0) { 
     return ( 
       <div className="w-full px-5 pt-3">
         <div className="w-full animate-pulse" style={{ 
           borderRadius: 'var(--r-2xl)', 
           background: 'var(--fill2)', 
           aspectRatio: '16/9', 
         }} /> 
       </div>
     ); 
   } 
 
   return ( 
     <section className="w-full px-5 pt-3">
       <div 
         className="relative w-full overflow-hidden group" 
         style={{ 
           borderRadius: 'var(--r-2xl)', 
           boxShadow: '0 2px 20px rgba(0,0,0,0.10)', 
           aspectRatio: '16/9',  /* mobile дээр 16:9 */ 
         }} 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)} 
       > 
         <AnimatePresence initial={false} custom={direction} mode="popLayout"> 
           <Motion.div 
             key={currentIndex} 
             custom={direction} 
             variants={variants} 
             initial="enter" 
             animate="center" 
             exit="exit" 
             transition={{ opacity: { duration: 0.4, ease: 'easeInOut' } }} 
             className="absolute inset-0 w-full h-full" 
           > 
             <div className="relative w-full h-full"> 
               <Image 
                 src={banners[currentIndex]?.image || ''} 
                 alt={banners[currentIndex]?.title || `Banner ${currentIndex + 1}`} 
                 fill 
                 priority={currentIndex === 0} 
                 className="object-cover" 
                 sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1400px" 
               /> 
             </div> 
           </Motion.div> 
         </AnimatePresence> 
 
         {/* Navigation Arrows - Hidden on Mobile, Visible on Hover for Desktop */} 
         <div className="absolute inset-0 z-10 hidden sm:flex items-center justify-between px-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
           <Motion.button 
             whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }} 
             whileTap={{ scale: 0.9 }} 
             onClick={prevSlide} 
             className="press p-2 rounded-full bg-white/50 backdrop-blur-md text-gray-800 shadow-sm pointer-events-auto" 
           > 
             <ChevronLeft className="w-5 h-5" /> 
           </Motion.button> 
           <Motion.button 
             whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }} 
             whileTap={{ scale: 0.9 }} 
             onClick={nextSlide} 
             className="press p-2 rounded-full bg-white/50 backdrop-blur-md text-gray-800 shadow-sm pointer-events-auto" 
           > 
             <ChevronRight className="w-5 h-5" /> 
           </Motion.button> 
         </div> 
 
         {/* Indicators */} 
         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5"> 
           {banners.map((_: any, i: number) => ( 
             <button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }} className="press p-1"> 
               <div className={`rounded-full transition-all duration-300 ${ 
                 i === currentIndex 
                   ? 'w-5 h-1.5 bg-white' 
                   : 'w-1.5 h-1.5 bg-white/50' 
               }`} /> 
             </button> 
           ))} 
         </div> 
 
         {/* Autoplay Progress Bar */} 
         <div className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full z-20"> 
           <Motion.div 
             key={currentIndex} 
             initial={{ width: 0 }} 
             animate={{ width: isHovered ? '0%' : '100%' }} 
             transition={{ duration: isHovered ? 0 : 5, ease: 'linear' }} 
             className="h-full bg-white/60" 
           /> 
         </div> 
       </div>
     </section> 
   ); 
 }
