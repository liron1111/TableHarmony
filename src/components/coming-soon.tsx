import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import Image from "next/image";

export function ComingSoon() {
  return (
    <div className={cn(cardStyles, "bg-inherit dark:bg-inherit")}>
      <p className="text-balance text-lg font-medium md:text-xl">
        Currently under construction
      </p>
      <Image
        src="/assets/under-construction.svg"
        width="300"
        height="300"
        alt="no posts"
      />
    </div>
  );
}
