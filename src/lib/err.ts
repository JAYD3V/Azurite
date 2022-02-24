export class Err {
    type: string;
    #stack: string;
    constructor(message, type:string) {
      this.type = type;
      this.#stack = new Error().stack;
      console.log(this.#stack);
    }

    #genErrMsg(msg:string):string {
      return `\nA ${this.type} has occurred,\n ${msg}\n\n${this.#stack}`;
    }
}
