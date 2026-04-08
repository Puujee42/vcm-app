"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  Clock, Globe, ChevronRight, CheckCircle2, ArrowLeft,
  Star, Users, BookOpen, Heart, Zap, GraduationCap,
  CalendarDays, MapPin, ArrowRight, Sparkles
} from "lucide-react";
import { useSession } from "next-auth/react";

// ─── PROGRAM DATA ───────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "EDU",
    emoji: "🎓",
    gradientFrom: "#0ea5e9",
    gradientTo: "#3b82f6",
    accentBg: "bg-sky-50",
    accentText: "text-sky-600",
    accentBorder: "border-sky-100",
    btnBg: "bg-sky-500 hover:bg-sky-600",
    shadowColor: "shadow-sky-500/20",
    nameKey: "prog_edu",
    descKey: "prog_edu_desc",
    href: "/programs/edu",
    duration: "3–12 сар",
    type: "Боловсрол",
    location: "Монгол улс",
    openSlots: 8,
    tags: [
      { label: "Сургалт", bg: "bg-sky-50 text-sky-700" },
      { label: "Хэл заалт", bg: "bg-blue-50 text-blue-700" },
      { label: "Залуучууд", bg: "bg-indigo-50 text-indigo-700" },
    ],
    features: [
      { icon: GraduationCap, text: "Дунд болон ахлах сургуулиудад зааварлагч болох" },
      { icon: BookOpen, text: "Хэл, урлаг, технологи чиглэлийн хичээл заах" },
      { icon: Users, text: "Англи хэлний B1 ба дээш түвшин шаардлагатай" },
      { icon: CalendarDays, text: "Уян хатан цагийн хуваарь" },
      { icon: Star, text: "VCM-ийн бүрэн дэмжлэг, сургалт, ментор" },
    ],
    whyJoin: "Монголын сургуулиудад өөрийн мэдлэгийг дамжуулж, нийгмийн хөгжилд биечлэн хувь нэмэр оруулах ховор боломж. Сурагчдын ирээдүйг гэрэлтүүлэх аялал эндээс эхэлнэ.",
    heroTitle: "Шинэ Үеийг",
    heroHighlight: "Урамшуулах",
    heroSub: "Сургууль, сургалтын төвүүдэд өөрийн мэдлэг, чадвараа хуваалцаж, залуу оюун ухааныг чадавхжуулан гэрэлт ирээдүйг хамтдаа бүтээцгээе.",
  },
  {
    id: "AND",
    emoji: "🤝",
    gradientFrom: "#10b981",
    gradientTo: "#0d9488",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-600",
    accentBorder: "border-emerald-100",
    btnBg: "bg-emerald-500 hover:bg-emerald-600",
    shadowColor: "shadow-emerald-500/20",
    nameKey: "prog_and",
    descKey: "prog_and_desc",
    href: "/programs/and",
    duration: "Уян хатан",
    type: "Нийгмийн халамж",
    location: "Улаанбаатар",
    openSlots: 12,
    tags: [
      { label: "Тусгай хэрэгцээт", bg: "bg-emerald-50 text-emerald-700" },
      { label: "Халамж", bg: "bg-teal-50 text-teal-700" },
      { label: "Хамтын нийгэм", bg: "bg-green-50 text-green-700" },
    ],
    features: [
      { icon: Heart, text: "Тусгай хэрэгцээт хүүхдүүдэд сэтгэл зүйн дэмжлэг" },
      { icon: Users, text: "Гэр бүлд нь нийгмийн идэвхтэй туслалцаа" },
      { icon: CalendarDays, text: "7 хоногт 2–3 удаа уулзах боломж" },
      { icon: MapPin, text: "Улаанбаатар дахь хамтрагч байгууллагуудтай" },
      { icon: Star, text: "Урьдчилсан сургалт болон удирдамж" },
    ],
    whyJoin: "Нийгмийн хамгийн эмзэг бүлэгт биечлэн туслах, тэдний гэр бүлд баяр баясгалан бэлэглэх энэхүү хөтөлбөр нь таны хувьд амьдралын утга учрыг шинэчлэх тусгай аялал юм.",
    heroTitle: "Нийгмийн",
    heroHighlight: "Халамж & Дэмжлэг",
    heroSub: "Тусгай хэрэгцээт хүүхдүүдэд нийгэм-сэтгэл зүйн дэмжлэг үзүүлж, тэдний гэр бүлд баяр баясгалан бэлэглэх сайн дурын багт нэгдээрэй.",
  },
  {
    id: "VCLUB",
    emoji: "🌍",
    gradientFrom: "#f59e0b",
    gradientTo: "#f97316",
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
    accentBorder: "border-amber-100",
    btnBg: "bg-amber-500 hover:bg-amber-600",
    shadowColor: "shadow-amber-500/20",
    nameKey: "prog_vclub",
    descKey: "prog_vclub_desc",
    href: "/programs/vclub",
    duration: "Арга хэмжээгээр",
    type: "Клуб / Сүлжээ",
    location: "Монгол улс",
    openSlots: 20,
    tags: [
      { label: "Арга хэмжээ", bg: "bg-amber-50 text-amber-700" },
      { label: "Сүлжээ", bg: "bg-orange-50 text-orange-700" },
      { label: "Манлайлал", bg: "bg-yellow-50 text-yellow-700" },
    ],
    features: [
      { icon: Zap, text: "Олон нийтийн арга хэмжээнд идэвхтэй оролцох" },
      { icon: Users, text: "VCM-ийн олон улсын гишүүдийн сүлжээнд нэгдэх" },
      { icon: Star, text: "Манлайлал болон ур чадвар хөгжүүлэх сургалт" },
      { icon: Globe, text: "Дэлхийн сайн дурынхантай холбогдох боломж" },
      { icon: Sparkles, text: "Нийгмийн томоохон санаачилгуудад нэгдэх" },
    ],
    whyJoin: "V-Club бол зүгээр нэг клуб биш — энэ бол хувь хүний өсөлт, дэлхийн холбоо тогтоох, нийгмийн томоохон өөрчлөлтийн нэг хэсэг болох газар юм.",
    heroTitle: "Дэлхийн",
    heroHighlight: "Нийгэмлэгт нэгдэх",
    heroSub: "Бусад сайн дурынхантай холбогдож, туршлагаа хуваалцан, нийгмийн томоохон санаачилга дээр хамтран ажиллаарай. V-Club бол хүсэл мөрөөдөл хамтын хүчтэй нэгддэг газар юм.",
  },
];

