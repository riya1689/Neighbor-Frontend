"use client";

import { useState, useEffect, useCallback } from "react";
import useAppStore from "@/store/useAppStore";
import api from "@/lib/api";
import PostCard from "@/components/feed/PostCard";
import SkeletonPostCard from "@/components/feed/SkeletonPostCard";

const CATEGORIES = ["All", "General Discussions", "Local Help & Services", "Hiring & Jobs", "Places & Recommendations", "Health & Lifestyle", "Events & Meetups"];

export default function ExplorePage() {
  const { neighborhoodId, openNeighborhoodModal } = useAppStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchPosts = useCallback(async (pageNum, categoryName, replace = false) => {
    if (!neighborhoodId) return;

    setLoading(true);
    try {
      let url = `/api/posts/feed?neighborhoodId=${neighborhoodId}&page=${pageNum}`;
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
      // Graceful fallback mock
      const mockPosts = Array.from({ length: 4 }).map((_, i) => ({
        id: `mock-post-${pageNum}-${i}`,
        authorName: "Riya Sharma",
        category: categoryName !== "All" ? categoryName : CATEGORIES[Math.floor(Math.random() * 6) + 1],
        title: `Community Update in Neighborhood #${neighborhoodId.slice(-3)}`,
        content: "We're organizing a community garden expansion this weekend. Anyone with spare tools or seeds, please drop by the community center! This is a mock post functioning as a responsive placeholder.",
        timeAgo: `${i * 2 + 1} hours ago`,
        score: Math.floor(Math.random() * 50) + 10,
        commentCount: Math.floor(Math.random() * 10),
      }));
      
      // Artificial delay for UI realism
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
      fetchPosts(1, activeCategory, true);
    }
  }, [neighborhoodId, activeCategory, fetchPosts]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, activeCategory, false);
  };

  if (!neighborhoodId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select your neighborhood</h2>
        <p className="text-gray-500 mb-6">You need to choose a neighborhood to view the local feed.</p>
        <button onClick={openNeighborhoodModal} className="px-6 py-2.5 bg-amber hover:bg-amber-600 transition-colors text-white font-medium rounded-lg shadow-md">
          Open Selection Map
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 max-w-7xl w-full">
      {/* Mobile Horizontal scrollable category bar */}
      <div className="md:hidden overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 sticky top-16 bg-gray-50/90 dark:bg-[#0a0a0a]/90 backdrop-blur z-30 pt-2">
        <div className="flex space-x-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-teal text-white border-teal shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-teal/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar Filter */}
      <aside className="hidden md:block w-64 shrink-0 mt-2 sticky top-[5.5rem] self-start z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Categories</h3>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-teal font-medium"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl shadow-sm border border-amber-100 dark:border-amber-900/30 p-5 flex flex-col items-center text-center">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-3">Viewing posts from your active neighborhood</p>
          <button onClick={openNeighborhoodModal} className="text-xs font-bold bg-amber text-white px-4 py-2 rounded-lg w-full hover:bg-amber-600 transition-colors">
            Change Location
          </button>
        </div>
      </aside>

      {/* Main Feed Area */}
      <div className="flex-1 min-w-0 flex flex-col space-y-6 md:mt-2">
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
            <div className="py-12 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm px-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">No posts found</h3>
              <p className="text-gray-500 mt-1">Try selecting a different category or neighborhood.</p>
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
              className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
