'use client';

/// Vendor Modules
import * as React from 'react';

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

    // prepare the visibility state to be used
    const [visibility, setVisibility] = React.useState(Context.Visibility());

    // prepare the visibility toggle handler
    const toggleVisibility = (state: boolean, index?: number) => {
        if (typeof index === 'undefined') setVisibility(Context.Visibility(state));
        else (visibility[index] = state), setVisibility([...visibility]); // update
    };

    // update the context with a suitable mode handler
    const [answers, setAnswers] = Storage.Persistent.Use(Context.Storage(), Answers.unset());

    // ensure not calling recursively at all here
    if (!context.outer) return null;

    // update the current context to be used now
    const inner: Context = {
        answers,
        visibility,
        outer: false,

        hide: (index) => toggleVisibility(false, index),
        show: (index) => toggleVisibility(true, index),
        clear: () => (setAnswers(Answers.unset()), toggleVisibility(false)),
        resolve: (deployment) => (answers[0] < deployment ? Answers.unset() : answers),
        update: (index, state) => {
            const values = [...answers[1]];
            values[index] = state; // update and set now
            setAnswers([new Date(), values.join('') as Answers.State]);
        },
    };

    // and ensure we encapsulate all our underlying components now
    return <Context.Provider context={inner} children={<Loader />} />;
}

export namespace Provider {
    //  TYPEDEFS  //

    /** Theme Provider Options Interface. */
    export type Props = {};
}
