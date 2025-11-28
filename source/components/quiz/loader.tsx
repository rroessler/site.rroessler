'use client';

/// CSS Modules
import './styles/actions.css';

/// Vendor Modules
import useSWR from 'swr';
import { TW50 } from 'weekly-fifty';

/// Website Modules
import { Page } from '../page';
import { Button } from '../button';
import { Answers } from './answers';
import { Context } from './context';
import { Question } from './question';
import { Placeholder } from './placeholder';

/** Quiz Data Loader. */
export interface Loader {}
export function Loader() {
    // resolve the current answers as well
    const context = Context.Use();

    // prepare the "swr" handler to be used as well
    const { data } = useSWR(TW50.URL.Latest(), (url) => TW50.Fetch({ url }));

    // prepare a suitable deployment date to be shown
    const deployment = data?.deployment?.toLocaleDateString('en-AU') ?? '##/##/####';

    const loaded = typeof data === 'object'; // check if the data has been loaded
    const title = <Page.Subtitle key="title" children={`Quiz ${data?.id ?? '#'} - ${deployment}`} />;
    const placeholders = loaded ? undefined : [...new Array(10)].map((_, index) => <Placeholder key={index} />);

    // determine how many correct answers we have
    const correct = data ? context.answers?.[1].match(/1/g)?.length ?? 0 : '##';
    const results = `Result: ${correct} / ${data?.questions.length ?? '##'}`;

    // prepare the listing for clearing the current answers
    const actions = (
        <div key="actions" className="quiz-actions d-flex justify-content-end align-items-center gap-2 py-3">
            <h5 className="mb-0 me-auto" children={results} />
            <Button onClick={() => context.hide()}>Hide</Button>
            <Button onClick={() => context.clear()}>Reset</Button>
        </div>
    );

    // stop if the incoming data has not yet been loaded
    if (!loaded) return [title, actions, <div key="quiz" children={placeholders} />];

    // resolve the currently assigned answers
    const answers = [...context.resolve(data.deployment)[1]] as Answers.Value[];

    // prepare the questions to be shown now
    const questions = data.questions.map((question, index) => {
        // prepare the details to be used
        const value = answers[index];
        const visible = context.visibility[index];
        const options = { value, visible, deployment: data.deployment, ...question };

        // and construct the resulting question now
        return <Question key={index} index={index} {...options} />;
    });

    // and construct the resulting questions to be shown
    return [title, actions, <div key="quiz" children={questions} />];
}

export namespace Loader {
    //  TYPEDEFS  //

    /** Incoming Loader Properties. */
    export type Props = {};
}
