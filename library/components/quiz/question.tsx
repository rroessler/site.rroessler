'use client';

/// Vendor Modules
import { TW50 } from 'weekly-fifty';

/// Website Modules
import { cn } from '@rroessler/utilities';

/// Local Modules
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
    const className = cn('fw-normal flex flex-col text-center mt-0 mb-6', visible || 'hidden');
    const details = `${visible ? 'Hide' : 'Show'} Answer`; // prepare the answer details

    // prepare the update callback to be used
    const onCorrect = () => context.update(index, Answers.Value.CORRECT, deployment);
    const onInvalid = () => context.update(index, Answers.Value.INVALID, deployment);

    // prepare the variant to be constructed
    const variant = (Answers.mapping[value] ?? 'outline') as Button['variant'];

    // ensure the outgoing HTML is valid to be shown
    const number = `${index + 1}.&nbsp;`;
    const header = <p className="!m-0" dangerouslySetInnerHTML={{ __html: number + Question.Trim(title) }} />;

    // prepare the constructor for action buttons
    const action = (state: boolean) => {
        // prepare the incoming action details
        const label = state ? 'Correct' : 'Invalid';
        const key = label.toLowerCase();
        const type = state ? 'primary' : 'secondary';
        const callback = state ? onCorrect : onInvalid;
        const className = variant === type ? undefined : 'quiz-disabled';

        // construct the resulting action now
        return <Button key={key} variant={type} className={className} onClick={callback} children={label} />;
    };

    // prepare the buttons to be used now
    const correct = action(true);
    const invalid = action(false);

    // prepare the button group to be used now
    const group = (
        <>
            <Button.Group className={`${visible ? '' : 'hidden'}`} children={[[correct, invalid]]} />
            <Button variant={variant} className="ms-auto" onClick={setVisibility} children={details} />
        </>
    );

    // and construct the necessary answer now
    return (
        <>
            <h2 className="text-center text-start fw-medium mt-4 mb-6" children={header} />
            <h3 className={className} dangerouslySetInnerHTML={{ __html: Question.Trim(answer) }} />
            <div className="flex justify-center mb-8" children={group} />
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

    //  PUBLIC METHODS  //

    /**
     * Handles trimming inputs.
     * @param input                 Input to trim.
     */
    export function Trim(input: string) {
        // prepare a potential set of tags to trim
        const tags = ['p', 'span'];

        // and attempt trimming now
        for (const tag of tags) {
            const [open, close] = [`<${tag}>`, `</${tag}>`];
            if (!input.startsWith(open)) continue; // ignore handling
            if (!input.endsWith(close)) return input.slice(open.length);
            else return input.slice(open.length, -close.length); // fully
        }

        // did not find a suitable tag to be sliced
        return input;
    }
}
