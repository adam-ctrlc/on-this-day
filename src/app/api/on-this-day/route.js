import { NextResponse } from "next/server";
import config from "@/app/config";

async function fetchOnThisDayData(month, day) {
  const allData = {};
  for (const happening of config.eventTypes) {
    const baseUrl = `${config.externalApi.baseUrl}/${month}/${day}/${happening}.json`;
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        console.warn(
          `Failed to fetch ${happening} data for ${month}/${day}: HTTP error! status: ${response.status}`
        );
        continue;
      }

      const data = await response.json();
      allData[happening] = data;
    } catch (error) {
      console.warn(
        `Failed to fetch ${happening} data for ${month}/${day}: ${error.message}`
      );
      continue;
    }
  }
  return allData;
}

const cleanDataItem = (item) => {
  if (!item || !item.description || !item.year) {
    return null;
  }
  return {
    year: item.year || "",
    description: item.description || "",
    wikipedia: item.wikipedia || [],
  };
};

const cleanDataSection = (section) => {
  if (!section || !Array.isArray(section)) {
    return [];
  }
  return section.map(cleanDataItem).filter((item) => item !== null);
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let month = searchParams.get("month");
  let day = searchParams.get("day");

  // Default to today if no params provided
  if (!month || !day) {
    const today = new Date();
    month = today.getMonth() + 1;
    day = today.getDate();
  } else {
    month = parseInt(month);
    day = parseInt(day);
  }

  try {
    const data = await fetchOnThisDayData(month, day);

    const cleanedData = {
      events: data.events
        ? { events: cleanDataSection(data.events.events) }
        : { events: [] },
      births: data.births
        ? { births: cleanDataSection(data.births.births) }
        : { births: [] },
      deaths: data.deaths
        ? { deaths: cleanDataSection(data.deaths.deaths) }
        : { deaths: [] },
    };

    return NextResponse.json(cleanedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
