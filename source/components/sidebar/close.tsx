'use client';

/// Vendor Modules
import { XIcon } from '@phosphor-icons/react/dist/ssr';

/// Website Modules
import { Button } from '../button';
import { Context } from './context';

/** Sidebar Close Button. */
export interface Close extends Close.Props {}
export function Close(props: Close) {
    // get the underlying context instance
    const sidebar = Context.Use();

    // get the next potential mode to be used
    const onClick = () => sidebar.close();

    // and construct the necessary button
    return <Button.Icon square onClick={onClick} children={<XIcon />} {...props} />;
}

export namespace Close {
    //  TYPEDEFS  //

    /** Sidebar Toggle Properties. */
    export type Props = Omit<React.JSX.IntrinsicElements['button'], 'onClick' | 'children'>;
}
