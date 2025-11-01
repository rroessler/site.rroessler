/// Vendor Modules
import { clsx } from 'clsx';

/// Website Modules
import { Anchor } from '../anchor';
import { GitHub as _GitHub } from './github';
import { LinkedIn as _LinkedIn } from './linkedin';

/** Any Brand Factory. */
export interface Brand extends Brand.Props {}
export function Brand(prefix: string) {
    return function ({ className, ...props }: Brand) {
        return <Anchor href="/" className={clsx(`${prefix}-brand`, className)} {...props} />;
    };
}

export namespace Brand {
    //  TYPEDEFS  //

    /** Brand Component Properties. */
    export type Props = React.JSX.IntrinsicElements['a'];

    //  PROPERTIES  //

    export type GitHub = _GitHub;
    export const GitHub = _GitHub;

    export type LinkedIn = _LinkedIn;
    export const LinkedIn = _LinkedIn;
}
