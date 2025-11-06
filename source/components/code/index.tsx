'use client';

/// CSS Modules
import './styles/code.css';

/// Vendor Modules
import clsx from 'clsx';

/// Icon Modules
import {
    FileCIcon,
    FileCppIcon,
    FileJsIcon,
    FileTsIcon,
    SwordIcon,
    TerminalIcon,
} from '@phosphor-icons/react/dist/ssr';

/// Website Modules
import { Button } from '../button';

/** Code Component. */
export interface Code extends Code.Props {}
export function Code({ className, ...props }: Code) {
    // ensure we modify the incoming className
    className = clsx('mb-0', className);
    (props.style ?? {}).minWidth = 'max-content';

    // get the incoming language to be presented
    const language = props['data-language'];

    // and construct the resulting instance now
    return (
        <div className="card bg-body-tertiary mb-3">
            {Code.Language(language)}
            <div className="card-body overflow-auto px-0">
                <pre className={className} {...props}></pre>
            </div>
        </div>
    );
}

export namespace Code {
    //  TYPEDEFS  //

    /** Code Component Properties. */
    export type Props = React.JSX.IntrinsicElements['pre'] & { 'data-language'?: string };

    //  PUBLIC METHODS  //

    /** Resolves language details. */
    export function Language(identifier?: string) {
        const resolved = m_resolve(identifier); // prepare
        if (typeof resolved === 'undefined') return;

        // prepare the resultant details now
        const [name, Icon] = resolved;

        // prepare the callback for copying the code
        const onClick = async (event: React.MouseEvent) => {
            const target = event.target as HTMLElement;
            const pre = target.parentElement?.nextSibling?.firstChild as HTMLElement;
            if (pre.tagName === 'PRE') await navigator.clipboard.writeText(pre.textContent);
        };

        // prepare the potential copy-handler
        const copy = (
            <Button
                key="copy"
                size="sm"
                variant="secondary"
                className="font-monospace ms-auto"
                onClick={onClick}
                children={`Copy ${name}`}
            />
        );

        // bind the children now
        const children = [<Icon key="icon" size="24" />, copy];

        // construct the resulting language details now
        return <div className="card-header d-flex align-items-center" children={children} />;
    }

    //  PRIVATE METHODS  //

    /**
     * Resolves language icons/names.
     * @param identifier                Language identifier.
     */
    function m_resolve(identifier?: string): [string, React.FC<{ size?: string }>] | undefined {
        switch (identifier?.toLowerCase()) {
            case 'c':
                return ['C', FileCIcon];

            case 'cpp':
            case 'c++':
                return ['C++', FileCppIcon];

            case 'sh':
            case 'bash':
            case 'shell':
                return ['Shell', TerminalIcon];

            case 'js':
            case 'mjs':
            case 'cjs':
            case 'javascript':
                return ['JavaScript', FileJsIcon];

            case 'ts':
            case 'mts':
            case 'cts':
            case 'typescript':
                return ['TypeScript', FileTsIcon];

            case 'talos':
                return ['Talos', SwordIcon];
        }
    }
}
