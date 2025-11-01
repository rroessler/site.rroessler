/// Website Modules
import { Provider as Theme } from '../theme/provider';
import { Provider as Sidebar } from '../sidebar/provider';

/** Provider Component. */
export interface Provider extends Provider.Props {}
export function Provider({ children }: Provider) {
    const sidebar = <Sidebar>{children}</Sidebar>;
    return <Theme>{sidebar}</Theme>; // and nest
}

export namespace Provider {
    //  TYPEDEFS  //

    /** Provider Component Properties. */
    export type Props = React.PropsWithChildren;
}
