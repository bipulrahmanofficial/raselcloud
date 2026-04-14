import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  preload: true,
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rasel.cloud"),
  title: "rasel.cloud — Digital Agency",
  description: "Professional digital services including web development, automation, marketing, and design.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "rasel.cloud — Digital Agency",
    description: "Professional digital services including web development, automation, marketing, and design.",
    siteName: "rasel.cloud",
    type: "website",
    url: "https://rasel.cloud",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "rasel.cloud — Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rasel.cloud — Digital Agency",
    description: "Professional digital services including web development, automation, marketing, and design.",
    images: ["https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80"],
  },
  alternates: {
    canonical: "https://rasel.cloud",
    languages: {
      "en": "https://rasel.cloud",
      "x-default": "https://rasel.cloud",
    },
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else if(t==='dark'){document.documentElement.classList.add('dark')}else{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}}catch(e){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e2){document.documentElement.classList.add('dark')}}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" as="image" href="/hero-main.jpg" fetchPriority="high" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NextTopLoader color="#f97316" height={3} showSpinner={false} easing="ease" speed={200} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
