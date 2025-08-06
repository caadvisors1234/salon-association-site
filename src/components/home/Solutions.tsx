"use client";

import { AnimatedSection } from "@/components/common/AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const solutions = [
  {
    title: "集客の自動化",
    description:
      "集客自動化ツールを提供し、月間10時間かかっていた作業を1時間に短縮。ホットペッパービューティーを主軸に、サイバーアクセル・アドバイザーズ監修のノウハウで、作業時間を削減しつつ、成果を最大化します。",
    imageUrl: "/images/feature-card-1200x600-1.png",
    link: "/services#集客支援",
  },
  {
    title: "リピート率の向上",
    description:
      "生成AIと独自プログラムを組み合わせた最先端のリピート対策ツールを開発。カウンセリングや顧客データをAIが分析し、動画コンテンツと個別サポートで、持続的な顧客関係の構築とLifeTimeValueの向上を実現します。",
    imageUrl: "/images/feature-card-1200x600-2.png",
    link: "/services#リピート-ltv向上",
  },
  {
    title: "採用の最適化",
    description:
      "生成AIを活用した求人ツールと従業員エンゲージメントツールを提供。求人成功事例から逆算した時短ツールと、スタッフの定着を促す仕組みで、「退職＜入社」が上回る強い組織作りをバックアップします。",
    imageUrl: "/images/feature-card-1200x600-3.png",
    link: "/services#採用-組織力強化",
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
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
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.17, 0.67, 0.83, 0.67], // easeOutBack
    },
  },
};

export function Solutions() {
  return (
    <AnimatedSection className="py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="space-y-16 sm:space-y-24 lg:space-y-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={itemVariants}
              className={`relative flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <motion.div className="w-full lg:w-1/2 xl:w-3/5" variants={imageVariants}>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] overflow-hidden rounded-lg">
                  <Image
                    src={solution.imageUrl}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 800px"
                    className="object-cover shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div 
                className="w-full lg:w-1/2 xl:w-2/5 flex-shrink-0 text-center lg:text-left"
                variants={itemVariants}
              >
                <h2 className="mt-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl font-serif">
                  {solution.title}
                </h2>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300">
                  {solution.description}
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href={solution.link}
                    className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors touch-target justify-center lg:justify-start"
                  >
                    詳しく見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              
              {/* Vertical Label - Hidden on mobile */}
              <motion.div
                variants={itemVariants}
                className={`hidden xl:block absolute top-1/2 -translate-y-1/2 ${
                  index % 2 === 1
                    ? "left-0 -translate-x-full"
                    : "right-0 translate-x-full"
                } `}
                aria-hidden="true"
              >
                <p
                  className="[writing-mode:vertical-rl] text-8xl font-serif text-stone-200 dark:text-stone-800 tracking-widest"
                  style={{ textOrientation: "mixed" }}
                >
                  ABPA
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
} 