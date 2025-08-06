import Link from "next/link";
import { FOOTER_NAV_LINKS, SECONDARY_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-flex items-center font-bold text-lg touch-target">
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AIの力で、美容業界の未来を共創する。
            </p>
            <address className="mt-4 text-sm text-muted-foreground not-italic">
              〒170-0013<br />
              東京都豊島区東池袋1-32-2<br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>小泉ビル4F
            </address>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <p className="font-medium text-foreground mb-3">サイトマップ</p>
              <nav className="flex flex-col space-y-2">
                {FOOTER_NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary py-1 touch-target inline-flex items-center"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="font-medium text-foreground mb-3">その他</p>
              <nav className="flex flex-col space-y-2">
                {SECONDARY_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary py-1 touch-target inline-flex items-center"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {currentYear} {SITE_NAME}.<br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 