"use client";

import useAuthStore from "@/store/useAuthStore";
import useAppStore from "@/store/useAppStore";

export default function SuggestedUsers() {
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useAppStore();

  const handleFollow = () => {
    if (!isAuthenticated) openLoginModal();
  };

  const users = [
    { id: 1, initials: "TM", name: "Tasfia M.", bgColor: "bg-rose-100 text-rose-600 dark:bg-rose-900/30" },
    { id: 2, initials: "KA", name: "Karim A.", bgColor: "bg-teal-100 text-[#1D9E75] dark:bg-teal-900/30" },
    { id: 3, initials: "JD", name: "Jane Doe", bgColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
  ];

  return (
    <div className="bg-white dark:bg-[#121212] rounded-lg border border-[#F0EDE8] dark:border-gray-800 overflow-hidden shadow-sm mt-4">
      <div className="p-4 border-b border-[#F0EDE8] dark:border-gray-800">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Suggested</h3>
      </div>
      <ul className="p-2 space-y-1">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${user.bgColor}`}>
                {user.initials}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user.name}
              </span>
            </div>
            <button 
              onClick={handleFollow}
              className="px-3 py-1 text-[11px] font-bold text-amber border border-amber/30 rounded-full hover:bg-amber hover:text-white transition-all shadow-sm"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
