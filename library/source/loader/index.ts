/// Vendor Modules
import { loader, update, VirtualFile } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';

/// Website Modules
import { Product } from '@rroessler/product';
import * as Collection from '@rroessler/source/server';

/** Source Loaders Available. */
export namespace Loader {
    //  PROPERTIES  //

    export const docs = m_filter(Collection.docs.toFumadocsSource());
    export const blog = m_filter(Collection.blog.toFumadocsSource({ baseDir: 'blog' }));
    export const projects = m_filter(Collection.projects.toFumadocsSource({ baseDir: 'projects' }));

    /** Merge all the necessary content together. */
    export const content = loader({ docs, blog, projects }, { baseUrl: '/', plugins: [lucideIconsPlugin()] });

    //  PRIVATE METHODS  //

    /**
     * Handles filtering drafts from sources.
     * @param source                    Source to filter.
     */
    function m_filter<T>(source: T): T {
        // prepare the internal draft filter
        const filter = (file: VirtualFile) => {
            if (file.type === 'meta') return true;
            if (Product.development) return true;
            if (!('draft' in file.data)) return true;
            return !file.data.draft; // final validation
        };

        // and rebuild our incoming source now
        return update(source as unknown as any)
            .files((files) => files.filter(filter))
            .build() as T;
    }
}
