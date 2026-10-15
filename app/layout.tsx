import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'APASICON 2027 RAJAMAHENDRAVARAM | 50th Annual Conference ASI AP Chapter',
  description:
    '50th Annual Conference of ASI Andhra Pradesh Chapter - From Fundamentals to Future. Dates: 26 to 28 August 2027 at GSL Educational Institutions, Rajamahendravaram.',
  openGraph: {
    title: 'APASICON 2027 RAJAMAHENDRAVARAM',
    description:
      '50th Annual Conference of ASI Andhra Pradesh Chapter. 26-28 August 2027 at GSL Educational Institutions, Rajamahendravaram.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APASICON 2027 RAJAMAHENDRAVARAM',
    description:
      '50th Annual Conference of ASI Andhra Pradesh Chapter. 26-28 August 2027 at GSL Educational Institutions, Rajamahendravaram.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="antialiased min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
