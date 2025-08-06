"use client";

import { AnimatedSection } from "@/components/common/AnimatedSection";
import { motion, Variants, Easing } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as Easing,
    },
  },
};

const title = "美容師の平均年収を、500万円以上へ";

export function AboutAssociation() {
  return (
    <AnimatedSection className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-sm sm:text-base font-semibold leading-7 text-primary"
            variants={itemVariants}
          >
            協会設立の想い
          </motion.h2>
          <motion.p 
            className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl font-serif"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {title.split("").map((char, index) => (
              <motion.span key={index} variants={itemVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
          <motion.p 
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-400 px-2 sm:px-0"
            variants={itemVariants}
          >
            理美容師のなり手が不足する一方、店舗はオーバーストア状態。
            私たちは、AIとDXの力でこの構造的な課題を解決し、すべてのスタイリストが本業に誇りと喜びを持って集中できる環境を創出。協会サポート店舗の美容師が、平均年収500万円以上を達成する社会の実現を目指します。
          </motion.p>
          <motion.div className="mt-8 sm:mt-10" variants={itemVariants}>
            <Button asChild className="touch-target w-full sm:w-auto">
              <Link href="/about">
                協会概要を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
} 