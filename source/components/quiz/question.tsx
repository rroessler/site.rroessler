'use client';

/// Vendor Modules
import { clsx } from 'clsx';
import * as React from 'react';
import { TW50 } from 'weekly-fifty';

/// Website Modules
import { Answers } from './answers';
import { Context } from './context';
import { Button } from '../button';

/** Constructs a current question. */
export interface Question extends Question.Props {}
export function Question({ index, value, visible, title, deployment, answer }: Question) {
    // get the current context to be used
    const context = Context.Use();

    // determine the current visibility to be used now
    const setVisibility = () => context[visible ? 'hide' : 'show'](index);

    // prepare the details to be shown for the answer now
    const className = clsx('fw-normal d-flex flex-column align-items-center mt-4 mb-3', visible || 'd-none');
    const details = `${visible ? 'Hide' : 'Show'} Answer`; // prepare the answer details

    // prepare the update callback to be used
    const onCorrect = () => context.update(index, Answers.Value.CORRECT, deployment);
    const onInvalid = () => context.update(index, Answers.Value.INVALID, deployment);

    // prepare the variant to be constructed
    const variant = { [Answers.Value.CORRECT]: 'success', [Answers.Value.INVALID]: 'danger' }[value] ?? 'primary';

    // ensure the outgoing HTML is valid to be shown
    const number = `${index + 1}.&nbsp;`;
    const header = title.startsWith('<p>') ? `<p>${number}${title.slice(3)}` : `<p>${number}${title}</p>`;
    const content = answer.startsWith('<p>') ? answer : `<p>${answer}</p>`;

    // prepare the constructor for action buttons
    const action = (state: boolean) => {
        // prepare the incoming action details
        const label = state ? 'Correct' : 'Invalid';
        const key = label.toLowerCase();
        const type = state ? 'success' : 'danger';
        const callback = state ? onCorrect : onInvalid;
        const className = `opacity-${variant === type ? '100' : '50'}`;

        // construct the resulting action now
        return <Button key={key} variant={type} size="lg" className={className} onClick={callback} children={label} />;
    };

    // prepare the buttons to be used now
    const correct = action(true);
    const invalid = action(false);

    // prepare the button group to be used now
    const group = (
        <>
            <Button.Group className={`${visible ? '' : 'd-none'}`} children={[[correct, invalid]]} />
            <Button variant={variant} size="lg" className="ms-auto" onClick={setVisibility} children={details} />
        </>
    );

    // and construct the necessary answer now
    return (
        <>
            <h4 className="mt-4 text-center text-sm-start fw-medium" dangerouslySetInnerHTML={{ __html: header }} />
            <h5 className={className} dangerouslySetInnerHTML={{ __html: content }} />
            <div className="d-flex justify-content-center" children={group} />
        </>
    );
}

export namespace Question {
    //  TYPEDEFS  //

    export type Props = TW50.Question & {
        readonly index: number;
        readonly visible: boolean;
        readonly deployment: Date;
        readonly value: Answers.Value;
    };
}
