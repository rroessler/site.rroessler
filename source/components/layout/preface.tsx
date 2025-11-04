/// Vendor Modules
import { Head } from 'nextra/components';

/// CSS Modules
import 'halfmoon/css/halfmoon.min.css';
import 'halfmoon/css/cores/halfmoon.modern.css';

/** Preface Component. */
export interface Preface extends Preface.Props {}
export function Preface({ children }: Preface) {
    return (
        <Head>
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            {children /** append the children afterwards now */}
        </Head>
    );
}

export namespace Preface {
    //  TYPEDEFS  //

    /** Preface Component Properties. */
    export type Props = React.PropsWithChildren;
}
