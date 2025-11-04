'use client';

/// Vendor Modules
import { clsx } from 'clsx';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { PageMapItem } from 'nextra';
import { Router } from '@/router';

/** Breadcrumbs Component. */
export interface Crumbs extends Crumbs.Props {}
export function Crumbs({ children, divider, className, style, ...props }: Crumbs) {
    // prepare the available children now
    children = React.Children.toArray(children).filter(Boolean);

    // determine the size of the incoming children
    const count = React.Children.count(children);
    if (count === 0) return null; // could not show

    // prepare the incoming breadcrumbs styling
    style = { '--bs-breadcrumb-divider': divider ?? '"/"', ...style } as any;

    // and construct the breadcrumbs now
    return (
        <ol className={clsx('breadcrumb text-capitalize', className)} style={style} {...props}>
            {React.Children.map(children, (child) => {
                return <li className="breadcrumb-item active">{child}</li>;
            })}
        </ol>
    );
}

/** Path Crumbs Component. */
export interface Pathname extends Omit<Crumbs.Props, 'children'> {}
export const Pathname = ({ title, pages, ...props }: Pathname) => {
    const pathname = usePathname(); // prepare pathname and the active-path now
    const active = Router.Posts.normalize(pathname, pages ?? []).activePath.at(-1);

    // construct the baseline children to be used as necessary
    let children = pathname.split('/').filter(Boolean).slice(0, -1);

    // push our incoming details if necessary now
    if (typeof active?.title === 'string') children.push(active.title);
    if (children.length === 0) children.push('home'); // ensure index

    const mapped = children.map((child, index) => (index ? child : <strong>{child}</strong>));
    return <Crumbs {...props}>{mapped}</Crumbs>; // ensure we convert to normal crumbs
};

export namespace Crumbs {
    //  TYPEDEFS  //

    /** Crumbs Children Typing. */
    export type Items = React.ReactNode;

    /** Breadcrumbs Component Properties. */
    export type Props = React.JSX.IntrinsicElements['ol'] & {
        divider?: string;
        pages?: PageMapItem[];
    };
}
