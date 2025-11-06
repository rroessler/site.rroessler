/// Vendor Modules
import * as shiki from 'shiki';

/// The item we want to AUGMENT
import { DEFAULT_REHYPE_PRETTY_CODE_OPTIONS } from '../../node_modules/nextra/dist/server/rehype-plugins';

/// JSON Modules
import TALOS from './talos.tmLanguage.json';

// ensure we updated the underlying bundled details now
DEFAULT_REHYPE_PRETTY_CODE_OPTIONS.getHighlighter = function (options) {
    const languages = Object.keys(shiki.bundledLanguages).filter((id) => id !== 'mermaid');
    return shiki.createHighlighter({ ...options, langs: [...languages, TALOS] });
};
