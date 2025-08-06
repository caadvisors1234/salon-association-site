import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページが見つかりません | AIビューティーサロン推進協会",
  description: "お探しのページは存在しないか、移動した可能性があります。",
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-serif font-bold">
            ページが見つかりません
          </h2>
          <p className="text-muted-foreground">
            お探しのページは存在しないか、移動した可能性があります。
            URLをご確認いただくか、トップページからお探しください。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">トップページに戻る</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <nav className="space-y-1">
            <p className="font-medium">よく利用されるページ:</p>
            <ul className="space-y-1">
              <li>
                <Link href="/about" className="text-primary hover:underline">
                  協会について
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary hover:underline">
                  サービス内容
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-primary hover:underline">
                  料金プラン
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary hover:underline">
                  よくある質問
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
} 