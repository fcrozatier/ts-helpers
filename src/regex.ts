const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;

export const regexEscape = (char: string) => {
  return char.replace(REGEX_SPECIAL_CHARS, "\\$&");
};
