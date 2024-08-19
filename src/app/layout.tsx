import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Anisa's Portfolio",
    template: "%s - Anisa's Portfolio",
  },
  description: "Come and see some of my projects and blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={workSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
