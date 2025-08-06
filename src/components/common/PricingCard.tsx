"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/lib/plans";

type PricingCardProps = {
  plan: PricingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full hover:shadow-lg"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <Card
        className={cn(
          "flex flex-col h-full transition-shadow",
          plan.isFeatured ? "border-primary border-2 shadow-md" : ""
        )}
      >
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="font-serif flex items-center justify-between text-lg sm:text-xl">
            <span>{plan.name}</span>
            {plan.isFeatured && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">おすすめ</span>
            )}
          </CardTitle>
          <CardDescription className="text-sm mt-2">{plan.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
          <div className="flex items-baseline justify-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {parseInt(plan.price).toLocaleString()}
            </p>
            {plan.priceAnnotation && (
              <span className="text-sm sm:text-base lg:text-lg font-normal text-muted-foreground ml-1">{plan.priceAnnotation}</span>
            )}
          </div>
          {plan.features && (
            <ul className="space-y-2 sm:space-y-3 mt-4 sm:mt-6 text-left">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-xs sm:text-sm leading-5">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="pt-4 sm:pt-6">
          <Button
            asChild
            className="w-full touch-target"
            size="lg"
            variant={plan.isFeatured ? "default" : "outline"}
          >
            <Link href={plan.href}>{plan.cta}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 