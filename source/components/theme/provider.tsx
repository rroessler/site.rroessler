'use client';

/// Vendor Modules
import * as React from 'react';

/// Package Modules
import { Storage } from '@/storage';

/// Website Modules
import { Mode } from './mode';
import { Script } from './script';
import { Swatch } from './swatch';
import { Context } from './context';

/** Theme Provider Component. */
export interface Provider extends Provider.Props {}
export function Provider({ children }: Provider) {
    // get the underlying theme instance to be used now
    const context = Context.Use();

    // ensure not calling recursively at all here
    if (!context.outer) return <Context.Provider context={context}>{children}</Context.Provider>;

    // update the context with a suitable mode handler
    const [mode, setMode] = Storage.Persistent.Use(Mode.storage, Mode.system());
    const [swatch, setSwatch] = Storage.Persistent.Use(Swatch.storage, context.swatch);

    // update the current context to be used
    React.useEffect(() => Mode.update(mode), [mode]);
    React.useEffect(() => Swatch.update(swatch), [swatch]);

    // update the current context to be used now
    const inner: Context = { outer: false, mode, swatch, setMode, setSwatch };

    // prepare the initial arguments
    const args: Script.Arguments = {
        mode: { key: Mode.storage, attribute: Mode.attribute, preset: Mode.system() },
        swatch: { key: Swatch.storage, attribute: Swatch.attribute, preset: Swatch.system() },
    };

    // and ensure we encapsulate all our underlying components now
    return (
        <Context.Provider context={inner}>
            <Script {...args}></Script>
            {children}
        </Context.Provider>
    );
}

export namespace Provider {
    //  TYPEDEFS  //

    /** Theme Provider Options Interface. */
    export type Props = React.PropsWithChildren;
}
