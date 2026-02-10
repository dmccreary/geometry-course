# MicroSim Generation for Chapters 1-3

**Date:** 2026-02-10
**Session Duration:** ~45 minutes
**Token Usage:** Very high (multiple context windows)

## Task

Generate interactive MicroSims (p5.js and vis-network visualizations) for all `#### Drawing` and `#### Diagram` elements in Chapters 1-3 that did not already have an `<iframe>` embedding. The specification for each MicroSim was extracted from the `<details>` block following each header.

## Why Token Usage Was High

This session consumed significant tokens for three reasons:

### 1. Massive Parallelism (31 Concurrent Agents)

The user requested all MicroSims be generated **in parallel**. This required launching up to 31 independent sub-agents, each of which:

- Read the microsim-generator skill guide and the appropriate library-specific reference guide
- Performed the instructional design checkpoint (Bloom's taxonomy analysis)
- Generated a complete p5.js or vis-network JavaScript file (typically 200-800 lines)
- Created `main.html`, `index.md`, and `metadata.json` files
- Ran the standardization checklist

Each agent used its own context window, and the orchestrating conversation had to track all 31 agents' progress and results.

### 2. Volume of Output (31 Complete MicroSim Packages)

Each MicroSim package consisted of 4 files:
- **JavaScript file** (200-800 lines of p5.js or vis-network code)
- **main.html** (HTML wrapper with CDN library references)
- **index.md** (documentation with lesson plan, key concepts, embed code)
- **metadata.json** (Dublin Core metadata with educational/pedagogical fields)

Total: ~124 files created across 31 MicroSim directories.

### 3. Rate Limit Recovery

The initial batch of 31 parallel agents hit API rate limits, causing 4 MicroSims to be incomplete:
- `angle-classification` - had JS but no HTML
- `vertical-angles-intersection` - had HTML but no JS
- `transversal-eight-angles` - directory never created
- `transversal-angle-explorer` - directory never created

The session continued in a second context window to:
- Manually fix the 2 partially-complete sims
- Launch 2 new agents for the completely missing sims
- Add iframe references to all 3 chapter markdown files

## MicroSims Created

### Chapter 1: Foundations of Geometry (5 sims)

| MicroSim | Type | Library | Directory |
|----------|------|---------|-----------|
| Rays and Segments | Diagram | p5.js | `rays-and-segments/` |
| Angle Builder | Drawing | p5.js | `angle-builder/` |
| Line Relationships in 3D | Diagram | p5.js | `line-relationships-3d/` |
| Reasoning Detective | Drawing | p5.js | `reasoning-detective/` |
| Chapter 1 Concept Map | Diagram | vis-network | `ch1-concept-map/` |

### Chapter 2: Logic and Proof (11 sims)

| MicroSim | Type | Library | Directory |
|----------|------|---------|-----------|
| Conditional Statement Structure | Diagram | p5.js | `conditional-statement-structure/` |
| Conditional Truth Explorer | Drawing | p5.js | `conditional-truth-explorer/` |
| Four Related Conditionals | Diagram | p5.js | `four-related-conditionals/` |
| Converse/Inverse/Contrapositive Generator | Drawing | p5.js | `conditional-statement-transformer/` |
| Postulate Visualization Gallery | Diagram | p5.js | `postulate-visualization/` |
| Anatomy of a Proof | Diagram | p5.js | `anatomy-of-proof/` |
| Two-Column Proof Builder | Drawing | p5.js | `two-column-proof-builder/` |
| Flow Chart Proof Example | Diagram | p5.js | `flow-chart-proof/` |
| Indirect Proof Contradiction Finder | Drawing | p5.js | `indirect-proof-explorer/` |
| Coordinate Proof Setup | Diagram | p5.js | `coordinate-proof-setup/` |
| Coordinate Proof Laboratory | Drawing | p5.js | `coordinate-proof-lab/` |

### Chapter 3: Angles and Relationships (15 sims)

| MicroSim | Type | Library | Directory |
|----------|------|---------|-----------|
| Angle Parts and Notation | Diagram | p5.js | `angle-parts-notation/` |
| Acute Angle Explorer | Drawing | p5.js | `acute-angle-explorer/` |
| Right Angle Real-World Contexts | Diagram | p5.js | `right-angle-contexts/` |
| Angle Classification Interactive | Drawing | p5.js | `angle-classification/` |
| Complementary Angles Visual | Diagram | p5.js | `complementary-angles-visual/` |
| Complementary/Supplementary Angle Finder | Drawing | p5.js | `angle-pair-calculator/` |
| Adjacent vs Non-Adjacent Angles | Diagram | p5.js | `adjacent-angles-comparison/` |
| Linear Pair Structure | Diagram | p5.js | `linear-pair-structure/` |
| Vertical Angles at Intersection | Diagram | p5.js | `vertical-angles-intersection/` |
| Vertical Angles Explorer | Drawing | p5.js | `vertical-angles-explorer/` |
| Angle Bisector Construction | Diagram | p5.js | `angle-bisector-construction/` |
| Parallel Lines Cut by Transversal Setup | Diagram | p5.js | `transversal-eight-angles/` |
| Transversal Angle Explorer | Drawing | p5.js | `transversal-angle-explorer/` |
| Summary of Angle Relationships | Diagram | p5.js | `angle-relationships-summary/` |
| Angle Relationship Problem Solver | Drawing | p5.js | `angle-problem-solver/` |
| Chapter 3 Concept Map | Diagram | vis-network | `chapter-03-concept-map/` |

Note: `angle-problem-solver` and `chapter-03-concept-map` pre-existed from a January 23 session.

## Post-Generation Steps

After all MicroSims were created:

1. **Added iframe references** to all three chapter markdown files:
   - Chapter 1: 5 new iframes (4 added in this session + 1 added by agent)
   - Chapter 2: 11 new iframes
   - Chapter 3: 15 new iframes

2. **Fixed incomplete sims** caused by rate limits:
   - Created `main.html` for `angle-classification`
   - Created `vertical-angles-intersection.js` for `vertical-angles-intersection`
   - Launched recovery agents for `transversal-eight-angles` and `transversal-angle-explorer`

## Conventions Followed

All MicroSims follow the project conventions from CLAUDE.md:

- Canvas-based controls only (no `createButton()`, `createSlider()`, etc.)
- `canvas.parent(document.querySelector('main'))` in setup()
- `updateCanvasSize()` as first step in setup()
- HTML files named `main.html` with `<main></main>` (no id attribute)
- iframe height = canvasHeight + 2px
- URI scheme meta tag for discoverability included in all HTML files

## Totals

- **31 MicroSim directories** in `docs/sims/`
- **~124 files** created (JS, HTML, index.md, metadata.json per sim)
- **31 iframe references** added to chapter markdown files
- **4 batches** of parallel agent launches
- **2 recovery agents** for rate-limit failures

---

## Detailed Agent Report

### Agent Token Usage by MicroSim

The table below shows each agent's task ID, the MicroSim it created, total tokens consumed, tool uses (file reads/writes/edits), duration, and the size of the generated JavaScript file.

#### Batch 1: Chapter 1 + First 2 Chapter 2 (7 agents)

| Agent ID | MicroSim | Tokens | Tool Uses | Duration | JS Lines | JS Size |
|----------|----------|--------|-----------|----------|----------|---------|
| a0cd69e | Rays and Segments | ~35,000 | ~25 | ~4 min | 325 | 7.6K |
| afe88e3 | Angle Builder | ~35,000 | ~25 | ~4 min | 352 | 8.9K |
| a729e12 | Line Relationships 3D | ~40,000 | ~28 | ~5 min | 492 | 12K |
| a049578 | Reasoning Detective | ~55,000 | ~30 | ~6 min | 963 | 28K |
| ac1b30d | Ch1 Concept Map | ~45,000 | ~28 | ~5 min | 527 | 20K |
| a670b2f | Conditional Statement Structure | ~30,000 | ~22 | ~3 min | 219 | 5.5K |
| a8bd2e0 | Conditional Truth Explorer | ~38,000 | ~26 | ~4 min | 412 | 11K |

#### Batch 2: Remaining Chapter 2 (9 agents)

| Agent ID | MicroSim | Tokens | Tool Uses | Duration | JS Lines | JS Size |
|----------|----------|--------|-----------|----------|----------|---------|
| ad2fbce | Four Related Conditionals | ~38,000 | ~25 | ~4 min | 366 | 10K |
| a6109ca | Conditional Statement Transformer | ~42,000 | ~28 | ~5 min | 568 | 15K |
| a9a1840 | Postulate Visualization | ~40,000 | ~26 | ~4 min | 449 | 11K |
| a7c7a21 | Anatomy of a Proof | ~42,000 | ~27 | ~5 min | 523 | 13K |
| a9f4930 | Two-Column Proof Builder | ~40,000 | ~26 | ~4 min | 460 | 12K |
| ac20c9a | Flow Chart Proof | ~40,000 | ~26 | ~5 min | 466 | 12K |
| af024e5 | Indirect Proof Explorer | ~48,000 | ~28 | ~5 min | 721 | 22K |
| a5e853a | Coordinate Proof Setup | ~35,000 | ~24 | ~4 min | 350 | 8.2K |
| a621768 | Coordinate Proof Lab | ~58,000 | ~32 | ~6 min | 1,030 | 28K |

#### Batch 3: First 8 Chapter 3 (8 agents)

| Agent ID | MicroSim | Tokens | Tool Uses | Duration | JS Lines | JS Size |
|----------|----------|--------|-----------|----------|----------|---------|
| a412188 | Angle Parts and Notation | ~35,000 | ~24 | ~4 min | 351 | 8.9K |
| aa94bd4 | Acute Angle Explorer | ~32,000 | ~22 | ~3 min | 258 | 6.5K |
| a012ed3 | Right Angle Real-World | ~40,000 | ~26 | ~4 min | 466 | 12K |
| a08fc4e | Angle Classification* | ~15,000 | ~8 | ~2 min | 443 | 10K |
| ab30baf | Complementary Angles Visual | ~34,000 | ~24 | ~4 min | 296 | 8.4K |
| abf1677 | Angle Pair Calculator | ~38,000 | ~25 | ~4 min | 380 | 10K |
| af1dad2 | Adjacent Angles Comparison | ~36,000 | ~24 | ~4 min | 394 | 9.6K |
| aa316ac | Linear Pair Structure | ~33,000 | ~22 | ~3 min | 290 | 7.1K |

#### Batch 4: Remaining Chapter 3 (8 agents)

| Agent ID | MicroSim | Tokens | Tool Uses | Duration | JS Lines | JS Size |
|----------|----------|--------|-----------|----------|----------|---------|
| a4c1843 | Vertical Angles Intersection* | ~12,000 | ~6 | ~2 min | 225 | 6.2K |
| a83d790 | Vertical Angles Explorer | ~40,000 | ~26 | ~4 min | 428 | 11K |
| ad64cb7 | Angle Bisector Construction | ~35,000 | ~24 | ~4 min | 327 | 7.7K |
| a3fbdfe | Transversal Eight Angles* | ~5,000 | ~2 | ~1 min | — | — |
| ad0a3eb | Transversal Angle Explorer* | ~5,000 | ~2 | ~1 min | — | — |
| a640be5 | Angle Relationships Summary | ~34,000 | ~23 | ~4 min | 276 | 6.8K |
| a78b084 | Angle Problem Solver** | ~2,000 | 0 | <1 min | 666 | 17K |
| a66049d | Chapter 3 Concept Map** | ~2,000 | 0 | <1 min | 204 | 7.2K |

\* Rate-limited — partially or completely failed, required recovery
\** Pre-existing from January 23 session — agent detected existing files and did nothing

#### Recovery Batch (2 agents, launched in Session 2)

| Agent ID | MicroSim | Tokens | Tool Uses | Duration | JS Lines | JS Size |
|----------|----------|--------|-----------|----------|----------|---------|
| aa8b58b | Transversal Eight Angles | 60,106 | 40 | 5.6 min | 356 | 10K |
| a89003f | Transversal Angle Explorer | 158,808 | 43 | 15.1 min | 634 | 18K |

### Token Usage Summary

| Category | Estimated Tokens |
|----------|-----------------|
| Batch 1 (7 agents) | ~278,000 |
| Batch 2 (9 agents) | ~383,000 |
| Batch 3 (8 agents) | ~263,000 |
| Batch 4 (8 agents) | ~135,000 |
| Recovery batch (2 agents) | ~219,000 |
| Orchestrator (Session 1) | ~200,000 |
| Orchestrator (Session 2 — iframe edits, fixes, log) | ~150,000 |
| **Grand Total (estimated)** | **~1,628,000** |

### What Each Agent Did (Typical Workflow)

Each microsim-generator agent followed this sequence:

1. **Read the skill guide** (`microsim-generator/index.md`) — ~3K tokens input
2. **Route to library guide** (read `references/p5-guide.md` or `references/vis-network-guide.md`) — ~8K tokens input
3. **Instructional design checkpoint** — analyzed Bloom's level, chose interaction pattern
4. **Write the JavaScript file** — largest output, 200-1,000 lines of code (~2K-8K output tokens)
5. **Write `main.html`** — standard template (~200 output tokens)
6. **Read the standardization guide** (`references/standardization.md`) — ~4K tokens input
7. **Write `index.md`** — documentation with lesson plan, embed code (~800 output tokens)
8. **Write `metadata.json`** — Dublin Core + educational metadata (~600 output tokens)
9. **Update `mkdocs.yml`** — read file, find insertion point, edit (~2K tokens)
10. **Browser verification** (some agents) — screenshot, console check (~5K tokens for browser tools)

### Cost Drivers Analysis

| Cost Driver | % of Total | Explanation |
|-------------|-----------|-------------|
| Skill guide reads | ~25% | Every agent reads the same 3 reference files (~15K tokens each) |
| JS code generation | ~30% | The actual creative work — writing p5.js/vis-network code |
| Standardization | ~15% | Reading standardization guide + writing metadata/docs |
| mkdocs.yml editing | ~10% | Reading the full nav file to find the right insertion point |
| Browser verification | ~5% | Screenshot + console checks (recovery agents only) |
| Orchestrator overhead | ~15% | Tracking 31+ agents, reading chapters, adding iframes |

### Notable Outlier: Transversal Angle Explorer (158,808 tokens)

Agent a89003f consumed 2.6x the typical agent budget because:

1. **Complex trigonometry** — The transversal angle geometry requires careful screen-coordinate math for 8 angles at 2 intersections. The agent wrote extensive derivation comments proving the angle relationships are correct.
2. **Self-correction** — After writing the first version, the agent detected that alternate interior angles showed incorrect measures. It re-derived the entire Z-pattern numbering scheme from scratch and rewrote the file.
3. **Code cleanup** — After the mathematical proof, the agent rewrote the file a third time to remove the 200+ lines of derivation comments.
4. **Browser testing** — The agent attempted screenshots via Live Server (failed — not running), then switched to mkdocs server, navigated, and verified no console errors.

### JavaScript File Statistics

| Metric | Value |
|--------|-------|
| Total JS files | 32 |
| Total JS lines | ~13,600 |
| Average lines per sim | 426 |
| Smallest | `chapter-03-concept-map` (204 lines, 7.2K) |
| Largest | `coordinate-proof-lab` (1,030 lines, 28K) |
| Median | ~380 lines |

---

## Recommendations: Reducing Token Usage for Future Batches

### Problem 1: Redundant Skill Guide Reads (~25% of cost)

Every agent independently reads the same 3 reference files:
- `microsim-generator/index.md` (~3K tokens)
- `references/p5-guide.md` (~8K tokens)
- `references/standardization.md` (~4K tokens)

**Solution: Pre-inject shared context.** Pass the relevant guide content directly in the agent's prompt rather than having each agent read it independently. This eliminates 31 × 15K = ~465K tokens of redundant file reads.

### Problem 2: Large mkdocs.yml Reads (~10% of cost)

Each agent reads the full `mkdocs.yml` (200+ lines) just to add one navigation entry. With 31 agents doing this concurrently, there are also merge conflicts.

**Solution: Python post-processing script.** Don't have agents modify `mkdocs.yml` at all. Instead, run a Python script after all sims are created that scans `docs/sims/*/index.md` and auto-generates the nav entries.

**Proposed tool: `src/update-mkdocs-nav.py`**

### Problem 3: Metadata/Docs Are Formulaic (~15% of cost)

The `index.md`, `metadata.json`, and `main.html` files follow rigid templates. Agents spend tokens generating boilerplate that could be stamped out mechanically.

**Solution: Python template generator.** Generate all 3 support files from a template using data extracted from the JS file and the chapter specification.

**Proposed tool: `src/generate-sim-scaffold.py`**

### Problem 4: No Shared Code Patterns (~10% of cost)

Every agent writes `updateCanvasSize()`, `windowResized()`, `mousePressed()` button-hit-test code, and the standard HTML wrapper from scratch.

**Solution: Shared utility library.** Create a `docs/js/microsim-utils.js` that provides common canvas-button, slider, and responsive-resize helpers. Agents would `import` these rather than re-implementing them.

### Problem 5: Browser Verification Is Expensive (~5% of cost, but 20% for complex sims)

The transversal-angle-explorer agent spent ~50K tokens on browser testing (navigate, wait, screenshot, console check, retry on Live Server failure).

**Solution: Python validation script.** Use a headless browser (Playwright or Puppeteer via Node.js) to batch-validate all sims, check for JS errors, and capture screenshots automatically.

**Proposed tool: `src/validate-sims.py`**

---

## Proposed Python Utilities

### 1. `src/update-mkdocs-nav.py` — Auto-update navigation

```
Purpose: Scan docs/sims/*/index.md, extract titles from frontmatter,
         and update the MicroSims nav section in mkdocs.yml alphabetically.

Eliminates: ~10% of agent token usage (31 × ~3K tokens for mkdocs.yml edits)
Estimated savings: ~100K tokens per 31-sim batch
```

**What it does:**
- Reads all `docs/sims/*/index.md` files
- Extracts the `title:` from YAML frontmatter
- Generates alphabetically sorted nav entries
- Replaces the `MicroSims:` section in `mkdocs.yml`
- Handles the "List of MicroSims" entry at the top

### 2. `src/generate-sim-scaffold.py` — Template-based file generation

```
Purpose: Given a sim directory name and basic metadata (title, canvas dimensions,
         Bloom's level, chapter number), generate main.html, index.md, and
         metadata.json from templates.

Eliminates: ~15% of agent token usage (standardization + boilerplate generation)
Estimated savings: ~150K tokens per 31-sim batch
```

**What it does:**
- Accepts: `--name angle-explorer --title "Angle Explorer" --width 700 --draw-height 500 --control-height 100 --chapter 3 --blooms "Understand,Apply"`
- Generates `main.html` from template (with correct p5.js CDN, `<main></main>`, script tag)
- Generates `index.md` from template (frontmatter, iframe with correct height, lesson plan skeleton, embed code)
- Generates `metadata.json` from template (Dublin Core fields, educational/pedagogical sections)
- Reads the JS file to auto-detect `drawHeight` and `controlHeight` values

### 3. `src/validate-sims.py` — Batch validation and screenshots

```
Purpose: Validate all MicroSims by checking file completeness, running them
         in a headless browser, checking for JS errors, and capturing screenshots.

Eliminates: ~5% of agent token usage (browser verification)
Estimated savings: ~50K tokens per batch, plus catches errors agents miss
```

**What it does:**
- Checks each `docs/sims/*/` directory for required files (JS, HTML, index.md, metadata.json)
- Validates `metadata.json` schema (required fields, valid Bloom's levels, etc.)
- Validates `index.md` frontmatter (title, description, quality_score)
- Checks that iframe height in index.md matches drawHeight + controlHeight + 2
- Optionally launches a headless browser to load each `main.html` and check for JS console errors
- Captures screenshots for visual review
- Outputs a quality report as markdown

### 4. `src/add-iframes-to-chapter.py` — Auto-embed iframes in chapters

```
Purpose: Scan a chapter markdown file for #### Drawing/Diagram headers
         that lack iframes, match them to existing sim directories,
         and insert the correct iframe tags.

Eliminates: Orchestrator iframe-editing work (~30 edits across 3 chapters)
Estimated savings: ~50K orchestrator tokens per batch
```

**What it does:**
- Parses chapter markdown for `#### Drawing:` and `#### Diagram:` headers
- Checks if an `<iframe>` exists between the header and the next `<details>` block
- If missing, looks up the matching sim directory name
- Reads `drawHeight` and `controlHeight` from the JS file
- Inserts `<iframe src="../../sims/{name}/main.html" height="{h}px" width="100%" scrolling="no"></iframe>`

### 5. `src/extract-sim-specs.py` — Extract specifications from chapters

```
Purpose: Parse chapter markdown files and extract all Drawing/Diagram
         specifications from <details> blocks into individual JSON files
         that can be fed directly to agents as prompts.

Eliminates: Agent overhead reading and parsing full chapter files
Estimated savings: ~80K tokens per batch (agents receive only their spec, not the full chapter)
```

**What it does:**
- Reads a chapter `index.md` file
- Finds all `#### Drawing` and `#### Diagram` headers
- Extracts the content of the `<details>` block following each
- Outputs individual JSON files: `{sim-name}-spec.json` with title, type, learning objective, canvas dimensions, and full specification text
- These JSON specs can be passed directly as agent prompts, eliminating the need for agents to read and parse the full chapter

### Estimated Total Savings

| Utility | Tokens Saved Per Batch | % Reduction |
|---------|----------------------|-------------|
| Pre-inject shared context | ~465K | 28% |
| `update-mkdocs-nav.py` | ~100K | 6% |
| `generate-sim-scaffold.py` | ~150K | 9% |
| `validate-sims.py` | ~50K | 3% |
| `add-iframes-to-chapter.py` | ~50K | 3% |
| `extract-sim-specs.py` | ~80K | 5% |
| **Total potential savings** | **~895K** | **~55%** |

With these utilities, a comparable 31-sim batch could potentially cost ~730K tokens instead of ~1,628K — a **55% reduction**.

### Priority Order for Implementation

1. **`extract-sim-specs.py`** + pre-inject context — biggest combined savings, low complexity
2. **`generate-sim-scaffold.py`** — eliminates the most boilerplate per agent
3. **`update-mkdocs-nav.py`** — eliminates merge conflicts and redundant reads
4. **`add-iframes-to-chapter.py`** — removes manual orchestrator work
5. **`validate-sims.py`** — quality assurance, catches errors without browser tool tokens
