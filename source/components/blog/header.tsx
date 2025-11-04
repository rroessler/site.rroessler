/// Website Modules
import { Date } from '../date';
import { Page } from '../page';

/** Blog Header Component. */
export interface Header extends Header.Props {}
export function Header(props: Header) {
    // prepare the underlying date value now as necessary
    const date = Date({ value: props.date });
    const published = date && <>Published: {date}</>;

    // construct the title and details now to be shown
    const title = props.title && <Page.Title key="title" href={props.href} children={props.title} />;
    const subtitle = <Page.Subtitle key="subtitle" className="mb-4" children={published} />;

    // and return the resulting items now as necessary
    return [title, subtitle];
}

export namespace Header {
    //  TYPEDEFS  //

    /** Title Component Properties. */
    export interface Props {
        title?: string;
        date?: string;
        href?: string;
    }
}
