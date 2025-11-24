import { LuSearch } from "react-icons/lu";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full max-w-2xl mb-12 relative group">
      <input
        id="search-history"
        name="search"
        type="text"
        placeholder="Search history..."
        className="w-full p-4 pl-14 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl outline-none transition-all duration-200 text-lg text-gray-900 dark:text-white placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <LuSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors w-6 h-6" />
    </div>
  );
}
