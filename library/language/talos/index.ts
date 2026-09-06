/// Website Modules
import { Product } from '@rroessler/product';

/// Local Modules
import { Grammar } from '../grammar';

export namespace Talos {
    //  PROPERTIES  //

    /** Talos title value. */
    export const title = 'Talos';

    /** Talos identifier value. */
    export const identifier = title.toLowerCase();

    /** Talos website resource. */
    export const website = `https://${identifier}.${Product.title}`;

    //  PUBLIC METHODS  //

    /** Handles getting the underlying grammar. */
    export async function grammar(): Promise<Grammar> {
        return fetch(`${website}/syntax.json`).then((res) => res.json());
    }
}
