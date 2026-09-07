/// Declare Client
'use client';

/// Package Modules
import { Storage } from '@rroessler/storage';

/** Quiz Answers Functionality. */
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

    export const mapping: Record<string, string | undefined> = {
        [Value.CORRECT]: 'primary',
        [Value.INVALID]: 'secondary',
    };

    //  PUBLIC METHODS  //

    /** Gets the preferred system color-scheme. */
    export const unset = (): Answers => [new Date(0), '2'.repeat(50) as State];

    /** Gets the current answers to be used. */
    export const resolve = (encoded: Answers = Storage.Local.get<Answers>(storage) ?? unset()): Answers => {
        return [new Date(encoded[0]), encoded[1]]; // and ensure we parse the date now
    };
}
