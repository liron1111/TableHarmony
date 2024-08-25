"use client";

import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { useContext } from "react";
import { SchoolContext } from "./school-context";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  const { school } = useContext(SchoolContext);
  //TODO: fix this mess
  return <></>;
}
