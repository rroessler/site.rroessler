/// Vendor Modules
import { getGithubLastEdit, GetGithubLastCommitOptions } from 'fumadocs-core/content/github';

/// Website Modules
import { cn } from '@rroessler/utilities';
import { Date } from '@rroessler/components';
import { Product } from '@rroessler/product';

/** Gets the last modified time for markdown pages. */
export interface Edited extends Edited.Props {}
export async function Edited({ path, options = {}, className, ...props }: Edited) {
    // revise the outgoing options to be used and get the necessary last-modified details
    const input = { path: `docs/${path}`, owner: 'rroessler', repo: 'rroessler.io', ...options };
    const edited = Product.development ? null : await getGithubLastEdit(input).catch(() => null);

    // prepare a suitable format to be used as well
    const format: Date.Format = { month: 'long', day: '2-digit', year: 'numeric' };

    // and construct a suitable last-updated timestamp to be used
    return (
        <div className={cn('text-fd-muted-foreground border-t mt-8 py-5', className)} {...props}>
            Last updated on {(edited ?? new Date.Underlying()).toLocaleString(undefined, format)}
        </div>
    );
}

export namespace Edited {
    //  TYPEDEFS  //

    /** Last Edited Component Properties. */
    export type Props = Omit<React.JSX.IntrinsicElements['div'], 'children'> & {
        path: string;
        options?: Omit<Partial<GetGithubLastCommitOptions>, 'path'>;
    };
}
