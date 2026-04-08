"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock, MapPin, ChevronRight, CheckCircle2,
  Star, Users, Globe, Heart, Zap, GraduationCap,
  BookOpen, CalendarDays, ArrowRight, Sparkles,
  ArrowLeft, Send, Loader2, User, Mail, Phone,
  ChevronDown
} from "lucide-react";
import { useSession } from "next-auth/react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface ProgramConfig {
  id: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  accentBg: string;
  accentText: string;
  btnBg: string;
  shadowColor: string;
  name: string;
  shortDesc: string;
  duration: string;
  type: string;
  location: string;
  openSlots: number;
  tags: { label: string; bg: string }[];
  features: { icon: React.ElementType; title: string; desc: string }[];
  requirements: string[];
  whyJoin: string;
  heroSub: string;
  steps: { num: string; title: string; desc: string }[];
}

// ─── APPLY FORM ──────────────────────────────────────────────────────────────
function ApplyForm({
  prog,
  onClose,
  onSuccess,
}: {
  prog: ProgramConfig;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    age: "", level: "B1", message: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) return;
    setLoading(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, program: prog.id }),
      });
      if (res.ok) onSuccess();
      else throw new Error("Failed");
    } catch {
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl lg:rounded-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="sticky top-0 bg-white pt-3 pb-4 px-6 border-b border-slate-100 z-10">
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{prog.id} хөтөлбөр</div>
              <h3 className="text-lg font-black text-slate-900">Өргөдөл гаргах</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 text-lg font-bold">
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Program badge */}
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: `linear-gradient(135deg, ${prog.gradientFrom}15, ${prog.gradientTo}10)` }}
          >
            <span className="text-3xl">{prog.emoji}</span>
            <div>
              <div className="text-xs font-black text-slate-900">{prog.name}</div>
              <div className="text-[10px] text-slate-500 font-medium">{prog.duration} · {prog.location}</div>
            </div>
            <div className={`ml-auto text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${prog.accentBg} ${prog.accentText}`}>
              {prog.openSlots} нэр
            </div>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                <User size={9} /> Нэр
              </label>
              <input
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="Батбаяр"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Овог</label>
              <input
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Дорж"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
              <Mail size={9} /> Имэйл
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1">
                <Phone size={9} /> Утас
              </label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+976 ..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Нас</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                placeholder="22"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Англи хэлний түвшин</label>
            <div className="relative">
              <select
                value={form.level}
                onChange={(e) => set("level", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent appearance-none"
              >
                <option value="A1">A1 — Анхан шат</option>
                <option value="A2">A2 — Суурь</option>
                <option value="B1">B1 — Дунд</option>
                <option value="B2">B2 — Дунд дээш</option>
                <option value="C1">C1 — Ахисан</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">
              Урам зоригийн захиа
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Яагаад энэ хөтөлбөрт орохыг хүсэж байгаагаа бичнэ үү..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !form.firstName || !form.email || !form.message}
            className={`w-full py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all ${prog.btnBg} disabled:opacity-40 disabled:cursor-not-allowed shadow-lg ${prog.shadowColor}`}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>Өргөдлөө илгээх <Send size={14} /></>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SUCCESS SCREEN ──────────────────────────────────────────────────────────
function SuccessScreen({ prog, onDashboard }: { prog: ProgramConfig; onDashboard: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-24 h-24 rounded-full ${prog.accentBg} flex items-center justify-center mb-6`}
      >
        <CheckCircle2 size={48} className={prog.accentText} />
      </motion.div>
      <h2 className="text-3xl font-black text-slate-900 mb-3">Амжилттай илгээлээ!</h2>
      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 max-w-sm">
        Таны өргөдөл {prog.name}-д амжилттай хүргэгдлээ. VCM-ийн баг 24 цагийн дотор холбогдох болно.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/dashboard"
          className={`py-4 rounded-2xl font-black text-sm text-white text-center ${prog.btnBg} shadow-lg ${prog.shadowColor}`}
        >
          Миний хуудас руу →
        </Link>
        <Link href="/programs" className="py-4 rounded-2xl font-black text-sm text-slate-600 text-center border border-slate-200 bg-slate-50">
          Хөтөлбөрүүд харах
        </Link>
      </div>
    </motion.div>
  );
}

// ─── MAIN PROGRAM PAGE ───────────────────────────────────────────────────────
export function ProgramPageClient({ config }: { config: ProgramConfig }) {
  const { status } = useSession();
  const isSignedIn = status === "authenticated";
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleApplyClick = () => {
    if (!isSignedIn) {
      window.location.href = "/register";
    } else {
      setShowForm(true);
    }
  };

  if (success) return <SuccessScreen prog={config} onDashboard={() => (window.location.href = "/dashboard")} />;

  return (
    <>
      <div className="min-h-dvh bg-slate-50 pt-20 pb-28 lg:pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex flex-col gap-4">

            {/* Back */}
            <Link href="/programs" className="flex items-center gap-2 text-sm font-bold text-slate-500 active:text-slate-800 pt-2 w-fit">
              <ArrowLeft size={16} /> Хөтөлбөрүүд
            </Link>

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-7 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
            >
              <div
                className="absolute right-0 top-0 w-56 h-56 rounded-full opacity-15"
                style={{ background: "white", filter: "blur(50px)", transform: "translate(30%, -30%)" }}
              />
              <div className="relative z-10 flex items-start gap-4">
                <span className="text-6xl leading-none flex-shrink-0">{config.emoji}</span>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">{config.id} · VCM хөтөлбөр</div>
                  <h1 className="text-2xl font-black text-white leading-tight mb-3">{config.name}</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-bold text-white/85 bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock size={9} /> {config.duration}
                    </span>
                    <span className="text-[10px] font-bold text-white/85 bg-white/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <MapPin size={9} /> {config.location}
                    </span>
                    <span className="text-[10px] font-bold text-white/85 bg-white/20 px-2.5 py-1 rounded-full">
                      {config.openSlots} нэр боломжтой
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl ${config.accentBg} flex items-center justify-center`}>
                  <Globe size={16} className={config.accentText} />
                </div>
                <h2 className="font-black text-slate-900">Хөтөлбөрийн тухай</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{config.heroSub}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {config.tags.map((t) => (
                  <span key={t.label} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${t.bg}`}>{t.label}</span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${config.accentBg} flex items-center justify-center`}>
                  <Sparkles size={16} className={config.accentText} />
                </div>
                <h2 className="font-black text-slate-900">Юу хийх вэ?</h2>
              </div>
              <div className="space-y-4">
                {config.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl ${config.accentBg} flex items-center justify-center flex-shrink-0`}>
                      <f.icon size={14} className={config.accentText} />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">{f.title}</div>
                      <div className="text-xs text-slate-500 font-medium leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${config.accentBg} flex items-center justify-center`}>
                  <CheckCircle2 size={16} className={config.accentText} />
                </div>
                <h2 className="font-black text-slate-900">Шаардлага</h2>
              </div>
              <div className="space-y-2.5">
                {config.requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full ${config.accentBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <div className={`w-2 h-2 rounded-full ${config.accentText.replace("text-", "bg-")}`} />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How to join steps */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${config.accentBg} flex items-center justify-center`}>
                  <ArrowRight size={16} className={config.accentText} />
                </div>
                <h2 className="font-black text-slate-900">Хэрхэн нэгдэх вэ?</h2>
              </div>
              <div className="space-y-3">
                {config.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
                      style={{ background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
                    >
                      {s.num}
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">{s.title}</div>
                      <div className="text-xs text-slate-500 font-medium">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Join */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-3xl p-6 text-center"
              style={{ background: `linear-gradient(135deg, ${config.gradientFrom}12, ${config.gradientTo}08)` }}
            >
              <div className="text-3xl mb-3">⭐</div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{config.whyJoin}</p>
            </motion.div>

            {/* Apply CTA */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-1 gap-3 pb-4">
              <button
                onClick={handleApplyClick}
                className={`w-full py-5 rounded-2xl font-black text-base text-white ${config.btnBg} transition-all active:scale-[0.98] shadow-xl ${config.shadowColor} flex items-center justify-center gap-2`}
              >
                {isSignedIn ? "Өргөдөл гаргах" : "Бүртгүүлж өргөдөл гаргах"} <ArrowRight size={18} />
              </button>
              {!isSignedIn && (
                <Link href="/sign-in" className="w-full py-4 rounded-2xl font-black text-sm text-slate-700 text-center border border-slate-200 bg-white active:bg-slate-50 transition-colors">
                  Аль хэдийн гишүүн бол нэвтрэх
                </Link>
              )}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Apply Form Sheet */}
      {showForm && (
        <ApplyForm
          prog={config}
          onClose={() => setShowForm(false)}
          onSuccess={() => { setShowForm(false); setSuccess(true); }}
        />
      )}
    </>
  );
}
