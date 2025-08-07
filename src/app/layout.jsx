import { Inter } from "next/font/google";
import "@/app/globals.css";
import QueryProvider from "@/app/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Today, Years Ago - Historical Events & Facts",
  description:
    "Discover what happened on this day in history. Explore historical events, famous births, and notable deaths from years past. Perfect for history enthusiasts and curious minds.",
  keywords:
    "history, historical events, on this day, births, deaths, facts, timeline, past events",
  authors: [{ name: "Today Years Ago" }],
  creator: "Today Years Ago",
  publisher: "Today Years Ago",
  openGraph: {
    title: "Today, Years Ago - Historical Events & Facts",
    description:
      "Discover what happened on this day in history. Explore historical events, famous births, and notable deaths from years past.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Today, Years Ago - Historical Events & Facts",
    description:
      "Discover what happened on this day in history. Explore historical events, famous births, and notable deaths from years past.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: undefined,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
