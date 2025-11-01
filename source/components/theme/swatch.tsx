'use client';

/// Icon Modules
import { PaintBrushIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Storage } from '@/storage';

/// Website Modules
import { Button } from '../button';
import { Context } from './context';

/** Available Theming Swatches. */
export type Swatch = (typeof Swatch.keys)[number];
export function Swatch() {
    // get the underlying context instance
    const { swatch, setSwatch } = Context.Use();

    // get the potential next swatch to be used
    const next = Swatch.next(swatch);
    const onClick = () => setSwatch(next);

    // prepare the icon to be used now
    const icon = <PaintBrushIcon size="18" />;

    // and construct the necessary icon now
    return <Button.Icon square onClick={onClick} children={icon} />;
}

export namespace Swatch {
    //  PROPERTIES  //

    /** Available Swatch Keys. */
    export const keys = ['default', 'modern'] as const;

    /** Storage key to use. */
    export const storage = 'theme.swatch';

    /** The underlying attribute. */
    export const attribute = 'data-bs-core';

    //  PUBLIC METHODS  //

    /** Gets the preferred system swatch. */
    export const system = (): Swatch => 'modern';

    /** Gets the current swatch being used. */
    export const resolve = () => Storage.Local.get<Swatch>(storage) ?? system();

    /** Handles initializing the mode. */
    export const initialize = () => update(Storage.Local.get<Swatch>(storage));

    /**
     * Updates the current swatch.
     * @param swatch                Swatch to set.
     */
    export const update = (swatch?: Swatch) => document.documentElement.setAttribute(attribute, swatch ?? system());

    /**
     * Gets the next potential swatch to be used.
     * @param current               Current mode.
     */
    export const next = (current: Swatch) => keys[(keys.indexOf(current) + 1) % keys.length];
}
