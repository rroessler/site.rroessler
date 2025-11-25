/// Vendor Modules
import type { MetaRecord } from 'nextra';

/** All available projects. */
const PROJECTS: MetaRecord = {
    index: { type: 'page', display: 'hidden' },

    aster: { type: 'doc' },
    talos: { type: 'doc' },
    website: { type: 'doc' },
};

/** Defines necessary metadata details. */
export default {
    index: { type: 'page', title: 'Home', display: 'hidden' },

    about: { type: 'page' },
    resources: { type: 'page' },
    quiz: { type: 'page', display: 'hidden' },

    posts: { type: 'page', title: 'Blog' },
    projects: { type: 'page', items: PROJECTS },
};
