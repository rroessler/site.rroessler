/// Vendor Modules
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

/// Website Modules
import { Source } from '@rroessler/source';
import { Markdown } from '@rroessler/markdown';
import { Product } from '@rroessler/product';
import { Anchor } from '@rroessler/components';

//  PROPERTIES  //

/** Ensure no caching of documentation. */
export const revalidate = false;

/** Ensure the parameters are not dynamic. */
export const dynamicParams = false;

//  PUBLIC METHODS  //

/** Handles getting static parameters. */
export async function generateStaticParams() {
    return Source.Loader.content.generateParams();
}

/** Handles getting available metadata. */
export async function generateMetadata(props: PageProps<'/[[...slug]]'>) {
    const slug = await props.params.then((params) => params.slug);
    const page = Source.Loader.content.getPage(slug); // get the page
    const title = page ? `${page.data.title} | ${Product.title}` : undefined;
    return page ? { title, description: page.data.description } : notFound();
}

/** Base Documentation Page. */
export default async function Page(props: PageProps<'/[[...slug]]'>) {
    const page = Source.Loader.content.getPage(await props.params.then((params) => params.slug));
    if (typeof page === 'undefined') notFound(); // ignore when we have invalid pages

    // alias the incoming "MDX" content as necessary
    const Content = page.data.body;

    // construct the necessary components to be used
    const components = Markdown.Provider({});

    // determine a suitable subtitle to be used
    const subtitle = page.data.snippet ?? page.data.description;
    const banner = (
        <Anchor className="page-title" href={page.data.href}>
            {page.data.banner ?? page.data.title} {page.data.draft ? '(draft)' : null}
        </Anchor>
    );

    // prepare the last-updated time to be used as well
    const updated = <Markdown.Edited key="updated" path={page.path} />;

    // prepare each of our components to be used
    const title = <DocsTitle key="title" children={banner} />;
    const body = <DocsBody key="body" children={<Content components={components} />} />;
    const description = <DocsDescription key="description" className="page-subtitle mb-6" children={subtitle} />;

    // and finally construct the resulting page
    return (
        <DocsPage
            tableOfContent={{ enabled: false }}
            breadcrumb={{ includePage: true }}
            children={[title, description, body, updated]}
        />
    );
}
