"use client";

import { useState, useEffect, useCallback } from "react";
import useAppStore from "@/store/useAppStore";
import api from "@/lib/api";
import PostCard from "@/components/feed/PostCard";
import SkeletonPostCard from "@/components/feed/SkeletonPostCard";
import TrendingSidebar from "@/components/feed/TrendingSidebar";
import SuggestedUsers from "@/components/feed/SuggestedUsers";
import { 
  LayoutGrid, Newspaper, Calendar, ShoppingBag, Coffee, Trophy, 
  User, Bookmark, Settings, Plus, ChevronDown
} from "lucide-react";
import Link from "next/link";

const BROWSE_LINKS = [
  { name: "All Posts", id: "All", icon: LayoutGrid, color: "text-amber" },
  { name: "Local News", id: "Local News", icon: Newspaper, color: "text-gray-500" },
  { name: "Events", id: "Events", icon: Calendar, color: "text-indigo-500" },
  { name: "Buy & Sell", id: "Buy & Sell", icon: ShoppingBag, color: "text-teal-500" },
  { name: "Food", id: "Food", icon: Coffee, color: "text-rose-500" },
  { name: "Sports", id: "Sports", icon: Trophy, color: "text-blue-500" },
];

const ACCOUNT_LINKS = [
  { name: "My Profile", icon: User },
  { name: "Saved", icon: Bookmark },
  { name: "Settings", icon: Settings },
];

const SORT_TABS = ["Hot", "New", "Top", "Rising"];

