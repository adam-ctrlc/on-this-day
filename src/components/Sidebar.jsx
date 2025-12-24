import { useId } from "react";

export default function Sidebar({
  monthNames,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  featuredEvents,
}) {
  const monthId = useId();
  const dayId = useId();

  const getDaysInMonth = (month) => {
    const monthIdx = monthNames.indexOf(month);
    return new Date(2024, monthIdx + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth);
  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
      {/* Date Picker Card */}
      <div className="bg-white dark:bg-[#192233] border border-gray-200 dark:border-[#324467] rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-1 dark:text-white">
          Select a Date
        </h3>
        <p className="text-sm text-slate-500 dark:text-[#92a4c9] mb-6">
          Travel back in time to discover what happened.
        </p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9]">
                Month
              </span>
              <div className="relative">
                <select
                  id={monthId}
                  className="w-full h-12 bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#324467] rounded-lg text-slate-900 dark:text-white px-3 appearance-none focus:border-primary focus:ring-primary"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {monthNames.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9]">
                Day
              </span>
              <div className="relative">
                <select
                  id={dayId}
                  className="w-full h-12 bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#324467] rounded-lg text-slate-900 dark:text-white px-3 appearance-none focus:border-primary focus:ring-primary"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {dayOptions.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
            </label>
          </div>
          <button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined text-[20px]">
              travel_explore
            </span>
            Explore History
          </button>
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="flex flex-col gap-5 max-h-[700px] overflow-y-auto pr-2">
          {featuredEvents.map((event, index) => (
            <div
              key={`featured-${event.year}-${index}`}
              className="bg-gradient-to-br from-[#192233] to-[#111722] border border-[#324467] rounded-xl overflow-hidden relative group min-h-[360px]"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
              <div className="relative p-6 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                  Featured
                </div>
                <h4 className="text-xl font-serif italic text-white mb-3 leading-snug break-words">
                  {event.description.split(".")[0]}
                </h4>
                <p
                  className="text-sm text-slate-300 mb-4 leading-relaxed break-words overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {event.description}
                </p>
                {event.wikipedia && event.wikipedia.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.wikipedia.slice(0, 2).map((wiki, idx) => (
                      <a
                        key={idx}
                        href={wiki.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs text-white transition-colors"
                      >
                        <span className="truncate max-w-[120px]">
                          {wiki.title}
                        </span>
                        <span className="material-symbols-outlined text-xs flex-shrink-0">
                          open_in_new
                        </span>
                      </a>
                    ))}
                  </div>
                )}
                <span className="text-sm text-primary hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer">
                  Year {event.year}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
