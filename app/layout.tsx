import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutClient from "../components/LayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chaska Industries Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
