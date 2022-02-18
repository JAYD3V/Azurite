"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSONFile = void 0;
const std_lib_1 = require("./std-lib");
const fs_1 = require("fs");
function parseJSONFile(fpath, verbose = false) {
    return new Promise((resolve, reject) => {
        const regex = /json/im;
        const strArr = fpath.split('.');
        const getLast = () => {
            return strArr[strArr.length - 1];
        };
        if (!regex.test(getLast())) {
            reject(new std_lib_1.ERROR(`An error occurred while attempting to locate a file.`, {
                type: 'INVALID FILEPATH',
                funcLoc: 'parseJSONFile(fpath, verbose)',
                problem: `Filepath: "${fpath}", is not a valid JSON document.`,
                solution: 'You can only parse JSON documents using that method.'
            }));
        }
        (0, fs_1.readFile)(fpath, (e, data) => {
            if (e) {
                reject(reject(new std_lib_1.ERROR(`An error occurred while attempting to read a file.`, {
                    type: 'FILE READ ERROR',
                    funcLoc: 'parseJSONFile(fpath, verbose)',
                    problem: `Filepath: "${fpath}", is not a valid JSON document.`,
                    solution: 'Check that the document being read exists, and that the document contains what you would expect it to. Most importantly, make sure that the permissions on the file are correctly set, and that the file isn\'t corrupted.'
                })));
            }
            try {
                const json = JSON.parse(data.toString());
                if (verbose)
                    console.log(json);
                resolve(json);
            }
            catch (e) {
                if (e) {
                    reject(new std_lib_1.ERROR(`An error occurred while attempting to read a file.`, {
                        type: 'FILE READ ERROR',
                        funcLoc: 'parseJSONFile(fpath, verbose)',
                        problem: 'The native JSON parser encountered an ERROR',
                        solution: 'One option would be to try and parse the file in a sandbox environment using nodes JSON.parse() function, since that method is what threw the error. If you can get JSON.parse to parse the document, that should resolve the error your receiving when you parse your file using ViCE.'
                    }));
                }
            }
        });
    });
}
exports.parseJSONFile = parseJSONFile;
