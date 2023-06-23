export const REGEX: Record<string, RegExp | string> = {
  disallowedSpecialCharactersPattern: /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/,
  disallowedWhiteSpacePattern: /^\S+$/,
  pathPattern: /^[a-z-]+$/,
};
