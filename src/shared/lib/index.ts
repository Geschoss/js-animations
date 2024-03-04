export { initByCb } from 'src/shared/lib/array';
export { keys, values } from 'src/shared/lib/object';
export { r_coin, r_range } from 'src/shared/lib/random';

export function isNil(x: any): x is null | undefined {
  return x == null || x == undefined;
}
