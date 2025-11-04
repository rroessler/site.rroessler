/// Vendor Modules
import type { UseMdxComponents } from '@mdx-js/mdx';
import { Code, Details, Table } from 'nextra/components';
import { useMDXComponents as use } from 'nextra/mdx-components';

/// Package Modules
import { Code as Pre } from '@/components';

/** Undelrying 'nextra' components. */
const nextra = use({
    table: Table,
    td: Table.Td,
    th: Table.Th,
    tr: Table.Tr,
    pre: Pre,
    code: Code,
    details: Details,
});

/**
 * Constructs the available MDX components.
 * @param components                Baseline components.
 */
export const useMDXComponents = (components?: ReturnType<UseMdxComponents>): ReturnType<UseMdxComponents> => ({
    ...nextra,
    ...components,
});
