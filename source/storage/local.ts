/** Local Storage Functionality. */
export namespace Local {
    //  PROPERTIES  //

    /** Internal storage container. */
    const m_container: Storage | undefined = globalThis?.window?.localStorage;

    //  PUBLIC METHODS  //

    /** Clears all the underlying local-storage. */
    export const clear = () => m_container?.clear();

    /**
     * Clears the given keys or clears all keys.
     * @param keys                  Keys to remove.
     */
    export const remove = (...keys: string[]) => keys.forEach((key) => m_container?.removeItem(key));

    /**
     * Sets a value to storage.
     * @param key                   Key to set.
     * @param value                 Value to set.
     */
    export const set = <T>(key: string, value: T) =>
        value == undefined ? m_container?.removeItem(key) : m_container?.setItem(key, JSON.stringify(value));

    /**
     * Gets a value from storage.
     * @param key                   Key to get.
     */
    export const get = <T = unknown>(key: string): T | undefined =>
        JSON.parse(m_container?.getItem(key) ?? 'null') ?? undefined;
}
