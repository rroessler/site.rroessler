'use client';

/// Vendor Modules
import * as React from 'react';

/// Website Modules
import { Answers } from './answers';

/** Contextual Support. */
export interface Context {
    readonly outer: boolean;
    readonly answers?: Answers;

    clear(): void;
    resolve(deployment: Date): Answers;
    update(index: number, state: Answers.Value): void;
}

export namespace Context {
    //  PROPERTIES  //

    /** Defaulted context values. */
    const m_default: Context = {
        outer: true,
        answers: Answers.unset(),

        clear: () => {},
        update: () => {},
        resolve: () => Answers.unset(),
    };

    /** The internal context value. */
    const m_context = React.createContext(m_default);

    //  PUBLIC METHODS  //

    /** Gets the current quiz results. */
    export const Storage = () => 'quiz.results';

    /** Gets the context to be used. */
    export const Use = () => React.useContext(m_context);

    /** Context Provider Wrapper. */
    export function Provider({ context, children }: React.PropsWithChildren<{ context: Context }>) {
        const Provider = m_context as unknown as React.FC<Parameters<typeof m_context>[0]>;
        return <Provider value={context}>{children}</Provider>; // and construct now
    }
}
