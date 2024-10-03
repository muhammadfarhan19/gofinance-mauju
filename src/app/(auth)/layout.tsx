import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./../globals.css";
import React from "react";
import { UserProvider } from "../hooks/UseUserData";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Go Finance",
  description: "Login Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <UserProvider>
          <main className="max-w-full h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <section className="hidden md:col-span-1 lg:col-span-2 bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79] md:flex md:flex-col md:justify-center md:items-start md:px-10 lg:px-24 xl:pl-40">
              <h1 className="font-bold text-4xl text-white">GoFinance</h1>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button className="mt-5 py-2 px-8 rounded-full bg-[#0575E6] text-white">
                Read More
              </button>
            </section>
            <section className="col-span-1 px-10 w-full h-full flex flex-col justify-center sm:px-16 md:px-10 xl:px-24">
              {children}
            </section>
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
