import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";

const typeDefs = gql`
  type WikipediaLink {
    title: String
    wikipedia: String
  }

  type Event {
    year: String
    description: String
    wikipedia: [WikipediaLink]
  }

  type Birth {
    year: String
    description: String
    wikipedia: [WikipediaLink]
  }

  type Death {
    year: String
    description: String
    wikipedia: [WikipediaLink]
  }

  type EventsData {
    events: [Event]
  }

  type BirthsData {
    births: [Birth]
  }

  type DeathsData {
    deaths: [Death]
  }

  type OnThisDayData {
    events: EventsData
    births: BirthsData
    deaths: DeathsData
  }

  type Query {
    onThisDay(month: Int, day: Int): OnThisDayData
  }
`;

const happenings = ["events", "births", "deaths"];

async function fetchOnThisDayData(month, day) {
  const allData = {};
  for (const happening of happenings) {
    const baseUrl = `https://byabbe.se/on-this-day/${month}/${day}/${happening}.json`;
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

const resolvers = {
  Query: {
    onThisDay: async (_, { month, day }) => {
      if (!month || !day) {
        const today = new Date();
        month = today.getMonth() + 1;
        day = today.getDate();
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

        return cleanedData;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
