import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Platforms Starter Kit',
  description: 'Next.js template for building a multi-tenant SaaS.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body className={`${geistSans.variable} ${instrumentSerif.variable} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
