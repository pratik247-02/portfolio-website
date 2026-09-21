# Portfolio — Pratik Raje

**Live:** [pratik-raje.vercel.app](https://pratik-raje.vercel.app)

Software developer at Matrice AI, working on real-time multi-camera video
streaming. This is the site that says so.

## Running it

```bash
npm install
npm start      # dev server on :3000
npm run build  # production build to build/
```

## What is in here

Create React App, Tailwind, Framer Motion. No UI library — the components
are all in `src/components/`.

A few things worth knowing if you are reading the source:

**`GraphCanvas.js`** is a force-directed particle field on a canvas, written
against `requestAnimationFrame` rather than a physics library. Neighbour
lookup goes through a uniform spatial hash, so link-finding is roughly O(n)
instead of the O(n²) a naive pass would cost — at 90 nodes that is the
difference between a comfortable frame budget and a janky one on integrated
graphics.

**`About.js`** is a working shell rather than a bio paragraph, with command
history, tab completion and `ctrl+l`. A prompt makes a two-line answer the
correct length instead of a lazy one.

**`Skills.js`** attaches evidence to each skill — the specific thing it was
used for — revealed on hover so the grid stays scannable for someone who
only wants keywords.

**The background is a CSS gradient, not an image.** It used to be a 556 KB
JPEG that decoded to a near-flat purple wash: sampled across its height it
only moved between `#1f0b3a` and `#311b54`, with a maximum per-pixel
deviation of 35/255 from each row's average. The gradient in
`tailwind.config.js` is built from those measured stops.

`prefers-reduced-motion` is honoured throughout.

## Deploys

Pushes to `master` deploy automatically to Vercel.
