export default function SkeletonLoader() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse">
      {["Events", "Births", "Deaths"].map((title) => (
        <section key={title} className="w-full max-w-2xl mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            {[1, 2, 3].map((i) => (
              <div key={i} className="pl-8 pb-8 border-l-2 border-gray-100 dark:border-gray-800 last:border-l-0 last:pb-0 relative">
                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-950"></div>
                 <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
