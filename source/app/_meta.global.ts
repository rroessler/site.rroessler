/// Vendor Modules
import type { MetaRecord } from 'nextra';

/** All available posts. */
const POSTS: MetaRecord = {
    index: { type: 'page', display: 'hidden' },
};

/** All available projects. */
const PROJECTS: MetaRecord = {
    index: { type: 'page', display: 'hidden' },

    aster: { type: 'doc', display: 'hidden' },
    talos: { type: 'doc', display: 'hidden' },
    website: { type: 'doc' },
};

/** Defines necessary metadata details. */
export default {
    index: { type: 'page', title: 'Home', display: 'hidden' },

    about: { type: 'page' },
    resources: { type: 'page' },

    posts: { type: 'page', title: 'Blog', items: POSTS },
    projects: { type: 'page', items: PROJECTS },
};
