import { Rect } from '../../../common/entities';
import { Keyboard } from '../../../common/io';
import { Pipe } from './pipe';

export class Bird {
  rect: Rect;
  velocity: number;
  keyboard: Keyboard;

  constructor() {
    this.rect = Rect.create({
      x: 150,
      y: 350,
      width: 50,
      height: 50,
      color: '#00ff00',
    });
    this.velocity = 0;
  }
  render(ctx: CanvasRenderingContext2D) {
    this.rect.render(ctx);
  }

  think() {
    this.rect.y += this.velocity;
    if (this.velocity < 6) {
      this.velocity += 0.2;
    }
  }

  collision(pipes: Pipe[], screen: Rect) {
    this.rect.color = '#00ff00';
    if (
      screen.y > this.rect.y ||
      screen.bottom < this.rect.y + this.rect.width
    ) {
      return true;
    }
    return pipes.some((pipe) => pipe.collision(this.rect));
  }
}
