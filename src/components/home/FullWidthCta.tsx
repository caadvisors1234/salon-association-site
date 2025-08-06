"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function FullWidthCta() {
  return (
    <section className="relative py-16 sm:py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cta-background-1920x800.png"
          alt="AI技術のコンセプトを表す抽象的な背景画像"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative container mx-auto flex flex-col items-center text-center text-white px-4">
        <motion.h2
          className="font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          あなたのサロンに、<br className="sm:hidden" />革命を。
        </motion.h2>
        <motion.p
          className="mt-4 sm:mt-6 max-w-2xl text-sm text-gray-200 sm:text-base md:text-lg lg:text-xl px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="block sm:inline">もう一人で悩まない。</span>
          <span className="block sm:inline">AIビューティーサロン推進協会が、</span>
          <br className="hidden sm:block" />
          <span className="block sm:inline">集客から採用まで、</span>
          <span className="block sm:inline">あなたの経営をトータルでサポートします。</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 sm:mt-10"
        >
          <Button asChild className="font-bold text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 h-auto touch-target w-full sm:w-auto">
            <Link href="/contact">今すぐ相談する</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 