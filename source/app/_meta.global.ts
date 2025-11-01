/// Vendor Modules
import type { MetaRecord } from 'nextra';

/** All available posts. */
const POSTS: MetaRecord = {
    index: { title: 'Blog', display: 'hidden' },
};

/** All available projects. */
const PROJECTS: MetaRecord = {
    index: { title: 'Projects', display: 'hidden' },

    talos: { title: 'Talos', display: 'hidden' },
    website: { title: 'Website' },
};

/** Defines necessary metadata details. */
export default {
    index: { type: 'page', title: 'Home', display: 'hidden' },

    about: { type: 'page', title: 'About' },
    resources: { type: 'page', title: 'Resources' },

    posts: { type: 'page', title: 'Blog', items: POSTS },
    projects: { type: 'page', title: 'Projects', items: PROJECTS },
};
