export class Color {
  static colorToRGB(color: number | string, alpha: number = 1) {
    //number in octal format or string prefixed with #
    let c: number = 0;
    if (typeof color === 'string' && color[0] === '#') {
      c = parseInt(color.slice(1), 16);
    }
    //parse hex values
    var r = (c >> 16) & 0xff,
      g = (c >> 8) & 0xff,
      b = c & 0xff,
      // eslint-disable-next-line sonarjs/no-nested-conditional
      a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
    //only use 'rgba' if needed
    if (a === 1) {
      return `rgb(${r},${g},${b})`;
    } else {
      return `rgb(${r},${g},${b},${a})`;
    }
  }

  static parse(color: string | number): string;
  static parse(color: string | number, toNumber: false): string;
  static parse(color: string | number, toNumber: true): number;
  static parse(color: any, toNumber: any = false): any {
    if (toNumber === true) {
      if (typeof color === 'number') {
        return color | 0; //chop off decimal
      }
      if (typeof color === 'string' && color[0] === '#') {
        color = color.slice(1);
      }
      return parseInt(color, 16);
    } else {
      if (typeof color === 'number') {
        color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
      }
      return color;
    }
  }
}
