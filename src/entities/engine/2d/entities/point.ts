export class Point {
  x: number;
  y: number;

  static create(x = 0, y = 0) {
    return new Point(x, y);
  }
  static from({ x, y }: { x: number; y: number }) {
    return new Point(x, y);
  }
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Point) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  left() {
    this.x -=1;
  }
  right() {
    this.x +=1;
  }
  up() {
    this.y -=1;
  }
  down() {
    this.y +=1;
  }
}
