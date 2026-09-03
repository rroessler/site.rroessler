/// Vendor Modules
import * as fumadocs from 'fumadocs-mdx/next';

// export the configuration that we require
export default fumadocs.createMDX()({
    output: 'export',
    reactStrictMode: true
});
