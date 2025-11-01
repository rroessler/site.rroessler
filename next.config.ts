/// Vendor Modules
import nextra from 'nextra';

/** Prepare the "nextra" configuration builder. */
const setup = nextra({ readingTime: true });

/** Expose the underlying configuration. */
export default setup({
    output: 'export',
    reactStrictMode: true,
    turbopack: {
        resolveAlias: {
            'next-mdx-import-source-file': './markdown/index.tsx',
        },
    },
});
