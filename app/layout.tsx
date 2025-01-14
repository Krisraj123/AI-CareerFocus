import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { PDFProvider } from '@/context/PDFContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Career Document Assistant',
  description: 'Upload and enhance your career documents',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <PDFProvider>
            {children}
          </PDFProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}