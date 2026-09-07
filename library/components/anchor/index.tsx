/// Vendor Modules
import Link, { LinkProps } from 'fumadocs-core/link';

/// Website Modules
import { cn } from '@rroessler/utilities';

/** Anchor Component. */
export interface Anchor extends Anchor.Props {}
export function Anchor({ href = '#', className, ...props }: Anchor) {
    const external = !href.startsWith('/'); // check if external at all
    const target = external && !href.includes('#') ? '_blank' : undefined;

    className = cn('no-underline', className); // prepare the styling
    return <Link href={href} target={target} className={className} {...props} />;
}

export namespace Anchor {
    //  TYPEDEFS  //

    /** Button Component Properties. */
    export type Props = React.PropsWithChildren<
        React.JSX.IntrinsicElements['a'] &
            Omit<LinkProps, 'href'> & {
                href?: LinkProps['href'];
            }
    >;
}
