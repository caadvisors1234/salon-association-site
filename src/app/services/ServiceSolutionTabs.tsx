"use client";


import { AnimatedSection } from "@/components/common/AnimatedSection";
import { SolutionAppCard } from "./SolutionAppCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Service } from "@/lib/data/services-data";
import { type App } from "@/lib/data/apps-data";

type ServiceSolutionTabsProps = {
  services: Service[];
  apps: App[];
};

export function ServiceSolutionTabs({ services, apps }: ServiceSolutionTabsProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <Tabs defaultValue={services[0]?.id} className="w-full">
        <TabsList className="grid w-full grid-cols-3 justify-center mb-16">
          {services.map((service) => (
            <TabsTrigger key={service.id} value={service.id} className="text-sm">
              {service.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {services.map((service) => (
          <TabsContent key={service.id} value={service.id} className="space-y-16">
            {/* ヒーローエリア */}
            <AnimatedSection>
              <div 
                className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden rounded-lg"
                style={{
                  backgroundImage: `url(${service.heroImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                {/* コンテンツ */}
                <div className="relative z-10 text-center px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {service.catchphrase}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                    {service.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* 関連アプリ紹介エリア */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    この課題を解決するアプリ
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {service.name}に特化したAIツールで、効率的な業務改善を実現します
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.relatedAppIds
                    .map(appId => apps.find(app => app.id === appId))
                    .filter((app): app is App => app !== undefined)
                    .map((app, index) => (
                      <SolutionAppCard 
                        key={app.id} 
                        app={app} 
                        index={index} 
                      />
                    ))}
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}