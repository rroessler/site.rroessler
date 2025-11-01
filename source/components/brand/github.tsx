/// Icon Modules
import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Product } from '@/product';

/// Website Modules
import { Button } from '../button';

/** GitHub Component. */
export interface GitHub extends GitHub.Props {}
export function GitHub({ className, href, target, ...props }: GitHub) {
    return (
        <Button.Icon square href={GitHub.URL(href)} target={target ?? '_blank'} className={className} {...props}>
            <GithubLogoIcon size="18" />
        </Button.Icon>
    );
}

export namespace GitHub {
    //  TYPEDEFS  //

    /** GitHub Component Properties. */
    export type Props = Omit<Button.Anchor, 'children'>;

    //  PROPERTIES  //

    /** Gets the available logo. */
    export const Logo = GithubLogoIcon;

    /**
     * Constructs a github URL value.
     * @param href                  Reference to bind.
     */
    export const URL = (href?: string) => `https://github.com/${href ?? Product.github}`;
}
