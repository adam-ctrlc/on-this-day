"use client";

import { useState, useId, useEffect } from "react";
import TopNavigation from "@/components/TopNavigation";
import Sidebar from "@/components/Sidebar";
import TabFilter from "@/components/TabFilter";
import Timeline from "@/components/Timeline";

export default function Home() {
  const searchId = useId();
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[today.getMonth()]
  );
  const [selectedDay, setSelectedDay] = useState(today.getDate().toString());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const monthIndex = monthNames.indexOf(selectedMonth) + 1;
  const dayInt = parseInt(selectedDay);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/on-this-day?month=${monthIndex}&day=${dayInt}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [monthIndex, dayInt]);

  // Get all data from API
  const allEvents = data?.events?.events || [];
  const allBirths = data?.births?.births || [];
  const allDeaths = data?.deaths?.deaths || [];

  // Filter by search term
  const filterBySearch = (items) => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get filtered data based on active tab
  const getFilteredData = () => {
    switch (activeTab) {
      case "events":
        return filterBySearch(allEvents).map((e) => ({ ...e, type: "event" }));
      case "births":
        return filterBySearch(allBirths).map((e) => ({ ...e, type: "birth" }));
      case "deaths":
        return filterBySearch(allDeaths).map((e) => ({ ...e, type: "death" }));
      default:
        return [
          ...filterBySearch(allEvents).map((e) => ({ ...e, type: "event" })),
          ...filterBySearch(allBirths).map((e) => ({ ...e, type: "birth" })),
          ...filterBySearch(allDeaths).map((e) => ({ ...e, type: "death" })),
        ].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }
  };

  const filteredData = getFilteredData();
  const featuredEvents = allEvents.slice(0, 5); // Show up to 5 featured events

  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <TopNavigation />

      <main className="flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 p-6 lg:p-8">
        <Sidebar
          monthNames={monthNames}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          featuredEvents={featuredEvents}
        />

        <section className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-[#324467]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-medium">
                <span className="material-symbols-outlined text-lg">
                  calendar_today
                </span>
                <span className="uppercase tracking-wide text-sm">
                  Selected Date
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter dark:text-white">
                {selectedMonth} {selectedDay}
              </h1>
            </div>

            <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Search Bar */}
          <div className="flex relative items-center h-12 w-full bg-slate-100 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary/50">
            <span className="material-symbols-outlined absolute left-4 text-slate-400 dark:text-[#92a4c9]">
              search
            </span>
            <input
              id={searchId}
              className="w-full h-full pl-12 pr-4 bg-transparent border-none text-sm placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] text-slate-900 dark:text-white focus:ring-0"
              placeholder="Search events, births, deaths by keywords..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>

          <Timeline items={filteredData} isLoading={isLoading} />
        </section>
      </main>
    </div>
  );
}
