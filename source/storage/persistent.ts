/// Vendor Modules
import * as React from 'react';

/// Website Modules
import { Local } from './local';

/** Persistent Storage Hooks. */
export namespace Persistent {
    //  TYPEDEFS  //

    /** Persisten Hook Output. */
    export type Hook<T> = [T, React.Dispatch<React.SetStateAction<T>>];

    //  PUBLIC METHODS  //

    /**
     * Handles using persistent value storage.
     * @param key               Local key.
     * @param initial           Initial value.
     */
    export function Use<T>(key: string, initial: T | (() => T)): Hook<T>;
    export function Use<T = undefined>(key: string): Hook<T | undefined>;
    export function Use(key: string, initial?: any): Hook<any> {
        const [state, setState] = React.useState(m_initialize(key, initial));
        React.useEffect(() => Local.set(key, state), [key, state, setState]);
        return [state, setState]; // and return the original state details now
    }

    //  PRIVATE METHODS  //

    /**
     * Handles initializing the state.
     * @param key               Local key.
     * @param initial           Initial value.
     */
    const m_initialize =
        <T>(key: string, initial?: T | (() => T)) =>
        () => {
            if (typeof initial === 'function') initial = (<any>initial)();
            return Local.get<T>(key) ?? Local.set(key, initial);
        };
}
