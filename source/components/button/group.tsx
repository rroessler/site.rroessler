/// Vendor Modules
import { clsx } from 'clsx';

/// Website Modules
import { Sizing } from '../intrinsic';

/** Button Group Component. */
export interface Group extends Group.Props {}
export function Group({ className, size, vertical, ...props }: Group) {
    className = clsx('btn-group', vertical && 'btn-group-vertical', className);
    if (size?.length) className = clsx(`btn-group-${size}`, className); // update size
    return <div className={className} role="group" {...props}></div>; // and build now
}

export namespace Group {
    //  TYPEDEFS  //

    /** Group Properties. */
    export type Props = React.JSX.IntrinsicElements['div'] & { size?: Sizing; vertical?: boolean };
}
