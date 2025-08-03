import { Inter } from "next/font/google";
import "@/app/globals.css";
import QueryProvider from "@/app/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Today, Years Ago",
  description:
    "Learn about historical events, births, and deaths on any given day.",
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
