import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StatsProvider } from '@/context/StatsContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NBA Stats Dashboard",
  description: "Track NBA player statistics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StatsProvider>
          {children}
        </StatsProvider>
      </body>
    </html>
  );
}
