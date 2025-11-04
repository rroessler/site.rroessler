/// Vendor Modules
import { PageMapItem } from 'nextra';

/// Package Modules
import { Product } from '@/product';

/// Website Modules
import { Title } from './title';
import { Brand } from '../brand';
import { Theme } from '../theme';
import { Button } from '../button';
import { Pathname } from '../crumbs';
import { Sidebar } from '../sidebar';

/** Navbar Component. */
export interface Header extends Header.Props {}
export function Header({ pages }: Header) {
    return (
        <nav className="navbar navbar-expand-lg sticky-top bg-body-secondary border-bottom" style={{ height: 64 }}>
            <div className="container-lg px-3 px-sm-4 px-xl-5 py-1 gap-3 justify-content-between">
                <Button.Group className="d-lg-none" children={<Sidebar.Toggle />} />
                <Title className="d-lg-none ms-auto" children={Product.title} />
                <Pathname pages={pages} className="d-none d-lg-flex m-0" style={{ fontSize: 'inherit' }} />

                <Button.Group className="ms-auto">
                    <Theme.Mode />
                    <Theme.Swatch />
                </Button.Group>

                <Button.Group className="d-none d-sm-inline-flex">
                    <Brand.GitHub />
                    <Brand.LinkedIn />
                </Button.Group>
            </div>
        </nav>
    );
}

export namespace Header {
    //  TYPEDEFS  //

    /** Page Component Properties. */
    export type Props = { pages: PageMapItem[] };
}
