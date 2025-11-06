/// CSS Modules
import './styles/overview.css';

/// Vendor Modules
import { clsx } from 'clsx';
import { ReadingTime } from 'nextra';
import { getPageMap } from 'nextra/page-map';
import { ArrowUpRightIcon, ClockIcon } from '@phosphor-icons/react/dist/ssr';

/// Package Modules
import { Router } from '@/router';

/// Website Modules
import { Date } from '../date';
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
        // prepare our necessary metadata to be used
        const title = m_title(card.title, card.route);
        const date = Date({ value: card.frontMatter?.date });
        const repo = m_repository(card.frontMatter?.repo, !date);
        const reading = repo || m_reading(card.frontMatter?.readingTime, !date);

        // prepare the children to be used now
        const children = [title, date, reading];

        // and attempt showing our overview of the item
        return (
            <div className="page-overview card" key={card.route}>
                <div className="card-body">
                    <article className="d-flex gap-2 align-items-center">{children}</article>
                </div>
            </div>
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

    /**
     * Constructs reading time details.
     * @param reading               Reading time.
     * @param date                  Denotes if a date exists.
     */
    function m_reading(reading?: ReadingTime, date = false) {
        // ignore if we have no reading details
        if (typeof reading === 'undefined') return null;

        // build the underlying class-name to be used
        let className = date ? 'd-flex' : 'd-none d-sm-flex';
        className = clsx(className, 'align-items-center ms-4');

        // construct the resulting item now
        return (
            <span key="reading-time" className={className}>
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

        // build the underlying class-name to be used
        let className = date ? 'd-flex' : 'd-none d-sm-flex';
        className = clsx(className, 'align-items-center gap-1 ms-4 z-1');

        // prepare the href to be used
        const href = `${Brand.GitHub.URL()}/${repo}`;

        // prepare the children to be used as well
        const children = [<span key="label">GitHub</span>, <ArrowUpRightIcon key="icon" />];

        // construct the resulting item now
        return <Button key="repo" href={href} className={className} children={children} />;
    }
}
