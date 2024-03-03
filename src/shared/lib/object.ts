export function keys<T extends object>(o: T) {
  return Object.keys(o);
}

export function values<T extends object>(o: T) {
  return Object.values(o);
}

export function hasOwn(o: object, v: PropertyKey): boolean {
  return Object.hasOwn(o, v);
}
