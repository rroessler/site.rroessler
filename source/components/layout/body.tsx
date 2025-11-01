/// Vendor Modules
import { PageMapItem } from 'nextra';

/// Website Modules
import { Footer } from './footer';
import { Navbar } from '../navbar';
import { Sidebar } from '../sidebar';
import { Provider } from './provider';

/** Body Component. */
export interface Body extends Body.Props {}
export function Body({ pages, children }: Body) {
    return (
        <body className="d-flex flex-column position-relative ps-lg-sbwidth flex-grow-1" style={{ minHeight: '100vh' }}>
            <Provider>
                <Sidebar.Menu pages={pages} />
                <Navbar.Header pages={pages} />

                <main className="container-md px-4 px-sm-5 px-xl-5 py-5" style={{ maxWidth: 950 }}>
                    {children}
                </main>

                <Footer />
            </Provider>
        </body>
    );
}

export namespace Body {
    //  TYPEDEFS  //

    /** Body Component Properties. */
    export type Props = React.PropsWithChildren<{ pages: PageMapItem[] }>;
}
