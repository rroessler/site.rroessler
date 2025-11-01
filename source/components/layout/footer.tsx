/// Vendor Modules
import { clsx } from 'clsx';

/// Website Modules
import { Brand } from '../brand';
import { Anchor } from '../anchor';

/// Package Modules
import { Product } from '@/product';

/** Navbar Component. */
export interface Footer extends Footer.Props {}
export function Footer({ className, style, ...props }: Footer) {
    className = clsx('mt-auto border-top subpixel-antialiased', className);
    style = { backgroundColor: 'var(--bs-secondary-bg)', fontSize: 'var(--bs-font-size-sm)', ...style };

    // prepare all the available links to be used
    const github = Brand.GitHub.URL();
    const linkedin = Brand.LinkedIn.URL();

    // and construct the resulting footer to be shown
    return (
        <footer className={className} style={style} {...props}>
            <div className="container-fluid px-3 px-sm-4 px-xl-5 py-3">
                <div className="d-sm-flex align-items-sm-center">
                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <Footer.Link href={github} label="GitHub" icon={<Brand.GitHub.Logo size="18" />} />
                        <div className="vr mx-2"></div>
                        <Footer.Link href={linkedin} label="LinkedIn" icon={<Brand.LinkedIn.Logo size="18" />} />
                    </div>
                    <div className="text-center text-sm-start ms-sm-auto mt-3 mt-sm-0">
                        <span className="text-body-secondary">
                            &copy; Copyright {new Date().getFullYear()}, {Product.author}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export namespace Footer {
    //  TYPEDEFS  //

    /** Page Component Properties. */
    export type Props = Omit<React.JSX.IntrinsicElements['footer'], 'children'>;

    /** Constructs a footer link. */
    export type Link = { icon?: React.ReactNode; href?: string; label?: string };
    export function Link({ icon, href, label }: Link) {
        const target = href?.startsWith('mailto:') ? '_top' : '_blank';
        return (
            <Anchor href={href} className="icon-link text-decoration-none" target={target}>
                {icon}
                {label && <span className="text-decoration-underline">{label}</span>}
            </Anchor>
        );
    }
}
