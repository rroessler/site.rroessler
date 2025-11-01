'use client';

/// Vendor Modules
import * as React from 'react';

/// Website Modules
import { Context } from './context';

/** Sidebar Provider Component. */
export interface Provider extends Provider.Props {}
export function Provider({ children }: Provider) {
    // ensure we are using the underlying context
    const context = Context.Use();

    // stop rendering if invalid to do so here
    if (!context.outer) return <Context.Provider context={context} />;

    // update the context with the necessary state management
    const [state, toggle] = React.useState(false);

    // update the current context to be used now
    const inner = new Context(state, toggle);

    // and ensure we encapsulate all our underlying components now
    return <Context.Provider context={inner} children={children} />;
}

export namespace Provider {
    //  TYPEDEFS  //

    /** Theme Provider Options Interface. */
    export type Props = React.PropsWithChildren;
}
