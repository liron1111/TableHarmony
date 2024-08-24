import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexProvider } from "@/components/providers/convex-provider";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export async function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        <ConvexProvider>
          <TooltipProvider delayDuration={100}>
            {children}
            <Toaster />
          </TooltipProvider>
        </ConvexProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
