export const SITEMAP_ALPHABET = [
  "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å",
];

export function groupAlphabetically<T>(items: T[], getName: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const letter of SITEMAP_ALPHABET) groups.set(letter, []);

  for (const item of items) {
    const firstChar = getName(item).charAt(0).toUpperCase();
    if (/[A-ZÆØÅ]/.test(firstChar)) {
      const bucket = groups.get(firstChar);
      if (bucket) bucket.push(item);
      else groups.get("#")!.push(item);
    } else {
      groups.get("#")!.push(item);
    }
  }

  return SITEMAP_ALPHABET
    .filter((letter) => (groups.get(letter)?.length ?? 0) > 0)
    .map((letter) => ({ letter, items: groups.get(letter)! }));
}
