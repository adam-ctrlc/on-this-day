// API Configuration
const config = {
  // External API base URL
  externalApi: {
    baseUrl: "https://byabbe.se/on-this-day",
  },

  // Event types to fetch
  eventTypes: ["events", "births", "deaths"],

  // Application settings
  app: {
    name: "Historical Events Viewer",
    description:
      "Discover historical events, births, and deaths that happened on this day in history.",
  },
};

export default config;
