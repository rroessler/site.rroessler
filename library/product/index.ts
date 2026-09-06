/** Product Details. */
export namespace Product {
    //  PUBLIC METHODS  //

    /** The underlying product title. */
    export const title = 'rroessler.io';

    /** The baseline website description. */
    export const description = '';

    /** The core website details. */
    export const website = `https://blog.${title}`;

    /** Author of the product. */
    export const author = 'Reuben Roessler';

    /** Potential github profile. */
    export const github = 'rroessler';

    /** Potential linked-in profile. */
    export const linkedin = 'https://linkedin.com/in/reuben-roessler';

    /** Denotes if current in development mode. */
    export const development = process.env.NODE_ENV === 'development';
}
