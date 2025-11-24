'use client';

/// Vendor Modules
import { clsx } from 'clsx';
import * as React from 'react';
import { TW50 } from 'weekly-fifty';

/// Website Modules
import { Answers } from './answers';
import { Context } from './context';
import { Button } from '../button';
import { Variant } from '../intrinsic';

/** Constructs a current question. */
export interface Question extends Question.Props {}
export function Question({ index, value, title, answer }: Question) {
    // get the current context to be used
    const context = Context.Use();

    // prepare a suitably view-answer handler
    const [visible, setVisible] = React.useState(false);
    const className = clsx('fw-normal d-flex flex-column align-items-center', visible || 'd-none');
    const details = `${visible ? 'Hide' : 'Show'} Answer`;

    // prepare the update callback to be used
    const onCorrect = () => context.update(index, Answers.Value.CORRECT);
    const onInvalid = () => context.update(index, Answers.Value.INVALID);

    // prepare the variant to be constructed
    const variant = { [Answers.Value.CORRECT]: 'success', [Answers.Value.INVALID]: 'danger' }[value];

    // prepare the buttons to be used now
    const correct = <Button key="correct" variant="success" onClick={onCorrect} children={'Correct'} />;
    const invalid = <Button key="invalid" variant="danger" onClick={onInvalid} children={'Invalid'} />;

    // prepare the button group to be used now
    const group = (
        <>
            <Button.Group className={`me-auto ${visible ? '' : 'd-none'}`} children={[[correct, invalid]]} />
            <Button variant={variant} onClick={() => setVisible(!visible)} children={details} />
        </>
    );

    // and construct the necessary answer now
    return (
        <>
            <h4 className="mt-4 text-center text-sm-start" dangerouslySetInnerHTML={{ __html: title }} />
            <h5 className={className} dangerouslySetInnerHTML={{ __html: answer }} />
            <div className="d-flex justify-content-center" children={group} />
        </>
    );
}

export namespace Question {
    //  TYPEDEFS  //

    export type Props = TW50.Question & {
        readonly index: number;
        readonly value: Answers.Value;
    };
}