export default function ExplorePage() {
  const { neighborhoodId, openNeighborhoodModal } = useAppStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Hot");

  const fetchPosts = useCallback(async (pageNum, categoryName, sortOpt, replace = false) => {
    if (!neighborhoodId) return;

    setLoading(true);
    try {
      let url = `/api/posts/feed?neighborhoodId=${neighborhoodId}&page=${pageNum}&sort=${sortOpt.toLowerCase()}`;
      if (categoryName !== "All") {
        url += `&categoryName=${encodeURIComponent(categoryName)}`;
      }

      const response = await api.get(url);
      const fetchedPosts = response.data?.data || response.data || [];
      
      if (replace) {
        setPosts(fetchedPosts);
      } else {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      }
      
      setHasMore(fetchedPosts.length > 0 && fetchedPosts.length >= 10);
    } catch (error) {
      // Mock fallback data representing the UI correctly based on category map
      const mockPosts = Array.from({ length: 4 }).map((_, i) => ({
        id: `mock-post-${pageNum}-${i}`,
        authorName: ["Rafiq S.", "Nadia R.", "Karim A.", "Tasfia M."][i % 4],
        category: categoryName !== "All" ? categoryName : ["Local News", "Buy & Sell", "Events", "Local News"][i % 4],
        title: [
          "New community park approved by city council",
          "Selling — barely used standing desk, Gulshan pickup",
          "Annual food festival returns — 40+ vendors confirmed",
          "Traffic extremely bad near Mirpur 10 roundabout"
        ][i % 4],
        content: "The long-awaited project will span 3 acres... \nThis is a mock post representation. Real feed connects strictly through backend schemas.",
        timeAgo: `${(i * 2 + 1) + (pageNum * 2)}h ago`,
        score: Math.floor(Math.random() * 250) + 10,
        commentCount: Math.floor(Math.random() * 60),
        isPremium: i === 2,
        isFeatured: false,
      }));
      
      await new Promise(r => setTimeout(r, 600));

      if (replace) {
        setPosts(mockPosts);
      } else {
        setPosts((prev) => [...prev, ...mockPosts]);
      }
      setHasMore(pageNum < 3); // cap mocks
    } finally {
      setLoading(false);
    }
  }, [neighborhoodId]);

  useEffect(() => {
    if (neighborhoodId) {
      setPage(1);
      fetchPosts(1, activeCategory, activeSort, true);
    }
  }, [neighborhoodId, activeCategory, activeSort, fetchPosts]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, activeCategory, activeSort, false);
  };

  if (!neighborhoodId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select your neighborhood</h2>
        <p className="text-gray-500 mb-6">You need to choose a neighborhood to view the local feed.</p>
        <button onClick={openNeighborhoodModal} className="px-6 py-2.5 bg-amber hover:bg-amber-600 transition-colors text-white font-medium rounded-lg shadow-md">
          Open Selection Map
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full relative">
      
      {/* 
        ==============================
        MOBILE CATEGORY BAR (Horizontal) 
        ==============================
      */}
      <div className="lg:hidden overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 sticky top-16 bg-gray-50/90 dark:bg-[#0a0a0a]/90 backdrop-blur z-30 pt-2">
        <div className="flex space-x-2">
          {BROWSE_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveCategory(link.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === link.id
                  ? "bg-amber text-white border-amber shadow-sm"
                  : "bg-white dark:bg-[#121212] text-gray-600 dark:text-gray-300 border-[#F0EDE8] dark:border-gray-800 hover:border-amber/50"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* 
        ==============================
        LEFT SIDEBAR (Desktop) 
        ==============================
      */}
      <aside className="hidden lg:block w-56 shrink-0 mt-2 sticky top-[5.5rem] self-start z-10">
        
        {/* BROWSE */}
        <div className="mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">Browse</h3>
          <ul className="space-y-0.5">
            {BROWSE_LINKS.map((link) => {
              const isActive = activeCategory === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveCategory(link.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-[13px] transition-all font-medium ${
                      isActive
                        ? "bg-amber-50 dark:bg-amber-900/10 text-amber"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <div className={`w-5 flex items-center justify-center ${isActive ? "text-amber" : link.color}`}>
                       <link.icon className="w-[18px] h-[18px] stroke-[2]" />
                    </div>
                    <span>{link.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ACCOUNT */}
        <div className="mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">Account</h3>
          <ul className="space-y-0.5">
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href="#"
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-[13px] transition-all font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] hover:text-gray-900 dark:hover:text-gray-200`}
                >
                  <div className="w-5 flex items-center justify-center text-gray-400">
                     <link.icon className="w-[18px] h-[18px] stroke-[2]" />
                  </div>
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full py-2.5 bg-[#BA7517] hover:bg-[#A36614] text-white rounded-lg font-bold text-sm transition-colors shadow-sm mb-4">
          + Create Post
        </button>

      </aside>


      {/* 
        ==============================
        CENTER FEED 
        ==============================
      */}
      <div className="flex-1 min-w-0 flex flex-col md:mt-2">
        
        {/* Sort & Filter Controls Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
           <div className="flex items-center space-x-1 border border-[#F0EDE8] dark:border-gray-800 p-0.5 rounded-full bg-white dark:bg-[#121212] overflow-x-auto custom-scrollbar shadow-sm shrink-0">
             {SORT_TABS.map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveSort(tab)}
                 className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                   activeSort === tab 
                    ? "bg-[#D97706] text-white" 
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>

           <div className="hidden sm:flex items-center justify-end shrink-0">
             <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-white dark:bg-[#121212] border border-[#F0EDE8] dark:border-gray-800 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1A1A1A] transition-colors shadow-sm">
                <span>Best</span>
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
             </button>
           </div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
             <PostCard key={post.id} post={post} />
          ))}

          {loading && (
            <div className="space-y-4">
              <SkeletonPostCard />
              {posts.length === 0 && <SkeletonPostCard />}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="py-12 text-center bg-white dark:bg-[#121212] rounded-lg border border-[#F0EDE8] dark:border-gray-800 shadow-sm px-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">No posts found</h3>
              <p className="text-[#8E8E93] text-sm mt-1">Try selecting a different category or neighborhood.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {hasMore && posts.length > 0 && !loading && (
          <div className="pt-4 pb-8 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-2.5 bg-white dark:bg-[#121212] border border-[#F0EDE8] dark:border-gray-800 rounded-full text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
            >
              C Load more posts...
            </button>
          </div>
        )}
      </div>

      {/* 
        ==============================
        RIGHT SIDEBAR (Desktop) 
        ==============================
      */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 mt-2 sticky top-[5.5rem] self-start z-10 gap-4">
         <TrendingSidebar />
         <SuggestedUsers />
      </aside>

    </div>
  );
}

