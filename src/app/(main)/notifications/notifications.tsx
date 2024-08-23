import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import Image from "next/image";

export function Notifications() {
  const notifications = [];

  if (notifications.length === 0)
    return (
      <div className={cn(cardStyles)}>
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no notifications"
        />

        <p className="text-balance font-medium">No unread notifications</p>
      </div>
    );
}
