"use client";

import { useScreens } from "./screens-provider";

export function CurrentScreen({ screen }: { screen: string }) {
  const { screens } = useScreens();

  if (!screen) return <></>;

  // Get the keys of the screens object
  const screenKeys = Object.keys(screens) as Array<keyof typeof screens>;

  // Check if the provided screen is a valid key, otherwise use the first screen
  const validScreen = screenKeys.includes(screen as keyof typeof screens)
    ? (screen as keyof typeof screens)
    : screenKeys[0];

  const Screen = screens[validScreen];

  return <Screen />;
}
