/**
 * creates an array of length n and fills it with the result of execution cb
 */
export function initByCb<T extends (...args: any) => any>(
  n: number,
  cb: T
): ReturnType<T>[] {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(cb(i, n));
  }
  return result;
}

/**
 * creates an array of length n and fills it with elements of type elem
 */
export function init<T>(n: number, elem: T): T[] {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(elem);
  }
  return result;
}
