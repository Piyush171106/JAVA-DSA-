import type { Metadata } from 'next';
import './globals.css';
import { DSAContextProvider } from '../context/DSAContext';

export const metadata: Metadata = {
  title: 'DSA Placement Checklist 3D | 300 Curated Problems',
  description: 'Track 300 curated DSA placement questions categorized topic-wise and pattern-wise with interactive 3D constellation universe.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <DSAContextProvider>{children}</DSAContextProvider>
      </body>
    </html>
  );
}
