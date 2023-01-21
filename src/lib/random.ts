export const Random = {
  coin<T>(a: T, b: T): T {
    return Math.random() > 0.5 ? a : b;
  },

  range(s: number, e: number) {
    return Math.trunc(s + Math.random() * (e - s));
  },
};
