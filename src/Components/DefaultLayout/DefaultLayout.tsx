import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "User management",
  description: "User management develope by stranger developer",
};
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {children}
      </div>
    </main>
  );
}
