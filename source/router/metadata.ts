/// Vendor Modules
import type * as next from 'next';

/** Metadata Definitions. */
export interface Metadata extends next.Metadata {}
export function Metadata<T extends Metadata>(metadata: T) {
    return metadata;
}

export namespace Metadata {
    //  TYPEDEFS  //

    /** Parameters Typing. */
    export type Params = Promise<{ id: string }>;

    /** Search Paramters Typing. */
    export type Search = Promise<{ [key: string]: string }>;

    /** Metadata Properties. */
    export interface Props {
        params: Params;
        searchParams: Search;
    }

    /** Dynamic Metadata Typing. */
    export interface Dynamic<T extends Props = Props> {
        (props: T, parent: next.ResolvingMetadata): Promise<Metadata>;
    }

    //  PUBLIC METHODS  //

    export function Dynamic<T extends Props = Props>(dynamic: Dynamic<T>) {
        return dynamic;
    }
}
