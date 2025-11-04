'use client';

/// Vendor Modules
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { FrontMatter, PageMapItem } from 'nextra';

/// Package Modules
import { Router } from '@/router';
import { Product } from '@/product';

/// Website Modules
import { Link } from './link';
import { Close } from './close';
import { Title } from './title';
import { Offcanvas } from './offcanvas';

/** Menu Component. */
export interface Menu extends Menu.Props {}
export function Menu({ pages }: Menu) {
    // get the current pathname details
    const pathname = usePathname();

    // prepare the necessary classes to be used now
    const header = 'offcanvas-header position-relative justify-content-start flex-shrink-0 py-0 border-bottom';

    // normalize the incoming pages against the root now
    const { activePath, docsDirectories, topLevelNavbarItems } = Router.Posts.normalize(pathname, pages);

    // check if "docs" mode or not
    const docs = !!docsDirectories.length;

    // resolve the items to be used now
    const items: Menu.Item[] = docs
        ? [Menu.Return(), Object.assign({}, activePath[0], { children: docsDirectories })]
        : topLevelNavbarItems; // otherwise show the top-level items now

    // and build the final children now
    const children = items.map((item, index) => Menu.Item(item, docs, index));

    // and construct the resulting menu now
    return (
        <Offcanvas responsive="lg">
            <div className={header} style={{ backgroundColor: 'var(--bs-secondary-bg)', height: 64 }}>
                <Title className="me-auto">{Product.title}</Title>
                <Close className="d-lg-none" />
            </div>

            <div className="offcanvas-body position-relative p-0">
                <ul className="sidebar-nav px-3 py-4">{children}</ul>
            </div>
        </Offcanvas>
    );
}

export namespace Menu {
    //  TYPEDEFS  //

    /** Menu Component Properties. */
    export type Props = { pages: PageMapItem[] };

    /** The underlying menu item. */
    export interface Item {
        name: string;
        route: string;
        title?: React.ReactNode;
        children?: Item[];
        frontMatter?: FrontMatter;
    }

    //  PUBLIC METHODS  //

    /** Allows returning to the main-view. */
    export function Return(): Item {
        return { name: 'home', route: '/', title: 'Home' };
    }

    /** Prepare the underlying page-map item. */
    export function Item(item: Item, docs: boolean, index: number) {
        // ensure we slice our children based on the docs-length
        const recent = Router.Posts.filter(item.children ?? [], item.route === '/posts').slice(0, docs ? 5 : undefined);

        // attempt getting any potential children now
        const children = recent.map((child) => (
            <li key={child.name} className="nav-item" children={<Link page={child} />} />
        ));

        // prepare the divider to split the children now
        const divider = children.length ? <li children={<hr className="sidebar-divider" />} /> : null;

        // attempt constructing each of our items now
        return (
            <React.Fragment key={item.name}>
                {index ? <li className="invisible" children={<hr className="sidebar-divider" />} /> : null}
                <li className={index ? 'mt-2' : ''} children={<Link header page={item} />} />
                {divider}
                {children}
            </React.Fragment>
        );
    }
}
