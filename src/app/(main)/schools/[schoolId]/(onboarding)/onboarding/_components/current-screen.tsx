"use client";

import { useSearchParams } from "next/navigation";
import { useScreens } from "./screens-provider";

export function CurrentScreen() {
  const { screens } = useScreens();
  const searchParams = useSearchParams();

  const screen = searchParams.get("screen") || "";

  if (!screens) return <></>;

  const validScreen = Object.keys(screens).includes(screen)
    ? screen
    : Object.keys(screens)[0];

  const Screen = screens[validScreen];

  if (!Screen) return <></>;

  return <Screen />;
}
