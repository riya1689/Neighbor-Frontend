"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import useAppStore from "@/store/useAppStore";
import api from "@/lib/api";

export default function VoteButtons({ postId, initialScore = 0 }) {
  const [score, setScore] = useState(initialScore);
  const [voteStatus, setVoteStatus] = useState(null); // 'upvote', 'downvote', or null
  const [isVoting, setIsVoting] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useAppStore();

  const handleVote = async (type) => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    if (isVoting) return;
    setIsVoting(true);

    try {
      const response = await api.post(`/api/posts/${postId}/vote`, {
        type: type.toUpperCase()
      });
      
      setScore(response.data?.data?.totalTally ?? response.data?.totalTally ?? score);
      
      if (voteStatus === type) {
        setVoteStatus(null);
      } else {
        setVoteStatus(type);
      }
    } catch (err) {
      // Soft fail
    } finally {
      setIsVoting(false);
    }
  };

  // Dynamic pill background and border classes
  let pillClasses = "flex flex-row items-center border border-[#E0DDD8] dark:border-gray-700 rounded-[20px] px-2 py-0.5 space-x-2 transition-colors";
  
  let upvoteBtnClass = "p-1 rounded-full transition-colors flex items-center justify-center ";
  let downvoteBtnClass = "p-1 rounded-full transition-colors flex items-center justify-center ";
  let textClass = "text-xs font-semibold ";

  if (voteStatus === 'upvote') {
    pillClasses = "flex flex-row items-center border border-[#1D9E75] bg-[#E0F2F1] dark:bg-teal-900/30 rounded-[20px] px-2 py-0.5 space-x-2 transition-colors";
    upvoteBtnClass += "text-[#1D9E75]";
    downvoteBtnClass += "text-gray-400 hover:text-gray-600 dark:text-gray-500";
    textClass += "text-[#1D9E75]";
  } else if (voteStatus === 'downvote') {
    pillClasses = "flex flex-row items-center border border-[#FF6B6B] bg-[#FFE5E5] dark:bg-red-900/30 rounded-[20px] px-2 py-0.5 space-x-2 transition-colors";
    upvoteBtnClass += "text-gray-400 hover:text-gray-600 dark:text-gray-500";
    downvoteBtnClass += "text-[#FF6B6B]";
    textClass += "text-[#FF6B6B]";
  } else {
    upvoteBtnClass += "text-gray-500 hover:text-[#1D9E75] dark:text-gray-400";
    downvoteBtnClass += "text-gray-500 hover:text-[#FF6B6B] dark:text-gray-400";
    textClass += "text-gray-600 dark:text-gray-300";
  }

  return (
    <div className={pillClasses}>
      <button
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className={upvoteBtnClass}
        aria-label="Upvote"
      >
        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
      </button>
      
      <span className={textClass}>
        {score}
      </span>
      
      <button
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className={downvoteBtnClass}
        aria-label="Downvote"
      >
        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
