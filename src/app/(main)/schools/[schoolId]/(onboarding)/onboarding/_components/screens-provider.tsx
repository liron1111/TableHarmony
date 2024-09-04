"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";

import { studentScreens } from "./screens/student-screens";
import { teacherScreens } from "./screens/teacher-screens";

type Screens = {
  [key: string]: React.FC;
};

interface ScreensContextType {
  screens: Screens;
}

const ScreensContext = createContext<ScreensContextType>({
  screens: {} as Screens,
});

export function useScreens() {
  const context = useContext(ScreensContext);
  if (context === undefined) {
    throw new Error("useScreens must be used within a ScreensProvider");
  }
  return context;
}

export function ScreensProvider({ children }: { children: React.ReactNode }) {
  const { membership } = useMembership();

  const screens = useMemo(() => {
    switch (membership?.role) {
      case "teacher":
        return teacherScreens;
      case "student":
        return studentScreens;
      default:
        return {} as Screens;
    }
  }, [membership?.role]);

  return (
    <ScreensContext.Provider value={{ screens }}>
      {children}
    </ScreensContext.Provider>
  );
}
