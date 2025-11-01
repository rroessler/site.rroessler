/// Vendor Modules
import { clsx } from 'clsx';

/// Website Modules
import { Anchor } from '../anchor';
import { Group as _Group } from './group';
import { Sizing, Variant } from '../intrinsic';

/** Button Component. */
export function Button(props: Button.Props): React.ReactNode;
export function Button(props: Button.Anchor): React.ReactNode;
export function Button({ className, href, size, variant, ...props }: any): React.ReactNode {
    className = clsx('btn', `btn-${variant ?? 'secondary'}`, className);
    if (size?.length) className = clsx(`btn-${size}`, className);
    if (!href?.length) return <button className={className} {...props}></button>;
    return <Anchor className={className} href={href} {...props} />; // anchor now
}

export namespace Button {
    //  TYPEDEFS  //

    /** Button Component Properties. */
    export type Common = { size?: Sizing; variant?: Variant };
    export type Props = React.JSX.IntrinsicElements['button'] & Common;
    export type Anchor = React.JSX.IntrinsicElements['a'] & Common & { href?: string };

    /** Button Group Component. */
    export type Group = _Group;
    export const Group = _Group;

    /** Button Icon Component. */
    export type Icon = { square?: boolean };
    export function Icon(props: Button.Props & Icon): React.ReactNode;
    export function Icon(props: Button.Anchor & Icon): React.ReactNode;
    export function Icon({ className, style, square, ...props }: (Button.Props | Button.Anchor) & Icon) {
        className = clsx('d-flex justify-content-center align-items-center', className);
        if (square) style = { width: 30, height: 30, paddingLeft: 0, paddingRight: 0, ...(style ?? {}) };
        return <Button className={className} style={style} {...(props as any)}></Button>;
    }
}
