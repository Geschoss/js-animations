export interface Behavior<T> {
  dx: number;
  dy: number;
  think(entity: T): void;
}

export class LinearMove<T extends { y: number; x: number }>
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

export class None<T> implements Behavior<T> {
  dx: number = 0;
  dy: number = 0;
  think() {}
}
