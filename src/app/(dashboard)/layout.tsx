import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./../globals.css";
import Navbar from "@/components/shared/Navbar";
import { UserProvider } from "../hooks/UseUserData";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Go Finance",
  description: "Welcome to Go Finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <UserProvider>
          <Navbar />
          <main className="w-screen h-screen grid place-items-center px-10 xl:px-36 relative">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
