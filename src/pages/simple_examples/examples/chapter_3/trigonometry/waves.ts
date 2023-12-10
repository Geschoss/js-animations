import { Engine2D } from 'src/entities/engine/2d/engine';
import { Ball } from './ball';

export class Waves {
  static id = 'Waves';
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;
    let radius = 40;
    let angle = 0;
    let ball_1 = new Ball(env.width / 2, env.height / 2, radius, '#ffee00');
    let ball_2 = new Ball(env.width / 2, env.height / 2, radius, '#00ff00');
    let ball_3 = new Ball(env.width / 2, env.height / 2, radius, '#0000ff');
    let ball_4 = new Ball(env.width / 2, env.height / 2, radius, '#f0f0f0');
    let ball_5 = new Ball(env.width / 2, env.height / 2, radius);

    this.game2D.tick((ctx) => {
      angle += 0.03;
      let half_x = env.width / 2;
      let half_y = env.height / 2;
      ball_1.x = half_x + Math.sin(angle * 0.2) * (half_x - radius);

      ball_2.y = half_y + Math.sin(angle * 0.3) * (half_y - radius);

      ball_3.y = half_y + Math.sin(angle * 0.4) * (half_y - radius);
      ball_3.x = half_x + Math.sin(angle) * (half_x - radius);

      ball_4.y = half_y + Math.sin(angle * 0.5) * (half_y - radius);
      ball_4.x = half_x + Math.cos(angle * 0.2) * (half_x - radius);

      ball_5.x = half_x + Math.sin(angle * 2) * (half_x - radius);

      ball_1.render(ctx);
      ball_2.render(ctx);
      ball_3.render(ctx);
      ball_4.render(ctx);
      ball_5.render(ctx);
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}
