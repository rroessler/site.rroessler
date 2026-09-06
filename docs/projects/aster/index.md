---
title: Aster
repo: cpp.aster
banner: ls **/*.mdx
href: https://en.wikipedia.org/wiki/Glob_(programming)
snippet: Aster — Fast C++ Globbing
description: Fast C++ globbing library
tags: [C++, Globbing, Libraries]
---

[Aster](https://github.com/rroessler/cpp.aster) is an efficient, compact and robust cross-platform C++ globbing library. It provides a fast baseline globbing function and an optimized walker for traversing the file-system through globs.

It categorizes glob patterns into constituent components that can be used to optimize iteration by eliminating certain paths on construction, matching prefixes/suffixes instead of using the heavy matching algorithm if possible and more.

Glob matching and iteration can be invoked with the following code:

```cpp
// matching singular paths with a pattern
auto glob = "some/**/path/**/n*[k-m]e?txt";
auto path = "some/small/or/large/path/to/a/needle.txt";
assert(Aster::Match::glob(glob, path));

// iterating over directories recursively
auto markdown = Aster::Walker("**/*.md");
for (auto entry : markdown.iterate()) { ... }
```

For more information, check out the [GitHub project](https://github.com/rroessler/cpp.aster) or the post I made on [faster globbing](../../posts/2025-11-06/faster-globbing.mdx) optimizations.
