import { Engine2D } from 'src/entities/engine/2d/engine';
import { Ball } from './ball';

export class Liner {
  static id = 'Liner';

  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;

    let settings_1 = {
      angle: 0,
      centrY: 200,
      range: 50,
      xspeed: 3,
      yspeed: 0.05,
    };

    let settings_2 = {
      angle: 0,
      centryScale: 1,
      range: 0.5,
      speed: 0.1,
    };

    let settings_3 = {
      angleX: 0,
      angleY: 0,
      range: 150,
      centerX: 0,
      centerY: 0,
      xspeed: 0.07,
      yspeed: 0.11,
    };

    let ball_1 = new Ball(0, 0);
    let ball_2 = new Ball(env.width / 2, env.height / 2, 30, '#00ff00');
    let ball_3 = new Ball(env.width / 2, env.height / 2, 30, '#0000ff');

    settings_3.centerX = env.width / 2;
    settings_3.centerY = env.height / 2;

    this.game2D.tick((ctx) => {
      settings_1.angle += settings_1.yspeed;
      ball_1.x += settings_1.xspeed;
      ball_1.y =
        settings_1.centrY / 2 + Math.sin(settings_1.angle) * settings_1.range;

      if (ball_1.x > env.width + ball_1.radius) {
        ball_1.x = -ball_1.radius;
        settings_1.range += 1;
      }

      ball_2.scaleX =
        settings_2.centryScale + Math.sin(settings_2.angle) * settings_2.range;
      ball_2.scaleY =
        settings_2.centryScale + Math.sin(settings_2.angle) * settings_2.range;

      settings_2.angle += settings_2.speed;

      ball_3.x =
        settings_3.centerX + Math.sin(settings_3.angleX) * settings_3.range;
      ball_3.y =
        settings_3.centerY + Math.sin(settings_3.angleY) * settings_3.range;
      settings_3.angleX += settings_3.xspeed;
      settings_3.angleY += settings_3.yspeed;
      settings_3.range += 0.01;

      ball_2.render(ctx);
      ball_1.render(ctx);
      ball_3.render(ctx);
    });
  }

  destroy() {
    this.game2D.destroy();
  }
}
