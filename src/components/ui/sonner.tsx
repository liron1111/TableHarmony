"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={3000}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group toast group-[.toaster]:bg-green-100 dark:group-[.toaster]:bg-green-200 group-[.toaster]:text-green-600 dark:group-[.toaster]:text-green-700 group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          error:
            "group toast group-[.toaster]:bg-red-100 dark:group-[.toaster]:bg-red-200 dark:group-[.toaster]:text-red-600 group-[.toaster]:text-red-500 group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
