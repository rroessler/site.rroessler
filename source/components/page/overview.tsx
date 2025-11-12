/// CSS Modules
import './styles/overview.css';

/// Vendor Modules
import { ReadingTime } from 'nextra';
import { getPageMap } from 'nextra/page-map';
import { ArrowUpRightIcon, ClockIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Router } from '@/router';

/// Website Modules
import { Date } from '../date';
import { Badge } from '../badge';
import { Brand } from '../brand';
import { Anchor } from '../anchor';
import { Button } from '../button';

/** Overview Component. */
export interface Overview extends Overview.Props {}
export async function Overview({ route, title, limit, nested }: Overview) {
    // attempt getting all the available overview cards to be used
    const { docsDirectories } = Router.Posts.normalize(route, await getPageMap());
    const items: Overview.Card[] = Router.Posts.filter(docsDirectories, nested);

    // prepare the children now
    const children = items.slice(0, limit).map(Overview.Card);

    // prepare the items to be used
    const cards = <div key="cards" className="d-flex flex-column gap-3" children={children} />;

    // and show our resulting items as necessary now
    return [
        title && <h3 key="header" className="my-4 pb-2 border-bottom" children={title} />,
        items.length ? cards : <p key="empty">There are currently no items available.</p>,
    ];
}

export namespace Overview {
    //  TYPEDEFS  //

    /** Overview Component Properties. */
    export interface Props {
        route: string;
        title?: string;
        limit?: number;
        nested?: boolean;
    }

    //  PUBLIC METHODS  //

    /** Overview Card Display. */
    export interface Card extends Router.Posts.Item {}
    export function Card(card: Card) {
        // check if we should show extra details at all
        const project = card.route.startsWith('/projects');

        // prepare our necessary metadata to be used
        const title = m_title(card.title, card.route);
        const date = Date({ value: card.frontMatter?.date });
        const repository = m_repository(card.frontMatter?.repo, !date);
        const description = <div key="description">{card.frontMatter?.description}</div>;

        // convert all the incoming tags now
        const tags = m_tags(card.frontMatter?.tags ?? []);

        // prepare the extra details to be appended now
        const leading = <span key="tags" className="d-flex align-items-center gap-2 me-auto" children={tags} />;
        const trailing = repository || (project ? null : m_reading(card.frontMatter?.readingTime, !date));
        const extra = <div key="body" className="mt-3 d-flex gap-2" children={[leading, trailing]} />;

        // prepare the children to be used now
        const header = [title, date];
        const body = [description, extra];

        // and attempt showing our overview of the item
        return (
            <article className="page-overview card" key={card.route}>
                <div className="card-header d-flex gap-2 align-items-center">{header}</div>
                <div className="card-body">{body}</div>
            </article>
        );
    }

    //  PRIVATE METHODS  //

    /**
     * Constructs a title to be used.
     * @param title             Title value.
     * @param route             Route value.
     */
    function m_title(title: React.ReactNode, route: string) {
        const className = 'h4 mb-0 me-auto stretched-link'; // prepare the class-name
        return <Anchor href={route} key="title" className={className} children={title} />;
    }

    function m_tags(tags: string[] = []) {
        return Array.from(new Set(tags)).map((tag) => <Badge key={tag}>{tag}</Badge>);
    }

    /**
     * Constructs reading time details.
     * @param reading               Reading time.
     * @param date                  Denotes if a date exists.
     */
    function m_reading(reading?: ReadingTime, date = false) {
        // ignore if we have no reading details
        if (typeof reading === 'undefined') return null;

        // construct the resulting item now
        return (
            <span key="reading-time" className="d-flex align-items-center">
                <ClockIcon size="18" />
                &nbsp;
                {reading.text}
            </span>
        );
    }

    /**
     * Constructs a repository link.
     * @param repo                  Repository value.
     * @param date                  Denotes if date exists.
     */
    function m_repository(repo?: string, date = false) {
        // ignore if we have no repository backing
        if (typeof repo === 'undefined') return null;

        // prepare the href to be used
        const href = `${Brand.GitHub.URL()}/${repo}`;

        // prepare the children to be used as well
        const children = [<span key="label">GitHub</span>, <ArrowUpRightIcon key="icon" />];

        // construct the resulting item now
        return <Button key="repo" href={href} className="z-1" children={children} />;
    }
}
