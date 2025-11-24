'use client';

/// Package Modules
import { Storage } from '@/storage';

/// Website Modules
import { Context } from './context';

export type Answers = [Date, Answers.State];
export namespace Answers {
    //  TYPEDEFS  //

    /** Available Answers Values. */
    export const enum Value {
        CORRECT = '1',
        INVALID = '0',
        UNKNOWN = '2',
    }

    /** Available Answer States. */
    export type State = `${Value}`;

    //  PROPERTIES  //

    /** Storage key to use. */
    export const storage = 'quiz.record';

    //  PUBLIC METHODS  //

    /** Gets the preferred system color-scheme. */
    export const unset = (): Answers => [new Date(0), '2'.repeat(50) as State];

    /** Gets the current answers to be used. */
    export const resolve = (): Answers => Storage.Local.get<Answers>(storage) ?? unset();

    /**
     * Handles subscribing context values.
     * @param answers               Current answers.
     * @param setter                Setter for context.
     */
    export const subscribe = (answers: Answers, setter: (value: Answers) => void): Context => ({
        answers,
        outer: false,

        clear: () => setter(unset()),
        resolve: (deployment) => (answers[0] < deployment ? unset() : answers),
        update: (index, state) => {
            const values = [...answers[1]];
            values[index] = state; // update and set now
            setter([new Date(), values.join('') as State]);
        },
    });
}
