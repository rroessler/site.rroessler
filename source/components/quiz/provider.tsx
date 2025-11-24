'use client';

/// Package Modules
import { Storage } from '@/storage';

/// Website Modules
import { Loader } from './loader';
import { Answers } from './answers';
import { Context } from './context';

/** Theme Provider Component. */
export interface Provider extends Provider.Props {}
export function Provider({}: Provider) {
    // get the underlying theme instance to be used now
    const context = Context.Use();

    // update the context with a suitable mode handler
    const [answers, setAnswers] = Storage.Persistent.Use(Context.Storage(), Answers.unset());

    // ensure not calling recursively at all here
    if (!context.outer) return null;

    // update the current context to be used now
    const inner = Answers.subscribe(answers, setAnswers);

    // and ensure we encapsulate all our underlying components now
    return <Context.Provider context={inner} children={<Loader />} />;
}

export namespace Provider {
    //  TYPEDEFS  //

    /** Theme Provider Options Interface. */
    export type Props = {};
}
