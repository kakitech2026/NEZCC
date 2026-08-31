"use client";

import React, { useState } from "react";

type Media = { url?: string; alt?: string };
type GalleryItem = {
  id: string | number;
  title: string;
  type: 'image' | 'video';
  media?: Media | string | number | null;
  videoUrl?: string | null;
  date: string;
  order?: number | null;
};

type PageData = {
  heroTitle?: string | null;
  heroDescription?: string | null;
};

const imageCardLayouts = [
  "md:col-span-6 lg:col-span-5",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-4",
  "md:col-span-6 lg:col-span-3",
  "md:col-span-6 lg:col-span-5",
];

export default function GalleryClient({ items = [], pageData }: { items?: GalleryItem[], pageData?: PageData }) {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  const images = items.filter((item) => item.type === "image");
  const videos = items.filter((item) => item.type === "video");

  return (
    <main className="w-full flex-grow bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-[64px] max-w-[800px] mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="font-serif font-medium text-[40px] md:text-[56px] leading-[1.1] text-[#111111] tracking-tight mb-4">
          {pageData?.heroTitle || (
            <>
              Explore the Archive and
              <br />
              Witness our Living Heritage
            </>
          )}
        </h1>
        <p className="font-body-md text-[15px] text-[#444444] max-w-xl mb-8 whitespace-pre-wrap">
          {pageData?.heroDescription || "From vibrant festivals to intricate crafts, this gallery captures the essence of the North East's cultural legacy."}
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-2 bg-surface-container rounded-lg p-1 mb-2 shadow-sm">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-6 py-2 rounded-md font-medium text-[15px] transition-all ${
              activeTab === "images"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2 rounded-md font-medium text-[15px] transition-all ${
              activeTab === "videos"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Videos
          </button>
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max-width mx-auto">
        {activeTab === "images" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {images.length === 0 ? (
              <div className="md:col-span-12 text-center py-12 text-on-surface-variant">No images found.</div>
            ) : (
              images.map((item, index) => {
                const imageUrl = typeof item.media === 'object' && item.media !== null ? item.media.url : '';
                const altText = typeof item.media === 'object' && item.media !== null ? item.media.alt : item.title;
                const layoutClass = imageCardLayouts[index % imageCardLayouts.length];
                const isFeatured = index % 6 === 0;

                return (
                  <article
                    key={item.id}
                    className={`${layoutClass} group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <a
                      className={`relative block w-full overflow-hidden bg-slate-100 ${isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                      href={imageUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${item.title}`}
                    >
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={altText || item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={imageUrl}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500">
                          Image unavailable
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </a>

                    <div className="flex items-center justify-between gap-4 px-4 py-3">
                      <div className="min-w-0">
                        <h2 className="truncate text-[15px] font-semibold leading-6 text-slate-900">{item.title}</h2>
                        {item.date && (
                          <p className="text-[12px] font-medium text-slate-500">
                            {new Date(item.date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                      <a
                        className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                        href={imageUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.title}`}
                      >
                        <span className="material-symbols-outlined text-[12px]" aria-hidden="true">
                          north_east
                        </span>
                      </a>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.length === 0 ? (
              <div className="md:col-span-3 text-center py-12 text-on-surface-variant">No videos found.</div>
            ) : (
              videos.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 group cursor-pointer">
                  <div className="w-full aspect-video bg-surface-container-high rounded-sm flex flex-col items-center justify-center group-hover:bg-surface-container-highest transition-colors relative overflow-hidden">
                    <span className="material-symbols-outlined text-[48px] text-primary/80 z-10">play_circle</span>
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  </div>
                  <div className="flex justify-between items-center text-[12px] font-medium text-[#666666] pt-1">
                    <span className="truncate max-w-[70%]">{item.title}</span>
                    <a className="flex items-center gap-1 hover:text-black transition-colors flex-shrink-0" href={item.videoUrl || '#'} target="_blank" rel="noreferrer">
                      Watch <span className="material-symbols-outlined text-[12px]" aria-hidden="true">north_east</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}
