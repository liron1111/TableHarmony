import Image from "next/image";

interface ImageWrapperProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ImageWrapper({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className,
}: ImageWrapperProps) {
  return (
    <div className={className}>
      <div className="-m-2 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 dark:bg-neutral-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
        <Image
          alt={alt}
          width={width}
          height={height}
          className="rounded-md bg-white shadow-2xl ring-1 ring-neutral-900/10 dark:hidden"
          src={lightSrc}
        />
        <Image
          alt={alt}
          width={width}
          height={height}
          className="hidden rounded-md bg-black shadow-2xl ring-1 ring-neutral-900/10 dark:block"
          src={darkSrc}
        />
      </div>
    </div>
  );
}
