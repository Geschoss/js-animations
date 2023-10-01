import { Engine2D } from '@/entities/engine/2d/engine';

type Point = {
  x: number;
  y: number;
};

export class Distance {
  name = 'Distance';

  game2D: Engine2D;

  rect_1: Point;
  rect_2: Point;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;

    this.rect_1 = {
      x: Math.random() * env.width,
      y: Math.random() * env.height,
    };
    this.rect_2 = {
      x: Math.random() * env.width,
      y: Math.random() * env.height,
    };
    this.game2D.tick((ctx, mouse) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(this.rect_1.x - 2, this.rect_1.y - 2, 4, 4);

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(this.rect_2.x - 2, this.rect_2.y - 2, 4, 4);

      ctx.font = '30px Arial';
      ctx.fillText(
        `points distance: ${calculateDistance(this.rect_1, this.rect_2)}`,
        10,
        100
      );
      ctx.fillText(
        `mouse distance: ${calculateDistance(mouse, this.rect_2)}`,
        10,
        130
      );

      // draw line
      ctx.beginPath();
      ctx.moveTo(this.rect_2.x, this.rect_2.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
    this.rect_1 = undefined;
    this.rect_2 = undefined;
  }
}

function calculateDistance(point_1: Point, point_2: Point) {
  let dx = point_1.x - point_2.x;
  let dy = point_1.y - point_2.y;
  return Math.sqrt(dx * dx + dy * dy).toFixed(2);
}
