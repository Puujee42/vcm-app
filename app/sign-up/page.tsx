"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSignUp } from "@clerk/nextjs";
import {
   ChevronLeft,
   User,
   Mail,
   Lock,
   ArrowRight,
   Loader2,
   CheckCircle2,
   Sparkles,
   Plane,
   MapPin,
   Globe
} from "lucide-react";
import { FaPassport } from "react-icons/fa";

export default function AuPairRegisterPage() {
   const router = useRouter();
   const { isLoaded, signUp, setActive } = useSignUp();

   // --- FORM STATE ---
   const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // --- UI STATE ---
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   // --- HANDLERS ---
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isLoaded || isLoading) return;

      setIsLoading(true);
      setError("");

      try {
         const result = await signUp.create({
            emailAddress: email,
            password,
            firstName: fullName.split(" ")[0],
            lastName: fullName.split(" ")[1] || "",
         });

         // If verification is disabled in Clerk, status should be complete immediately
         if (result.status === "complete") {
            await setActive({ session: result.createdSessionId });

            // Sync user to DB
            try {
               await fetch('/api/user/sync', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fullName })
               });
            } catch (syncErr) {
               console.error("DB Sync failed", syncErr);
            }

            router.push("/dashboard");
         } else {
            // Fallback: If Clerk still requires verification, we can't proceed without it.
            // But sticking to user request to "skip entirely", we just show an error or incomplete state.
            console.log("Sign up status:", result.status);
            setError("Registration incomplete. Please check verification settings.");
         }
      } catch (err: any) {
         setError(err.errors?.[0]?.longMessage || "Registration failed.");
      } finally { setIsLoading(false); }
   };

   return (
      <div className="min-h-[100dvh] w-full flex font-sans selection:bg-red-500 selection:text-white overflow-hidden bg-[#FDFBF7]">

         {/* ─── LEFT: FORM SECTION (50%) ─── */}
         <div className="w-full lg:w-1/2 p-6 lg:p-16 flex flex-col justify-center relative z-20">

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50 -z-10" />

            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="max-w-md mx-auto w-full"
            >
               {/* Back Nav */}
               <div className="mb-8">
                  <Link
                     href="/"
                     className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-red-600 uppercase tracking-[0.2em] transition-colors group"
                  >
                     <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                     Нүүр хуудас
                  </Link>
               </div>

               {/* Header */}
               <div className="mb-10 relative">
                  <motion.div
                     initial={{ scale: 0 }} animate={{ scale: 1 }}
                     className="absolute -top-10 -left-10 w-24 h-24 bg-red-100 rounded-full blur-3xl opacity-50"
                  />
                  <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-3 tracking-tight leading-[0.95] relative z-10">
                     Future <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                        Au Pair.
                     </span>
                  </h1>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed max-w-sm relative z-10">
                     Дэлхийгээр аялж, хэл сурч, шинэ соёлтой танилцах эхний алхам.
                  </p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-5">

                  {/* FULL NAME */}
                  <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
                        <User size={20} />
                     </div>
                     <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Бүтэн Нэр (Full Name)"
                        className="w-full bg-white border-2 border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] outline-none"
                        required
                     />
                  </div>

                  {/* EMAIL */}
                  <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
                        <Mail size={20} />
                     </div>
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="И-мэйл хаяг"
                        className="w-full bg-white border-2 border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] outline-none"
                        required
                     />
                  </div>

                  {/* PASSWORD */}
                  <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
                        <Lock size={20} />
                     </div>
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Нууц үг"
                        className="w-full bg-white border-2 border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] outline-none"
                        required
                     />
                  </div>

                  {/* ERROR MSG */}
                  {error && (
                     <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-500 text-[11px] font-black uppercase tracking-wider bg-red-50 p-4 rounded-2xl border border-red-100 text-center">
                        {error}
                     </motion.p>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                     type="submit"
                     disabled={isLoading}
                     className="w-full bg-slate-900 hover:bg-red-600 text-white font-black text-xs uppercase tracking-[0.25em] py-6 rounded-[1.5rem] shadow-xl hover:shadow-2xl hover:shadow-red-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4 group"
                  >
                     {isLoading ? <Loader2 className="animate-spin" size={18} /> : (
                        <>Бүртгүүлэх <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                     )}
                  </button>

                  {/* Clerk CAPTCHA Placeholder */}
                  <div id="clerk-captcha" />

               </form>

               {/* Login Link */}
               <div className="mt-8 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                     Бүртгэлтэй юу?
                     <Link href="/sign-in" className="text-red-500 ml-2 hover:text-slate-900 transition-colors underline decoration-2 underline-offset-4">Нэвтрэх</Link>
                  </p>
               </div>

            </motion.div>
         </div>

         {/* ─── RIGHT: VISUAL SECTION (50%) ─── */}
         <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[#F2F5F8] border-l border-white/50 overflow-hidden">

            {/* Animated Gradients */}
            <div className="absolute inset-0 w-full h-full">
               <motion.div
                  animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-red-200 rounded-full blur-[150px] opacity-40"
               />
               <motion.div
                  animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-200 rounded-full blur-[150px] opacity-40"
               />
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            {/* 3D Floating "Traveler" Card */}
            <motion.div
               initial={{ rotateY: 90, opacity: 0 }}
               animate={{ rotateY: -5, opacity: 1 }}
               transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
               whileHover={{ rotateY: 0, scale: 1.02 }}
               className="relative z-10 w-[420px] h-[620px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-10 flex flex-col overflow-hidden"
            >
               {/* Gloss Shine */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-80 pointer-events-none" />

               {/* Top Badge */}
               <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="bg-white p-3 rounded-2xl shadow-sm">
                     <FaPassport className="text-red-500 text-2xl" />
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-1">Status</p>
                     <div className="inline-flex items-center gap-2 bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Ready</span>
                     </div>
                  </div>
               </div>

               {/* Center Visual */}
               <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-8">

                  {/* Animated Icon Circle */}
                  <div className="w-40 h-40 bg-gradient-to-tr from-white to-slate-50 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center relative border-4 border-white">
                     <Plane size={48} className="text-slate-400 rotate-[-45deg]" />

                     {/* Floating particles around circle */}
                     <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                     >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                     </motion.div>
                     <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-20px] rounded-full border border-dashed border-slate-300"
                     />
                  </div>

                  <div>
                     <h2 className="text-4xl font-black text-slate-900 leading-[0.9]">
                        Global <br /> <span className="text-red-500">Citizen.</span>
                     </h2>
                     <p className="text-slate-500 font-bold text-sm mt-4 leading-relaxed max-w-[200px] mx-auto">
                        Your verified profile allows you to connect with families across Europe.
                     </p>
                  </div>
               </div>

               {/* Bottom Details */}
               <div className="mt-auto relative z-10 pt-8 border-t border-white/20">
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                        <div className="flex items-center gap-1.5">
                           <MapPin size={12} className="text-emerald-500" />
                           <span className="text-xs font-black text-slate-800">Europe</span>
                        </div>
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Program</p>
                        <div className="flex items-center gap-1.5">
                           <Sparkles size={12} className="text-orange-500" />
                           <span className="text-xs font-black text-slate-800">Au Pair</span>
                        </div>
                     </div>
                  </div>
               </div>

            </motion.div>

         </div>

      </div>
   );
}