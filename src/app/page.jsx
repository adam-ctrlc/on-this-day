"use client";

import { useQuery as useApolloQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ON_THIS_DAY } from "@/services/queries";
import Header from "@/components/Header";
import DateSelector from "@/components/DateSelector";
import SearchBar from "@/components/SearchBar";
import EventSection from "@/components/EventSection";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function Home() {
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [eventSortOrder, setEventSortOrder] = useState("desc");
  const [birthSortOrder, setBirthSortOrder] = useState("desc");
  const [deathSortOrder, setDeathSortOrder] = useState("desc");
  
  const [selectedMonth, setSelectedMonth] = useState(monthNames[today.getMonth()]);
  const [selectedDay, setSelectedDay] = useState(today.getDate().toString());
  
  const [currentDateForQuery, setCurrentDateForQuery] = useState({
    month: monthNames[today.getMonth()],
    day: today.getDate().toString(),
  });

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const currentDayFormatted = `${currentDateForQuery.day}${getOrdinalSuffix(parseInt(currentDateForQuery.day))}`;
  const hasPendingChanges = selectedMonth !== currentDateForQuery.month || parseInt(selectedDay) !== parseInt(currentDateForQuery.day);
  const monthIndex = monthNames.indexOf(currentDateForQuery.month) + 1;
  const dayInt = parseInt(currentDateForQuery.day);

  const { data, loading: isLoading, error, refetch } = useApolloQuery(GET_ON_THIS_DAY, {
    variables: { month: monthIndex, day: dayInt },
  });

  const filterData = (items) => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortData = (items, sortOrder) => {
    if (!sortOrder || !items) return items;
    return [...items].sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });
  };

  const handleLoadData = () => {
    setCurrentDateForQuery({ month: selectedMonth, day: selectedDay });
    const newMonthIndex = monthNames.indexOf(selectedMonth) + 1;
    const newDayInt = parseInt(selectedDay);
    refetch({ month: newMonthIndex, day: newDayInt });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const filteredEvents = data?.onThisDay?.events?.events ? filterData(data.onThisDay.events.events) : [];
  const filteredBirths = data?.onThisDay?.births?.births ? filterData(data.onThisDay.births.births) : [];
  const filteredDeaths = data?.onThisDay?.deaths?.deaths ? filterData(data.onThisDay.deaths.deaths) : [];

  const sortedEvents = sortData(filteredEvents, eventSortOrder);
  const sortedBirths = sortData(filteredBirths, birthSortOrder);
  const sortedDeaths = sortData(filteredDeaths, deathSortOrder);

  const hasData = filteredEvents.length > 0 || filteredBirths.length > 0 || filteredDeaths.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <main className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        <Header 
          currentDayFormatted={currentDayFormatted} 
          currentMonth={currentDateForQuery.month} 
        />

        <DateSelector
          monthNames={monthNames}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          onLoadData={handleLoadData}
          hasPendingChanges={hasPendingChanges}
        />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {isLoading ? (
          <SkeletonLoader />
        ) : hasData ? (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <EventSection
              title="Events"
              items={sortedEvents}
              sortOrder={eventSortOrder}
              onToggleSort={() => setEventSortOrder(eventSortOrder === "asc" ? "desc" : "asc")}
            />
            <EventSection
              title="Births"
              items={sortedBirths}
              sortOrder={birthSortOrder}
              onToggleSort={() => setBirthSortOrder(birthSortOrder === "asc" ? "desc" : "asc")}
            />
            <EventSection
              title="Deaths"
              items={sortedDeaths}
              sortOrder={deathSortOrder}
              onToggleSort={() => setDeathSortOrder(deathSortOrder === "asc" ? "desc" : "asc")}
            />
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl">No historical records found for this criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
