/// Bootstrap Modules
import './source/bootstrap';

/// Vendor Modules
import * as nextra from 'nextra';

/** Prepare the layers to be used. */
let configuration = nextra.default({ readingTime: true });

/** Expose the underlying configuration. */
export default configuration({
    output: 'export',
    reactStrictMode: true,
    basePath: process.env.PAGES_BASE_PATH,
    turbopack: {
        resolveAlias: {
            'next-mdx-import-source-file': './markdown/index.tsx',
        },
    },
});
