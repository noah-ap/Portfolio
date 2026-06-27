# Configuration Guide

Official reference for customizing this portfolio website through configuration files alone.

This project follows a **configuration-first architecture**: appearance, layout, content, and behavior are controlled by files in `config/` rather than by editing React components. Think of it like configuring Hyprland, Waybar, or Neovim — change the config, reload the site, and the UI updates.

---

## Table of Contents

1. [How Configuration Works](#how-configuration-works)
2. [Maintaining This Guide](#maintaining-this-guide)
3. [Cross-File Relationships](#cross-file-relationships)
4. [Shared Concepts](#shared-concepts)
5. [Configuration Files](#configuration-files)
   - [animations.ts](#animationsts)
   - [background.ts](#backgroundts)
   - [breakpoints.ts](#breakpointsts)
   - [categories.ts](#categoriests)
   - [projects.ts](#projectsts)
   - [tabs.ts](#tabsts)
   - [cylinder.ts](#cylinderts)
   - [scene.ts](#scenets)
   - [layout.ts](#layoutts)
   - [theme.ts](#themets)
   - [spacing.ts](#spacingts)
   - [scroll.ts](#scrollts)
   - [navigation.ts](#navigationts)
   - [pages.ts](#pagests)
   - [siteNav.ts](#sitenavts)
   - [about.ts](#aboutts)
   - [contact.ts](#contactts)
   - [contentPages.ts](#contentpagests)
   - [glass.ts](#glassts)
   - [index.ts](#indexts)
6. [Best Practices](#best-practices)

---

## How Configuration Works

### Entry point

All configuration modules are exported from `config/index.ts` and assembled at runtime by `getSiteConfig()` in `lib/config/siteConfig.ts`.

```ts
import { getSiteConfig } from '@/lib/config/siteConfig'

const config = getSiteConfig()
```

Components receive slices of this object as props. **Do not import config values directly inside presentational components** unless the component is a shell/layout loader — pass config through props or `getSiteConfig()` at the page level.

### Preset resolution

Many config files use a **preset pattern**:

```ts
export const someConfig = {
  preset: 'defaultName',      // active preset
  presets: {
    defaultName: { /* ... */ },
    alternate: { /* ... */ },
  },
}
```

Resolvers in `lib/config/` merge the active preset with shared settings:

| Config file   | Resolver              | Used for                          |
|---------------|-----------------------|-----------------------------------|
| `theme.ts`    | `resolveTheme()`      | Colors, typography, glow, fog     |
| `scroll.ts`   | `resolveScroll()`     | Keyboard/wheel behavior           |
| `scene.ts`    | `resolveScene()`      | Portfolio & content page scenes   |
| `background.ts` | `resolveBackground()` | Non-cylinder page backgrounds   |
| `glass.ts`    | `resolveGlass()`      | Glass card surfaces               |

### Theme tokens

Many configs reference colors by **token string** instead of hardcoded hex values. Tokens are resolved by `resolveThemeToken()` in `lib/config/resolveThemeToken.ts`.

| Token               | Resolves to                    |
|---------------------|--------------------------------|
| `colors.background` | Theme background color         |
| `surface.dark`      | Dark surface color             |
| `surface.muted`     | Muted surface color            |
| `text.primary`      | Primary text color             |
| `text.secondary`    | Secondary text color           |
| `text.muted`        | Muted text color               |
| `ring.active`       | Active border/ring color       |
| `ring.inactive`     | Inactive border/ring color     |
| `indicator.active`  | Active dot indicator color     |
| `indicator.inactive`| Inactive dot indicator color   |
| `overlay.from`      | Gradient overlay start         |
| `overlay.to`        | Gradient overlay end           |
| `glow.active`       | Active glow color              |
| `glow.activeBright` | Bright active glow color       |

You may also use literal CSS values (`#ffffff`, `rgba(...)`, `linear-gradient(...)`) anywhere a token string is accepted.

**Why use tokens?** Changing `theme.ts` updates every component that references tokens — navigation, tabs, glass panels, indicators — without touching individual config files.

### Responsive values

Properties marked as responsive use `{ sm, md, lg }` and are resolved at runtime with `pickResponsive()` against `breakpoints.ts`:

- **Below `sm` (640px):** uses `sm` value
- **`sm` to `md` (1024px):** uses `md` value
- **`md` and above:** uses `lg` value

---

## Maintaining This Guide

`docs/CONFIG_GUIDE.md` is the **single source of truth** for configuration.

Whenever you:

- Add, remove, or rename a file in `config/`
- Add, remove, or change a property in any config file
- Add or change a preset
- Change how configs interact

**Update this document in the same commit or change.**

A Cursor rule (`.cursor/rules/config-guide-sync.mdc`) reminds agents to keep this guide synchronized with `config/`.

---

## Cross-File Relationships

```
pages.ts ──────────────► siteNav.ts (top navigation links & routes)
                              │
theme.ts ─────────────────────┼──► All color tokens site-wide
                              │
breakpoints.ts ───────────────┼──► All responsive { sm, md, lg } values
                              │
spacing.ts ───────────────────┼──► Page padding, section gaps
                              │
categories.ts ──projectSlugs──► projects.ts (portfolio content)
       │
       └──► navigation.ts (category sidebar on /portfolio)

layout.ts ──mode──► cylinder.ts + scene.ts (portfolio carousel layout)
scroll.ts ─────────► navigation.ts keyboard/wheel on /portfolio
tabs.ts ───────────► cylinder carousel card appearance
navigation.ts ─────► in-portfolio nav (categories, dots, theme toggle)

contentPages.ts ───► scene.ts (About/Contact background)
                  └──► glass.ts (About/Contact glass panel)
about.ts / contact.ts ► page content (text & links)

animations.ts ◄──── referenced by name from tabs, navigation, scene, siteNav, glass
```

### Page-specific config paths

| Page        | Primary configs                                              |
|-------------|--------------------------------------------------------------|
| `/portfolio`| `projects`, `categories`, `tabs`, `cylinder`, `scene`, `navigation`, `scroll`, `layout` |
| `/about`    | `about`, `contentPages`, `glass`, `pages`, `siteNav`, `theme` |
| `/contact`  | `contact`, `contentPages`, `glass`, `pages`, `siteNav`, `theme` |
| All pages   | `theme`, `siteNav`, `pages`, `breakpoints`, `spacing`, `animations` |

---

## Shared Concepts

### Animation preset names

Configs reference animation presets **by name** (must exist in `animations.ts`):

`cardHover` · `fadeIn` · `pageTransition` · `sectionReveal` · `staggerChildren` · `scrollSnap` · `cylinderRotate` · `expandCollapse` · `categorySpin` · `fogEntrance` · `navFadeIn` · `indicatorStagger`

### When to create a new config file vs. extend an existing one

| Situation                              | Action                                      |
|----------------------------------------|---------------------------------------------|
| New visual surface (glass, tabs)       | New focused config file                     |
| New page content (blog posts)          | New content config (`blog.ts`)              |
| New color                              | Extend `theme.ts`                           |
| New site-wide page in top nav          | Extend `pages.ts` + add route               |
| One-off value used in one component    | Still prefer config if user-facing          |

---

## Configuration Files

---

### `animations.ts`

**Purpose:** Central registry of motion presets used across the site.

**When to use:** When you want to change timing, easing, or motion character site-wide. Other configs reference presets by name — edit here to affect every consumer at once.

**Does not have a top-level `preset` field** — all presets are always available; other configs choose which to use.

#### Properties (`presets.<name>`)

Each preset supports:

| Property          | Type                        | Description                                      |
|-------------------|-----------------------------|--------------------------------------------------|
| `duration`        | `number` (ms)               | Animation duration                               |
| `easing`          | `string`                    | CSS easing (`ease-out`, cubic-bezier, etc.)      |
| `scale`           | `number`                    | Optional scale target                            |
| `translateY`      | `number` or `[from, to]`    | Vertical movement                                |
| `opacity`         | `number` or `[from, to]`    | Opacity animation                                |
| `delay`           | `number` (ms)               | Start delay                                      |
| `spring`          | `{ stiffness, damping, mass }` | Spring physics (used by `cylinderRotate`)    |
| `opacityDelay`    | `number`                    | Separate opacity delay (`categorySpin`)          |
| `opacityDuration` | `number`                    | Separate opacity duration                        |

#### Available presets

| Preset             | Used by                                      |
|--------------------|----------------------------------------------|
| `cardHover`        | Tab hover/active scale                       |
| `fadeIn`           | Glass card entrance, general fade            |
| `pageTransition`   | Page transitions (reserved)                  |
| `sectionReveal`    | Scroll reveal sections                       |
| `staggerChildren`  | Staggered child animations                   |
| `scrollSnap`       | Scroll snap transitions                      |
| `cylinderRotate`   | Carousel rotation spring (`cylinder.ts`)     |
| `expandCollapse`   | Project detail expand/collapse, floor layer  |
| `categorySpin`     | Category switch transition (`navigation.ts`) |
| `fogEntrance`      | Fog scene fade-in (`scene.ts`)               |
| `navFadeIn`        | Navigation fade-in (`siteNav`, `categoryNav`)|
| `indicatorStagger` | Dot indicator stagger (`navigation.ts`)    |

#### Example

```ts
fadeIn: {
  duration: 600,
  easing: 'ease-out',
  opacity: [0, 1],
},
```

#### Effect on website

Controls how elements move, fade, and spring. Slowing `cylinderRotate` makes the carousel feel heavier; speeding up `categorySpin` makes category switches snappier.

#### Best practices

- Prefer adjusting an existing preset over creating duplicates.
- If you add a preset, add its name to `AnimationPresetName` in `lib/types/animations.ts`.
- Keep durations between 200–800ms for UI feedback; 1000ms+ for ambient entrances (`fogEntrance`).

---

### `background.ts`

**Purpose:** Background rendering for non-cylinder layout modes.

**When to use:** When `layout.mode` is not `'cylinder'`. The portfolio carousel uses `scene.ts` instead.

#### Properties

| Property  | Type                    | Description                    |
|-----------|-------------------------|--------------------------------|
| `preset`  | `BackgroundPresetName`  | Active background preset       |
| `presets` | `Record<name, preset>`  | Available background types     |

#### Presets

| Preset      | Type         | Key properties                                      |
|-------------|--------------|-----------------------------------------------------|
| `solid`     | `solid`      | `color` — token or hex                              |
| `gradient`  | `gradient`   | `from`, `to`, `angle` (degrees)                     |
| `image`     | `image`      | `src`, `opacity`, `blur`, `brightness`, `parallax`, `speed` |
| `video`     | `video`      | `src`, `opacity`, `blur`, `brightness`              |
| `particles` | `particles`  | `density`, `speed`, `opacity`                       |
| `canvas`    | `canvas`     | `renderer` — custom renderer id                     |

#### Example

```ts
export const background: BackgroundConfig = {
  preset: 'solid',
  presets: {
    solid: {
      type: 'solid',
      color: 'colors.background',
    },
    gradient: {
      type: 'gradient',
      from: '#0a0a14',
      to: '#000000',
      angle: 180,
    },
    // ...
  },
}
```

#### Effect on website

Sets the static background behind non-carousel layouts. Not used on the current `/portfolio` cylinder view.

---

### `breakpoints.ts`

**Purpose:** Viewport breakpoint thresholds and carousel scale factors.

**When to use:** Rarely edited directly — but all responsive configs depend on these values.

#### Properties

| Property   | Type                          | Default | Description                              |
|------------|-------------------------------|---------|------------------------------------------|
| `sm`       | `number` (px)                 | `640`   | Small screen upper bound                 |
| `md`       | `number` (px)                 | `1024`  | Medium screen upper bound                |
| `lg`       | `number` (px)                 | `1280`  | Large screen reference                   |
| `tabScale` | `{ sm, md, lg }` (multiplier) | `0.8/0.9/1` | Carousel tab scale at each breakpoint |

#### Example

```ts
export const breakpoints: BreakpointsConfig = {
  sm: 640,
  md: 1024,
  lg: 1280,
  tabScale: { sm: 0.8, md: 0.9, lg: 1 },
}
```

#### Effect on website

Determines which responsive value (`sm`/`md`/`lg`) is picked for navigation spacing, glass padding, tab scale, and all other responsive configs.

#### Best practices

- Keep `sm < md < lg`.
- Lower `tabScale.sm` if carousel tabs overflow on mobile.

---

### `categories.ts`

**Purpose:** Portfolio category groups (Architecture, Graphic Design, Art Work, etc.).

**When to use:** When adding, renaming, or reordering portfolio categories.

#### Properties (per category)

| Property       | Type       | Description                                      |
|----------------|------------|--------------------------------------------------|
| `id`           | `string`   | Unique identifier (used in state)                |
| `name`         | `string`   | Display label in category navigation             |
| `slug`         | `string`   | URL-safe slug                                    |
| `projectSlugs` | `string[]` | Ordered list of `projects.ts` slug references  |

#### Example

```ts
{
  id: 'architecture',
  name: 'Architecture',
  slug: 'architecture',
  projectSlugs: [
    'territory-part-1',
    'territory-part-2',
    // ...
  ],
},
```

#### Effect on website

Drives the left-side category navigation on `/portfolio`. Switching categories filters which projects appear in the carousel. Order in `projectSlugs` determines carousel tab order.

#### Best practices

- Every slug in `projectSlugs` must exist in `projects.ts`.
- A project can appear in multiple categories (see Territory entries in Graphic Design).
- Category order in the array is display order in the nav.

---

### `projects.ts`

**Purpose:** All portfolio project content — the single source of truth for project data.

**When to use:** When adding, editing, or removing portfolio projects.

#### Properties (per project)

| Property      | Type       | Required | Description                                |
|---------------|------------|----------|--------------------------------------------|
| `id`          | `string`   | Yes      | Unique identifier                          |
| `slug`        | `string`   | Yes      | URL-safe key; referenced by `categories`   |
| `title`       | `string`   | Yes      | Project title on tab and detail view       |
| `subtitle`    | `string`   | No       | Date or status shown below title           |
| `description` | `string`   | No       | Full description in expanded detail view   |
| `image`       | `string`   | No       | Path to thumbnail (e.g. `/images/...`)     |
| `github`      | `string`   | No       | GitHub URL                                 |
| `website`     | `string`   | No       | Project website URL                        |
| `tags`        | `string[]` | No       | Metadata tags                              |
| `featured`    | `boolean`  | No       | Featured flag                              |

#### Example

```ts
{
  id: 'territory-part-1',
  slug: 'territory-part-1',
  title: 'Territory Part 1',
  subtitle: 'In Progress',
  description: 'Territory Part 1 explores the formation of spatial boundaries...',
  image: '/images/territory-part-1-thumbnail.png',
  tags: ['architecture', 'territory'],
  featured: true,
},
```

#### Effect on website

Populates the 3D carousel tabs, expanded detail overlay, and ground reflections. Projects not listed in any category's `projectSlugs` will not appear.

#### Best practices

- Keep `slug` and `id` stable — categories reference slugs.
- Place images in `public/images/`.
- Write descriptions for expanded view; they appear when a tab is selected and expanded.

---

### `tabs.ts`

**Purpose:** Visual styling and behavior of project carousel cards.

**When to use:** When changing tab size, borders, hover effects, title colors, or card appearance.

#### Properties

| Section       | Property                        | Description                                           |
|---------------|---------------------------------|-------------------------------------------------------|
| `card`        | `width`, `height`               | Responsive size `{ min, preferredVw, max }`           |
|               | `maxWidthVw`, `maxHeightVh`     | Viewport caps                                         |
|               | `borderRadius`                  | Corner radius (px)                                    |
|               | `backgroundColor`               | Token or color for card fill                          |
|               | `opacity.inactive`              | Opacity for non-active tabs                           |
|               | `imageHeight`                   | CSS height for project image                          |
| `gap`         | —                               | Gap between tabs in list mode (px)                    |
| `hover`       | `scale`, `lift`, `animation`    | Hover transform and animation preset name             |
| `active`      | `scale`, `animation`, `brightness`, `brightnessAffectsImage` | Active tab scale, animation, and optional content brightness |
| `default`     | `scale`                         | Base scale                                            |
| `depthOpacity`| `active`                        | Opacity for depth layering                            |
| `title`       | `fontSize`, `fontWeight`, `padding`, `color` | Overlay title styling              |
| `subtitle`    | `fontSize`, `fontWeight`, `color` | Overlay subtitle styling                          |
| `image`       | `objectFit`, `objectPosition`, `activeBrightness` | Image rendering               |
| `border`      | `activeWidth`, `inactiveWidth`, `activeColor`, `inactiveColor` | Tab border |
| `activeHighlight` | See below                         | Active tab emphasis style (`cardGlow` or `navStyle`) |
| `placeholder` | `gradientFrom`, `gradientTo`, `textColor`, `fontSize` | No-image fallback |

##### `activeHighlight`

| Property | Description |
|----------|-------------|
| `mode` | `'cardGlow'` = theme card box-shadow glow; `'navStyle'` = white border + nav text-style glow |
| `border.activeColor` | Override active border color in `navStyle` (use `'text.primary'` for white in dark / black in light) |
| `border.activeWidth` | Override active border width in `navStyle` |
| `glow.enabled` | Show glow around active tab |
| `glow.pulse` | Pulse glow like nav bar text (`true`) or static min intensity (`false`) |

#### Example

```ts
border: {
  activeWidth: 1,
  inactiveWidth: 0.5,
  activeColor: 'ring.active',
  inactiveColor: 'ring.inactive',
},
title: { fontSize: 20, fontWeight: 300, padding: 16, color: '#ffffff' },
hover: { scale: 1.05, lift: -4, animation: 'cardHover' },
```

#### Effect on website

Controls every visual aspect of carousel project cards — size, glow borders, hover lift, title overlay, and image rendering.

#### Best practices

- Use theme tokens for borders; use explicit `#ffffff` for tab text if you want white titles regardless of theme mode.
- Reduce `activeWidth`/`inactiveWidth` for subtler borders.
- `preferredVw` controls responsive sizing — increase for larger cards on wide screens.

---

### `cylinder.ts`

**Purpose:** 3D carousel geometry, depth, reflections, and expand behavior.

**When to use:** When tuning how the portfolio carousel looks and feels in 3D space.

#### Properties

| Section       | Property                              | Description                                    |
|---------------|---------------------------------------|------------------------------------------------|
| `radius`      | —                                     | Vertical cylinder radius (px)                  |
| `horizontalRadius` | —                              | Horizontal arc radius (px)                     |
| `perspective` | —                                     | CSS 3D perspective value                       |
| `depth.scaleRange` | —                              | How much depth affects tab scale (0–1)         |
| `opacity`     | `active`, `min`, `falloffPerStep`, `transitionDuration` | Depth-based opacity falloff |
| `responsive`  | `radiusVw`, `horizontalRadiusVw`, `minRadius`, `minHorizontalRadius` | Viewport-relative sizing |
| `reflection`  | `enabled`, `opacityMultiplier`, `blur`, `offsetY`, `zScale`, `maskGradient` | Ground reflections |
| `expanded`    | `groupScale`, `translateY`, `floorOpacity` | Expanded project detail state           |
| `rotation`    | `animation`                           | Animation preset for rotation spring           |

#### Example

```ts
reflection: {
  enabled: true,
  opacityMultiplier: 0.5,
  blur: 5,
  offsetY: 160,
  zScale: 0.3,
  maskGradient: 'linear-gradient(to top, black 0%, black 50%, rgba(0,0,0,0.5) 75%, transparent 100%)',
},
```

#### Effect on website

Controls the 3D carousel arc, tab depth fade, ground reflections beneath tabs, and the zoom/shift when a project is expanded.

#### Best practices

- Disable reflections on content pages via `scene` preset — not here.
- Increase `horizontalRadius` for a wider arc; decrease for tighter grouping.
- Set `reflection.enabled: false` to remove ground tab reflections entirely.

---

### `scene.ts`

**Purpose:** Layered ambient scene for portfolio and content pages (fog particles, floor).

**When to use:** When changing animated background layers. Portfolio and content pages can use different scene presets.

#### Properties

| Property  | Description                                           |
|-----------|-------------------------------------------------------|
| `preset`  | Default scene preset (used by `/portfolio`)           |
| `presets` | Layer compositions                                    |
| `fog`     | Shared fog/particle settings (all fog presets)        |
| `floor`   | Shared floor/shine settings (all floor presets)       |

#### Scene presets

| Preset          | Layers                  | Used on                    |
|-----------------|-------------------------|----------------------------|
| `noahDarkRoom`  | fog + floor             | `/portfolio` (default)     |
| `fogOnly`       | fog only                | `/about`, `/contact`       |
| `minimal`       | floor only              | Alternative minimal scene  |

#### Layer types

| Type    | Properties                    | Description              |
|---------|-------------------------------|--------------------------|
| `fog`   | `animation`, `zIndex`         | Animated particle canvas |
| `floor` | `zIndex`                      | Ground gradient/shine  |

#### Fog settings (`fog`)

| Property         | Description                          |
|------------------|--------------------------------------|
| `layerCount`     | Number of fog blobs                  |
| `particleCount`  | Number of light particles            |
| `speed`          | Movement speed                       |
| `blendMode`      | `'screen'` \| `'multiply'` \| `'normal'` |
| `fogSizeMin`     | Minimum fog blob size (px)           |
| `fogSizeRange`   | Random size range added to min       |

#### Floor settings (`floor`)

| Property        | Description                              |
|-----------------|------------------------------------------|
| `blur`          | Backdrop blur on floor surface (px)      |
| `height`        | Floor layer height (CSS value)           |
| `top`           | Floor layer top position (CSS value)     |
| `surfaceShine`  | `{ from, mid, to }` gradient colors    |
| `expandedMask`  | CSS mask when project is expanded        |
| `collapsedMask` | CSS mask in normal carousel state        |

Fog colors come from the active **theme preset** (`theme.ts` → `fog` section), not from `scene.ts`.

#### Example

```ts
export const scene: SceneConfig = {
  preset: 'noahDarkRoom',
  presets: {
    noahDarkRoom: {
      layers: [
        { type: 'fog', animation: 'fogEntrance', zIndex: 0 },
        { type: 'floor', zIndex: 1 },
      ],
    },
    fogOnly: {
      layers: [{ type: 'fog', animation: 'fogEntrance', zIndex: 0 }],
    },
  },
  fog: { layerCount: 8, particleCount: 30, speed: 0.3, blendMode: 'screen', fogSizeMin: 150, fogSizeRange: 200 },
}
```

#### Effect on website

`/portfolio` renders fog + reflective floor. `/about` and `/contact` use `contentPages.scene.preset: 'fogOnly'` for particles without floor.

---

### `layout.ts`

**Purpose:** Overall page structure and layout mode.

**When to use:** When switching between carousel and list layout, or adjusting page section dimensions.

#### Properties

| Property        | Type / Values              | Description                              |
|-----------------|----------------------------|------------------------------------------|
| `direction`     | `'column'` \| `'row'`      | Main content flex direction              |
| `maxWidth`      | `number`                   | Max content width when centered          |
| `centered`      | `boolean`                  | Center content horizontally              |
| `smoothScrolling` | `boolean`                | Enable smooth scroll behavior            |
| `mode`          | `'cylinder'` \| others     | **`'cylinder'`** activates 3D carousel   |
| `page`          | `minHeight`, `padding`, `overflow` | Page container CSS               |
| `cylinder`      | `centerY`, `zIndex`        | Carousel vertical position               |
| `sections.projectTabs` | `paddingTop`          | Tab section spacing                      |
| `sections.projectDetail` | `paddingTop`, `maxWidth` | Expanded detail & content pages  |
| `projectList`   | `justify`, `overflowX`     | List mode tab row behavior               |

#### Example

```ts
export const layout: LayoutConfig = {
  mode: 'cylinder',
  page: { minHeight: '100vh', padding: 0, overflow: 'hidden' },
  sections: {
    projectDetail: { paddingTop: 48, maxWidth: 768 },
  },
}
```

#### Effect on website

`mode: 'cylinder'` is required for the 3D portfolio carousel. `sections.projectDetail.maxWidth` also caps About/Contact content width.

---

### `theme.ts`

**Purpose:** Global color system, typography, glow effects, and per-theme fog/floor colors.

**When to use:** When changing the overall look — dark/light/grey modes, text colors, glow intensity, or fog particle colors.

#### Top-level properties

| Property | Description                              |
|----------|------------------------------------------|
| `preset` | Active theme: `'dark'` \| `'grey'` \| `'light'` |
| `glow`   | Shared glow effect settings (all themes)   |
| `presets`| Per-theme color and typography sets      |

#### Glow settings (`glow`)

| Property        | Description                              |
|-----------------|------------------------------------------|
| `blur`, `spread`, `transitionMs` | Base glow properties          |
| `text.blurMin/Max`, `text.spreadMin/Max` | Text glow pulse range    |
| `card.blurMin/Max`, `card.spreadMin/Max` | Card glow shadow range    |
| `card.pulse` | Enable pulsing animation on active tab glow (`false` = steady glow at peak intensity) |
| `pulse.durationMs`, `pulse.easing` | Glow pulse animation timing (when enabled) |

#### Per-theme preset (`presets.dark`, etc.)

| Section       | Description                                      |
|---------------|--------------------------------------------------|
| `colors`      | All semantic colors (background, text, ring, etc.) |
| `floor.gradient` | Floor radial gradient for scene               |
| `fog`         | Fog/particle color prefixes and opacity ranges   |
| `typography`  | `pageTitle`, `pageDescription`, `pageSubtitle`   |
| `glass`       | Optional `GlassCard` overrides for this preset   |

##### Theme glass overrides (`presets.*.glass`)

| Property              | Description                                           |
|-----------------------|-------------------------------------------------------|
| `background.tint`     | Theme token, raw color, or `false` for no tint        |
| `background.opacity`  | Background fill opacity (`0` with `tint: false` = clear glass) |
| `saturation`          | Backdrop saturation multiplier (`1` = no color boost) |

#### Theme presets

| Preset  | Character                                   |
|---------|---------------------------------------------|
| `dark`  | Black background, white text (default)      |
| `grey`  | Dark grey surfaces, softer contrast         |
| `light` | Light background, dark text                 |

Users can switch themes at runtime via the theme toggle on `/portfolio` (`navigation.themeToggle`).

#### Example

```ts
export const theme: ThemeConfig = {
  preset: 'dark',
  presets: {
    dark: {
      colors: {
        background: '#000000',
        text: { primary: '#ffffff', secondary: 'rgba(255,255,255,0.8)', muted: 'rgba(255,255,255,0.7)' },
        // ...
      },
      fog: {
        fogColor1: 'rgba(255, 255, 255, ',
        fogBaseOpacity: 0.25,
        // ...
      },
    },
  },
}
```

#### Effect on website

Drives every token-based color, text glow pulse, fog particle appearance, and typography size across all pages.

#### Best practices

- Add new colors as semantic tokens under `colors` — avoid hardcoding hex in other config files.
- Fog color strings in theme are **prefixes** — opacity is appended at runtime by `FogCanvas`.
- Typography changes here affect About/Contact headings and body text.

---

### `spacing.ts`

**Purpose:** Shared spacing scale used across components.

**When to use:** When adjusting consistent padding and gaps site-wide.

#### Properties

| Token | Default (px) | Typical use                    |
|-------|--------------|--------------------------------|
| `xs`  | `4`          | Small gaps (subtitle margin)     |
| `sm`  | `8`          | Link lists, small padding        |
| `md`  | `16`         | Page horizontal padding          |
| `lg`  | `24`         | Section spacing                  |
| `xl`  | `32`         | Page padding, content spacing    |
| `xxl` | `48`         | Large section breaks             |

#### Example

```ts
export const spacing: SpacingConfig = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
}
```

#### Effect on website

Used by content pages, section gaps, contact link lists, and typography margins.

---

### `scroll.ts`

**Purpose:** Keyboard, wheel, and scroll interaction behavior for the portfolio page.

**When to use:** When changing how users navigate the carousel with mouse wheel, arrow keys, or Enter.

#### Properties (per preset)

| Property            | Type / Values                                        | Description                        |
|---------------------|------------------------------------------------------|------------------------------------|
| `enabled`           | `boolean`                                            | Master toggle                      |
| `smoothScrolling`   | `boolean`                                            | Smooth scroll behavior             |
| `momentum`          | `boolean`                                            | Scroll momentum                    |
| `wheelNavigation`   | `boolean`                                            | Enable wheel input                 |
| `bodyOverflow`      | `'hidden'` \| `'auto'`                               | Body scroll lock                   |
| `wheelDown`         | See `WheelAction` below                              | Action on scroll down              |
| `wheelUp`           | See `WheelAction` below                              | Action on scroll up                |
| `arrowHorizontal`   | `'rotateTabs'` \| `'none'`                           | Left/right arrow behavior          |
| `arrowVertical`     | `'categoryNav'` \| `'none'`                          | Up/down arrow behavior             |
| `enterKey`          | `'expand'` \| `'none'`                               | Enter key behavior                 |
| `springNavigation`  | `boolean`                                            | Spring-based navigation            |
| `reveal`            | `{ distance, opacity, scale, duration, stagger }`    | Scroll reveal animation            |
| `snap.enabled`      | `boolean`                                            | Scroll snap                        |

#### Wheel actions (`WheelAction`)

`expand` · `collapse` · `rotateNext` · `rotatePrev` · `nextCategory` · `prevCategory` · `none`

#### Presets

| Preset      | Character                                              |
|-------------|--------------------------------------------------------|
| `noah`      | Full portfolio interaction (default) — wheel expands/collapses, arrows rotate |
| `minimal`   | No wheel/keyboard navigation                           |
| `parallax`  | Horizontal arrows only, parallax reveal                |
| `snap`      | Wheel rotates tabs with snap enabled                   |
| `cinematic` | Slow reveal, momentum, minimal wheel interaction       |

#### Example

```ts
noah: {
  enabled: true,
  wheelNavigation: true,
  bodyOverflow: 'hidden',
  wheelDown: 'expand',
  wheelUp: 'collapse',
  arrowHorizontal: 'rotateTabs',
  arrowVertical: 'categoryNav',
  enterKey: 'expand',
}
```

#### Effect on website

Defines the entire interactive feel of `/portfolio`. Content pages inherit `bodyOverflow` via `ScrollProvider` but do not use wheel navigation actions.

---

### `navigation.ts`

**Purpose:** In-portfolio navigation — category sidebar, dot indicators, theme toggle, keyboard, and category transitions.

**When to use:** When adjusting portfolio-specific navigation. **Not** the top site nav — see `siteNav.ts`.

> **Naming note:** `navigation.ts` controls navigation *within* the portfolio carousel. `siteNav.ts` controls top-level page navigation (Portfolio / About / Contact).

#### Sections

##### `indicators` — dot navigation

| Property                  | Description                              |
|---------------------------|------------------------------------------|
| `enabled`                 | Show/hide dot indicators                 |
| `orientation`             | `'vertical'` \| `'horizontal'`           |
| `size`                    | Dot width (px)                           |
| `activeHeight`            | Active dot height (px)                   |
| `gap`                     | Gap between dots (px)                    |
| `position.side`           | `'left'` \| `'right'`                    |
| `position.offset`         | Responsive distance from edge `{ sm, md, lg }` |
| `colors.active/inactive`  | Theme tokens                             |
| `animation`               | Animation preset name                    |

##### `categoryNav` — category labels

| Property                    | Description                            |
|-----------------------------|----------------------------------------|
| `enabled`                   | Show/hide category nav                 |
| `position.left`             | Responsive left offset                 |
| `gap`, `fontSize`           | Responsive spacing and type size       |
| `selectedOpacity`           | Active label opacity (0–1)             |
| `unselectedOpacity`         | Inactive label opacity (0–1)           |
| `selectedWeight`            | Active font weight                     |
| `unselectedWeight`          | Inactive font weight                   |
| `colors.active/inactive`    | Theme tokens for label color           |

##### `themeToggle`

| Property          | Description                              |
|-------------------|------------------------------------------|
| `enabled`         | Show/hide theme switcher                 |
| `position.anchor` | `'viewport'` pins to screen (all pages); `'container'` pins to page wrapper |
| `position.left`   | Responsive left offset                   |
| `position.bottom` | Responsive bottom offset                 |
| `gap`             | Gap between toggle items                 |
| `fontSize`        | Responsive font size                     |
| `padding`         | Responsive button padding                |

##### `keyboard`

| Property  | Description                    |
|-----------|--------------------------------|
| `enabled` | Enable keyboard navigation     |

##### `categoryTransition`

| Property                      | Description                          |
|-------------------------------|--------------------------------------|
| `animation`                   | Preset name for category switch      |
| `tabScroll.enabled`           | Auto-scroll tabs on category change  |
| `tabScroll.stepDurationMs`    | Duration per tab scroll step         |

#### Example

```ts
indicators: {
  enabled: true,
  position: { side: 'left', offset: { sm: 12, md: 16, lg: 32 } },
  animation: 'indicatorStagger',
},
categoryNav: {
  colors: { active: 'text.secondary', inactive: 'text.muted' },
},
```

#### Effect on website

Controls all navigation elements visible on `/portfolio` except the top site nav bar.

---

### `pages.ts`

**Purpose:** Site-wide page registry for the top navigation bar.

**When to use:** When adding, removing, or reordering top-level pages (Portfolio, About, Contact, future Gallery/Blog/etc.).

#### Properties

| Section      | Property    | Description                                              |
|--------------|-------------|----------------------------------------------------------|
| `transition` | `animation` | Site-wide page transition preset (`'navFadeIn'`, `'pageTransition'`, etc.) |
|              | `durationScale` | Optional duration multiplier (`0.5` = 2× faster) |
| `items[]`    | —           | Page registry (see below)                                |

#### Properties (`items[]`)

| Property  | Type       | Description                                   |
|-----------|------------|-----------------------------------------------|
| `id`      | `string`   | Unique page identifier                        |
| `title`   | `string`   | Label shown in top nav                        |
| `route`   | `string`   | URL path (e.g. `/portfolio`, `/about`)        |
| `icon`    | `string`   | Optional icon id (reserved for future use)    |
| `visible` | `boolean`  | Show/hide in navigation                       |
| `order`   | `number`   | Sort order (lower = further left)             |

#### Example

```ts
export const pages: PagesConfig = {
  transition: { animation: 'navFadeIn', durationScale: 0.5 },
  items: [
    {
      id: 'about',
      title: 'About Me',
      route: '/about',
      visible: true,
      order: 1,
    },
  ],
}
```

#### Effect on website

`SiteNavBar` reads `items` and renders horizontal nav links. Navigation uses `PageTransitionProvider` to play the exit animation before routing, then the entrance animation after the new page mounts. Timing comes from `transition.animation` → `animations.ts`. Hidden pages (`visible: false`) are excluded. You must also create a matching route under `app/(site)/`.

#### Best practices

- Keep `order` values spaced (0, 1, 2…) for easy insertion.
- Add the route file when adding a page — config alone does not create routes.
- `/` redirects to `/portfolio` — use `/portfolio` as the portfolio route.

---

### `siteNav.ts`

**Purpose:** Top horizontal navigation bar styling and behavior.

**When to use:** When changing the appearance of the Portfolio / About / Contact nav bar.

#### Properties

| Property              | Type / Values                        | Description                              |
|-----------------------|--------------------------------------|------------------------------------------|
| `enabled`             | `boolean`                            | Show/hide top nav                        |
| `position`            | `'overlay'` \| `'inline'`            | Overlay floats over content; inline reserves height |
| `height`              | Responsive (px)                      | Bar height                               |
| `padding.x/y`         | Responsive (px)                      | Inner padding                            |
| `gap`                 | Responsive (px)                      | Gap between nav links                    |
| `fontSize`            | Responsive (px)                      | Link font size                           |
| `selectedOpacity`     | `number`                             | Active link opacity                      |
| `unselectedOpacity`   | `number`                             | Inactive link opacity                    |
| `selectedWeight`      | `number`                             | Active font weight                       |
| `unselectedWeight`    | `number`                             | Inactive font weight                     |
| `colors.active/inactive` | Token strings                     | Link colors                              |
| `hover.opacity`       | `number`                             | Hover opacity (when enabled)             |
| `activeIndicator`     | `{ enabled, height, borderRadius, color }` | Underline indicator            |
| `background.color`    | Token string                         | Bar background color                     |
| `background.opacity`  | `number` (0–1)                       | `0` = transparent                      |
| `border.width/color`  | —                                    | Bottom border                            |
| `borderRadius`        | `number`                             | Bar corner radius                        |
| `justify`             | `'start'` \| `'center'` \| `'end'` \| `'space-between'` | Link alignment |
| `animation`           | Animation preset name                | Entrance animation                       |

#### Example

```ts
export const siteNav: SiteNavConfig = {
  enabled: true,
  position: 'overlay',
  background: { color: 'colors.background', opacity: 0 },
  activeIndicator: { enabled: false, height: 2, borderRadius: 1, color: 'ring.active' },
  colors: { active: 'text.secondary', inactive: 'text.muted' },
  animation: 'navFadeIn',
}
```

#### Effect on website

Renders the top nav on all pages. Active page gets text glow (same as category nav). `position: 'overlay'` keeps the carousel full-viewport; `'inline'` pushes content down.

#### Best practices

- Match category nav styling by using the same opacity/weight/color values.
- Set `background.opacity: 0` and `border.width: 0` for a floating text-only nav over the scene.

---

### `about.ts`

**Purpose:** Content for the `/about` page.

**When to use:** When editing biography, education, experience, or other about sections.

#### Properties

| Property    | Description                              |
|-------------|------------------------------------------|
| `title`     | Page heading                             |
| `subtitle`  | Optional subheading                      |
| `sections`  | Array of content sections                |

#### Section properties

| Property  | Description                              |
|-----------|------------------------------------------|
| `id`      | Unique section id                        |
| `title`   | Section heading                          |
| `content` | Section body text                        |
| `visible` | Show/hide section                        |
| `order`   | Display order                            |

#### Example

```ts
{
  id: 'biography',
  title: 'Biography',
  content: 'Your biography text here.',
  visible: true,
  order: 0,
},
```

#### Effect on website

Renders inside a `GlassCard` on `/about`. Sections are sorted by `order` and filtered by `visible`.

---

### `contact.ts`

**Purpose:** Content for the `/contact` page.

**When to use:** When editing contact info and social links.

#### Properties

| Property   | Description                              |
|------------|------------------------------------------|
| `title`    | Page heading                             |
| `subtitle` | Optional subheading                      |
| `email`    | Optional email address (shown + mailto)  |
| `links`    | Array of social/contact links            |

#### Link properties

| Property  | Description                              |
|-----------|------------------------------------------|
| `id`      | Unique link id                           |
| `label`   | Display text                             |
| `url`     | Link URL or `mailto:` address            |
| `icon`    | Optional icon id (reserved)              |
| `visible` | Show/hide link                           |
| `order`   | Display order                            |

#### Example

```ts
{
  id: 'github',
  label: 'GitHub',
  url: 'https://github.com/yourusername',
  icon: 'github',
  visible: true,
  order: 0,
},
```

#### Effect on website

Renders inside a `GlassCard` on `/contact`. External URLs open in a new tab.

---

### `contentPages.ts`

**Purpose:** Shared settings for non-portfolio content pages (About, Contact, and future pages).

**When to use:** When changing background scene or glass panel behavior for content pages.

#### Properties

| Section      | Property              | Description                              |
|--------------|-----------------------|------------------------------------------|
| `pageIds`    | —                     | Page IDs that use content page layout    |
| `scene`      | `preset`              | Scene preset name (`'fogOnly'`, etc.)      |
| `content`    | `zIndex`              | Content layer z-index above background   |
|              | `backgroundOpacity`   | `0` = transparent (show scene through)   |
| `glass`      | `enabled`             | Wrap content in `GlassCard`              |
|              | `preset`              | Glass preset name (`'liquid'`, `'subtle'`) |
|              | `animateEntrance`     | `false` when site page transition handles fade |

#### Example

```ts
export const contentPages: ContentPagesConfig = {
  pageIds: ['about', 'contact'],
  scene: { preset: 'fogOnly' },
  content: { zIndex: 10, backgroundOpacity: 0 },
  glass: { enabled: true, preset: 'liquid', animateEntrance: false },
}
```

#### Effect on website

`/about` and `/contact` use `ContentPageLayout` which reads this config for the fog background and glass card wrapper. Page transitions are handled site-wide via `pages.transition` in `AppShell`.

#### Relationships

- `scene.preset` → `scene.ts` presets
- `glass.preset` → `glass.ts` presets (resolved via `resolveGlass()` in `getSiteConfig()`)

---

### `glass.ts`

**Purpose:** Liquid glass / glassmorphism panel styling for content cards.

**When to use:** When tuning the frosted glass panels on About, Contact, or any future page using `<GlassCard>`.

#### Properties

| Property   | Description                              |
|------------|------------------------------------------|
| `preset`   | Default glass preset                       |
| `presets`  | Named glass surface configurations         |

#### Preset properties (`presets.liquid`, etc.)

| Property        | Description                                      |
|-----------------|--------------------------------------------------|
| `blur`          | Responsive backdrop blur (px)                    |
| `saturation`    | Backdrop saturation multiplier (1.0 = normal)    |
| `background.tint` | Theme token or color for panel fill            |
| `background.opacity` | Panel fill opacity (0–1)                    |
| `borderRadius`  | Responsive corner radius (px)                    |
| `border.width`  | Border width (px)                                |
| `border.color`  | Token or rgba border color                       |
| `highlight`     | `{ enabled, color, opacity }` — inset top edge   |
| `shadow`        | `{ blur, spread, offsetX, offsetY, color }`      |
| `padding`       | Responsive inner padding (px)                    |
| `maxWidth`      | Responsive max panel width (px)                  |
| `margin`        | Responsive outer margin (px)                     |
| `animation`     | Entrance animation preset name                   |
| `transition`    | `{ durationMs, easing }` for hover/state       |

#### Presets

| Preset   | Character                                        |
|----------|--------------------------------------------------|
| `liquid` | Strong blur, bright highlight, deep shadow (default) |
| `subtle` | Lighter blur, softer tint, minimal shadow        |

#### Example

```ts
liquid: {
  blur: { sm: 20, md: 28, lg: 36 },
  saturation: 1.35,
  background: { tint: 'surface.muted', opacity: 0.12 },
  borderRadius: { sm: 16, md: 20, lg: 24 },
  highlight: { enabled: true, color: 'rgba(255,255,255,1)', opacity: 0.22 },
  animation: 'fadeIn',
},
```

#### Effect on website

Wraps About/Contact content in a frosted glass panel. Background fog remains visible through the blur.

#### Best practices

- Increase `blur` and `saturation` for a stronger Apple-style liquid glass look.
- Keep `background.opacity` low (0.08–0.15) to preserve background visibility.
- Use `'subtle'` preset for minimal UI; `'liquid'` for premium presentation.

---

### `index.ts`

**Purpose:** Barrel export for all configuration modules.

**When to use:** When adding a new config file — add an export here so `getSiteConfig()` and other imports can access it.

#### Current exports

```ts
export { projects } from './projects'
export { tabs } from './tabs'
export { layout } from './layout'
export { animations } from './animations'
export { scroll } from './scroll'
export { background } from './background'
export { theme } from './theme'
export { navigation } from './navigation'
export { pages } from './pages'
export { siteNav } from './siteNav'
export { about } from './about'
export { contact } from './contact'
export { contentPages } from './contentPages'
export { glass } from './glass'
export { spacing } from './spacing'
export { breakpoints } from './breakpoints'
export { categories } from './categories'
export { cylinder } from './cylinder'
export { scene } from './scene'
```

---

## Best Practices

### 1. Configure, don't hardcode

If a value affects something the site owner would want to change, it belongs in `config/`. Components should read config; they should not contain magic numbers for visual or behavioral settings.

### 2. Use theme tokens for colors

Prefer `'text.secondary'` over `'rgba(255,255,255,0.8)'` in config files so theme switching stays coherent. Use literal colors only when a value must stay fixed across themes (e.g. white tab text).

### 3. Use responsive objects for layout values

Any property that should differ between mobile, tablet, and desktop should use `{ sm, md, lg }` and rely on `breakpoints.ts`.

### 4. Reference animation presets by name

Add new motion presets to `animations.ts`, then reference them by string name from other configs. Never duplicate easing/duration values inline.

### 5. Keep content and presentation separate

- **Content:** `projects.ts`, `about.ts`, `contact.ts`, `categories.ts`
- **Presentation:** `tabs.ts`, `theme.ts`, `glass.ts`, `siteNav.ts`
- **Behavior:** `scroll.ts`, `navigation.ts`, `animations.ts`
- **Structure:** `pages.ts`, `layout.ts`

### 6. Adding a new top-level page

1. Add entry to `pages.ts`
2. Create content config (e.g. `blog.ts`)
3. Create route at `app/(site)/blog/page.tsx`
4. Export from `config/index.ts`
5. Wire into `getSiteConfig()` in `siteConfig.ts`
6. Use `ContentPageLayout` + optional `GlassCard`
7. **Update this guide**

### 7. Test across breakpoints

After config changes, check `/portfolio`, `/about`, and `/contact` at mobile (< 640px), tablet, and desktop widths.

### 8. Reload after changes

In development, Next.js hot-reloads config changes. If behavior seems stale, restart the dev server and hard-refresh (`Ctrl+Shift+R`).

---

*Last updated to reflect all 19 configuration files in `config/` as of the current project state.*
