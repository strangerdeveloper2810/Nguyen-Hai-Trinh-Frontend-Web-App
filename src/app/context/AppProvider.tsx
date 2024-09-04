"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  role: string;
  accessToken: string;
  setRole: (role: string) => void;
  setAccessToken: (token: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  initialAccessToken = "",
  initialRole = "KhachHang", // Default role value
}: {
  children: ReactNode;
  initialAccessToken?: string;
  initialRole?: string; // Allow setting an initial role
}) {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [role, setRole] = useState(initialRole);

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
}
