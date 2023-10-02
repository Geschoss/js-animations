import { Engine2D } from '@/entities/engine/2d/engine';
import { Ball } from './ball';

export class Circle {
  static name = 'Circle';
  game2D: Engine2D;

  ball: Ball;
  ball_oval: Ball;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;
    this.ball = new Ball(200, 200, 40, '#11bbff');
    this.ball_oval = new Ball(200, 200, 20, '#00ffff');
    let centerX = env.width / 2;
    let centerY = env.height / 2;
    let angle = 0;
    let radius = 100;
    let speed = 0.02;

    this.game2D.tick((ctx) => {
      angle += speed;
      this.ball.x = centerX + Math.sin(angle) * radius;
      this.ball.y = centerY + Math.cos(angle) * radius;

      this.ball_oval.x = this.ball.x + Math.sin(angle * 2) * 100;
      this.ball_oval.y = this.ball.y + Math.cos(angle * 2) * 40;

      let dy = this.ball.y - this.ball_oval.y;

      if (dy > 0) {
        this.ball_oval.render(ctx);
        this.ball.render(ctx);
      } else {
        this.ball.render(ctx);
        this.ball_oval.render(ctx);
      }
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}
