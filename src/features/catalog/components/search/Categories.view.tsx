"use client";

import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { paths } from "@/utils/Paths";

export default function Categories() {
  const categories = useAppSelector((store) => store.categories.CategoriesData);

  return (
    <div className="max-w-[700px] mt-3 bg-bg/95 overflow-y-auto relative p-1 sm:p-2 md:p-6">
      <div className="grid mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 cursor-pointer mx-auto my-8">
        {categories?.map((category, index) => (
          <div
            key={index}
            style={{ background: category?.color }}
            className="rounded-2xl p-1 relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="transform z-0">
              <Link href={paths?.categoryWiseBooks(category?.name)}>
                <img
                  loading="lazy"
                  src={category.thumb_path}
                  alt={category.name}
                  className="w-full rounded-[8px] h-full aspect-[2/1] object-left-bottom object-cover shadow-2xl border-2 border-white/30"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
