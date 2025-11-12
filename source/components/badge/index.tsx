/// Vendor Modules
import { clsx } from 'clsx';

/// Website Modules
import { Variant } from '../intrinsic';

/** Button Component. */
export interface Badge extends Badge.Props {}
export function Badge({ className, variant, ...props }: Badge) {
    className = clsx('badge', `text-bg-${variant ?? 'secondary'}`, className);
    return <span className={className} {...props} />; // construct the badge now
}

export namespace Badge {
    //  TYPEDEFS  //

    /** Button Component Properties. */
    export type Props = React.JSX.IntrinsicElements['span'] & { variant?: Variant };
}
