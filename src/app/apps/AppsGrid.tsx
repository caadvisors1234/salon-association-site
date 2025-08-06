"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { AppCard } from "@/components/apps/AppCard";
import { type App } from "@/lib/data/apps-data";

type AppsGridProps = {
  apps: App[];
};

export function AppsGrid({ apps }: AppsGridProps) {
  const searchParams = useSearchParams();
  const [autoOpenAppId, setAutoOpenAppId] = useState<string | null>(null);

  useEffect(() => {
    const showApp = searchParams.get('showApp');
    if (showApp) {
      setAutoOpenAppId(showApp);
    }
  }, [searchParams]);

  return (
    <>
      {/* イントロダクション */}
      <AnimatedSection className="mb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              AI技術で実現する、新しいサロン体験
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              私たちが開発したアプリケーションは、最新のAI技術を活用してサロン経営の課題を解決し、
              お客様により良いサービスを提供することを可能にします。
              以下のアプリケーションをぜひご覧ください。
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* アプリ一覧 - カード型グリッドレイアウト */}
      <AnimatedSection delay={0.2}>
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, index) => (
              <AppCard 
                key={app.id} 
                app={app} 
                index={index}
                autoOpen={autoOpenAppId === app.id}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}