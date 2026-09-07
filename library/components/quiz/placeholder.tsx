/// Vendor Modules
import { Loader2 } from 'lucide-react';

/** Quiz Placeholder Component. */
export interface Placeholder {}
export function Placeholder() {
    return (
        <div className="flex items-center justify-center p-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary my-8" />
        </div>
    );
}
