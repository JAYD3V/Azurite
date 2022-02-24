import { ERROR } from './std-lib';
import { readFile } from 'fs';

// import { ThemeColor } from 'vscode';
import * as filepath from 'path';

type ThemeMetaData = {
  id: string;
  name: string;
};

export class VSCTheme {
  opts: ThemeMetaData;
  constructor(opts: ThemeMetaData) {
    this.opts = opts;
  }

  parse = (fpath: string, verbose: boolean = false) => {
    return new Promise<any>((resolve, reject) => {
      if (!/json/i.test(filepath.extname(fpath))) {
        reject(
          new ERROR(`Invalid Filepath!`, {
            type: '"VALIDATION ERROR"',
            problem:
              "A JSON-parser was passed a filepath to parse that didn't have a JSON file-extension appended to the end of it",
            solution: 'Filepaths passed to JSON parsers must have the json ext',
            funcLoc: 'parseJSONFile(fpath: str, verbose: bool)'
          })
        );
      }

      readFile(fpath, (e, data) => {
        if (e) throw new Error('\nFILE READ ERROR');

        const json: any = JSON.parse(data.toString());
        if (verbose) console.log(json);
        resolve(json);
      });
    });
  };

  generate = (obj: any = null) => {
    return new Promise((resolve, reject) => {
      console.log(Object.prototype.toString.call(obj));
    });
  };
}
