"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

const MotionLink = motion(Link);

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <MotionLink
      href={href}
      className="relative block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="active-nav-link-indicator"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
        />
      )}
    </MotionLink>
  );
};

const DesktopNav = () => (
  <nav className="hidden items-center gap-6 md:flex">
    {NAV_LINKS.map(({ href, label }) => (
      <NavLink key={href} href={href}>
        {label}
      </NavLink>
    ))}
    <Button asChild>
      <Link href="/contact">お問い合わせ</Link>
    </Button>
  </nav>
);

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const closeSheet = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(true)}
            className="touch-target"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">メニューを開く</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
          <SheetTitle className="sr-only">モバイルメニュー</SheetTitle>
          <motion.nav
            className="flex flex-col gap-y-4 pt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionLink
              href="/"
              className="mb-4 flex items-center space-x-2 touch-target"
              variants={itemVariants}
              onClick={closeSheet}
            >
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">{SITE_NAME}</span>
            </MotionLink>
            {NAV_LINKS.map(({ href, label }) => (
              <MotionLink
                key={href}
                href={href}
                className={cn(
                  "flex items-center py-3 px-2 text-base font-medium transition-colors hover:text-primary hover:bg-accent/50 rounded-md touch-target",
                  pathname === href ? "text-primary bg-accent" : "text-muted-foreground"
                )}
                variants={itemVariants}
                onClick={closeSheet}
              >
                {label}
              </MotionLink>
            ))}
            <motion.div variants={itemVariants} className="mt-4">
              <Button asChild className="w-full touch-target">
                <Link href="/contact" onClick={closeSheet}>お問い合わせ</Link>
              </Button>
            </motion.div>
          </motion.nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2 touch-target">
          <Gem className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="font-bold text-base sm:text-lg">
            <span className="hidden sm:inline">{SITE_NAME}</span>
            <span className="sm:hidden">ABPA</span>
          </span>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
} 