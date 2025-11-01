/// Vendor Modules
import { generateStaticParamsFor } from 'nextra/pages';

/** Handles Resolving Static Parameters. */
export type Static = typeof generateStaticParamsFor;
export const Static: Static = (segment, locale) => generateStaticParamsFor(segment, locale);
export namespace Static {
    //  TYPEDEFS  //

    /** Static Parameters Typing. */
    export type Params = ReturnType<Static>;
}
