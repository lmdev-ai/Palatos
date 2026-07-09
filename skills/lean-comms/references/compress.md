# Compress mode - memory files

Loaded by `lean-comms` to compress natural-language memory files (CLAUDE.md, todos, preferences, `.palatos/*.md`) into dense prose that saves input tokens every session. Beats a generic compressor by needing **no external script** (pure Read/Edit, no `python3 -m scripts` dependency) and adding a **fidelity gate** that proves nothing was lost before overwriting.

## Trigger
"compress this file", "compress memory file", or a request to shrink a memory/context file.

## Process
1. **Read** the target file in full.
2. **Back up** - write the original verbatim to `<filename>.original.md` first (never overwrite without a backup). Never compress a `*.original.md` file.
3. **Compress the prose** (rules below), preserving all protected regions exactly.
4. **Fidelity gate** - before overwriting, verify no loss (checklist below). If anything is at risk, keep the original and report.
5. **Overwrite** the original with the compressed version. Report tokens/chars saved (estimate).

## Remove
Articles (a/an/the); filler (just/really/basically/actually/simply/essentially/generally); pleasantries ("sure/certainly/of course/happy to/I'd recommend"); hedging ("it might be worth", "you could consider"); redundant phrasing ("in order to"→"to", "make sure to"→"ensure", "the reason is because"→"because"); connective fluff ("however/furthermore/additionally/in addition"); "you should / remember to / make sure to" - just state the action.

## Preserve EXACTLY (never modify)
- Fenced ``` code blocks ``` and indented code - byte-for-byte (no removing comments/spacing, no reordering, no shortening commands).
- Inline `code`, URLs and markdown links, file paths, commands, environment variables (`$HOME`, `NODE_ENV`).
- Technical terms, library/API/protocol/algorithm names, proper nouns (projects, people, companies).
- Dates, version numbers, and all numeric values.
- Frontmatter/YAML headers.

## Preserve structure
Keep all headings (exact text; compress the body beneath), bullet nesting, numbered-list numbering, and table structure (compress cell text, keep columns).

## Compress
Short synonyms ("big" not "extensive", "use" not "utilize"); fragments OK ("Run tests before commit"); merge bullets that say the same thing; keep one example where several show the same pattern.

## Fidelity gate (the check that beats a naive compressor)
Before overwriting, confirm the compressed file still contains, unchanged:
- every code block and inline-code span (identical bytes),
- every URL, path, command, and env var,
- every number, date, and version,
- every proper noun and technical term,
- every heading and the full list/table structure.
If any item changed or is missing → discard the compressed version, keep the original, and report which item was at risk. Only overwrite when the gate passes.

## Boundaries
- ONLY natural-language files (`.md`, `.txt`, extensionless notes). NEVER modify `.py/.js/.ts/.json/.yaml/.yml/.toml/.env/.lock/.css/.html/.xml/.sql/.sh`.
- Mixed prose+code file → compress only the prose regions; treat code as read-only.
- If unsure whether something is code or prose, leave it unchanged.
- Original always backed up as `<file>.original.md`; skip existing `*.original.md`.

## Pattern
Original: "You should always make sure to run the test suite before pushing any changes to the main branch, because it helps catch bugs early and prevents broken builds in production."
Compressed: "Run tests before push to main. Catch bugs early, prevent broken prod builds."
