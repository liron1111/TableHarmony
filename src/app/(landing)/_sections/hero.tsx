"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWrapper } from "@/components/image-wrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center space-y-7">
        <motion.div
          className="flex flex-col items-center space-y-7 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="max-w-3xl text-4xl font-semibold leading-none tracking-tight md:text-5xl xl:text-7xl"
            variants={itemVariants}
          >
            {siteConfig.title}
          </motion.h1>
          <motion.p
            className="max-w-sm font-light text-muted-foreground md:text-lg lg:text-xl"
            variants={itemVariants}
          >
            {siteConfig.description}
          </motion.p>
          <motion.div variants={itemVariants}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="group w-56">
                  Get started
                  <ArrowRightIcon className="ml-0 size-0 opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:size-4 group-hover:opacity-100" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button className="w-56" asChild>
                <Link href="/schools">Dashboard</Link>
              </Button>
            </SignedIn>
          </motion.div>
        </motion.div>

        <ImageWrapper
          lightSrc="/landing/hero-light.png"
          darkSrc="/landing/hero-dark.png"
          alt="Hero Image"
          width={1222}
          height={636}
          className="max-w-6xl sm:max-w-4xl sm:px-6 sm:pt-8 md:max-w-screen-xl lg:px-8"
        />
      </div>
    </section>
  );
}
