import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'GitHub Profile Explorer',
  description:
    'Explore GitHub profiles and repositories with detailed analytics and insights',
  keywords:
    'github, profile, explorer, analytics, repositories, developers, stats',
  openGraph: {
    title: 'GitHub Profile Explorer',
    description:
      'Discover and analyze GitHub profiles with comprehensive insights',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Profile Explorer',
    description:
      'Discover and analyze GitHub profiles with comprehensive insights',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
