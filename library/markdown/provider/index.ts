/// Vendor Modules
import fumadocs from 'fumadocs-ui/mdx';
import { MDXComponents } from 'mdx/types';

/// Website Modules
import { Anchor } from '@rroessler/components';

/** Gets the defaulted markdown components provider. */
export function Provider(components?: MDXComponents): MDXComponents {
    // prepare the builting components now
    const builtins: MDXComponents = {
        a: Anchor
    };

    // and merge all the outgoing components now
    return { ...fumadocs, ...builtins, ...components };
}
