---
name: aleksandra-ermolenko
description: Generates UI following the "MOEX AI Strategy" visual language by Aleksandra Ermolenko—dark mode only, bento grids, data-first, high contrast. Use when building or styling interfaces, pages, or components for MOEX AI Hub, or when the user references Aleksandra Ermolenko, MOEX AI Strategy style, bento layout, or dark enterprise UI.
---

# Aleksandra Ermolenko — Visual Style Guide

Expert UI/UX guidance for interfaces that strictly follow the "MOEX AI Strategy" visual language.

## 1. Core Philosophy

- **Dark Mode Only:** Always deep dark mode. No light backgrounds.
- **Bento Grid Layouts:** Content in modular, rounded cards (tiles) in a grid.
- **Data-First:** Prioritize large numbers, clear metrics, and structured lists over decorative imagery.
- **High Contrast:** Use thin, bright borders to separate dark elements.

## 2. Design Tokens (Tailwind CSS)

### Colors

| Token            | Value              | Usage                                      |
|------------------|--------------------|--------------------------------------------|
| Page background  | `bg-[#0F1115]`     | Canvas / page                              |
| Card background  | `bg-[#16181D]`     | Tiles, cards                               |
| Brand accent     | `text-[#FF0000]` / `bg-[#FF0000]` | Logos, active states, critical highlights (sparingly) |
| Text primary     | `text-white`       | Headings                                   |
| Text secondary   | `text-gray-400`    | Subtitles, descriptions                     |
| Borders          | `border-white/10` or `border-gray-700` | Card and element separation        |

### Typography

- **Section labels:** Sans-serif, bold to extra-bold, often uppercase.  
  Example: `font-bold uppercase tracking-wider text-sm text-gray-500 mb-2`
- **Big stats:** Very large for key metrics.  
  Example: `text-6xl font-bold leading-none`
- **Body:** Clean sans-serif (Inter, Roboto, or system UI).

### Shapes & Spacing

- **Corners:** Heavy rounding. Cards: `rounded-2xl` or `rounded-3xl`. Buttons/tags: `rounded-full`.
- **Padding:** Generous (`p-6` or `p-8`).
- **Grid gaps:** `gap-2` or `gap-4`.

## 3. UI Component Rules

### Bento Card

Wrap content sections in:

```html
<div class="bg-[#16181D] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
  <!-- content -->
</div>
```

### Pill Tag

Keywords (e.g. "AI Agents", "Integration"):

```html
<span class="bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm border border-white/5">Label</span>
```

### Dashed Placeholder

Future/empty states:

```html
<div class="border-2 border-dashed border-gray-700 rounded-3xl flex items-center justify-center text-gray-500">
  Placeholder
</div>
```

### Section Header

- Layout: `flex flex-col gap-1`
- Number: `text-sm text-gray-500 font-mono`
- Title: `text-3xl text-white font-medium`

## 4. Code Generation Instructions

When building a UI component:

1. Start with a black/dark gray canvas (`bg-[#0F1115]`).
2. Use `grid` or `flex` for layout.
3. Apply `rounded-3xl` to main containers.
4. Prefer borders (`border border-white/10`) over shadows for depth.
5. For logo/brand anchor, use a simple red block (e.g. `bg-red-600` or `bg-[#FF0000]`).

## 5. Example Layout

```html
<div class="min-h-screen bg-[#0F1115] text-white p-8 font-sans">
  <div class="mb-12">
    <div class="w-12 h-12 bg-red-600 mb-6"></div>
    <h1 class="text-5xl font-bold uppercase tracking-tight">
      AI Strategy <br/>
      <span class="text-gray-500">2026</span>
    </h1>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="col-span-2 bg-[#16181D] rounded-3xl p-8 border border-white/10">
      <div class="text-sm text-gray-400 uppercase mb-4">Coverage</div>
      <div class="text-8xl font-bold">71%</div>
      <p class="text-gray-400 mt-2">Organizations utilizing GenAI</p>
    </div>

    <div class="bg-[#16181D] rounded-3xl p-8 border border-white/10 flex flex-col gap-4">
      <div class="bg-white/5 rounded-xl p-4 border border-white/5">MOEX GPT</div>
      <div class="bg-white/5 rounded-xl p-4 border border-white/5">Code Agent</div>
      <div class="border border-dashed border-white/20 rounded-xl p-4 text-gray-500">Future Project...</div>
    </div>
  </div>
</div>
```
