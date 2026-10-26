"use client";

import ListenInApp from "@/features/audiobook/components/audiobook/ListenInApp.view";
import { container } from "@/shared/ui/static/tailwind.classes";

export default function ContinueInApp() {
  return (
    <section className={`${container("1300px")} my-10 mx-auto w-[97%] md:w-[90%]`}>
      <div className="rounded-xl bg-white/10 border border-white/20 p-6 text-center">
        <h2 className="text-white text-lg font-semibold mb-2">
          শোনা চালিয়ে যেতে অ্যাপ ব্যবহার করুন
        </h2>
        <p className="text-white/80 text-sm mb-4">
          ওয়েবে অডিওবুক প্লে করা যায় না — Kabbik অ্যাপে সব এপিসোড শুনুন।
        </p>
        <ListenInApp variant="inline" className="justify-center" />
      </div>
    </section>
  );
}
