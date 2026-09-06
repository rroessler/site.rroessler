/** Education Component. */
export interface Education extends Education.Props {}
export function Education({ type, date, where }: Education) {
    return (
        <div className="flex flex-col md:flex-row justify-between px-3 mb-2 md:mb-0">
            <i>{type}</i>
            <span className="text-fd-muted-foreground">
                {where} &ndash; {date}
            </span>
        </div>
    );
}

export namespace Education {
    //  TYPEDEFS  //

    /** Education Properties Interface. */
    export interface Props {
        type: string;
        date: string;
        where: string;
    }
}
