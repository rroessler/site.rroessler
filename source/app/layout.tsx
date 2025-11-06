/// CSS Modules
import './globals.css';

/// Augmentation Modules
import '@/bootstrap';

/// Vendor Modules
import { getPageMap } from 'nextra/page-map';

/// Package Modules
import { Router } from '@/router';
import { Product } from '@/product';
import { Layout } from '@/components';

/** Common page metadata. */
export const metadata = Router.Metadata({
    title: { absolute: '', template: `%s | ${Product.title}` },
    authors: { name: Product.author },
});

/** The core page layout to be inherited by children. */
export default async function ({ children }: React.PropsWithChildren) {
    const pages = await getPageMap(); // prepare mapping
    return <Layout pages={pages}>{children}</Layout>;
}
