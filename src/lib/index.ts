export function isNil(x: any): x is null | undefined {
  return x == null || x == undefined;
}

export function keys<T extends object>(obj: T) {
  return Object.keys(obj);
}

export function values<T extends object>(obj: T) {
  return Object.values(obj);
}

export function range<T extends (...args: any) => any>(
  count: number,
  cb: T
): ReturnType<T>[] {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(cb(i, count));
  }
  return result;
}
