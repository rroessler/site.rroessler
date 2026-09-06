/// Vendor Modules
import { Card, Cards } from 'fumadocs-ui/components/card';
import { findParent, Node } from 'fumadocs-core/page-tree';

/// Website Modules
import { Source } from '@rroessler/source';

/** Overview Component. */
export interface Preview extends Preview.Props {}
export async function Preview({ route, limit, title }: Preview) {
    // prepare the set of files to be used here
    const root = findParent(Source.Loader.content.getPageTree(), route);

    // convert our items into suitable values now
    const cards = await Promise.all(root?.children.slice(0, limit).map(Preview.Placard) ?? []);

    // and return the resulting items now
    return [
        title && <h2 key="header" className="my-4 pb-2" children={title} />,
        cards.length ?
            <Cards key="cards" children={cards} />
        :   <p key="empty">There are currently no items to display!</p>
    ];
}

export namespace Preview {
    //  TYPEDEFS  //

    /** Preview Component Properties. */
    export interface Props {
        route: string;
        title?: string;
        limit?: number;
    }

    /** Card Component. */
    export type Placard = Node;
    export async function Placard(node: Placard) {
        // stop early if there is no valid input
        if (node.type !== 'page') return null;

        // convert to a suitable page now
        const page = Source.Loader.content.getNodePage(node);
        if (typeof page === 'undefined') return null;

        // construct our resulting page now
        return (
            <Card key={page.url} href={page.url} title="" className="col-span-full">
                <p className="">{page.data.title}</p>
                <p className="">{page.data.description}</p>
            </Card>
        );
    }
}
