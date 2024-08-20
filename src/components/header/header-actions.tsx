import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";
import { Notifications } from "./notifications";
import { MenuButton } from "./menu-button";
import { SendFeedbackSheet } from "./send-feedback-sheet";

import { MessageCircleIcon } from "lucide-react";

export function HeaderActions() {
  return (
    <>
      <SignedIn>
        <div className="flex items-center gap-0.5">
          <SendFeedbackSheet>
            <Button size="icon" variant="ghost" aria-label="feedback">
              <MessageCircleIcon className="size-4" />
            </Button>
          </SendFeedbackSheet>
          <Notifications />
          <div className="hidden md:block">
            <ModeToggle variant="button" />
          </div>
          <div className="flex items-center md:ml-2">
            <MenuButton />
          </div>
        </div>
      </SignedIn>
    </>
  );
}
