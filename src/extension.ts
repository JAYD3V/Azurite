import { ThemeColor } from 'vscode';
import { parseJSONFile } from './lib/uidynamics-parser';

parseJSONFile(
  `${process.cwd()}/.tmp/colorTheme.json`
).then((json) => {
  const strVal = 'editor.background';

  const editorBg = json[strVal] as ThemeColor;

  // const focusBorder = json.focusBorder as ThemeColor;

  console.log(`\n {\n    "editor.background": ${editorBg}\n}\n\n`);
});


parseJSONFile('foo', true).then();
