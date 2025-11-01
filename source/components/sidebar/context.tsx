'use client';

/// Vendor Modules
import * as React from 'react';

/** Contextual Support. */
export class Context {
    //  GETTERS x SETTERS  //

    /** Denotes if in the outer context. */
    get outer() {
        return typeof this.m_toggle === 'undefined';
    }

    //  CONSTRUCTORS  //

    /**
     * Constructs a sidebar context.
     * @param opened            Opened state.
     * @param toggle            Toggle handler.
     */
    constructor(readonly opened: boolean, private readonly m_toggle?: Context.Toggle) {}

    //  PUBLIC METHODS  //

    open = () => this.toggle(true);
    close = () => this.toggle(false);
    toggle: Context.Toggle = (state) => this.m_toggle?.(state);
}

export namespace Context {
    //  TYPEDEFS  //

    /** Toggle Callback Handler. */
    export type Toggle = (state: React.SetStateAction<boolean>) => void;

    //  PROPERTIES  //

    /** Defaulted context values. */
    const m_default = new Context(false);

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
