/// Vendor Modules
import { buttonVariants, ButtonProps } from 'fumadocs-ui/components/ui/button';

/// Local Modules
import { Anchor } from '../anchor';

export interface Button extends ButtonProps, Omit<Anchor, 'color'> {}
export function Button({ variant, color, size, ...props }: Button) {
    // override the underlying class name
    props.className = buttonVariants({
        variant,
        color,
        size,
        className: props.className,
    });

    // and return the resulting wrapped button instance
    return <Anchor {...props} />;
}
