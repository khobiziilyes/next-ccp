import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Viewport, type Metadata } from "next";

import { AppProvider } from "@/components/providers/app-provider";

import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";

import packageInfo from "@/../package.json";

const { name: AppName, homepage: AppHomepage } = packageInfo;

export const metadata: Metadata = {
  metadataBase: new URL(AppHomepage),
  title: {
    default: AppName,
    template: AppName,
  },
  description: AppName,
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  applicationName: AppName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: AppName,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: AppName,
    title: {
      default: AppName,
      template: AppName,
    },
    description: AppName,
  },
  twitter: {
    card: "summary",
    title: {
      default: AppName,
      template: AppName,
    },
    description: AppName,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProvider>
          <div className="flex max-h-screen min-h-screen flex-col">
            <AppHeader />
            {children}
            <AppFooter />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
