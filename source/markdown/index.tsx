/// Vendor Modules
import { UseMdxComponents } from '@mdx-js/mdx';
import { useMDXComponents as use } from 'nextra/mdx-components';

/**
 * Constructs the available MDX components.
 * @param components                Baseline components.
 */
export const useMDXComponents = (components?: ReturnType<UseMdxComponents>): ReturnType<UseMdxComponents> => ({
    ...use({}),
    ...components,
});
