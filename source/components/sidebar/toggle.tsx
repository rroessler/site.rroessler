'use client';

/// Vendor Modules
import { SidebarIcon } from '@phosphor-icons/react';

/// Website Modules
import { Button } from '../button';
import { Context } from './context';

/** Sidebar Toggle Button. */
export interface Toggle extends Toggle.Props {}
export function Toggle(props: Toggle) {
    // get the underlying context instance
    const sidebar = Context.Use();

    // get the next potential mode to be used
    const next = !sidebar.opened;
    const onClick = () => sidebar.toggle(next);

    // and construct the necessary button
    return <Button.Icon square onClick={onClick} children={<SidebarIcon />} {...props} />;
}

export namespace Toggle {
    //  TYPEDEFS  //

    /** Sidebar Toggle Properties. */
    export type Props = Omit<React.JSX.IntrinsicElements['button'], 'onClick' | 'children'>;
}
