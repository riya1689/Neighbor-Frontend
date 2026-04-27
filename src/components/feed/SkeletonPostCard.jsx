export default function SkeletonPostCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex animate-pulse">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-2 sm:px-4 sm:py-6 border-r border-gray-100 dark:border-gray-800 flex flex-col items-center shrink-0">
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded my-1"></div>
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
      </div>

      <div className="flex-1 p-4 sm:p-5 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>

        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        <div className="pt-3 flex items-center space-x-4 border-t border-gray-100 dark:border-gray-800/60">
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
