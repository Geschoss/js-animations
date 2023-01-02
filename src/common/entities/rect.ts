import { Behavior, None } from '../behaviors/index';
import { RectView, View } from '../view/index';
import { BaseEntity } from './base';

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
