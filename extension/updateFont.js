const webfont = require("webfont");
const fs = require("fs");
const path = require("path");

const svgs = [
  "explorer-view.svg", //     <-|00|
  "search-view.svg", //       <-|01|
  "debug-view.svg", //        <-|02|
  "git-view.svg", //          <-|03|
  "extensions-view.svg", //   <-|04|
  "smiley.svg", //            <-|05|
  "folding-expanded.svg", //  <-|06|
  "folding-collapsed.svg", // <-|07|
  "expando-expanded.svg", //  <-|08|
  "expando-collapsed.svg", // <-|09|
  "gear-wrench-icon.svg", //  <-|10|
].map((name) => path.join(__dirname, "..", "icons", name));
async function generateFont() {
  try {
    const result = await webfont.webfont({
      files: svgs,
      formats: ["woff"],
      startUnicode: 0xe000,
      verbose: true,
      normalize: true,
      sort: false,
    });
    const dest = path.join(__dirname, "..", "themes", "azurite.woff");
    fs.writeFileSync(dest, result.woff, "binary");

    console.log(`Font created at ${dest}`);
  } catch (e) {
    console.error("Font creation failed.", e);
  }
}

generateFont();
