'use client';

/// Vendor Modules
import { usePathname } from 'next/navigation';

/** Page Referrer Component. */
export interface Referrer extends Referrer.Props {}
export function Referrer() {
    const pathname = usePathname();
    return <code>{pathname}</code>;
}

export namespace Referrer {
    //  TYPEDEFS  //

    /** Referrer Component Properties. */
    export type Props = {};
}
