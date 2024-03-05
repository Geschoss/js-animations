import { Behavior, None } from 'src/entities/engine/2d/behaviors';
import { BallView, View } from 'src/entities/engine/2d/view';

import { BaseEntity } from './base';

export class Ball implements BaseEntity {
  x: number;
  y: number;
  color: string;
  radius: number;
  behavior: Behavior<Ball>;
  view: View<Ball>;

  constructor(
    x = 0,
    y = 0,
    radius = 10,
    color = '#ff6600',
    behavior: Behavior<Ball> = new None<Ball>(),
    view: View<Ball> = new BallView()
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;

    this.view = view;
    this.behavior = behavior;
  }

  think() {
    this.behavior.think(this);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.view.render(ctx, this);
  }

  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    };
  }

  distansTo(x: number, y: number) {
    return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
  }

  isInside(x: number, y: number) {
    return this.radius >= this.distansTo(x, y);
  }
}
