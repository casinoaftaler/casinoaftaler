## Plan: Add 12 YouTube Videos to Guide Pages + Author Registry

### Summary

Add YouTube video embeds with VideoContextBox and VideoObject JSON-LD to 12 pages, and register all 12 as Jonas guide videos in `authorContent.ts`.

### Video Data (from YouTube)


| #   | videoId     | Page                                        | Duration | Author on page | &nbsp; |
| --- | ----------- | ------------------------------------------- | -------- | -------------- | ------ |
| 1   | vai9EyLLpfU | /casinospil/spillemaskiner/sweet-bonanza    | PT1M30S  | jonas          | &nbsp; |
| 2   | uUZOHtTgFW4 | /casinospil/spillemaskiner/gates-of-olympus | PT2M51S  | jonas          | &nbsp; |
| 3   | oz_VUxjLXZ0 | /casinospil/spillemaskiner/dead-or-alive-2  | PT2M30S  | jonas          | &nbsp; |
| 4   | f9GAKjf63uo | /casinospil/spillemaskiner/money-train-3    | PT3M16S  | jonas          | &nbsp; |
| 5   | _rC_ONf72gk | /casinospil/spillemaskiner/the-dog-house    | PT1M49S  | jonas          | &nbsp; |
| 6   | Ss2ZRXT0jCI | /casinospil/spillemaskiner/legacy-of-dead   | PT1M41S  | jonas          | &nbsp; |
| 7   | Jw--inO4LNk | /casinospil/spillemaskiner/book-of-dead     | PT1M55S  | jonas          | &nbsp; |
| 8   | ybFWBECwKbo | /casinospil/spillemaskiner/reactoonz        | PT0M57S  | jonas          | &nbsp; |
| 9   | G8beL2DD1sI | /casinospil/spillemaskiner/eye-of-horus     | PT2M45S  | jonas          | &nbsp; |
| 10  | wk34dIvTJ-c | /casinospil/spillemaskiner/wolf-gold        | PT0M59S  | jonas          | &nbsp; |
| 11  | epl204siMF0 | /cashback-bonus                             | PT1M12S  | jonas          | &nbsp; |
| 12  | ReM4PBQ30rw | /reload-bonus                               | PT1M0S   | jonas          | &nbsp; |


### Changes per guide page (14 files total)

**For each of the 12 pages, 3 changes:**

1. **Add imports** for `YoutubeEmbed`, `VideoContextBox`, `buildVideoSchema` (where missing)
2. **Add `videoJsonLd**` via `buildVideoSchema()` and include it in `<SEO jsonLd={[...]}>`; also add `videoId` to `buildArticleSchema()` for `hasPart` binding
3. **Insert `<YoutubeEmbed>` + `<VideoContextBox>` after the intro section** (after H1/hero image/intro paragraphs, before the next `<Separator>` or content section) — following the exact pattern from BigBassBonanzaGuide and NoStickyBonus

**VideoContextBox content pattern:**

- Slot guides: "Her gennemgår vores streamer [Jonas/Kevin], spillemaskinen [SlotName]"
- Body: "[Author] viser [key mechanic] i praksis. Videoen er en del af vores dybdegående indhold om [spillemaskiner](/casinospil/spillemaskiner) og [Provider](/spiludviklere/xxx)."
- Cashback/Reload: "Her gennemgår vores forfatter Jonas, hvad en [bonus type] er" with links to casino bonus, omsætningskrav etc.

### Author registry update (`src/data/authorContent.ts`)

Add all 12 videos to `jonasGuideVideos` array (even though Reactoonz and Wolf Gold pages have `author="kevin"`, the videos are on Jonas' YouTube channel and should appear on his profile):

```typescript
{ videoId: "vai9EyLLpfU", title: "Vi gennemgår Sweet Bonanza", path: "/casinospil/spillemaskiner/sweet-bonanza", category: "Slot Guide" },
{ videoId: "uUZOHtTgFW4", title: "Vi gennemgår Gates of Olympus", path: "/casinospil/spillemaskiner/gates-of-olympus", category: "Slot Guide" },
{ videoId: "oz_VUxjLXZ0", title: "Vi gennemgår Dead or Alive 2", path: "/casinospil/spillemaskiner/dead-or-alive-2", category: "Slot Guide" },
{ videoId: "f9GAKjf63uo", title: "Vi gennemgår Money Train 3", path: "/casinospil/spillemaskiner/money-train-3", category: "Slot Guide" },
{ videoId: "_rC_ONf72gk", title: "Vi gennemgår The Dog House", path: "/casinospil/spillemaskiner/the-dog-house", category: "Slot Guide" },
{ videoId: "Ss2ZRXT0jCI", title: "Vi gennemgår Legacy of Dead", path: "/casinospil/spillemaskiner/legacy-of-dead", category: "Slot Guide" },
{ videoId: "Jw--inO4LNk", title: "Vi gennemgår Book of Dead", path: "/casinospil/spillemaskiner/book-of-dead", category: "Slot Guide" },
{ videoId: "ybFWBECwKbo", title: "Vi gennemgår Reactoonz", path: "/casinospil/spillemaskiner/reactoonz", category: "Slot Guide" },
{ videoId: "G8beL2DD1sI", title: "Vi gennemgår Eye of Horus", path: "/casinospil/spillemaskiner/eye-of-horus", category: "Slot Guide" },
{ videoId: "wk34dIvTJ-c", title: "Vi gennemgår Wolf Gold", path: "/casinospil/spillemaskiner/wolf-gold", category: "Slot Guide" },
{ videoId: "epl204siMF0", title: "Hvad er en Cashback-Bonus?", path: "/cashback-bonus", category: "Bonus" },
{ videoId: "ReM4PBQ30rw", title: "Hvad er en Reload Bonus?", path: "/reload-bonus", category: "Bonus" },
```

### Implementation order

1. Update `authorContent.ts` — add 12 entries to `jonasGuideVideos`
2. Update 10 slot guide pages (Sweet Bonanza, Gates of Olympus, Dead or Alive 2, Money Train 3, The Dog House, Legacy of Dead, Book of Dead, Reactoonz, Eye of Horus, Wolf Gold)
3. Update 2 bonus pages (Cashback Bonus, Reload Bonus)

### Performance

- YouTube iframes use `loading="lazy"` by default and are placed below the fold (after hero + intro)
- No additional images are embedded — thumbnails load from YouTube's CDN only when iframe renders