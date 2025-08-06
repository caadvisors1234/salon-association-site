"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーログをここで記録可能
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">500</h1>
          <h2 className="text-2xl font-serif font-bold">
            申し訳ございません
          </h2>
          <p className="text-muted-foreground">
            システムエラーが発生しました。しばらく時間をおいてから再度お試しください。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="default">
            再試行
          </Button>
          <Button asChild variant="outline">
            <Link href="/">トップページに戻る</Link>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>
            問題が解決しない場合は、
            <Link 
              href="/contact" 
              className="text-primary hover:underline ml-1"
            >
              お問い合わせページ
            </Link>
            からご連絡ください。
          </p>
        </div>
      </div>
    </div>
  );
} 