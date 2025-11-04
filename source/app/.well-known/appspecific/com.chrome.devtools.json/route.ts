/// Vendor Modules
import { NextResponse } from 'next/server';

/// Package Modules
import { Product } from '@/product';

/** Ensure using a static export now. */
export const dynamic = 'force-static';

/** Gets the availabl devtools details. */
export async function GET() {
    return NextResponse.json({ workspace: { root: process.cwd(), uuid: Product.uuid } });
}
