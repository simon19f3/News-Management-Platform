// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono as JetbrainsMono } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '../../components/Navbar';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetbrainsMono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'News Management Platform',
  description: 'A centralized news website built with Next.js and TanStack Query',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}