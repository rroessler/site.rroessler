/// Package Modules
import { Education } from './education';

/** Profession Component. */
export interface Profession extends Profession.Props {}
export function Profession({ type, from, until, where }: Profession) {
    return <Education type={type} where={where} date={`${from} to ${until ?? 'Present'}`} />;
}

export namespace Profession {
    //  TYPEDEFS  //

    /** Profession Properties Interface. */
    export interface Props {
        type: string;
        from: string;
        until?: string;
        where: string;
    }
}
