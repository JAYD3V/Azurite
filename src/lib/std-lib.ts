export function wrapText(str: string, len: number) {
  const regex = new RegExp(`(?![^\\n]{1,${len}}$)([^\\n]{1,${len}})\\s`, 'gi');
  return str.replace(regex, '$1\n');
}

export type ErrorMeta = {
  type: string;
  problem: string;
  solution?: string;
  objLoc?: string;
  funcLoc?: string;
  varLoc?: string;
  code?: number;
};

/**
   * @param message (req) "Message that will be used as the initial quo that an error occurred when the error logs itself in the running processes terminal."
   * @param meta (req) "Meta info that prints w/ the message in the console when the `print()` method is called, or when the `ERROR` is thrown"
   * @param meta.type (req) The type of error. (Example: FILE_READ_ERR, or HTTP500 INTERNAL SERVER ERROR)
   * @param meta.problem (req) "The issue that is occurring, or the reason that the error was thrown."
   * @param meta.solution (opt) "How can the error be fixed"
   * @param meta.objLoc (opt) "If the error was related to an object, reference that object using this property"
   * @param meta.funcLoc (opt) "If the error occurred inside of a function, or method, reference the function/method using this property"
   * @param meta.objLoc (opt) "If a variable is the cause of the error being thrown, use this parameter to let the user know which variable caused the error"
   * @param meta.code (opt) "A unique numeric value used to reference a specific error"
   * */
export class ERROR extends Error {
  #meta: ErrorMeta;

  constructor(
    message: string,
    meta: ErrorMeta = {
      type: 'ERROR',
      problem: 'An error has occurred!'
    }
  ) {
    super(message);
    this.#meta = meta;
    this.message = this.#addMetaToMessage();
  }

  #addMetaToMessage(): string {
    let str = '\n';

    str += this.#meta.type;

    this.#meta.problem.length > 70
      ? (str += wrapText('\n* REASON: ' + this.#meta.problem, 70))
      : (str += `\n* REASON: ${this.#meta.problem}`);

    if (this.#meta.solution) {
      this.#meta.solution.length > 70
        ? (str += wrapText('\n* FIX: ' + this.#meta.solution, 70))
        : (str += `\n* FIX: ${this.#meta.solution}`);
    }

    str += '\n';

    if (this.#meta.objLoc) str += `\n\tLOC (obj): ${this.#meta.objLoc}`;
    if (this.#meta.funcLoc) str += `\n\tLOC (func) ${this.#meta.funcLoc}`;
    if (this.#meta.varLoc) str += `\n\tLOC (var) ${this.#meta.varLoc}`;

    this.#meta.code
      ? (str += `\n\nErrCode: ${this.#meta.code}`)
      : (str += `\n\nErrCode: -1`);

    return str;
  }

  print(): void {
    console.error(this.message);
  }
}

export type ErrorType = ERROR | Error;
