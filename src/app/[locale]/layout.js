import { Inter } from "next/font/google";
import "../globals.css";
import "@mantine/core/styles.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Navigation from "@/components/Navigation.js";
import { ThemeProvider } from "@/components/ThemeProvider.js";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>PastePick - Smart Toothpaste Analyzer</title>
        <meta
          name="description"
          content="Analyze toothpaste ingredients for safer, smarter choices with PastePick"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="apple-touch-icon" href="/192.png" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="main-content">{children}</div>
            <Navigation />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
