import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import Image from "next/image";

export function ComingSoon() {
  return (
    <div className={cn(cardStyles)}>
      <Image
        src="/assets/under-construction.svg"
        width="250"
        height="250"
        alt="under construction"
      />

      <p className="text-balance text-lg font-medium md:text-xl">
        Currently under construction
      </p>
    </div>
  );
}
