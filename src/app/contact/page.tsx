import { PageHeader } from "@/components/common/PageHeader";
import { ContactForm } from "./ContactForm";
import { LineContactSection } from "@/components/common/LineContactSection";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export default function ContactPage() {
    // パンくずリスト用データ
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const breadcrumbItems = [
        { name: 'トップ', url: siteUrl },
        { name: 'お問い合わせ', url: `${siteUrl}/contact` }
    ];

    return (
        <>
            <BreadcrumbJsonLd items={breadcrumbItems} />
            
            <PageHeader
                title="お問い合わせ"
                description="ご相談、ご質問など、お気軽にお問い合わせください。"
                imageUrl="/images/page-header-1920x600.png"
            />
            <section className="py-24 bg-background">
                <div className="container mx-auto max-w-4xl space-y-12">
                    <AnimatedSection>
                        <ContactForm />
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                        <LineContactSection />
                    </AnimatedSection>
                </div>
            </section>
        </>
    )
}
