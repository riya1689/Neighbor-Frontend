export default function Home() {
  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-500">
      <section className="bg-amber/10 dark:bg-amber/5 rounded-3xl p-8 md:p-16 text-center border border-amber/20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Welcome to <span className="text-amber">Neighbo</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Connect with your neighborhood, share updates, discover local events, and build a stronger community together.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3.5 bg-amber hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber/20 transition-all transform hover:scale-105 active:scale-95">
            Join Neighborhood
          </button>
          <button className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-sm transition-all transform hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700">
            Explore Posts
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending in your Area</h2>
          <button className="text-amber font-medium hover:text-amber-600 transition-colors">View all →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton placeholders to simulate posts loading */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 dark:bg-gray-700 w-full"></div>
              <div className="p-5">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded text-gray-300 dark:text-gray-500 w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded text-gray-300 dark:text-gray-500 w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
