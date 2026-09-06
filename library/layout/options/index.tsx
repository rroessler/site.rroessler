/// Vendor Modules
import { Root } from 'fumadocs-core/page-tree';
import { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';

/// Website Modules
import { Brand } from '@rroessler/components';
import { Product } from '@rroessler/product';

/** Page-Tree Root Typing. */
export type Tree = Root;

/** Core Layout Properties. */
export interface Options extends Omit<DocsLayoutProps, 'children' | 'tree'> {}
export function Options(overrides: Options = {}): Options {
    // prepare a set of custom links now
    const links: LinkItemType[] = [
        {
            type: 'icon',
            text: 'LinkedIn',
            url: Product.linkedin,
            icon: <Brand.LinkedIn />,
        },
    ];

    // update the override links now
    (overrides.links ??= []).push(...links);

    // construct the resulting options now
    return {
        githubUrl: Product.github,
        nav: { title: Product.title },
        ...overrides,
    };
}
