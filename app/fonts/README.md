# Heading font — GT Ultra Median

The design calls for **GT Ultra Median** (Grilli Type). It is a licensed
commercial typeface: it is not on Google Fonts and cannot be downloaded
without a purchased licence, so it is not bundled in this repo.

## To install it

1. Buy/obtain the webfont licence from https://www.grillitype.com and drop the
   files here, e.g. `GT-Ultra-Median-Regular.woff2`, `GT-Ultra-Median-Bold.woff2`.
2. In `app/layout.tsx`, load them with `next/font/local`:

   ```ts
   import localFont from "next/font/local";

   const heading = localFont({
     src: [
       { path: "./fonts/GT-Ultra-Median-Regular.woff2", weight: "400" },
       { path: "./fonts/GT-Ultra-Median-Bold.woff2", weight: "700" },
     ],
     variable: "--font-heading",
   });
   ```

3. Add `heading.variable` to the `<html>` className.

Until then `--font-heading` is unset and `.hero-title` falls back to
Fraunces (loaded in `app/layout.tsx`), which stands in for the same
display-serif role. The `"GT Ultra Median"` family name is kept first in the
CSS stack, so a locally installed copy is picked up automatically.
