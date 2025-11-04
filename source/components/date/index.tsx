export interface Date extends Date.Props {}
export function Date({ value, ...props }: Date) {
    // update our handler as necessary now
    if (['number', 'string'].includes(typeof value)) return Date({ value: new Date.Underlying(value), ...props });
    else if (!(value instanceof Date.Underlying)) return null; // ignore now since an invalid date

    // prepare the formats to be used
    const long: Intl.DateTimeFormatOptions = { month: 'long', day: '2-digit', year: 'numeric' };

    // and construct the resulting time instance
    return (
        <time key="date" dateTime={value.toISOString()} {...props}>
            <span className="d-inline-block d-md-none">{value.toLocaleDateString()}</span>
            <span className="d-none d-md-inline-block">{value.toLocaleString('default', long)}</span>
        </time>
    );
}

export namespace Date {
    //  TYPEDEFS  //

    export type Props = Omit<React.JSX.IntrinsicElements['time'], 'dateTime'> & { value: any };

    //  PROPERTIES  //

    export type Underlying = globalThis.Date;
    export const Underlying = globalThis.Date;
}
