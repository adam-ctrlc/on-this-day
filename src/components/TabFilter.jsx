export default function TabFilter({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "events", label: "Events" },
    { id: "births", label: "Births" },
    { id: "deaths", label: "Deaths" },
  ];

  return (
    <div className="flex p-1 bg-slate-100 dark:bg-[#192233] rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-md text-sm transition-all min-w-[80px] ${
            activeTab === tab.id
              ? "bg-white dark:bg-[#232f48] shadow-sm text-slate-900 dark:text-white font-bold"
              : "hover:bg-white/50 dark:hover:bg-[#232f48]/50 text-slate-600 dark:text-[#92a4c9] font-medium"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
