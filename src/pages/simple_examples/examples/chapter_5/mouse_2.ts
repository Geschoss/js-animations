import { Engine2D } from '@/entities/engine/2d/engine';
import { Arraw } from './arraw';

export class Mouse1 {
  static id = 'mouse1';

  game2D: Engine2D;

  constructor() {
    let force = 0.05;
    let vx = 0;
    let vy = 0;
    this.game2D = new Engine2D();
    const env = this.game2D.env;

    let arraw = new Arraw(env.width / 2, env.height / 2);
    this.game2D.tick((ctx, mouse) => {
      let dx = mouse.x - arraw.x;
      let dy = mouse.y - arraw.y;
      let angle = Math.atan2(dy, dx);
      let ax = Math.cos(angle) * force;
      let ay = Math.sin(angle) * force;
      arraw.rotation = angle;
      vx += ax;
      vy += ay;
      arraw.x += vx;
      arraw.y += vy;
      arraw.draw(ctx);
    });
  }
  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}
