/// CSS Modules
import './styles/overview.css';

/// Vendor Modules
import { clsx } from 'clsx';
import { getPageMap } from 'nextra/page-map';
import { FrontMatter, ReadingTime } from 'nextra';
import { normalizePages } from 'nextra/normalize-pages';
import { ClockIcon } from '@phosphor-icons/react/dist/ssr';

/// Website Modules
import { Anchor } from '../anchor';

/** Overview Component. */
export interface Overview extends Overview.Props {}
export async function Overview({ route, title, limit }: Overview) {
    const list = await getPageMap(); // prepare list now
    const { docsDirectories } = normalizePages({ list, route });

    // from here we map our items into cards to be shown
    const items = (docsDirectories as Overview.Card[])
        .filter((item) => item.name !== 'index')
        .sort((a, b) => +new Date(b.frontMatter?.date) - +new Date(a.frontMatter?.date));

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
    }

    //  PUBLIC METHODS  //

    /** Overview Card Display. */
    export type Card = { name: string; title?: string; route: string; frontMatter: FrontMatter };
    export function Card(card: Card) {
        // prepare our necessary metadata to be used
        const date = m_date(card.frontMatter.date);
        const reading = m_reading(card.frontMatter.readingTime, !date);
        const title = <h4 key="title" className="mb-0 me-auto" children={card.title} />;

        // prepare the children to be used now
        const children = [title, date, reading];

        // and attempt showing our overview of the item
        return (
            <div className="page-overview card" key={card.route}>
                <Anchor href={card.route} className="card-body">
                    <article className="d-flex gap-2 align-items-center">{children}</article>
                </Anchor>
            </div>
        );
    }

    //  PRIVATE METHODS  //

    /**
     * Constructs a suitable date value.
     * @param input                 Input to inherit.
     */
    function m_date(input: any) {
        if (typeof input === 'string') return m_date(new Date(input));
        else if (!(input instanceof Date)) return null; // ignore now

        // prepare the formats to be used
        const long: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };

        // and construct the resulting time instance
        return (
            <time key="date" dateTime={input.toISOString()}>
                <span className="d-inline-block d-md-none">{input.toLocaleDateString()}</span>
                <span className="d-none d-md-inline-block">{input.toLocaleString('default', long)}</span>
            </time>
        );
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

        return (
            <span key="reading-time" className={className}>
                <ClockIcon size="18" />
                &nbsp;
                {reading.text}
            </span>
        );
    }
}
