import React from 'react';
import '../index.css'; // Import global styles (formerly index.css)

export const metadata = {
  title: 'Minus — Subtract Debt. Add Life.',
  description: 'A privacy-first financial clarity engine for Indian households.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}