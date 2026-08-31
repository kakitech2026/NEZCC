import type { Metadata } from 'next';
import './globals.css';
import SkipLink from '@/components/accessibility/SkipLink';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: 'North East Zone Cultural Centre - Home',
  description: 'Preserving the Heritage of North East India',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light overflow-x-hidden scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body-md text-base antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col overflow-x-hidden">
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
