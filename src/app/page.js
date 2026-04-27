"use client";

import { useEffect, useState } from "react";
import useAppStore from "@/store/useAppStore";
import Link from "next/link";
import PostCard from "@/components/feed/PostCard";
import SkeletonPostCard from "@/components/feed/SkeletonPostCard";

export default function Home() {
  const { neighborhoodId, openNeighborhoodModal } = useAppStore();
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we've hydrated the store and there's no id, open the modal
    const timer = setTimeout(() => {
      if (!neighborhoodId) {
        openNeighborhoodModal();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [neighborhoodId, openNeighborhoodModal]);

  useEffect(() => {
    // Mocking an API call for featured posts
    const fetchFeatured = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 800)); // simulate delay
      setFeaturedPosts([
        {
          id: "feat-1",
          authorName: "Rafiq S.",
          category: "Local News",
          title: "New community park approved — construction begins Q3",
          content: "The long-awaited green space will span 3 acres with playground & garden...",
          timeAgo: "2h ago",
          score: 248,
          commentCount: 64,
          isPremium: true,
          isFeatured: false, // In mock image, there is no generic featured flag shown inside the card. Premium is there.
        },
        {
          id: "feat-2",
          authorName: "Tasfia M.",
          category: "Events",
          title: "Annual food festival returns — 40+ vendors confirmed",
          content: "The Dhaka Street Food Carnival is back! Live music, artisan stalls...",
          timeAgo: "5h ago",
          score: 189,
          commentCount: 31,
          isPremium: false,
          isFeatured: false,
        }
      ]);
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  const categories = ["All", "Local News", "Events", "Buy & Sell", "Food", "Sports"];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-2xl mx-auto w-full pb-12 pt-2">
      
      {/* Hero Section */}
      <section className="bg-[#FAEEDA] dark:bg-amber-900/10 rounded-xl p-8 md:p-12 text-center border border-[#F5D99A] dark:border-amber-900/50 w-full relative">
        <h1 className="text-3xl md:text-3xl font-[600] text-[#633806] dark:text-amber-500 mb-2 tracking-tight">
          Your Neighborhood, Connected
        </h1>
        <p className="text-sm md:text-[15px] text-[#A36614] dark:text-amber-600/80 mb-8 font-medium">
          Share stories, discover local content & connect
        </p>

        <div className="max-w-[380px] mx-auto flex items-center bg-white dark:bg-[#121212] rounded-md p-1 shadow-sm border border-[#E0DDD8] dark:border-gray-800 focus-within:ring-2 focus-within:ring-amber/50 transition-all">
           <input 
             type="text" 
             placeholder="Search topics, people..." 
             className="flex-1 bg-transparent border-none focus:ring-0 text-[14px] px-3 outline-none dark:text-gray-200 placeholder-gray-400"
           />
           <button className="bg-[#BA7517] hover:bg-[#A36614] text-white px-5 py-1.5 rounded-[4px] font-semibold text-sm transition-colors">
             Search
           </button>
        </div>
      </section>

      {/* Quick Filter Categories */}
      <section className="w-full px-1">
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 custom-scrollbar">
           {categories.map((cat) => (
             <Link 
               href={`/explore?category=${encodeURIComponent(cat)}`} 
               key={cat}
               className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                 cat === "All" 
                   ? "bg-amber-50 dark:bg-amber-900/20 text-[#D97706] border-[#F5D99A] dark:border-amber-700" 
                   : "bg-white dark:bg-[#121212] text-gray-500 dark:text-gray-400 border border-[#E0DDD8] dark:border-gray-800 hover:border-amber hover:text-amber"
               }`}
             >
               {cat}
             </Link>
           ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="w-full mt-2 px-1">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          Featured Posts
        </h3>
        
        <div className="flex flex-col space-y-4">
          {loading ? (
             <>
               <SkeletonPostCard />
               <SkeletonPostCard />
             </>
          ) : (
            featuredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </section>

    </div>
  );
}
