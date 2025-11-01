/// Vendor Modules
import { importPage } from 'nextra/pages';

/// Website Modules
import { Static } from './static';
import { Metadata } from './metadata';
import { EvaluateResult } from 'nextra';

/** Dynamic Router Page. */
export class Content {
    //  PROPERTIES  //

    /** Static parameters function. */
    private readonly m_static: Static.Params;

    /** Dynamic metadata value. */
    private readonly m_metadata: Metadata.Dynamic;

    //  CONSTRUCTORS  //

    /**
     * Constructs a dynamic content router.
     * @param m_slug            Slug to bind.
     */
    constructor(private readonly m_slug = 'slug') {
        // prepare the static handler
        this.m_static = Static(this.m_slug);

        // prepare the metadata handler
        this.m_metadata = Metadata.Dynamic(async (props) => {
            return this.m_segments(props.params)
                .then((segments) => this.m_import(segments))
                .then(({ metadata }) => metadata);
        });
    }

    //  PUBLIC METHODS  //

    /** Gets the available static parameters. */
    static() {
        return this.m_static;
    }

    /** Gets the available metadata. */
    metadata() {
        return this.m_metadata;
    }

    /** Constructs the page-view component. */
    view() {
        return this.m_view.bind(this);
    }

    //  PRIVATE METHODS  //

    /**
     * Constructs a wrapped view.
     * @param props             Route properties.
     */
    private async m_view(props: Metadata.Props) {
        const params = await props.params;
        const segments = await this.m_segments(props.params);
        const { default: Content } = await this.m_import(segments);
        return <Content {...props} params={params}></Content>;
    }

    /**
     * Handles importing segments.
     * @param segments          Segments to import.
     */
    private async m_import(segments: string[]): Promise<EvaluateResult> {
        return importPage(segments); // and load the content now as needed
    }

    /**
     * Handles parsing incoming segments.
     * @param params            Route parameters.
     */
    private async m_segments(params: Metadata.Params): Promise<string[]> {
        return params.then((params) => params[this.m_slug] ?? []);
    }
}
