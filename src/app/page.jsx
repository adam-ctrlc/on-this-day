"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const renderDescriptionWithLinks = (description, wikipediaLinks) => {
  let renderedDescription = description;

  if (wikipediaLinks && Array.isArray(wikipediaLinks)) {
    wikipediaLinks.forEach((link) => {
      const regex = new RegExp(`\\b${link.title}\\b`, "gi");
      renderedDescription = renderedDescription.replace(
        regex,
        `<a href="${link.wikipedia}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline transition-colors duration-200">${link.title}</a>`
      );
    });
  }

  return { __html: renderedDescription };
};

export default function Home() {
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
  const currentMonth = monthNames[today.getMonth()];
  const currentDay = today.getDate();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDay = `${currentDay}${getOrdinalSuffix(currentDay)}`;

  const [searchTerm, setSearchTerm] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAllBirths, setShowAllBirths] = useState(false);
  const [showAllDeaths, setShowAllDeaths] = useState(false);
  const [eventSortOrder, setEventSortOrder] = useState("desc");
  const [birthSortOrder, setBirthSortOrder] = useState("desc");
  const [deathSortOrder, setDeathSortOrder] = useState("desc");
  const [selectedMonth, setSelectedMonth] = useState(
    monthNames[today.getMonth()]
  );
  const [selectedDay, setSelectedDay] = useState(today.getDate().toString());
  const [currentDateForQuery, setCurrentDateForQuery] = useState({
    month: monthNames[today.getMonth()],
    day: today.getDate().toString(),
  });

  const currentDayFormatted = `${currentDateForQuery.day}${getOrdinalSuffix(
    parseInt(currentDateForQuery.day)
  )}`;

  const hasPendingChanges =
    selectedMonth !== currentDateForQuery.month ||
    parseInt(selectedDay) !== parseInt(currentDateForQuery.day);

  const handleFetchData = async () => {
    try {
      const monthIndex = monthNames.indexOf(currentDateForQuery.month) + 1;
      const dayInt = parseInt(currentDateForQuery.day);

      const isToday =
        monthIndex === today.getMonth() + 1 && dayInt === today.getDate();

      let response;
      if (isToday) {
        console.log("Fetching today's data via GET.");
        response = await fetch("/api/v1/landing");
      } else {
        console.log(
          "Fetching data for month:",
          monthIndex,
          "day:",
          dayInt,
          "via POST."
        );
        response = await fetch("/api/v1/landing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month: monthIndex, day: dayInt }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API response data:", data);
      return data;
    } catch (err) {
      console.error("Error fetching data:", err);
      throw new Error(`Failed to fetch data: ${err.message}`);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "onThisDayData",
      currentDateForQuery.month,
      currentDateForQuery.day,
    ],
    queryFn: handleFetchData,
    enabled: true,
  });

  const filterData = (items) => {
    console.log("Filtering with searchTerm:", searchTerm, "on items:", items);
    if (!searchTerm) return items;
    const filtered = items.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Filtered results:", filtered);
    return filtered;
  };

  const sortData = (items, sortOrder) => {
    if (!sortOrder || !items) return items;
    const sortedItems = [...items].sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);

      if (sortOrder === "asc") {
        return yearA - yearB;
      } else if (sortOrder === "desc") {
        return yearB - yearA;
      }
      return 0;
    });
    return sortedItems;
  };

  if (isLoading) {
    return (
      <div className="font-sans flex flex-col items-center min-h-screen p-4 lg:p-8 pb-20 gap-8 bg-gray-50 dark:bg-gray-900">
        <header className="text-center mb-8">
          <div className="animate-pulse h-10 w-64 bg-gray-200 rounded-md mb-2"></div>
          <div className="animate-pulse h-8 w-48 bg-gray-200 rounded-md"></div>
        </header>

        <div className="w-full max-w-4xl mb-4">
          <div className="animate-pulse h-12 bg-gray-200 rounded-md"></div>
        </div>

        <main className="flex flex-col gap-6 items-center w-full max-w-4xl">
          {[1, 2, 3].map((item) => (
            <section
              key={item}
              className="w-full border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 p-6 rounded-lg animate-pulse"
            >
              <div className="h-8 w-4/5 bg-gray-200 rounded mb-4"></div>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((subItem) => (
                  <li key={subItem} className="h-5 bg-gray-200 rounded"></li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 text-xl font-medium">
          Error: {error.message}
        </div>
      </div>
    );
  }

  const filteredEvents = data?.events?.events
    ? filterData(data.events.events)
    : [];
  const filteredBirths = data?.births?.births
    ? filterData(data.births.births)
    : [];
  const filteredDeaths = data?.deaths?.deaths
    ? filterData(data.deaths.deaths)
    : [];

  const sortedEvents = sortData(filteredEvents, eventSortOrder);
  const sortedBirths = sortData(filteredBirths, birthSortOrder);
  const sortedDeaths = sortData(filteredDeaths, deathSortOrder);

  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-4 lg:p-8 pb-20 gap-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-3 leading-tight">
          Today, Years Ago
        </h1>
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
          {currentDayFormatted} of {currentDateForQuery.month}
        </p>
      </header>

      <div className="w-full max-w-4xl mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-1/2">
          <select
            id="month-select"
            name="month"
            className="w-full p-3 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors duration-200 text-gray-800 dark:text-gray-100 appearance-none pr-10"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthNames.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none h-4 w-4" />
        </div>
        <input
          id="day-input"
          name="day"
          type="number"
          min="1"
          max="31"
          className="w-full sm:w-1/4 p-3 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors duration-200 text-gray-800 dark:text-gray-100"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        <button
          onClick={() =>
            setCurrentDateForQuery({
              month: selectedMonth,
              day: selectedDay,
            })
          }
          className={`w-full sm:w-1/4 p-3 rounded-lg transition-colors duration-200 focus:outline-none ${
            hasPendingChanges
              ? "bg-blue-400 text-white border border-blue-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {hasPendingChanges ? "Load Changes" : "Load Data"}
        </button>
      </div>

      <div className="w-full max-w-4xl mb-6 relative">
        <input
          type="text"
          name="search"
          placeholder="Search events, births, or deaths..."
          className="w-full p-4 pl-12 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>

      <main className="flex flex-col gap-6 items-center w-full max-w-4xl">
        {filteredEvents.length > 0 && (
          <section className="w-full border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 dark:border-gray-500 pb-3 flex justify-between items-center">
              Events
              <button
                onClick={() =>
                  setEventSortOrder(eventSortOrder === "asc" ? "desc" : "asc")
                }
                className={`p-1 rounded-md text-sm flex items-center gap-1 ${
                  eventSortOrder === "asc" ? "text-green-500" : "text-red-500"
                }`}
              >
                {eventSortOrder === "asc" ? (
                  <FaArrowUp className="h-5 w-5" />
                ) : (
                  <FaArrowDown className="h-5 w-5" />
                )}
              </button>
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {showAllEvents
                ? sortedEvents.map((event, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <p className="inline font-medium text-gray-900 dark:text-white">
                        {event.year}:
                      </p>{" "}
                      <span
                        dangerouslySetInnerHTML={renderDescriptionWithLinks(
                          event.description,
                          event.wikipedia
                        )}
                      ></span>
                    </li>
                  ))
                : sortedEvents.slice(0, 5).map((event, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <p className="inline font-medium text-gray-900 dark:text-white">
                        {event.year}:
                      </p>{" "}
                      <span
                        dangerouslySetInnerHTML={renderDescriptionWithLinks(
                          event.description,
                          event.wikipedia
                        )}
                      ></span>
                    </li>
                  ))}
            </ul>
            {sortedEvents.length > 5 && (
              <button
                onClick={() => setShowAllEvents(!showAllEvents)}
                className="mt-4 text-blue-600 hover:underline font-medium focus:outline-none flex items-center gap-1"
              >
                {showAllEvents
                  ? "Show Less"
                  : `Show More (${sortedEvents.length - 5} more)`}
                {showAllEvents ? (
                  <FaChevronUp className=" h-3 w-3" />
                ) : (
                  <FaChevronDown className="h-3 w-3" />
                )}
              </button>
            )}
          </section>
        )}

        {filteredBirths.length > 0 && (
          <section className="w-full border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 dark:border-gray-500 pb-3 flex justify-between items-center">
              Births
              <button
                onClick={() =>
                  setBirthSortOrder(birthSortOrder === "asc" ? "desc" : "asc")
                }
                className={`p-1 rounded-md text-sm flex items-center gap-1 ${
                  birthSortOrder === "asc" ? "text-green-500" : "text-red-500"
                }`}
              >
                {birthSortOrder === "asc" ? (
                  <FaArrowUp className="h-5 w-5" />
                ) : (
                  <FaArrowDown className="h-5 w-5" />
                )}
              </button>
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {showAllBirths
                ? sortedBirths.map((birth, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <p className="inline font-medium text-gray-900 dark:text-white">
                        {birth.year}:
                      </p>{" "}
                      <span
                        dangerouslySetInnerHTML={renderDescriptionWithLinks(
                          birth.description,
                          birth.wikipedia
                        )}
                      ></span>
                    </li>
                  ))
                : sortedBirths.slice(0, 5).map((birth, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <p className="inline font-medium text-gray-900 dark:text-white">
                        {birth.year}:
                      </p>{" "}
                      <span
                        dangerouslySetInnerHTML={renderDescriptionWithLinks(
                          birth.description,
                          birth.wikipedia
                        )}
                      ></span>
                    </li>
                  ))}
            </ul>
            {sortedBirths.length > 5 && (
              <button
                onClick={() => setShowAllBirths(!showAllBirths)}
                className="mt-4 text-blue-600 hover:underline font-medium focus:outline-none flex items-center gap-1"
              >
                {showAllBirths
                  ? "Show Less"
                  : `Show More (${sortedBirths.length - 5} more)`}
                {showAllBirths ? (
                  <FaChevronUp className="h-3 w-3" />
                ) : (
                  <FaChevronDown className="h-3 w-3" />
                )}
              </button>
            )}
          </section>
        )}

        {filteredDeaths.length > 0 && (
          <section className="w-full border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 dark:border-gray-500 pb-3 flex justify-between items-center">
              Deaths
              <button
                onClick={() =>
                  setDeathSortOrder(deathSortOrder === "asc" ? "desc" : "asc")
                }
                className={`p-1 rounded-md text-sm flex items-center gap-1 ${
                  deathSortOrder === "asc" ? "text-green-500" : "text-red-500"
                }`}
              >
                {deathSortOrder === "asc" ? (
                  <FaArrowUp className="h-5 w-5" />
                ) : (
                  <FaArrowDown className="h-5 w-5" />
                )}
              </button>
            </h2>
            <ul className="list-disc list-inside space-y-3">
              {showAllDeaths
                ? sortedDeaths.map((death, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <p className="inline font-medium text-gray-900 dark:text-white">
                        {death.year}:
                      </p>{" "}
                      <span
                        dangerouslySetInnerHTML={renderDescriptionWithLinks(
                          death.description,
                          death.wikipedia
                        )}
                      ></span>
                    </li>
                  ))
                : sortedDeaths.slice(0, 5).map((death, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      <p className="inline font-medium text-gray-900 dark:text-white">
                        {death.year}:
                      </p>{" "}
                      <span
                        dangerouslySetInnerHTML={renderDescriptionWithLinks(
                          death.description,
                          death.wikipedia
                        )}
                      ></span>
                    </li>
                  ))}
            </ul>
            {sortedDeaths.length > 5 && (
              <button
                onClick={() => setShowAllDeaths(!showAllDeaths)}
                className="mt-4 text-blue-600 hover:underline font-medium focus:outline-none flex items-center gap-1"
              >
                {showAllDeaths
                  ? "Show Less"
                  : `Show More (${sortedDeaths.length - 5} more)`}
                {showAllDeaths ? (
                  <FaChevronUp className="h-3 w-3" />
                ) : (
                  <FaChevronDown className="h-3 w-3" />
                )}
              </button>
            )}
          </section>
        )}

        {filteredEvents.length === 0 &&
          filteredBirths.length === 0 &&
          filteredDeaths.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
              No data available for today or matching your search.
            </p>
          )}
      </main>
    </div>
  );
}
