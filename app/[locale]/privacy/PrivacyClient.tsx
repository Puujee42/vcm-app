"use client";

import React from "react";
import { useLocale } from "next-intl";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "@/navigation";

export default function PrivacyClient() {
  const locale = useLocale();
  const router = useRouter();

  const t = {
    title: locale === "mn" ? "Нууцлалын бодлого" : "Privacy Policy",
    back: locale === "mn" ? "Буцах" : "Back",
    lastUpdated: locale === "mn" ? "Хүчин төгөлдөр болох огноо: 2026 оны 5 сарын 1" : "Effective Date: May 1, 2026",
    intro: locale === "mn"
      ? "Монголын Сайн Дурынхны Төв (VCM) нь таны хувийн нууцыг дээдэлдэг бөгөөд таны мэдээллийг хэрхэн цуглуулж, ашиглаж, хамгаалж байгааг энэхүү бодлогоор зохицуулна."
      : "Volunteer Center Mongolia (VCM) respects your privacy. This policy explains how we collect, use, and safeguard your personal information.",
    contactTitle: locale === "mn" ? "Холбоо барих мэдээлэл" : "Contact Information",
    contactInfo: [
      { label: locale === "mn" ? "Байгууллага" : "Organization", value: "Volunteer Center Mongolia (VCM)" },
      { label: locale === "mn" ? "Хаяг" : "Address", value: "Time Center, Room 504, Ulaanbaatar, Mongolia" },
      { label: locale === "mn" ? "Имэйл" : "Email", value: "volunteercenter22@gmail.com" },
      { label: locale === "mn" ? "Утас" : "Phone", value: "+976 9599 7999" },
    ],
    sections: [
      {
        title: locale === "mn" ? "1. Цуглуулдаг мэдээлэл болон Зорилго" : "1. Data Collection and Purpose",
        content: locale === "mn"
          ? "Бид танд илүү сайн үйлчилгээ үзүүлэхийн тулд дараах хувийн мэдээллийг цуглуулж, боловсруулдаг."
          : "We collect and process the following personal data to provide our services effectively.",
        items: [
          {
            title: locale === "mn" ? "Бүртгэлийн мэдээлэл" : "Account Data",
            desc: locale === "mn"
              ? "Овог нэр, утасны дугаар, имэйл хаяг, нууц үг (нууцлагдсан), Google OAuth ID, болон профайл зураг. Зорилго: Хэрэглэгчийн бүртгэл үүсгэх, баталгаажуулах."
              : "Full name, phone, email, bcrypt-hashed password, Google OAuth ID, profile photo. Purpose: Account creation and authentication.",
          },
          {
            title: locale === "mn" ? "Дэлгэрэнгүй анкет" : "Detailed Profile",
            desc: locale === "mn"
              ? "Төрсөн он сар өдөр, хүйс, үндэстэн, шашин шүтлэг, гэрийн хаяг, Skype, холбогдох боломжтой цаг, хобби, боловсрол, хэлний мэдлэг, зорилго. Зорилго: Хөтөлбөрт тэнцэх эсэхийг үнэлэх."
              : "DOB, place of birth, sex, nationality, religion, home address, Skype, best contact time, hobbies, education level, languages spoken, motivation statement. Purpose: Program eligibility assessment.",
          },
          {
            title: locale === "mn" ? "Гэр бүлийн мэдээлэл" : "Family Info",
            desc: locale === "mn"
              ? "Аав, ээжийн мэргэжил, ах эгч дүүсийн тоо. Зорилго: Нийгмийн суурь мэдээлэл бүрдүүлэх (тусгай хөтөлбөрт шаардлагатай)."
              : "Father/mother professions, number of siblings. Purpose: Background check for specialized programs.",
          },
          {
            title: locale === "mn" ? "Туршлага" : "Experience",
            desc: locale === "mn"
              ? "Хүүхэд асрах болон гэрийн ажил хийх чадвар (жагсаалт), мэргэжлийн туршлагын баримт бичгүүд. Зорилго: Тохиромжтой сайн дурын ажилд хуваарилах."
              : "Childcare/household tasks, professional experience documents. Purpose: Matching with appropriate volunteer opportunities.",
          },
          {
            title: locale === "mn" ? "Иргэний үнэмлэх болон Хууль зүйн баримтууд" : "Identity & Legal Docs",
            desc: locale === "mn"
              ? "Гадаад паспорт, төрсний болон гэрлэлтийн гэрчилгээ, оршин суугаа хаягийн тодорхойлолт, E-Mongolia лавлагаа, жолооны үнэмлэх, боловсролын диплом, Англи хэлний гэрчилгээ (Cloudinary дээр хадгалагдана). Зорилго: Хууль эрх зүйн баталгаажуулалт, визний дэмжлэг."
              : "Passport scan, birth/marriage/residence certs, eMongolia cert, driver's license, education/bachelor/English certs (Stored via Cloudinary). Purpose: Legal verification and visa support.",
          },
          {
            title: locale === "mn" ? "Эрүүл мэндийн мэдээлэл" : "Health Data",
            desc: locale === "mn"
              ? "Эрүүл мэндийн хуудас, сэтгэцийн эрүүл мэндийн магадлагаа. Зорилго: Сайн дурын ажилтны аюулгүй байдлыг хангах."
              : "Medical records, mental health examination results. Purpose: Ensuring volunteer health and safety during assignments.",
          },
          {
            title: locale === "mn" ? "Санхүүгийн мэдээлэл" : "Financial Data",
            desc: locale === "mn"
              ? "QPay утасны дугаар, төлбөрийн дүн, нэхэмжлэлийн ID, төлөв (MNT), худалдан авалтын түүх. Зорилго: Төлбөр тооцоо болон гүйлгээний бүртгэл."
              : "QPay phone number, payment amount, invoice ID, status (MNT), shopping records. Purpose: Processing payments and tracking transactions.",
          },
          {
            title: locale === "mn" ? "Хөтөлбөрийн хяналт" : "Program Tracking",
            desc: locale === "mn"
              ? "Хуваарилагдсан хөтөлбөр, алхам/үе шат, тэмдэг, оролцсон арга хэмжээ, үйл ажиллагааны түүх, оноо. Зорилго: Сайн дурын ажлын гүйцэтгэлийг хянах."
              : "Assigned program, volunteer step/stage, badges, events attended, full activity history/points. Purpose: Tracking engagement and rewarding volunteers.",
          },
          {
            title: locale === "mn" ? "Төхөөрөмж болон Техник" : "Device & Tech",
            desc: locale === "mn"
              ? "Түлхэх мэдэгдлийн токен (iOS/Android/Web), төхөөрөмжийн платформ, токен үүссэн цаг. Зорилго: Системийн мэдэгдэл илгээх."
              : "Push notification tokens (iOS/Android/Web), device platform, token timestamps. Purpose: Sending system alerts and updates.",
          },
          {
            title: locale === "mn" ? "Харилцаа холбоо" : "Communications",
            desc: locale === "mn"
              ? "Захиалгын хүсэлт, Gmail мэдэгдлүүд. Зорилго: Үйлчилгээний мэдээлэл хүргэх."
              : "Booking requests, Gmail notifications. Purpose: Delivering service-related communication.",
          },
          {
            title: locale === "mn" ? "Системийн бүртгэл (Audit logs)" : "Audit Logs",
            desc: locale === "mn"
              ? "Админы үйлдэл (үйлдэл хийсэн хүн, үүрэг, үйлдлийн төрөл, зорилтот обьект, цаг). Зорилго: Системийн аюулгүй байдал, хяналт."
              : "Admin actions (actor name, role, action type, target, timestamp). Purpose: Security monitoring and accountability.",
          },
        ]
      },
      {
        title: locale === "mn" ? "2. Мэдээлэл хадгалах хугацаа" : "2. Retention Period",
        content: locale === "mn"
          ? "Бид таны мэдээллийг хууль ёсны зорилгоо хэрэгжүүлэхэд шаардлагатай хугацаанд хадгална. Та хүсэлт гаргасан тохиолдолд мэдээллийг системээс бүрмөсөн устгана."
          : "We retain your data for as long as necessary to fulfill the purposes outlined above. Upon request, data will be permanently deleted from our systems.",
      },
      {
        title: locale === "mn" ? "3. Гуравдагч талуудтай хуваалцах" : "3. Third-Party Sharing",
        content: locale === "mn"
          ? "Таны мэдээллийг үйлчилгээ үзүүлэх зорилгоор дараах байгууллагуудтай хуваалцаж болно:"
          : "Your data may be processed by the following authorized third-party service providers:",
        items: [
          { title: "MongoDB Atlas", desc: locale === "mn" ? "Өгөгдлийн сан (Монголоос гадна байршиж болно)." : "Database storage (potentially hosted outside Mongolia)." },
          { title: "Cloudinary", desc: locale === "mn" ? "Файл болон зураг хадгалах." : "File and image storage." },
          { title: "Google OAuth", desc: locale === "mn" ? "Нэвтрэх систем (нэр, имэйл, зураг)." : "Authentication sign-in services." },
          { title: "QPay", desc: locale === "mn" ? "Монголын төлбөрийн систем." : "Mongolian payment gateway." },
          { title: "LiveKit", desc: locale === "mn" ? "Шууд видео дуудлагын дэд бүтэц." : "Live video infrastructure." },
          { title: "Gmail / Nodemailer", desc: locale === "mn" ? "Автомат имэйл илгээх систем." : "Transactional email delivery." },
          { title: "Vercel", desc: locale === "mn" ? "Вэб хостинг болон серверийн дэд бүтэц." : "Hosting and server infrastructure." },
        ]
      },
      {
        title: locale === "mn" ? "4. Хэрэглэгчийн эрх" : "4. User Rights",
        content: locale === "mn"
          ? "Та өөрийн мэдээлэлд нэвтрэх, засах, устгах эрхтэй бөгөөд 'Тохиргоо' хэсгээс үүнийг удирдах боломжтой. Мөн түлхэх мэдэгдэл болон маркетингийн имэйлээс татгалзах, баримт бичгийн зөвшөөрлөө цуцлах эрхтэй."
          : "You have the right to access, correct, and delete your data via the in-app Settings. You may also withdraw consent for documents, and opt-out of push notifications and marketing emails.",
        items: [
          { title: locale === "mn" ? "Эрхээ эдлэх" : "Exercising Your Rights", desc: locale === "mn" ? "Та дээрх эрхээ эдлэхийн тулд volunteercenter22@gmail.com хаягаар бидэнтэй холбогдоно уу." : "To exercise these rights, please contact us at volunteercenter22@gmail.com." }
        ]
      }
    ]
  };

  return (
    <div className="page pb-20">
      <div className="page-inner space-y-6">
        
        <button onClick={() => router.back()} className="flex items-center text-sm font-semibold pt-4 press" style={{ color: "var(--blue)" }}>
          <ChevronLeft size={18} className="mr-1" />
          {t.back}
        </button>

        <div className="space-y-1">
          <h1 className="t-large-title">{t.title}</h1>
          <p className="text-[13px]" style={{ color: "var(--label3)" }}>{t.lastUpdated}</p>
        </div>

        <div className="card p-4 space-y-3">
          <p className="text-[14px]" style={{ color: "var(--label)" }}>{t.intro}</p>
        </div>

        <section className="space-y-2">
          <p className="sec-label">{t.contactTitle}</p>
          <div className="card p-2">
            {t.contactInfo.map((info, i) => (
              <React.Fragment key={info.label}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-3">
                  <span className="text-[14px] font-semibold" style={{ color: "var(--label)" }}>{info.label}</span>
                  <span className="text-[14px]" style={{ color: "var(--label2)" }}>{info.value}</span>
                </div>
                {i < t.contactInfo.length - 1 && <div className="h-px mx-3" style={{ background: "var(--sep)" }} />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {t.sections.map((section, idx) => (
          <section key={idx} className="space-y-2">
            <p className="sec-label">{section.title}</p>
            <div className="card p-4 space-y-4">
              <p className="text-[14px]" style={{ color: "var(--label)" }}>{section.content}</p>
              
              {section.items && (
                <div className="space-y-3 mt-4 pl-1">
                  {section.items.map((item, i) => (
                    <div key={i} className="space-y-1 border-l-2 pl-3" style={{ borderColor: "var(--blue)" }}>
                      <p className="text-[14px] font-semibold" style={{ color: "var(--label)" }}>{item.title}</p>
                      <p className="text-[13px]" style={{ color: "var(--label2)" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}
