/// Vendor Modules
import Link, { LinkProps } from 'next/link';

/// Website Modules
import { cn } from '@rroessler/utilities';

/** Anchor Component. */
export interface Anchor extends Anchor.Props {}
export function Anchor({ href = '#', ...props }: Anchor) {
    const external = !href.startsWith('/'); // check if external at all
    const target = external && !href.includes('#') ? '_blank' : undefined;

    props.className = cn('text-decoration-none', props.className);
    return <Link href={href} target={target} {...props} />;
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
