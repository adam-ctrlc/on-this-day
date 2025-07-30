import { NextResponse } from "next/server";

const happenings = ["events", "births", "deaths"];

async function fetchOnThisDayData(month, day) {
  const allData = {};
  for (const happening of happenings) {
    const baseUrl = `https://byabbe.se/on-this-day/${month}/${day}/${happening}.json`;
    const response = await fetch(baseUrl);

    if (!response.ok) {
      console.warn(
        `Failed to fetch ${happening} data for ${month}/${day}: HTTP error! status: ${response.status}`
      );
      continue;
    }

    const data = await response.json();
    allData[happening] = data;
  }
  return allData;
}

export async function GET() {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const allData = await fetchOnThisDayData(month, day);
    console.log("API Response Data:", allData);
    return NextResponse.json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { month, day } = await req.json();

    if (!month || !day) {
      return NextResponse.json(
        { error: "Month and day are required" },
        { status: 400 }
      );
    }

    const allData = await fetchOnThisDayData(month, day);
    console.log("API Response Data for POST:", allData);
    return NextResponse.json(allData);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
