export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#232f48] bg-white/90 dark:bg-[#111722]/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-2xl">
              history_edu
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight dark:text-white">
            Historical Events Viewer
          </h2>
        </div>
      </div>
    </header>
  );
}
