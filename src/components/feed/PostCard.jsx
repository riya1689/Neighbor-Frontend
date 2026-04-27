"use client";

import { MessageSquare, Share2, Star } from "lucide-react";
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
    <article className="bg-white dark:bg-[#121212] rounded-lg p-[10px] border border-[#F0EDE8] dark:border-gray-800 overflow-hidden flex flex-col gap-3">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pl-1 pr-1 pt-1">
        <div className="flex items-center space-x-2.5 min-w-0">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#E0F2F1] dark:bg-teal-900/30 flex items-center justify-center text-[#1D9E75] text-[11px] font-bold shrink-0">
            {post.authorName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "NR"}
          </div>
          
          <div className="flex flex-col flex-1 leading-[1.2] min-w-0">
            <h3 className="font-[600] text-gray-900 dark:text-gray-100 text-[13px] truncate">{post.authorName || "Nadia R."}</h3>
            <div className="flex items-center space-x-1.5 text-[11px] text-gray-500 mt-0.5">
               {/* Category Badge Text */}
               {post.category && (
                 <span className="font-semibold text-[#1D9E75] hover:underline cursor-pointer">
                   {post.category}
                 </span>
               )}
               {post.category && <span>•</span>}
               <span>{post.timeAgo || "4h ago"}</span>
            </div>
          </div>
        </div>

        {/* Tags top right */}
        <div className="flex items-center space-x-2 shrink-0">
          {post.isFeatured && (
             <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Featured</span>
          )}
          {post.isPremium && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF8E7] text-[#BA7517] border border-[#F3DAC0] dark:bg-amber-900/20 dark:border-amber-900/50">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Premium
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-1.5 mt-1">
        <h2 className="text-[16px] sm:text-[18px] font-[600] text-gray-900 dark:text-white mb-2 leading-snug">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-[14px] line-clamp-2 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Image Preview */}
      <div className="rounded-lg overflow-hidden border border-[#F0EDE8] dark:border-gray-800 bg-[#FAFAFA] dark:bg-[#1A1A1A] flex items-center justify-center min-h-[160px] mx-1 mt-1">
         {post.image ? (
            <img src={post.image} alt="Post media" className="w-full h-auto max-h-80 object-cover" />
         ) : (
            <span className="text-[12px] font-medium text-gray-400 tracking-wide select-none">[ Image Preview ]</span>
         )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between px-1.5 pt-2 pb-1">
        <div className="flex items-center space-x-4">
          <VoteButtons postId={post.id} initialScore={post.score || 0} />
          
          <button 
            onClick={handleInteraction}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium"
          >
            <MessageSquare className="w-[18px] h-[18px] stroke-[2]" />
            <span className="text-[13px]">{post.commentCount || 0}</span>
          </button>
        </div>

        <button className="flex items-center space-x-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium">
          <Share2 className="w-[18px] h-[18px] stroke-[2]" />
          <span className="text-[13px] hidden sm:inline">Share</span>
        </button>
      </div>

    </article>
  );
}

