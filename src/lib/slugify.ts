export function slugify(input: string): string {
  const withoutDiacritics = input
    .normalize('NFD')
    .split('')
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0
      return code < 0x0300 || code > 0x036f
    })
    .join('')

  return withoutDiacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
