/// Vendor Modules
import { ClockIcon } from 'lucide-react';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { findParent, Node } from 'fumadocs-core/page-tree';

/// Website Modules
import { Source } from '@rroessler/source';
import { Product } from '@rroessler/product';
import { Anchor, Badge, Brand, Button, Date } from '@rroessler/components';

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
        cards.length ? (
            <Cards key="cards" children={cards} />
        ) : (
            <p key="empty">There are currently no items to display!</p>
        ),
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
        if (!page || page.type === 'docs') return null;

        // prepare the all the details that we will show
        const title = page.data.title;
        const reading = m_reading(page.data.readingTime?.text);
        const date = page.type === 'blog' ? Date({ value: page.data.date }) : null;
        const repository = page.type === 'projects' ? m_repository(page.data.repo) : null;
        const tags = <span key="tags" className="flex gap-2" children={m_tags(page.data.tags)} />;
        const description = <div key="description" className="mb-4" children={page.data.description + '.'} />;

        // prepare all the required details to components.
        const extra = <div key="extra" className="flex justify-between" children={[tags, repository ?? reading]} />;

        // construct our resulting page now
        return (
            <Card key={page.url} title="" className="relative col-span-full">
                <Anchor href={page.url} className="absolute inset-0 " />
                <div className="flex justify-between font-bold pb-3 mb-3 border-b" children={[title, date]} />
                <div className="flex flex-col" children={[description, extra]} />
            </Card>
        );
    }

    //  PRIVATE METHODS  //

    /**
     * Constructs the view tags.
     * @param tags              Tags to show.
     */
    function m_tags(tags: string[] = []) {
        return Array.from(new Set(tags)).map((tag, ii) => (
            <Badge key={tag} className={ii > 0 ? 'hidden sm:inline-block' : undefined} children={tag} />
        ));
    }

    /**
     * Constructs reading time details.
     * @param reading               Reading time.
     */
    function m_reading(reading?: string) {
        // ignore if we have no reading details
        if (typeof reading === 'undefined') return null;

        // construct the resulting item now
        return (
            <span key="reading-time" className="flex align-center">
                <ClockIcon size="18" />
                &nbsp;
                {reading}
            </span>
        );
    }

    /**
     * Constructs a repository link.
     * @param repo                  Repository value.
     */
    function m_repository(repo?: string) {
        // ignore if we have no repository backing
        if (typeof repo === 'undefined') return null;

        // construct the resulting item now
        return (
            <Button
                key="repo"
                variant="secondary"
                size="icon-xs"
                className="z-1"
                children={<Brand.GitHub />}
                href={`${Product.github}/${repo}`}
            />
        );
    }
}
