# personality-test
Quick personality + love language quiz in just 10 questions, plus mini games for every type.

## What's inside
- **10-question quiz**: 6 questions find your 4-letter personality type (3 votes per letter pair, so there are no ties), and 4 questions find your love language.
- **Results page**: your type, superpowers, how you love, a fun fact, letter breakdown bars, and your love language with a percentage breakdown. Share or copy your result in one tap.
- **Games**
  - 💌 Love Language Memory Match (saves your best score)
  - 🌙 Daydream Generator (save your favourite daydreams)
  - 💞 Type Compatibility checker

Your last result, best memory score and saved daydreams are stored in your browser only.

## Run it
It's plain HTML/CSS/JS with no build step. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Put it online
In the repo on GitHub, go to **Settings → Pages**, pick your branch and `/ (root)`, and save. Your site will be live at `https://<username>.github.io/personality-test/`.

## Files
- `index.html`: page structure
- `css/style.css`: styles (light and dark mode)
- `js/data.js`: questions, the 16 types and the love languages (edit these to change the wording)
- `js/app.js`: quiz flow, scoring and results
- `js/games.js`: the mini games

Just for fun, not a clinical assessment.
