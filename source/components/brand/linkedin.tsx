/// Icon Modules
import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Product } from '@/product';

/// Website Modules
import { Button } from '../button';

/** LinkedIn Component. */
export interface LinkedIn extends LinkedIn.Props {}
export function LinkedIn({ href, ...props }: LinkedIn) {
    return (
        <Button.Icon square href={LinkedIn.URL(href)} {...props}>
            <LinkedinLogoIcon size="18" />
        </Button.Icon>
    );
}

export namespace LinkedIn {
    //  TYPEDEFS  //

    /** LinkedIn Component Properties. */
    export type Props = Omit<Button.Anchor, 'children'>;

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
