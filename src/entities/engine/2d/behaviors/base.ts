export interface Behavior<T> {
  think(entity: T): void;
}

export class LinearMove<T extends { y?: number; x?: number }>
  implements Behavior<T>
{
  dx: number;
  dy: number;
  constructor(dx = 0, dy = 0) {
    this.dx = dx;
    this.dy = dy;
  }
  think(entity: T) {
    entity.x += this.dx;
    entity.y += this.dy;
  }
}

export class Expand<T extends { y: number; x: number }> implements Behavior<T> {
  vy: number;
  vx: number;
  constructor(vx = 0.3, vy = 0.3) {
    this.vx = vx;
    this.vy = vy;
  }
  think(entity: T): void {
    entity.x += this.vx;
    entity.y += this.vy;
  }
}

export class None<T> implements Behavior<T> {
  think() {}
}
