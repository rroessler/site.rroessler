/// Vendor Modules
import { buttonVariants, ButtonProps } from 'fumadocs-ui/components/ui/button';

/// Website Modules
import { cn } from '@rroessler/utilities';

/// Local Modules
import { Anchor } from '../anchor';

/** Button Component. */
export type Button = Button.Link | Button.Props;
export function Button(props: Button.Link): React.ReactNode;
export function Button(props: Button.Props): React.ReactNode;
export function Button({ variant, color, size, ...props }: any) {
    // override the underlying class name
    props.className = cn(buttonVariants({ variant, color, size }), props.className);

    // and return the resulting wrapped button instance
    return <Anchor {...props} />;
}

export namespace Button {
    //  TYPEDEFS  //

    /** Button Component Properties. */
    export type Common = ButtonProps;
    export type Link = Omit<Anchor, 'color'> & Common;
    export type Props = React.JSX.IntrinsicElements['button'] & Common;

    //  PUBLIC METHODS  //

    export type Group = React.JSX.IntrinsicElements['div'];
    export function Group({ className, ...props }: Group) {
        className = cn('flex gap-2 rounded-lg shadow-sm', className);
        return <div role="group" className={className} {...props} />; // rebuild
    }
}
