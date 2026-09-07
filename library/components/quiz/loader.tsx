'use client';

/// CSS Modules
import './styles/quiz.css';

/// Vendor Modules
import useSWR from 'swr';
import { TW50 } from 'weekly-fifty';

/// Local Modules
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
    const title = (
        <p key="description" className="page-subtitle text-lg text-fd-muted-foreground mb-6">
            Quiz {data?.id ?? '###'} - {deployment}
        </p>
    );

    // resolve the currently assigned answers
    const answers = data ? ([...context.resolve(data.deployment)[1]] as Answers.Value[]) : undefined;

    // check if the data has been loaded
    const loaded = typeof data === 'object';
    const placeholder = loaded ? undefined : <Placeholder />;

    // determine how many correct answers we have
    const answered = data ? (answers?.filter((value) => value !== '2')?.length ?? 0) : '##';
    const correct = data ? (answers?.filter((value) => value === '1')?.length ?? 0) : '##';
    const results = `<b>Score</b>: ${correct} / ${data?.questions.length ?? '##'} (${answered})`;

    // prepare the class for the actions
    const className =
        'quiz-actions flex justify-end align-center gap-2 py-4 backdrop-blur bg-fd-background/80 border-b';

    // prepare the listing for clearing the current answers
    const actions = (
        <div key="actions" className={className}>
            <h5 className="mb-0 me-auto" dangerouslySetInnerHTML={{ __html: results }} />
            <Button className="py-0" onClick={() => context.hide()} children="Hide" />
            <Button className="py-0" onClick={() => context.clear()} children="Reset" />
        </div>
    );

    // stop if the incoming data has not yet been loaded
    if (!loaded || typeof answers === 'undefined') return [title, actions, <div key="quiz" children={placeholder} />];

    // prepare the questions to be shown now
    const questions = data.questions.map((question, index) => {
        // prepare the details to be used
        const value = answers[index];
        const visible = context.visibility[index];
        const options = { value, visible, deployment: data.deployment, ...question };

        // and construct the resulting question now
        return <Question key={index} index={index} {...options} />;
    });

    console.log(data.questions[24]);

    // and construct the resulting questions to be shown
    return [title, actions, <div className="quiz-view" key="quiz" children={questions} />];
}
