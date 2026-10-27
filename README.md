# personality-test
Quick personality + love language quiz in just 10 questions, plus mini games for every type.

## What's inside
**One 10-question quiz, three results:**
1. **What makes you connect with people:** Music, Sports & Fitness, Food & Cooking, Gaming, Movies & TV, Books & Stories, Art & Creativity or Nature & Adventure. You also get ways to meet people who share it and some conversation starters.
2. **Your love language:** Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service or Physical Touch.
3. **Your personality type:** one of the 16 four-letter types.

Every question counts toward more than one result. Six questions decide your personality type (3 votes per letter pair, so it never ties) and also vote on your interests or love language. Two questions ask directly about interests and two ask directly about love, and those count double.

**Games:** Memory Match, a Hangout Idea Generator and a Type Compatibility checker.

Your last result, best memory score and saved hangout ideas are stored only in your browser.

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
- `css/style.css`: styles (dark blue theme)
- `js/data.js`: questions, interest categories, the 16 types and the love languages (edit these to change the wording)
- `js/app.js`: quiz flow, scoring and results
- `js/games.js`: the mini games

Just for fun, not a clinical assessment.
