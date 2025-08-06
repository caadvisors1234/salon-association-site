import { PageHeader } from "@/components/common/PageHeader";
import { ContactForm } from "./ContactForm";
import { LineContactSection } from "@/components/common/LineContactSection";
import { AnimatedSection } from "@/components/common/AnimatedSection";

export default function ContactPage() {
    return (
        <>
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
