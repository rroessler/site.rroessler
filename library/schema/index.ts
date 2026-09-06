/// Vendor Modules
import { z } from 'zod';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

/** Collection Schema Properties. */
export namespace Schema {
    //  PROPERTIES  //

    /** Extend the baseline page-schema to be used. */
    export const page = pageSchema.extend({
        href: z.string().optional(),
        draft: z.boolean().optional(),
        banner: z.string().optional(),
        snippet: z.string().optional()
    });

    /** Extend the baseline page for blogs. */
    export const post = page.extend({
        date: z.iso.date().or(z.date()),
        tags: z.array(z.string()).optional()
    });

    /** Extend the baseline page for projects. */
    export const project = page.extend({
        tags: z.array(z.string()).optional()
    });

    /** Extend the baseline meta-schema to be used. */
    export const meta = metaSchema;
}
