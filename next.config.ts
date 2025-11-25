/// Vendor Modules
import * as nextra from 'nextra';

/** Prepare the layers to be used. */
const configuration = nextra.default({ readingTime: true });

/** Prepare all the available aliases. */
const aliases = { 'next-mdx-import-source-file': './markdown/index.tsx' };

/** Expose the underlying configuration. */
export default configuration({
    output: 'export',
    reactStrictMode: true,
    images: { unoptimized: true },
    basePath: process.env.PAGES_BASE_PATH,
    turbopack: { resolveAlias: aliases },
});
