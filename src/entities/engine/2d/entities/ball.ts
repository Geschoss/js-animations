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

  static create({
    x = 0,
    y = 0,
    radius = 10,
    color = '#ff6600',
    view = new BallView(),
    behavior = new None<Ball>(),
  }) {
    return new Ball(x, y, radius, color, behavior, view);
  }

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
}
