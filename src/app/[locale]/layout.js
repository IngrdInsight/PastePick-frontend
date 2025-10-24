"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
    /** Put your mantine theme override here */
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className={inter.className} suppressHydrationWarning>
      <MantineProvider theme={theme}>
          <LanguageProvider>
              {children}
          </LanguageProvider>
      </MantineProvider>
      </body>
    </html>
  );
}
