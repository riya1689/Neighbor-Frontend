"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import Link from "next/link";
import { MessageCircle, Briefcase, MapPin, Heart, Wrench, Sprout } from "lucide-react";

export default function Home() {
  const { neighborhoodId, openNeighborhoodModal } = useAppStore();

  useEffect(() => {
    // If we've hydrated the store and there's no id, open the modal
    // small timeout to ensure hydration has finished nicely
    const timer = setTimeout(() => {
      if (!neighborhoodId) {
        openNeighborhoodModal();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [neighborhoodId, openNeighborhoodModal]);

  const categories = [
    { name: "General Discussions", icon: MessageCircle, color: "bg-blue-100 text-blue-600" },
    { name: "Local Help & Services", icon: Wrench, color: "bg-amber-100 text-amber-600" },
    { name: "Hiring & Jobs", icon: Briefcase, color: "bg-purple-100 text-purple-600" },
    { name: "Places & Recommendations", icon: MapPin, color: "bg-teal-100 text-teal-600" },
    { name: "Health & Lifestyle", icon: Heart, color: "bg-rose-100 text-rose-600" },
    { name: "Events & Meetups", icon: Sprout, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-500">
      <section className="bg-gradient-to-br from-amber/10 via-amber/5 to-transparent dark:from-amber/10 dark:to-transparent rounded-3xl p-8 md:p-16 text-center border border-amber/20 w-full overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-amber/10 blur-3xl mix-blend-multiply dark:mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-teal/10 blur-3xl mix-blend-multiply dark:mix-blend-overlay"></div>
        
        <div className="relative z-10 w-full">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Welcome to <span className="text-amber">Neighbo</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connect with your neighborhood, share updates, discover local events, and build a stronger community together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/explore" className="px-8 py-3.5 bg-amber hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber/20 transition-all transform hover:scale-105 active:scale-95 text-center w-full sm:w-auto">
              Explore Feed
            </Link>
            <button 
              onClick={openNeighborhoodModal}
              className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700 w-full sm:w-auto"
            >
              Change Neighborhood
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Explore Categories</h2>
          <p className="text-gray-500 dark:text-gray-400">Discover what's happening around you.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <Link href={`/explore?category=${encodeURIComponent(cat.name)}`} key={i} className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-amber/50 transition-all cursor-pointer">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color} dark:bg-opacity-20`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm text-center group-hover:text-amber transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
