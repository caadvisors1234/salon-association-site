"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselSlide {
  imageUrl: string;
  altText: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function ImageCarousel({ 
  slides, 
  className,
  autoPlay = false,
  autoPlayInterval = 5000 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Set mounted state after hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Auto play functionality - only run on client side after mount
  React.useEffect(() => {
    if (!mounted || !autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [mounted, autoPlay, autoPlayInterval, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden rounded-lg bg-gray-100", className)}>
      {/* メイン画像エリア */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].imageUrl}
              alt={slides[currentIndex].altText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* ナビゲーションボタン (複数スライドがある場合のみ表示) */}
        {slides.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
              onClick={goToPrevious}
              aria-label="前のスライド"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
              onClick={goToNext}
              aria-label="次のスライド"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* インジケーター (複数スライドがある場合のみ表示) */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                )}
                aria-label={`スライド ${index + 1} に移動`}
              />
            ))}
          </div>
        </div>
      )}

      {/* スライド番号表示 (複数スライドがある場合のみ表示) */}
      {slides.length > 1 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/50 text-white text-sm px-2 py-1 rounded backdrop-blur-sm">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>
      )}
    </div>
  );
}