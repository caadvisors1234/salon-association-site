"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { pricingPlans } from "@/lib/plans";
import { PricingCard } from "@/components/common/PricingCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export function PricingPreview() {
  const mainPlans = pricingPlans.filter(
    (plan) => plan.name !== "賛助会員"
  );
  const patronPlan = pricingPlans.find(
    (plan) => plan.name === "賛助会員"
  );

  return (
    <AnimatedSection className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl font-serif">
            料金プラン
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 px-2 sm:px-0">
            あなたのサロンの規模とニーズに合わせた、最適なプランをご提案します。
          </p>
        </div>
        {/* Main 3 Plans */}
        <motion.div
          className="mt-12 sm:mt-16 grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-stretch max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {mainPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className="h-full"
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>

        {/* Patron Plan */}
        {patronPlan && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="w-full max-w-md"
            >
              <PricingCard plan={patronPlan} />
            </motion.div>
          </div>
        )}

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Button asChild size="lg" className="touch-target w-full sm:w-auto">
            <Link href="/pricing">全てのプランを見る →</Link>
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
} 