/// Declare Client
'use client';

/// Vendor Modules
import { PropsWithChildren } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';

/** Core Provider Component. */
export interface Provider extends PropsWithChildren {}
export function Provider({ children }: Provider) {
    return <RootProvider children={children} />;
}
