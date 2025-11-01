'use client';

/// Icon Modules
import { CircleHalfIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Storage } from '@/storage';

/// Website Modules
import { Button } from '../button';
import { Context } from './context';

/** Available Theming Modes. */
export type Mode = (typeof Mode.keys)[number];
export function Mode() {
    // get the underlying context instance
    const { mode, setMode } = Context.Use();

    // get the next potential mode to be used
    const next = Mode.next(mode);
    const onClick = () => setMode(next);

    // prepare the icon to be used now
    const icon = <CircleHalfIcon size="18" />;

    // and construct the necessary icon now
    return <Button.Icon square onClick={onClick} children={icon} />;
}

export namespace Mode {
    //  PROPERTIES  //

    /** Available Mode Keys. */
    export const keys = ['light', 'dark'] as const;

    /** Storage key to use. */
    export const storage = 'theme.mode';

    /** The underlying attribute. */
    export const attribute = 'data-bs-theme';

    //  PUBLIC METHODS  //

    /** Gets the preferred system color-scheme. */
    export const system = (): Mode => {
        const match = globalThis?.window?.matchMedia; // prepare media query
        const mode = keys.find((mode) => match?.(`(prefers-color-scheme: ${mode})`)?.matches);
        return mode ?? 'dark'; // resolve the final system mode to be used
    };

    /** Gets the current theme to be used. */
    export const resolve = () => Storage.Local.get<Mode>(storage) ?? system();

    /**
     * Updates the current mode.
     * @param mode                  Mode to set.
     */
    export const update = (mode?: Mode) => document.documentElement.setAttribute(attribute, mode ?? system());

    /**
     * Gets the next potential mode.
     * @param current               Current mode.
     */
    export const next = (current: Mode) => keys[(keys.indexOf(current) + 1) % keys.length];
}
