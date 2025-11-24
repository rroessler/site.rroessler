/// Website Modules
import { Button } from '../button';
import { Variant } from '../intrinsic';

/** Quiz Placeholder Component. */
export interface Placeholder extends Placeholder.Props {}
export function Placeholder({}: Placeholder) {
    // prepare a button constructor now
    const button = (variant: Variant) => (
        <Button key={variant} disabled className="placeholder" variant={variant} style={{ width: '6rem' }} />
    );

    // prepare the button group for a user-selected choice
    const choices = <Button.Group key="choices" className="me-auto" children={[button('success'), button('danger')]} />;

    // prepare the baseline question placeholder
    const question = <h3 key="question" className="placeholder placeholder-glow w-100" />;
    const actions = <div key="actions" className="d-flex w-100" children={[choices, button('primary')]} />;

    // and construct the resulting details now
    return <div className="d-flex flex-column align-items-end gap-2 mt-4 mb-5" children={[question, actions]} />;
}

export namespace Placeholder {
    //  TYPEDEFS  //

    /** Placeholder Component Properties. */
    export type Props = {};
}
