export default function TimelineItem({ item, index }) {
  return (
    <article className="relative flex flex-col md:flex-row gap-6 md:pl-20 group">
      {/* Dot */}
      <div
        className={`absolute left-[30px] top-3 size-2.5 rounded-full ring-4 ring-background-light dark:ring-background-dark hidden md:block z-10 transition-all ${
          index === 0
            ? "bg-primary group-hover:scale-125"
            : "bg-slate-400 dark:bg-[#324467] group-hover:bg-primary"
        }`}
      ></div>

      <div className="flex flex-col md:w-32 shrink-0">
        <span
          className={`text-4xl font-black font-display italic transition-colors ${
            index === 0
              ? "text-primary"
              : "text-slate-800 dark:text-slate-400 group-hover:text-primary"
          }`}
        >
          {item.year}
        </span>
      </div>

      <div className="flex-1 bg-white dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-xl p-6 hover:border-primary/50 transition-colors shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          {item.type === "birth" && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              Birth
            </span>
          )}
          {item.type === "death" && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Death
            </span>
          )}
          {item.type === "event" && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              Event
            </span>
          )}
        </div>
        <p className="text-slate-600 dark:text-[#92a4c9] leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Wikipedia Links */}
        {item.wikipedia && item.wikipedia.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-[#232f48]">
            <span className="text-xs font-semibold text-slate-500 dark:text-[#92a4c9] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">link</span>
              Related:
            </span>
            {item.wikipedia.map((wiki, idx) => (
              <a
                key={idx}
                href={wiki.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-[#111722] hover:bg-primary/10 dark:hover:bg-primary/20 border border-slate-200 dark:border-[#324467] hover:border-primary rounded text-xs text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
              >
                {wiki.title}
                <span className="material-symbols-outlined text-xs">
                  open_in_new
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
