/// Style Modules
import './styles/subtitle.css';

/// Vendor Modules
import { clsx } from 'clsx';

/** Core Title Component. */
export interface Subtitle extends Subtitle.Props {}
export function Subtitle({ className, ...props }: Subtitle) {
    className = clsx('page-subtitle font-monospace fw-light opacity-75', className);
    return <h5 className={className} {...props} />; // prepare now
}

export namespace Subtitle {
    //  TYPEDEFS  //

    /** Title Component Properties. */
    export type Props = React.JSX.IntrinsicElements['h5'];
}
