"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export function LineContactSection() {
    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">LINEでのお問い合わせ</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                    {/* Left side: Text content and button */}
                    <div className="flex-1 space-y-4">
                        <p className="text-muted-foreground">
                            友だち追加で、より手軽にご相談いただけます。以下のボタンまたはQRコードからご登録ください。
                        </p>
                        <Button 
                            asChild
                            size="lg"
                            className="w-full md:w-auto bg-line hover:bg-line/90 text-white border-line"
                        >
                            <a 
                                href="https://lin.ee/YOUR_LINE_ID" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="touch-target"
                            >
                                <MessageCircle className="mr-2 size-5" />
                                LINEで友だち追加
                            </a>
                        </Button>
                    </div>

                    {/* Right side: QR Code */}
                    <div className="flex justify-center md:justify-end mt-6 md:mt-0">
                        <div className="w-40 h-40 rounded-lg overflow-hidden bg-white p-2 shadow-sm border">
                            <Image 
                                src="/images/line-qr-code.png" 
                                alt="LINE友だち追加QRコード"
                                width={144}
                                height={144}
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}