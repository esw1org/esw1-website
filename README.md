# Everything Starts With 1 — Website

A static, 8-page site built for GitHub Pages. No build step required — it's plain HTML/CSS/JS.

## Pages

- `index.html` — Home
- `tylers-story.html` — Tyler's Story
- `book-a-speaking-event.html` — Book a Speaking Event
- `resources.html` — Resources (guide titles + external tools live; full guide content still pending)
- `media.html` — Media (documentary, press, photo gallery)
- `blog.html` — Speaking Portfolio (event-triggered, replaces the old monthly blog)
- `donate.html` — Donate
- `contact.html` — Contact

## Deploying to GitHub Pages

1. Push this folder's contents to the root of the `everythingstartswith1`/`ESW1` GitHub repo (or a `docs/` folder, or a dedicated branch — whichever the existing repo uses).
2. In the repo's Settings → Pages, set the source to the branch/folder you pushed to.
3. Point the existing domain (everythingstartswith1.org) at GitHub Pages — if DNS is already configured from the old WordPress site, this should just work once a `CNAME` file with the domain is added to the repo root (ask if this needs setting up).

## Connecting the forms (important — do this before launch)

The **Book a Speaking Event** and **Contact** forms currently show a friendly "thanks, we got it" message but **do not actually send anywhere** — that's a placeholder in `js/main.js` (`initFormHandlers`). Before this goes live, wire them to a real inbox. The simplest options for a static site:

- **Formspree** (formspree.io) — free tier works fine for this volume. Sign up, create a form pointed at Tina's inbox, then change each `<form data-esw1-form ...>` tag's `action` to the Formspree endpoint and remove the `data-esw1-form` JS interception (or keep it and let Formspree handle the POST — either approach works, just pick one).
- **Netlify Forms** — only works if hosting moves to Netlify instead of GitHub Pages.
- **A simple `mailto:` fallback** — least reliable (depends on the visitor's own email client) but zero setup.

Recommend Formspree since it keeps everything on GitHub Pages with minimal setup.

## Tribute song ("Don't Laugh At Me" — Mark Wills)

This is commercially licensed music, so the site links out to the [official YouTube video](https://www.youtube.com/watch?v=FVjbo8dW9c8) rather than hosting/serving the audio file directly — that avoids any copyright/licensing issue. Browsers also block true autoplay-with-sound, so the widget in the hero (see `.song-widget` in `index.html`, styled after the goodsinners.com reference) becomes interactive on the visitor's first click/scroll, then opens the song on click. If ESW1 secures rights to self-host the track, swap `SONG_URL` in `js/main.js` for a hosted MP3 and this can become a true in-page player.

## The Bully documentary

The full film carries a YouTube age restriction that blocks embedding. Rather than embed an unofficial/unverified copy, `media.html` embeds the official trailer and links out to [Tubi](https://tubitv.com/movies/507465/bully), where the full film streams free and legally. Swap this out if ESW1 has a different preferred official source.

## Search

The nav search (top right, magnifying glass icon) is a small hand-authored client-side index in `js/main.js` (`SITE_INDEX`) — no backend needed. If pages or major sections change, update that array to keep search results accurate.

## The ESW1 info/media packet (incorporated)

A second upload — ESW1's info/media packet (About, Our Solution, Appearances pages) — has now been folded in:

- **Book a Speaking Event** (`book-a-speaking-event.html`) — added a full "Where We've Been" section: stat counters, a "Featured In" media pill row, and expandable lists (Schools & Universities, Conferences & Summits, Events & Premieres, Film Festivals, Partners & Relationships), all pulled from the packet's Appearances page.
- **Media** (`media.html`) — added a real "Press Coverage" list (Ellen, ABC 20/20, GLAAD Gala video, WRCB-TV, a Chattanooga blogger's write-up, and a TakePart op-ed) and a real "About ESW1" bio card, replacing the old placeholder.
- **Home** (`index.html`) — added an "The ESW1 Solution" section covering the ESW1 Assembly, ESW1 Project, and ESW1 Guides, based on the packet's "Our Solution" page.
- **Resources** (`resources.html`) — the three guide placeholders now show their real titles ("Your Voice," "Empowering You," "My Voice Will Not Fall Silent"), still marked as coming soon per Tina's earlier instruction not to publish the guides until they're reviewed. Also added a "Tools & Helplines" section linking to the TIPS Prevention Platform (awareity.com) and the North American Alliance of Child Helplines (naach.co) — these are external resources, not the internal guides, so they're safe to publish now.
- **Facebook/Twitter links** — footer and homepage now link to `facebook.com/everythingstartswith1` and `twitter.com/ESW1org` from the packet.

**Two things worth Tina's eyes before launch:**

1. **The packet appears to date from roughly 2013–2015** (references to the 2014 GLAAD Gala as "latest," old Twitter/X branding, etc.). All press links, the Facebook/Twitter handles, and the "15+ / 25+ / 20+" stat counts are sourced from it as-is — worth a quick pass to confirm links still resolve and nothing's gone stale before this goes live.
2. **The "everything starts with 1" quote has a source, and it's David Long** — the packet's cover page credits it to him directly ("Everything starts with one and builds up... ~ David Long"). Given the "no David" rule, this hasn't been added anywhere on the site — the quote spot on the home page mission card is still blank. Options: drop the idea entirely, have Tina rephrase the sentiment in her own words (the mission statement already carries a version of it — "because everything starts with one"), or reconsider attributing it to David if that's actually fine with her. Held pending her call.

## Still open / placeholders in the content itself

- **Goal statement** — home page ships with "new goal statement coming soon" in the Goal card. Swap in real copy once Tina has it (`index.html`, Mission/Vision/Goal section).
- **"Everything starts with 1 and builds up..." quote** — see above; not used anywhere pending Tina's decision.
- **Downloadable press kit PDF** — `media.html` now has a real bio blurb, but a formal one-page downloadable PDF kit still doesn't exist.
- **Resource guides** (Parent/Student/Educator) — full guide content is still not published, per Tina's instruction, though the real titles are now shown.
- **Speaking history exact dates** — the "Where We've Been" section and `blog.html` use the packet's info as-is; several entries don't have confirmed exact dates.
- **Instagram / Tyler's Facebook page links** — still `href="#"` placeholders; the packet didn't include these URLs.
- **Donations** — `donate.html` is a holding page; add the actual payment link/embed once Tina decides between linking her bank account or opening a new donation account.
- **Brand assets** — currently only using Tina's hand-drawn logo (`assets/logo/esw1-logo.png`). No custom fonts beyond Google Fonts (Fraunces + Work Sans); swap in official brand fonts if ESW1 has them.

## Note on David Long

Per Tina's direction, every text mention of "David Long" was removed and founder language rewritten to "Founded by Tina Long" / "Led by Tina Long." Tina gave permission to use photos that include David visually (he's not named or centered in any caption), including the GLAAD gala, U.S. House, White House, and conference-slide photos in the Media gallery. Press-coverage link labels were written to avoid naming him even where the underlying historical article/video does (e.g. a video of "David talking to football players" was left out rather than labeled with his name); a link to a blog post by Chattanooga journalist David Carroll was kept, since that David is unrelated to Tyler's father.

## Images

All 16 photos Tina provided are in `assets/images/`, resized/compressed for web (longest edge ≤1800px). Full filename-to-content mapping is in the project's `discovery-and-plan.md` doc (Section 6a).
