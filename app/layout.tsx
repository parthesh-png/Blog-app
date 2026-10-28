import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next js 15 blog",
  description: "NEXT js 15 using next js  zustand drizzle amd postgres ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">


        <ThemeProvider
        attribute={"class"}    //dark/light is controlled using a CSS class such as dark
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        
        >
          {children}

        </ThemeProvider>
        <Toaster/>
        
        
        
        
        </body>
    </html>
  );
}
