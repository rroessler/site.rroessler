/// Icon Modules
import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Product } from '@/product';

/// Website Modules
import { Button } from '../button';

/** LinkedIn Component. */
export interface LinkedIn extends LinkedIn.Props {}
export function LinkedIn({ className, href, target, children, ...props }: LinkedIn) {
    return (
        <Button.Icon square href={LinkedIn.URL(href)} target={target ?? '_blank'} className={className} {...props}>
            <LinkedinLogoIcon size="18" />
            {children}
        </Button.Icon>
    );
}

export namespace LinkedIn {
    //  TYPEDEFS  //

    /** LinkedIn Component Properties. */
    export type Props = Button.Anchor;

    //  PROPERTIES  //

    /** Gets the available logo. */
    export const Logo = LinkedinLogoIcon;

    //  PUBLIC METHODS  //

    /**
     * Constructs a LinkedIn URL value.
     * @param href                  Reference to bind.
     */
    export const URL = (href?: string) => `https://www.linkedin.com/in/${href ?? Product.linkedin}`;
}
