"use client";

import React, { createContext, useContext } from "react";
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

  if (!membership) return <></>; //TODO: IDK if this is the best way to handle this

  let screens: Screens = {} as Screens;

  switch (membership?.role) {
    case "teacher":
      screens = teacherScreens;
      break;
    case "student":
      screens = studentScreens;
      break;
  }

  return (
    <ScreensContext.Provider value={{ screens }}>
      {children}
    </ScreensContext.Provider>
  );
}
