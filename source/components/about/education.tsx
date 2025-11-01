/** Education Component. */
export interface Education extends Education.Props {}
export function Education({ type, date, where }: Education) {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between px-3 mb-2 mb-md-0">
            <i>{type}</i>
            <span className="text-secondary">
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
