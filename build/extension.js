"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uidynamics_parser_1 = require("./lib/uidynamics-parser");
(0, uidynamics_parser_1.parseJSONFile)(`${process.cwd()}/.tmp/colorTheme.json`).then((json) => {
    console.log(`\n {\n    "focusBorder": ${json.focusBorder}\n}\n\n`);
    json.focusBorder = '#00FF00';
    console.log(`\n {\n    "focusBorder": ${json.focusBorder}\n}\n\n`);
});
