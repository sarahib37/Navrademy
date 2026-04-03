import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WhatsAppButton } from "@/components/WhatsappButton";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://navrademy.com"),
  title: "Navrademy",
  description: "Navrademy platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-P84K3W4H63"/>
        <WhatsAppButton/>
        <Toaster/>
      </body>
    </html>
  );
}