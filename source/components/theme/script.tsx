/// Website Modules
import { Mode } from './mode';
import { Swatch } from './swatch';

/** Native Initializer Script. */
export interface Script extends Script.Props {}
export function Script(props: Script) {
    // ensure we stringify our incoming properties
    const args = JSON.stringify(props);

    // prepare the script instance as well
    const script = `(${Script.Native.toString()})(${args})`;

    // and construct the resulting script now
    return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
}

export namespace Script {
    //  TYPEDEFS  //

    /** Given script properties. */
    export type Props = Arguments;

    /** Script Values. */
    export interface Value<T extends string = string> {
        readonly preset: T;
        readonly key: string;
        readonly attribute: string;
    }

    /** Script Arguments. */
    export interface Arguments {
        readonly mode: Value<Mode>;
        readonly swatch: Value<Swatch>;
    }

    //  PUBLIC METHODS  //

    /**
     * Then native script handler.
     * @param args              Native script arguments.
     */
    export const Native = ({ mode, swatch }: Arguments) => {
        // get the baseline details for setting the mode/swatch
        const element = document.documentElement;

        // prepare the resolution handler now
        const update = ({ key, attribute, preset }: Value) => {
            const value = localStorage.getItem(key) ?? preset;
            element.setAttribute(attribute, JSON.parse(value));
        };

        // prepare the incoming mode/swatch to be used
        update(mode), update(swatch);
    };
}
