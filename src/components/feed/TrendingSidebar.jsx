"use client";

export default function TrendingSidebar() {
  const trendingTopics = [
    { id: 1, text: "Community Park Proposal" },
    { id: 2, text: "Food Carnival Tickets" },
    { id: 3, text: "Traffic — Downtown Area" },
    { id: 4, text: "New Bakery Opening" },
  ];

  return (
    <div className="bg-white dark:bg-[#121212] rounded-lg border border-[#F0EDE8] dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#F0EDE8] dark:border-gray-800">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trending Today</h3>
      </div>
      <ul className="divide-y divide-[#F0EDE8] dark:divide-gray-800">
        {trendingTopics.map((item, index) => (
          <li key={item.id} className="p-4 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 cursor-pointer transition-colors flex items-start space-x-3">
            <span className="text-amber font-bold text-sm">{index + 1}</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
