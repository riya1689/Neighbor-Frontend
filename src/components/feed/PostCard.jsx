"use client";

import { MessageSquare, Share2 } from "lucide-react";
import VoteButtons from "./VoteButtons";
import useAuthStore from "@/store/useAuthStore";
import useAppStore from "@/store/useAppStore";

export default function PostCard({ post }) {
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useAppStore();

  const handleInteraction = () => {
    if (!isAuthenticated) openLoginModal();
  };

  return (
    <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow duration-200 flex">
      {/* Side Vote Panel */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-2 sm:px-4 sm:py-6 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center shrink-0">
        <VoteButtons postId={post.id} initialScore={post.score || 0} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 w-full">
          <div className="flex items-center space-x-2 truncate pr-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber to-amber-600 flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
              {post.authorName?.charAt(0) || "U"}
            </div>
            <div className="text-sm truncate">
              <span className="font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                {post.authorName || "Unknown"}
              </span>
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-xs text-gray-500 shrink-0">{post.timeAgo || "Just now"}</span>
            </div>
          </div>
          {post.category && (
            <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-100 dark:border-teal-800">
              {post.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-3 whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Media Preview */}
        {post.image && (
          <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50">
            <img src={post.image} alt="Post media" className="w-full h-auto max-h-96 object-cover" />
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-4 pt-3 flex items-center space-x-4 border-t border-gray-100 dark:border-gray-800/60">
          <button 
            onClick={handleInteraction}
            className="flex items-center space-x-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-lg transition-colors text-sm font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentCount || 0} Comments</span>
          </button>
          <button className="flex items-center space-x-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-lg transition-colors text-sm font-medium">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}
