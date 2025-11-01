'use client';

/// Vendor Modules
import { clsx } from 'clsx';
import * as React from 'react';
import { usePathname } from 'next/navigation';

/// Package Modules
import { Menu } from './menu';
import { Anchor } from '../anchor';

/** Sidebar Link Component. */
export interface Link extends Link.Props {}
export function Link({ active, header, page, className, style, children, ...props }: Link) {
    // get the current pathname details
    const pathname = usePathname();

    // pull out some properties to be used
    const href = page.route;

    children = React.Children.toArray(children).concat([page.title]); // prepare the children
    const color = active || pathname === href ? 'var(--bs-sidebar-active-color)' : null;

    // prepare the baseline class activeness
    className = clsx('d-flex text-decoration-none', className);
    className = clsx(header ? 'nav-anchor fw-medium' : 'nav-link', className);
    if (color) (className = clsx('active', className)), (style = { color, ...style });

    // and construct the resulting link to be used now
    return <Anchor className={className} href={href} style={style} {...props} children={children} />;
}

export namespace Link {
    //  TYPEDEFS  //

    /** Link Properties. */
    export type Props = React.HTMLAttributes<HTMLElement> & {
        page: Menu.Item;
        active?: boolean;
        header?: boolean;
    };
}
