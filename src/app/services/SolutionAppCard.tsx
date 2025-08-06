"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { type App } from "@/lib/data/apps-data";

type SolutionAppCardProps = {
  app: App;
  index: number;
};

export function SolutionAppCard({ app, index }: SolutionAppCardProps) {
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
      <Link href={`/apps?showApp=${app.id}`}>
        <Card className="flex flex-col h-full overflow-hidden cursor-pointer group">
          {/* アプリ画像 - 16:9アスペクト比 */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={app.slides[0].imageUrl}
              alt={app.slides[0].altText}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <CardContent className="flex flex-col flex-grow p-4">
            {/* アプリ名（太字） */}
            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
              {app.name}
            </h3>
            
            {/* キャッチコピー（30文字程度） */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {app.catchphrase}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}