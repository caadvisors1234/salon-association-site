"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    data: FaqItem[];
}

export function FaqAccordion({ data }: FaqAccordionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <Accordion type="single" collapsible className="w-full">
                {data.map((faq) => (
                    <AccordionItem value={faq.question} key={faq.question}>
                        <AccordionTrigger className="text-left font-semibold text-lg">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </motion.div>
    );
} 