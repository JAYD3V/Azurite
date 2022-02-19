import { ERROR } from './std-lib';
import { readFile } from 'fs';
// import { ThemeColor } from 'vscode';
import * as filepath from 'path';

export function parseJSONFile(fpath: string, verbose: boolean = false) {
  return new Promise<any>((resolve, reject) => {
    // Test if `fpath` has a `.json` file-extension.
    if (!(/json/i).test(filepath.extname(fpath))) {
      reject(
        new ERROR(
          `Invalid Filepath!`, {
            type: '"VALIDATION ERROR"',
            problem: 'A JSON-parser was passed a filepath to parse that didn\'t have a JSON file-extension appended to the end of it',
            solution: 'Filepaths passed to JSON parsers must have the json ext',
            funcLoc: 'parseJSONFile(fpath: str, verbose: bool)'
          }
        )
      );
    }

    readFile(fpath, (e, data) => {
      if (e) {
        reject(
          reject(
            new ERROR(`Error Reading file.`, {
              type: '"FILE READ ERROR"',
              funcLoc: 'parseJSONFile(fpath...)',
              problem: `An error occurred while attempting to read ${fpath}.`,
              solution:
                "The most likely culprit is an invalid filepath. If the path is good, and the file exists, check the file's contents, make sure that the file contains the datatype & format that you are expecting it too, furthermore; you can also check file permissions, and the health of the file (make sure the file isn't corrupted)."
            })
          )
        );
      }
      try {
        const json: any = JSON.parse(data.toString());
        if (verbose) console.log(json);
        resolve(json);
      } catch (e) {
        if (e) {
          reject(
            new ERROR(e + `An error occurred while attempting to read a file.`, {
              type: 'FILE READ ERROR',
              funcLoc: 'parseJSONFile(fpath, verbose)',
              problem: 'The native JSON parser encountered an ERROR',
              solution:
                'One option would be to try and parse the file in a sandbox environment using nodes JSON.parse() function, since that method is what threw the error. If you can get JSON.parse to parse the document, that should resolve the error your receiving when you parse your file using ViCE.'
            })
          );
        }
      }
    });
  });
}

export class Theme {

}
