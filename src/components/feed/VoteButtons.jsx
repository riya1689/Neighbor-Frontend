"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
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
      // Failed to vote softly handle
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1 border border-gray-100 dark:border-gray-700">
      <button
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className={`p-1 rounded transition-colors ${
          voteStatus === 'upvote' 
            ? 'text-amber bg-amber-50 dark:bg-amber-900/20' 
            : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-amber'
        }`}
        aria-label="Upvote"
      >
        <ArrowBigUp className={`w-5 h-5 ${voteStatus === 'upvote' ? 'fill-current' : ''}`} />
      </button>
      
      <span className={`text-xs font-bold my-1 ${
         voteStatus === 'upvote' ? 'text-amber' : voteStatus === 'downvote' ? 'text-teal' : 'text-gray-700 dark:text-gray-300'
      }`}>
        {score}
      </span>
      
      <button
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className={`p-1 rounded transition-colors ${
          voteStatus === 'downvote' 
            ? 'text-teal bg-teal-50 dark:bg-teal-900/20' 
            : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-teal'
        }`}
        aria-label="Downvote"
      >
        <ArrowBigDown className={`w-5 h-5 ${voteStatus === 'downvote' ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}
