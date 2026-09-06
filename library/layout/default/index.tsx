/// Vendor Modules
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

/// Website Modules
import { Source } from '@rroessler/source';

/// Local Modules
import { Options, Tree } from '../options';

/** Home Layout Component. */
export type Default = React.PropsWithChildren & { tree?: Tree };
export function Default({ children, tree = Source.Loader.content.getPageTree() }: Default) {
    return <DocsLayout tree={tree} {...Options()} children={children} />;
}
