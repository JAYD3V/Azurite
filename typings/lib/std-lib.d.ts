export declare function wrapText(str: string, len: number): string;
export declare type ErrorMeta = {
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
export declare class ERROR extends Error {
    #private;
    constructor(message: string, meta?: ErrorMeta);
    print(): void;
}
export declare type ErrorType = ERROR | Error;
//# sourceMappingURL=std-lib.d.ts.map