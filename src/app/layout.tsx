// app/layout.tsx (RootLayout)
import React from "react";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Plus_Jakarta_Sans } from "next/font/google";
import ReactQueryProvider from "@/providers/react-query-provider";
import ReduxProvider from "@/providers/redux-provider";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gramly",
  description: "automate DMs and Comments on instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeProps = {
    attribute: "class",
    defaultTheme: "dark",
    enableSystem: true,
    disableTransitionOnChange: true,
  };

  return (
    <html lang="en">
      <body className={jakarta.className} suppressHydrationWarning>
        {/* ClerkProvider should be inside <body> so <html> is the top element */}
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
              </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </ClerkProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
