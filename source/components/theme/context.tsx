'use client';

/// Vendor Modules
import * as React from 'react';

/// Website Modules
import type { Mode } from './mode';
import type { Swatch } from './swatch';

/** Contextual Support. */
export interface Context {
    readonly mode: Mode;
    readonly swatch: Swatch;
    readonly outer: boolean;

    setMode(mode: React.SetStateAction<Mode>): void;
    setSwatch(swatch: React.SetStateAction<string>): void;
}

export namespace Context {
    //  PROPERTIES  //

    /** Defaulted context values. */
    const m_default: Context = {
        outer: true,
        mode: 'dark',
        swatch: 'modern',
        setMode: () => {},
        setSwatch: () => {},
    };

    /** The internal context value. */
    const m_context = React.createContext(m_default);

    //  PUBLIC METHODS  //

    /** Gets the context to be used. */
    export const Use = () => React.useContext(m_context);

    /** Context Provider Wrapper. */
    export function Provider({ context, children }: React.PropsWithChildren<{ context: Context }>) {
        const Provider = m_context as unknown as React.FC<Parameters<typeof m_context>[0]>;
        return <Provider value={context}>{children}</Provider>; // and construct now
    }
}
