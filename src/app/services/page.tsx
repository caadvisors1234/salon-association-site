import { PageHeader } from "@/components/common/PageHeader";
import { ServiceSolutionTabs } from "./ServiceSolutionTabs";
import { Suspense } from "react";
import { services } from "@/lib/data/services-data";
import { APPS_DATA as apps } from "@/lib/data/apps-data";

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                title="事業内容"
                description="私たちの提供するサービスは、単なるツール導入に留まりません。"
                imageUrl="/images/page-header-1920x600.png"
            />
            <Suspense fallback={<div>Loading...</div>}>
                <ServiceSolutionTabs services={services} apps={apps} />
            </Suspense>
        </>
    );
}
