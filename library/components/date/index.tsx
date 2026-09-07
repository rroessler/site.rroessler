/** Date Component. */
export interface Date extends Date.Props {}
export function Date({ value, ...props }: Date) {
    // update our handler as necessary now
    if (['number', 'string'].includes(typeof value)) return Date({ value: new Date.Underlying(value), ...props });
    else if (!(value instanceof Date.Underlying)) return null; // ignore now since an invalid date

    // prepare the formats to be used
    const short: Date.Format = { month: 'short', day: '2-digit', year: 'numeric' };
    const long: Date.Format = { month: 'long', day: '2-digit', year: 'numeric' };

    // and construct the resulting time instance
    return (
        <time key="date" dateTime={value.toISOString()} {...props}>
            <span className="inline-block md:hidden">{value.toLocaleString('default', short)}</span>
            <span className="hidden md:inline-block">{value.toLocaleString('default', long)}</span>
        </time>
    );
}

export namespace Date {
    //  TYPEDEFS  //

    /** Underlying Date Formatting Type. */
    export type Format = Intl.DateTimeFormatOptions;

    /** Date Component Properties. */
    export type Props = Omit<React.JSX.IntrinsicElements['time'], 'dateTime'> & { value: any };

    //  PROPERTIES  //

    /** Underlying Date Class. */
    export type Underlying = globalThis.Date;
    export const Underlying = globalThis.Date;
}
