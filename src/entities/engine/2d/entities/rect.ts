import { Behavior, None } from 'src/entities/engine/2d/behaviors';
import { BaseEntity, Point } from 'src/entities/engine/2d/entities';
import { RectView, View } from 'src/entities/engine/2d/view';

export class Rect_ {
  /// The X position of the first point (typically the left)
  x1: number;
  /// The X position of the second point (typically the right)
  x2: number;
  /// The Y position of the first point (typically the top)
  y1: number;
  /// The Y position of the second point (typically the bottom)
  y2: number;

  static create(x: number, y: number, w: number, h: number) {
    return new Rect_(x, y, x + w - 1, y + h - 1);
  }

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  intersect(other: Rect_) {
    return (
      this.x1 <= other.x2 &&
      this.x2 >= other.x1 &&
      this.y1 <= other.y2 &&
      this.y2 >= other.y1
    );
  }

  intersect_with_padding(other: Rect_, padding: number) {
    return (
      this.x1 - padding <= other.x2 &&
      this.x2 + padding >= other.x1 &&
      this.y1 - padding <= other.y2 &&
      this.y2 + padding >= other.y1
    );
  }

  for_each(cb: (p: Point) => void) {
    for (let x = this.x1; x <= this.x2; x++) {
      for (let y = this.y1; y <= this.y2; y++) {
        cb(Point.from({ x, y }));
      }
    }
  }

  center() {
    return new Point((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
  }

  center_trunc() {
    return new Point(
      Math.trunc((this.x1 + this.x2) / 2),
      Math.trunc((this.y1 + this.y2) / 2)
    );
  }

  center_floor() {
    return new Point(
      Math.floor((this.x1 + this.x2) / 2),
      Math.floor((this.y1 + this.y2) / 2)
    );
  }

  cut_by_window(w: number, h: number) {
    this.x1 = this.x1 < 1 ? 1 : this.x1;
    this.x2 = this.x2 > w ? w : this.x2;
    this.y1 = this.y1 < 1 ? 1 : this.y1;
    this.y2 = this.y2 > h ? h : this.y2;
  }
}

export class Rect implements BaseEntity {
  width: number;
  height: number;

  y: number;
  x: number;
  right: number;
  bottom: number;
  color: string;

  behavior: Behavior<Rect>;
  view: View<Rect>;

  static create({ x, y, width, height, color, view, behavior }: Partial<Rect>) {
    return new Rect(x, y, width, height, color, behavior, view);
  }
  constructor(
    x = 100,
    y = 100,

    width = 200,
    height = 200,
    color = '#ff0000',
    behavior: Behavior<Rect> = new None(),
    view: View<Rect> = new RectView()
  ) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.width = width;
    this.height = height;

    this.right = x + width;
    this.bottom = y + height;

    this.view = view;
    this.behavior = behavior;
  }

  think() {
    this.behavior.think(this);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.view.render(ctx, this);
  }
}
