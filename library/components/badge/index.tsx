/// Website Modules
import { cn } from '@rroessler/utilities';

/** Badge Component. */
export interface Badge extends Badge.Props {}
export function Badge({ className, variant = 'primary', ...props }: Badge) {
    // update the class-name with a variety of items
    className = cn('inline-flex self-center rounded-md px-2 py-0.5 text-xs ring-1 ring-inset', className);
    className = cn(className, variant ? `bg-fd-${variant}/10 text-fd-${variant} ring-fd-${variant}` : undefined);

    // and construct the resulting badge to be used now
    return <span className={className} {...props} />;
}

export namespace Badge {
    //  TYPEDEFS  //

    /** Badge Component Properties. */
    export type Props = React.JSX.IntrinsicElements['span'] & {
        variant?: 'outline' | 'primary' | 'secondary';
    };
}
