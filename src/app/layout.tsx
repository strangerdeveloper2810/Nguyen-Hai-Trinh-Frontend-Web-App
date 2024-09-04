import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import DefaultLayout from "@/Components/DefaultLayout/DefaultLayout";
import AppProvider from "./context/AppProvider";
import { ACCESS_TOKEN, ROLE } from "@/utils/setting";
import "./globals.css";

export const metadata: Metadata = {
  title: "User management",
  description: "User management develope by stranger developer",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value ?? "";
  const role = cookieStore.get(ROLE)?.value ?? "";
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <AppProvider initialAccessToken={accessToken} initialRole={role}>
            <DefaultLayout>{children}</DefaultLayout>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
