import TimelineItem from "./TimelineItem";

export default function Timeline({ items, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative h-12 w-12">
          <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-primary/30"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-transparent border-t-primary absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 opacity-50">
        <p className="text-xl">
          No historical records found for this criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Vertical Line */}
      <div className="absolute left-8 top-4 bottom-0 w-px bg-slate-200 dark:bg-[#232f48] hidden md:block"></div>

      {items.map((item, index) => (
        <TimelineItem key={`${item.year}-${index}`} item={item} index={index} />
      ))}
    </div>
  );
}
