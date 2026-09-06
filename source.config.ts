/// Vendor Modules
import * as fumadocs from 'fumadocs-mdx/config';

/// Website Modules
import { Schema } from '@rroessler/schema';
import { Language } from '@rroessler/language';

/** Blogs Collection. */
export const blog = m_define('docs/blog', Schema.post);

/** Projects Collection. */
export const projects = m_define('docs/projects', Schema.project);

/** Other Collections. */
export const docs = m_define('docs', Schema.page, '!blog', '!projects');

/** Fumadocs Configuration. */
export default fumadocs.defineConfig({
    mdxOptions: {
        providerImportSource: '@rroessler/markdown/bootstrap',
        rehypeCodeOptions: {
            langs: [await Language.Talos.grammar()],
            themes: { light: 'github-light', dark: 'github-dark' },
        },
    },
});

//  PRIVATE METHODS  //

/**
 * Handles defining docs collections.
 * @param dir               Directory to bind.
 * @param schema            Associated schema.
 * @param files             Include file patterns.
 */
function m_define<T extends typeof Schema.page>(dir: string, schema: T, ...files: string[]) {
    return fumadocs.defineDocs({
        dir,
        meta: { files: ['**/meta.json'], schema: Schema.meta },
        docs: {
            schema: schema,
            files: ['**/*.md', '**/*.mdx', ...files],
            postprocess: { includeProcessedMarkdown: true },
        },
    });
}
