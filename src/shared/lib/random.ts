/**
 * flipp coin and get result a or b with 50%
 */
export function coin<T>(a: T, b: T): T {
  return Math.random() > 0.5 ? a : b;
}
/**
 * get random number beetwen s and e
 */
export function range(s: number, e: number) {
  return Math.trunc(s + Math.random() * (e - s));
}
