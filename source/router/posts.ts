/// Vendor Modules
import { getPageMap } from 'nextra/page-map';
import { FrontMatter, PageMapItem } from 'nextra';
import { normalizePages } from 'nextra/normalize-pages';

/** Posts Functionaltiy. */
export type Posts = Posts.Item[];
export namespace Posts {
    //  TYPEDEFS  //

    /** Incoming Post Item. */
    export interface Item {
        name: string;
        route: string;
        children?: Item[];
        frontMatter?: FrontMatter;
        title?: string | React.ReactNode;
    }

    //  PUBLIC METHODS  //

    /**
     * Handles getting a list of posts.
     * @param route             Route to get.
     */
    export async function list(route = '/posts') {
        return getPageMap(route)
            .then((pages) => normalize(route, pages))
            .then(({ directories }) => filter(directories));
    }

    /**
     * Handles getting a list of post tags.
     * @param route             Route to get.
     */
    export async function tags(route = '/posts') {
        return list(route).then((posts) => posts.flatMap((post) => post.frontMatter?.tags ?? []));
    }

    /**
     * Handles normalizing incoming pages.
     * @param route                 Route given.
     * @param list                  List of pages.
     */
    export function normalize(route: string, list: PageMapItem[]) {
        return normalizePages({ list, route });
    }

    /**
     * Handles filtering items.
     * @param items                 Items to filter.
     */
    export function filter(items: Item[], nested = false) {
        return (nested ? items.flatMap((item) => item.children ?? []) : items)
            .filter((item) => item.name !== 'index')
            .sort((a, b) => +new Date(b.frontMatter?.date) - +new Date(a.frontMatter?.date));
    }
}
