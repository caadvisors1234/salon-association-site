"use client";

import { motion } from "framer-motion";

export default function Loading() {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        loop: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-primary dark:border-gray-700 dark:border-t-primary"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variants={spinnerVariants as any}
        animate="animate"
      />
    </div>
  );
} 