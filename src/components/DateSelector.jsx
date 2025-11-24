import { LuChevronDown, LuRefreshCw } from "react-icons/lu";

export default function DateSelector({
  monthNames,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  onLoadData,
  hasPendingChanges,
}) {
  return (
    <div className="w-full max-w-2xl mb-8 flex flex-col sm:flex-row gap-3 items-center">
      <div className="relative w-full sm:w-1/2 group">
        <select
          id="month-select"
          name="month"
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl outline-none transition-all duration-200 text-gray-900 dark:text-white font-medium appearance-none cursor-pointer"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthNames.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
      </div>
      
      <div className="w-full sm:w-1/4">
        <input
          id="day-input"
          name="day"
          type="number"
          min="1"
          max="31"
          className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl outline-none transition-all duration-200 text-gray-900 dark:text-white font-medium text-center"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
      </div>

      <button
        onClick={onLoadData}
        className={`w-full sm:w-1/4 p-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
          hasPendingChanges
            ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
            : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-default"
        }`}
      >
        <LuRefreshCw className={`w-5 h-5 ${hasPendingChanges ? "animate-spin-slow" : ""}`} />
        {hasPendingChanges ? "Load" : "Ready"}
      </button>
    </div>
  );
}
