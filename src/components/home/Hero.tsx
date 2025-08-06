"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const verticalTextVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, delay: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full items-center bg-white dark:bg-black">
      <div className="container mx-auto grid grid-cols-1 items-center gap-y-8 px-4 py-12 sm:py-16 lg:grid-cols-10 lg:gap-x-8 lg:gap-y-12">
        {/* Left: Text Content */}
        <motion.div
          className="order-last z-20 text-center lg:order-first lg:col-span-4 lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative inline-block">
            <motion.p
              variants={verticalTextVariant}
              className="absolute -left-12 top-1 hidden text-sm uppercase tracking-[0.5em] text-gray-400 [writing-mode:vertical-rl] lg:block"
            >
              Ai Beauty Promotion Association
            </motion.p>
            <h1 className="font-serif text-5xl font-medium leading-tight text-gray-800 dark:text-gray-100 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <motion.span variants={itemVariants} className="block">
                Achieve
              </motion.span>
              <motion.span variants={itemVariants} className="block">
                your
              </motion.span>
              <motion.span variants={itemVariants} className="block">
                goals
              </motion.span>
            </h1>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base max-w-md mx-auto lg:mx-0">
              AIとDXの力で、スタイリストが本業に集中できる環境を創出
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
            <Button asChild size="lg" className="touch-target w-full sm:w-auto">
              <Link href="/contact">
                お問い合わせ
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Image */}
      <motion.div
          className="relative order-first z-10 h-[40vh] w-full sm:h-[50vh] lg:order-last lg:col-span-6 lg:h-[85vh] rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/hero-background.png"
          alt="モダンで清潔感のある美容サロンの内装"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        </motion.div>
      </div>
    </section>
  );
} 