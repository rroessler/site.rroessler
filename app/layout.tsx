/// CSS Modules
import './globals.css';

/// Vendor Modules
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

/// Website Modules
import { Product } from '@rroessler/product';

/// Local Modules
import { Provider } from './provider';

/** Font Details. */
const inter = Inter({ subsets: ['latin'] });

/** Common Item Metadata. */
export const metadata: Metadata = {
    authors: { name: Product.author },
    icons: { icon: '/icon.svg' },
};

/** Core Layout Component. */
export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="relative flex min-h-screen flex-col">
                <Provider children={children} />
            </body>
        </html>
    );
}
