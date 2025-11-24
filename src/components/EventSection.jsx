import { useState } from "react";
import { LuArrowDownUp, LuChevronDown, LuChevronUp } from "react-icons/lu";
import EventCard from "./EventCard";

export default function EventSection({ title, items, sortOrder, onToggleSort }) {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 5);

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full max-w-2xl mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
          <span className="ml-3 text-lg font-medium text-gray-400 dark:text-gray-600">
            {items.length}
          </span>
        </h2>
        <button
          onClick={onToggleSort}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          title="Toggle Sort Order"
        >
          <LuArrowDownUp className={`w-5 h-5 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
        {displayedItems.map((item, index) => (
          <EventCard
            key={`${item.year}-${index}`}
            year={item.year}
            description={item.description}
            wikipediaLinks={item.wikipedia}
          />
        ))}
      </div>

      {items.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          {showAll ? "Show Less" : `Show ${items.length - 5} More`}
          {showAll ? <LuChevronUp className="w-4 h-4" /> : <LuChevronDown className="w-4 h-4" />}
        </button>
      )}
    </section>
  );
}
