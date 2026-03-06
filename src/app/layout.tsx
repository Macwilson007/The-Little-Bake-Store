import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Little Bake Store | Artisan Bakery in Abuja',
  description: 'Premium handcrafted cakes, cupcakes, pastries & desserts freshly baked daily in Abuja. Same-day delivery available. Order online for birthdays, weddings & corporate events.',
  keywords: 'bakery, cakes, cupcakes, pastries, Abuja, Nigeria, birthday cakes, wedding cakes, desserts, artisan bakery',
  openGraph: {
    title: 'The Little Bake Store | Artisan Bakery in Abuja',
    description: 'Premium handcrafted cakes, cupcakes, pastries & desserts freshly baked daily in Abuja.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'The Little Bake Store',
  },
};

import { Providers } from '@/components/Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
