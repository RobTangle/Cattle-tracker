// IS STRING:
export function isString(argumento: any): boolean {
  if (typeof argumento !== "string") {
    return false;
  }
  return true;
}

// IS STRING X CHARS LONG:
export function isStringXCharsLong(x: number, argument: any): boolean {
  let error = `The argument "x" must be a positive number.`;
  if (!x || typeof x !== "number" || x < 1) {
    throw new Error(error);
  }
  if (argument && typeof argument === "string" && argument.length === x) {
    return true;
  } else {
    return false;
  }
}

// IS VALID STRING:
export function isValidString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length > 0) {
    return true;
  } else {
    return false;
  }
}

// IS EMPTY STRING:
export function isEmptyString(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 0) {
    return true;
  } else {
    return false;
  }
}

// funcion auxiliar para chequear strings y su largo
export function isStringBetween1And101CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= 100
  ) {
    return true;
  }
  return false;
}

// IS STRING BETWEEN 1 AND 50 CHARACTERS LONG:
export function isStringBetween1And50CharsLong(argumento: any): boolean {
  if (
    typeof argumento === "string" &&
    argumento.length > 0 &&
    argumento.length <= 50
  ) {
    return true;
  } else {
    return false;
  }
}

// IS STRING BETWEEN 1 AND X CHARACTERS LONG:
export function isStringBetween1AndXCharsLong(
  x: number,
  argumento: any
): boolean {
  let error = `The argument "x" must be a positive number`;
  if (!x || typeof x !== "number" || x < 1) {
    throw new Error(error);
  }
  let maxCharsLong = x;
  if (
    typeof argumento === "string" &&
    argumento.length >= 1 &&
    argumento.length <= maxCharsLong
  ) {
    return true;
  } else {
    return false;
  }
}

// IS FALSY ARGUMENT
export function isFalsyArgument(argumento: any): boolean {
  if (!argumento) {
    return true;
  } else {
    return false;
  }
}

// is UNDEFINEDorNULL:
export function isUndefinedOrNull(argumento: any): boolean {
  if (argumento === undefined || argumento === null) {
    return true;
  }
  return false;
}

// IS VALID ID:
export function isValidSenasaId(argumento: any): boolean {
  if (typeof argumento === "string" && argumento.length === 16) {
    return true;
  }
  return false;
}

//IS TYPE OF NUMBER:
export function isTypeofNumber(argumento: any): boolean {
  if (typeof argumento === "number") {
    return true;
  } else {
    return false;
  }
}
