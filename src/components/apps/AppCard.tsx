"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { motion } from "framer-motion";
import { type App } from "@/lib/data/apps-data";

type AppCardProps = {
  app: App;
  index: number;
  autoOpen?: boolean;
};

export function AppCard({ app, index, autoOpen = false }: AppCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsModalOpen(true);
    }
  }, [autoOpen]);

  // 特徴タグを抽出（最初の3つまで）
  const featureTags = app.features?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full hover:shadow-xl transition-shadow duration-300"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <Card className="flex flex-col h-full overflow-hidden">
        {/* アプリ画像 */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={app.slides[0].imageUrl}
            alt={app.slides[0].altText}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
            {app.name}
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {app.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow pt-0">
          {/* 特徴タグ */}
          <div className="flex flex-wrap gap-2 mb-4">
            {featureTags.map((feature, featureIndex) => (
              <span
                key={featureIndex}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 border border-pink-200"
              >
                {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
              </span>
            ))}
          </div>

        </CardContent>

        <CardFooter className="pt-4">
          <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
            <SheetTrigger asChild>
              <Button className="w-full" size="lg">
                詳しく見る
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
              <SheetHeader className="space-y-4 px-2">
                <SheetTitle className="text-2xl font-bold text-left">
                  {app.name}
                </SheetTitle>
                <SheetDescription className="text-left text-base text-gray-600">
                  {app.description}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6 px-2">
                {/* スライドショー */}
                <div className="aspect-video rounded-lg overflow-hidden">
                  <ImageCarousel 
                    slides={app.slides.map(slide => ({
                      imageUrl: slide.imageUrl,
                      altText: slide.altText
                    }))}
                    autoPlay={app.slides.length > 1}
                    autoPlayInterval={4000}
                  />
                </div>

                {/* 詳細説明 */}
                {app.detailedDescription && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      詳細説明
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {app.detailedDescription}
                    </p>
                  </div>
                )}

                {/* 主な機能 */}
                {app.features && app.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      主な機能・効果
                    </h3>
                    <div className="grid gap-3">
                      {app.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    このアプリにご興味をお持ちですか？
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    詳細な機能説明やデモンストレーションについては、お気軽にお問い合わせください。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <a href="/contact">お問い合わせ</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/pricing">料金プランを見る</a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </CardFooter>
      </Card>
    </motion.div>
  );
}