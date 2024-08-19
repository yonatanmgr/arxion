const diacritics: { [key: string]: string[] } = {
  "\\b": ["\u0332", "\u005F"],
  "\\c": ["\u0327", "\u00B8"],
  "\\d": ["\u0323", "\u200B \u0323"],
  "\\H": ["\u030B", "\u02DD"],
  "\\k": ["\u0328", "\u02DB"],
  "\\r": ["\u030A", "\u02DA"],
  "\\t": ["\u0361", "\u200B \u0361"],
  "\\u": ["\u0306", "\u02D8"],
  "\\v": ["\u030C", "\u02C7"],
  '\\"': ["\u0308", "\u00A8"],
  "\\~": ["\u0303", "\u007E"],
  "\\^": ["\u0302", "\u005E"],
  "\\`": ["\u0300", "\u0060"],
  "\\'": ["\u0301", "\u00B4"],
  "\\=": ["\u0304", "\u00AF"],
  "\\.": ["\u0307", "\u02D9"],
};

const latexToUnicodeMap: { [key: string]: string } = {
  '\\"a': "ä",
  '\\"o': "ö",
  '\\"u': "ü",
  '\\"A': "Ä",
  '\\"O': "Ö",
  '\\"U': "Ü",
  "\\'a": "á",
  "\\'e": "é",
  "\\'i": "í",
  "\\'o": "ó",
  "\\'u": "ú",
  "\\'A": "Á",
  "\\'E": "É",
  "\\'I": "Í",
  "\\'O": "Ó",
  "\\'U": "Ú",
  "\\`a": "à",
  "\\`e": "è",
  "\\`i": "ì",
  "\\`o": "ò",
  "\\`u": "ù",
  "\\`A": "À",
  "\\`E": "È",
  "\\`I": "Ì",
  "\\`O": "Ò",
  "\\`U": "Ù",
  "\\^a": "â",
  "\\^e": "ê",
  "\\^i": "î",
  "\\^o": "ô",
  "\\^u": "û",
  "\\^A": "Â",
  "\\^E": "Ê",
  "\\^I": "Î",
  "\\^O": "Ô",
  "\\^U": "Û",
  "\\~n": "ñ",
  "\\~N": "Ñ",
  "\\{c}": "ç",
  "\\{C}": "Ç",
  "\\ss": "ß",
  '\\"s': "ẞ",
};

/**
 * Converts a string of LaTeX to Unicode.
 * @param str - The string to convert.
 * @returns The converted string.
 */
export const convertLatexToUnicode = (str: string): string => {
  let string = str;
  // determine if the string contains stuff like Erd{\"o}s or stuff like Er\"{o}s
  string.replaceAll(/\\{.*?}/g, (match) => {
    const key = match.slice(2, -1);
    if (latexToUnicodeMap[key]) {
      string = string.replaceAll(match, latexToUnicodeMap[key]);
    }
    return match;
  });

  // if there are diacritics, add them
  string.replaceAll(/\\[bcdHkrtuv"~^`=]/g, (match) => {
    const key = match.slice(1);
    if (diacritics[key]) {
      string = string.replaceAll(
        match,
        diacritics[key][0] + diacritics[key][1],
      );
    }
    return match;
  });
  return string;
};
