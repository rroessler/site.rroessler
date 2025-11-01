/// Vendor Modules
import { clsx } from 'clsx';
import * as React from 'react';

/// Website Modules
import { Anchor } from '../anchor';

/** Core Title Component. */
export interface Title extends Title.Props {}
export function Title({ href, className, children, ...props }: Title) {
    className = clsx('font-monospace fw-medium mb-3', className);
    children = [<span key=">">&gt;&nbsp;</span>, ...React.Children.toArray(children)];

    // construct the final result now
    return (
        <h3 className={className} {...props}>
            {href ? <Anchor href={href}>{children}</Anchor> : children}
        </h3>
    );
}

export namespace Title {
    //  TYPEDEFS  //

    /** Title Component Properties. */
    export type Props = React.JSX.IntrinsicElements['h3'] & { href?: string };
}
