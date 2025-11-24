import { LuCalendar } from "react-icons/lu";

export default function Header({ currentDayFormatted, currentMonth }) {
  return (
    <header className="text-center mb-12 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
        <LuCalendar className="w-8 h-8" />
        <span className="text-sm font-bold tracking-wider uppercase">On This Day</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
        Today in History
      </h1>
      <p className="text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400">
        {currentDayFormatted} of {currentMonth}
      </p>
    </header>
  );
}
