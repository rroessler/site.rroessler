'use client';

/// Style Modules
import './styles/offcanvas.css';

/// Vendor Modules
import { clsx } from 'clsx';

/// Website Modules
import { Context } from './context';
import { Breakpoint, Placement } from '../intrinsic';

/** Sidebar Offcanvas Component. */
export interface Offcanvas extends Offcanvas.Props {}
export function Offcanvas({ className, responsive, placement, ...props }: Offcanvas) {
    // get the underlying context to be used
    const context = Context.Use();

    className = clsx(`sidebar offcanvas-start offcanvas-${placement ?? 'start'}`, className);
    if (responsive?.length) className = clsx(`offcanvas-${responsive}`, className);

    // show the sidebar if necessary to do so
    if (context.opened) className = clsx(`show`, className);

    // and ensure we encapsulate all our underlying components now
    return (
        <>
            <nav className={className} tabIndex={-1} {...props} />
            {context.opened && <div onClick={() => context.close()} className="offcanvas-backdrop fade show" />}
        </>
    );
}

export namespace Offcanvas {
    //  TYPEDEFS  //

    /** Sidebar Component Properties. */
    export type Props = Omit<React.JSX.IntrinsicElements['nav'], 'tabIndex'> & {
        placement?: Placement;
        responsive?: Breakpoint;
    };
}
