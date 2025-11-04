/// Package Modules
import { Router } from '@/router';

/** Prepare the content controller. */
const content = new Router.Content();

/** Force dynamic parameters to fail when necessary. */
export const dynamicParams = false;

/** How to generate the static parameters. */
export const generateStaticParams = content.static();

/** How to generate the metadata. */
export const generateMetadata = content.metadata();

/** A catch-all route fo incoming slugs. */
export default content.view();
