/// Icon Modules
import { GameControllerIcon } from '@phosphor-icons/react/dist/ssr';

/// Website Modules
import { Button } from '../button';

/** Quiz Toggle Component. */
export interface Toggle extends Toggle.Props {}
export function Toggle(props: Toggle) {
    return (
        <Button.Icon square href="/quiz" {...props}>
            <GameControllerIcon size="18" />
        </Button.Icon>
    );
}

export namespace Toggle {
    //  TYPEDEFS  //

    /** Toggle Component Properties. */
    export type Props = Omit<Button.Anchor, 'children' | 'href'>;
}