type Program = (typeof PROGRAMS)[0];

// ─── PROGRAM CARD ───────────────────────────────────────────────────────────
function ProgramCard({
  prog,
  onSelect,
  nt,
}: {
  prog: Program;
  onSelect: (p: Program) => void;
  nt: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer"
      onClick={() => onSelect(prog)}
    >
      {/* Banner */}
      <div
        className="h-32 relative flex items-end justify-between p-5"
        style={{ background: `linear-gradient(135deg, ${prog.gradientFrom}, ${prog.gradientTo})` }}
      >
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-3 py-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-white">{prog.id}</span>
        </div>
        <span className="text-5xl leading-none">{prog.emoji}</span>
        {/* Open slots badge */}
        <div className="absolute top-4 right-4 bg-white/25 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="text-[9px] font-black text-white uppercase tracking-wider">{prog.openSlots} нэр боломжтой</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-black text-slate-900 leading-snug">{nt(prog.nameKey as any)}</h3>
          <ChevronRight size={18} className="text-slate-300 mt-0.5 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-4">
          <span className="flex items-center gap-1">
            <Clock size={10} /> {prog.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={10} /> {prog.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {prog.tags.map((tag) => (
            <span key={tag.label} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tag.bg}`}>
              {tag.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(prog); }}
            className="py-3 text-center text-[11px] font-black rounded-2xl border border-slate-200 text-slate-600 bg-slate-50 active:bg-slate-100 transition-colors"
          >
            Дэлгэрэнгүй
          </button>
          <Link
            href="/apply"
            onClick={(e) => e.stopPropagation()}
            className={`py-3 text-center text-[11px] font-black rounded-2xl text-white ${prog.btnBg} transition-colors shadow-lg ${prog.shadowColor}`}
          >
            Өргөдөл гаргах
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROGRAM DETAIL ──────────────────────────────────────────────────────────
function ProgramDetail({
  prog,
  onBack,
  nt,
  isSignedIn,
}: {
  prog: Program;
  onBack: () => void;
  nt: ReturnType<typeof useTranslations>;
  isSignedIn: boolean;
}) {
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col gap-4"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 active:text-slate-800 transition-colors w-fit pt-2"
      >
        <ArrowLeft size={16} /> Хөтөлбөрүүд
      </button>

      {/* Hero Banner */}
      <div
        className="rounded-3xl p-7 flex items-center gap-5 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${prog.gradientFrom}, ${prog.gradientTo})` }}
      >
        <div
          className="absolute right-0 top-0 w-48 h-48 rounded-full opacity-20"
          style={{ background: "white", filter: "blur(40px)", transform: "translate(30%, -30%)" }}
        />
        <span className="text-6xl leading-none flex-shrink-0">{prog.emoji}</span>
        <div className="relative z-10">
          <div className="text-[9px] font-black uppercase tracking-widest text-white/70 mb-1">{prog.id} хөтөлбөр</div>
          <h2 className="text-xl font-black text-white leading-tight mb-2">{nt(prog.nameKey as any)}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-white/85 bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock size={9} /> {prog.duration}
            </span>
            <span className="text-[10px] font-bold text-white/85 bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin size={9} /> {prog.location}
            </span>
            <span className="text-[10px] font-bold text-white/85 bg-white/20 px-2.5 py-1 rounded-full">
              {prog.openSlots} нэр боломжтой
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-xl ${prog.accentBg} flex items-center justify-center`}>
            <Globe size={16} className={prog.accentText} />
          </div>
          <h3 className="font-black text-slate-900 text-sm">Хөтөлбөрийн тухай</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{nt(prog.descKey as any)}</p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-xl ${prog.accentBg} flex items-center justify-center`}>
            <CheckCircle2 size={16} className={prog.accentText} />
          </div>
          <h3 className="font-black text-slate-900 text-sm">Юу хийх вэ?</h3>
        </div>
        <div className="space-y-3">
          {prog.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-xl ${prog.accentBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <f.icon size={13} className={prog.accentText} />
              </div>
              <span className="text-sm text-slate-700 font-medium leading-relaxed">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Join */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-xl ${prog.accentBg} flex items-center justify-center`}>
            <Star size={16} className={prog.accentText} />
          </div>
          <h3 className="font-black text-slate-900 text-sm">Яагаад энд нэгдэх вэ?</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{prog.whyJoin}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {prog.tags.map((tag) => (
          <span key={tag.label} className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${tag.bg}`}>
            {tag.label}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <Link
          href={prog.href}
          className="py-4 text-center text-sm font-black rounded-2xl border border-slate-200 text-slate-700 bg-white active:bg-slate-50 transition-colors shadow-sm"
        >
          Бүрэн мэдээлэл
        </Link>
        {isSignedIn ? (
          <Link
            href="/apply"
            className={`py-4 text-center text-sm font-black rounded-2xl text-white ${prog.btnBg} transition-colors shadow-lg ${prog.shadowColor}`}
          >
            Өргөдөл гаргах →
          </Link>
        ) : (
          <Link
            href="/register"
            className={`py-4 text-center text-sm font-black rounded-2xl text-white ${prog.btnBg} transition-colors shadow-lg ${prog.shadowColor}`}
          >
            Бүртгүүлэх →
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ProgramsClient() {
  const nt = useTranslations("navbar");
  const { status } = useSession();
  const isSignedIn = status === "authenticated";
  const [selected, setSelected] = useState<Program | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? PROGRAMS : PROGRAMS.filter((p) => p.id === filter);

  return (
    <div className="min-h-dvh bg-slate-50 pt-20 pb-28 lg:pb-8">
      <div className="max-w-2xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-5"
            >
              {/* Header */}
              <div className="pt-2">
                <h1 className="text-3xl font-black text-slate-900 leading-tight mb-1">VCM Хөтөлбөрүүд</h1>
                <p className="text-sm text-slate-500 font-medium">Танд тохирох хөтөлбөрөө сонгоорой</p>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: "all", label: "Бүгд" },
                  { id: "EDU", label: "🎓 EDU" },
                  { id: "AND", label: "🤝 AND" },
                  { id: "VCLUB", label: "🌍 VClub" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all flex-shrink-0 ${
                      filter === f.id
                        ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Cards */}
              {filtered.map((prog, i) => (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ProgramCard prog={prog} onSelect={setSelected} nt={nt} />
                </motion.div>
              ))}

              {/* Sign up CTA if not logged in */}
              {!isSignedIn && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-900 rounded-3xl p-7 text-center"
                >
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-white font-black text-xl mb-2">Нэгдэхэд бэлэн үү?</h3>
                  <p className="text-slate-400 text-xs font-medium mb-6 leading-relaxed max-w-xs mx-auto">
                    Бүртгүүлж, хөтөлбөрт өргөдлөө гаргаарай. Таны ирээдүйн аялал эндээс эхэлнэ.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Link
                      href="/register"
                      className="bg-sky-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:bg-sky-600 transition-colors shadow-lg shadow-sky-500/25 flex items-center gap-2"
                    >
                      Бүртгүүлэх <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/sign-in"
                      className="bg-white/10 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:bg-white/20 transition-colors border border-white/20"
                    >
                      Нэвтрэх
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <ProgramDetail
              key="detail"
              prog={selected}
              onBack={() => setSelected(null)}
              nt={nt}
              isSignedIn={isSignedIn}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}