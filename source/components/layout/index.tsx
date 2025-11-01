/// Vendor Modules
import { PageMapItem } from 'nextra';

/// Website Modules
import { Body } from './body';
import { Preface } from './preface';

/** Layout Component. */
export interface Layout extends Layout.Props {}
export function Layout({ pages, children }: Layout) {
    return (
        <html
            lang="en"
            className="bg-body-secondary"
            suppressHydrationWarning
            data-bs-theme="dark"
            data-bs-core="modern"
        >
            <Preface />
            <Body pages={pages}>{children}</Body>
        </html>
    );
}

export namespace Layout {
    //  TYPEDEFS  //

    /** Layout Component Properties. */
    export type Props = React.PropsWithChildren<{ pages: PageMapItem[] }>;
}
