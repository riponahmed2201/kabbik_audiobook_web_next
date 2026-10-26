"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "কাব্যিক ফুটবল ওয়ার্ল্ড কাপ কুইজ ক্যাম্পেইন ২০২৬ কী?",
    a: "এটি FIFA World Cup 2026 ভিত্তিক একটি পেইড কুইজ ক্যাম্পেইন, যেখানে ব্যবহারকারীরা প্রতিটি ম্যাচ শুরুর আগে কুইজে অংশ নিতে পারবেন।",
  },
  {
    q: "ক্যাম্পেইনের সময়কাল কতদিন?",
    a: "ক্যাম্পেইন চলবে ১২ জুন ২০২৬ থেকে ২০ জুলাই ২০২৬ পর্যন্ত, অর্থাৎ পুরো ওয়ার্ল্ড কাপ সময়জুড়ে।",
  },
  {
    q: "কিভাবে কুইজে অংশ নেওয়া যাবে?",
    a: "ব্যবহারকারীরা Kabbik Website অথবা Android/iOS App এর মাধ্যমে কুইজে অংশ নিতে পারবেন।",
  },
  {
    q: "কুইজে অংশগ্রহণ ফি কত?",
    a: "প্রতিদিনের কুইজ এন্ট্রি ফি মাত্র ৫ টাকা।",
  },
  {
    q: "৫ টাকা দিয়ে কয়টি ম্যাচ কুইজ খেলা যাবে?",
    a: "একদিনে যতগুলো ম্যাচ থাকবে, ৫ টাকা দিয়ে ওই দিনের সব ম্যাচ কুইজ খেলা যাবে।",
  },
  {
    q: "প্রতিটি ম্যাচের জন্য আলাদা টাকা দিতে হবে কি?",
    a: "না। প্রতিদিন একবার ৫ টাকা দিলেই ওই দিনের সব ম্যাচ কুইজ আনলক হবে।",
  },
  {
    q: "নতুন ব্যবহারকারীরা কী সুবিধা পাবেন?",
    a: "নতুন ব্যবহারকারীরা প্রথমবার ৫ টাকা দিয়ে অংশ নিলে ৩০ দিনের কাব্যিক প্রিমিয়াম অ্যাক্সেস পাবেন, আর জয়লাভ করলে সাথে থাকছে এক্সাইটিং প্রাইজ।",
  },
  {
    q: "৩০ দিনের প্রিমিয়াম অ্যাক্সেস শেষ হলে কী হবে?",
    a: "৩০ দিন শেষে সাবস্ক্রিপশন মাসিক ৫০ টাকায় অটো-রিনিউ হবে, যদি ব্যবহারকারী আগে ডিঅ্যাক্টিভ না করেন।",
  },
  {
    q: "ব্যবহারকারী কি সাবস্ক্রিপশন বন্ধ করতে পারবেন?",
    a: "হ্যাঁ। ৩০ দিনের মধ্যে সাবস্ক্রিপশন ডিঅ্যাক্টিভ করলে পরবর্তীতে কোনো অটো-রিনিউ চার্জ হবে না।",
  },
  {
    q: "প্রতিটি ম্যাচ কুইজে কয়টি প্রশ্ন থাকবে?",
    a: "প্রতিটি ম্যাচ কুইজে ৫টি প্রশ্ন থাকবে।",
  },
  {
    q: "স্কোরিং সিস্টেম কী?",
    a: "প্রতিটি সঠিক উত্তরের জন্য ৫ পয়েন্ট। ভুল বা স্কিপ করলে ০ পয়েন্ট। সর্বোচ্চ স্কোর ২৫।",
  },
  {
    q: "নেগেটিভ মার্কিং আছে কি?",
    a: "না। কোনো নেগেটিভ মার্কিং নেই।",
  },
  {
    q: "কুইজ কখন বন্ধ হবে?",
    a: "প্রতিটি ম্যাচ কুইজ, ম্যাচের অফিসিয়াল কিক-অফ টাইমে, বাংলাদেশ সময় অনুযায়ী বন্ধ হয়ে যাবে।",
  },
  {
    q: "ম্যাচ শুরু হওয়ার পর কি কুইজ খেলা যাবে?",
    a: "না। ম্যাচ শুরু হলে অংশগ্রহণ বন্ধ হয়ে যাবে।",
  },
  {
    q: "মোট কতজন বিজয়ী থাকবেন?",
    a: "প্রতিটি ম্যাচে ১ জন বিজয়ী থাকবেন। মোট ১০৪ ম্যাচে ১০৪ জন বিজয়ী।",
  },
  {
    q: "বিজয়ী নির্বাচন কীভাবে হবে?",
    a: "সর্বোচ্চ সঠিক উত্তর, সর্বোচ্চ পয়েন্ট এবং সবচেয়ে কম সময়ে সাবমিশনের ভিত্তিতে বিজয়ী নির্বাচন করা হবে।",
  },
  {
    q: "একই ব্যবহারকারী কি একাধিকবার জিততে পারবেন?",
    a: "হ্যাঁ। একই ব্যবহারকারী নিয়ম মেনে একাধিক ম্যাচে বিজয়ী হতে পারবেন।",
  },
  {
    q: "বিজয়ী ঘোষণা কখন হবে?",
    a: "কাব্যিক কর্তৃপক্ষের যাচাই-বাছাই শেষে ৫ কর্মদিবসের মধ্যে বিজয়ী ঘোষণা করা হবে।",
  },
  {
    q: "পুরস্কার কখন দেওয়া হবে?",
    a: "বিজয়ী ঘোষণার পর ১৫ কর্মদিবসের মধ্যে পুরস্কার প্রদান করা হবে।",
  },
  {
    q: "কী কী পুরস্কার থাকবে?",
    a: "গ্রুপ স্টেজ থেকে ফাইনাল পর্যন্ত বিভিন্ন ধাপে Charger, Mobile Recharge, Vegetable & Fruit Purifier, E-Massager, Smart Watch এবং Grand Prize হিসেবে iPhone 17 Pro Max থাকবে।",
  },
  {
    q: "iPhone 17 Pro Max জেতার যোগ্যতা কী?",
    a: "ফাইনাল ম্যাচ কুইজের বিজয়ী হতে হবে এবং Round of 16 থেকে Final পর্যন্ত প্রতিটি ম্যাচ-ডে কুইজে অংশ নিতে হবে।",
  },
  {
    q: "Round of 16 থেকে Final পর্যন্ত অংশগ্রহণ বলতে কী বোঝায়?",
    a: "Round of 16, Quarterfinal, Semifinal, Third-place Match এবং Final — এই ধাপগুলোর প্রতিটি ম্যাচ-ডেতে এন্ট্রি ফি দিয়ে কুইজে অংশ নিতে হবে।",
  },
  {
    q: "কোন কাজগুলো নিষিদ্ধ?",
    a: "বট, স্ক্রিপ্ট, অটোমেশন, AI-ভিত্তিক অনৈতিক ব্যবহার, ফ্রড বা যেকোনো unfair activity সম্পূর্ণ নিষিদ্ধ।",
  },
  {
    q: "নিয়ম ভঙ্গ করলে কী হবে?",
    a: "নিয়ম ভঙ্গ করলে ব্যবহারকারীকে পূর্ব নোটিশ ছাড়াই ডিসকোয়ালিফাই করা হতে পারে।",
  },
  {
    q: "চূড়ান্ত সিদ্ধান্ত কার হবে?",
    a: "বিজয়ী নির্বাচন, যাচাই, পুরস্কার প্রদান ও ডিসকোয়ালিফিকেশন বিষয়ে কাব্যিক কর্তৃপক্ষের সিদ্ধান্তই চূড়ান্ত।",
  },
  {
    q: "কাস্টমার সাপোর্টে কীভাবে যোগাযোগ করা যাবে?",
    a: "ইমেইল: support@wondersoftsolution.com | কল/WhatsApp: +880 1915-225026 | সময়: সকাল ১১টা থেকে সন্ধ্যা ৭টা | দিন: শনিবার থেকে বৃহস্পতিবার (সরকারি ও পাবলিক ছুটির দিন ব্যতীত)।",
  },
  {
    q: "ক্যাম্পেইনের ডিসক্লেইমার কী?",
    a: "শর্তাবলী প্রযোজ্য। কুইজ অংশগ্রহণ ম্যাচের অফিসিয়াল কিক-অফ টাইমে বন্ধ হবে। বিজয়ী নির্বাচন সিস্টেমে রেকর্ডকৃত স্কোর ও সাবমিশন সময়ের ভিত্তিতে হবে। যেকোনো ফ্রড, বট, স্ক্রিপ্ট বা unfair activity ব্যবহার করলে ব্যবহারকারী ডিসকোয়ালিফাই হতে পারেন। কাব্যিক কর্তৃপক্ষের সিদ্ধান্ত চূড়ান্ত বলে গণ্য হবে।",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-[#BC0974]/50 shadow-lg shadow-[#BC0974]/10"
          : "border-white/10 hover:border-[#BC0974]/30"
      }`}
      style={
        isOpen
          ? { background: "linear-gradient(180deg, rgba(188,9,116,0.12) 0%, rgba(80,34,106,0.18) 100%)" }
          : { background: "rgba(255,255,255,0.03)" }
      }
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
      >
        {/* Index badge */}
        <span
          className="flex-shrink-0 w-8 h-8 rounded-[50%] flex items-center justify-center text-xs font-bold transition-all duration-300"
          style={
            isOpen
              ? { background: "linear-gradient(180deg, #BC0974 0%, #50226A 100%)", color: "#fff", boxShadow: "0 4px 14px rgba(188,9,116,0.4)" }
              : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }
          }
        >
          {index + 1}
        </span>

        {/* Question */}
        <span
          className={`flex-1 text-sm md:text-[15px] font-medium leading-snug transition-colors duration-300 ${
            isOpen ? "text-white" : "text-white/70 group-hover:text-white"
          }`}
        >
          {item.q}
        </span>

        {/* Chevron */}
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-180" : "group-hover:opacity-100 opacity-50"
          }`}
          style={
            isOpen
              ? { background: "linear-gradient(180deg, #BC0974 0%, #50226A 100%)", color: "#fff" }
              : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }
          }
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pl-[4.25rem]">
            <div
              className="h-px mb-3"
              style={{ background: "linear-gradient(90deg, rgba(188,9,116,0.4) 0%, rgba(80,34,106,0.2) 60%, transparent 100%)" }}
            />
            <p className="text-white/55 text-sm md:text-[15px] leading-relaxed">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative py-0 px-4 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top centre — brand pink */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px]"
        //   style={{ background: "radial-gradient(ellipse, rgba(188,9,116,0.18) 0%, transparent 70%)" }}
        />
        {/* Bottom right — brand purple */}
        <div
          className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(80,34,106,0.22) 0%, transparent 70%)" }}
        />
        {/* Mid left — softer pink */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-20 w-[300px] h-[300px] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(ellipse, rgba(188,9,116,0.10) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border"
            style={{
              background: "linear-gradient(180deg, rgba(188,9,116,0.15) 0%, rgba(80,34,106,0.15) 100%)",
              borderColor: "rgba(188,9,116,0.35)",
            }}
          >
            <span className="text-sm">⚽</span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ background: "linear-gradient(90deg,#BC0974,#c94fa0)",lineHeight:1.3, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              FIFA World Cup Quiz 2026
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            সাধারণ{" "} জিজ্ঞাসা
            {/* <span
              className=""
              style={{ background: "linear-gradient(180deg, #BC0974 0%, #50226A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              
            </span> */}
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(188,9,116,0.6))" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(180deg,#BC0974,#50226A)" }} />
            <div className="h-px w-16" style={{ background: "linear-gradient(270deg, transparent, rgba(80,34,106,0.6))" }} />
          </div>

          <p className="text-white/40 mt-4 text-sm max-w-md mx-auto">
            ক্যাম্পেইন সম্পর্কে যেকোনো প্রশ্নের উত্তর নিচে পাবেন
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2.5">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Support footer */}
        <div
          className="mt-12 rounded-2xl px-6 py-5 text-center border"
          style={{
            background: "linear-gradient(180deg, rgba(188,9,116,0.10) 0%, rgba(80,34,106,0.14) 100%)",
            borderColor: "rgba(188,9,116,0.25)",
          }}
        >
          <p className="text-white/40 text-sm mb-1">আরও প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন</p>
          <p className="text-white/80 text-sm font-medium">
            📞 +880 1915-225026 &nbsp;&nbsp;|&nbsp;&nbsp; ✉️ support@wondersoftsolution.com
          </p>
        </div>
      </div>
    </section>
  );
}