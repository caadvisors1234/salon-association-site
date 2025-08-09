"use client";

import { motion } from "framer-motion";

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  disableInView = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * 一部環境（特にモバイルSafari等）で IntersectionObserver が不安定な場合、
   * 初期非表示を避けて常時表示に切り替えるためのフラグ。
   */
  disableInView?: boolean;
}) => {
  if (disableInView) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};