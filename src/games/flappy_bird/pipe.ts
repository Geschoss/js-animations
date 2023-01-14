import { Behavior, LinearMove } from '../../common/behaviors/index';
import { Rect } from '../../common/entities/index';

export class Pipe {
  static GAP = 200;
  static WIDTH = 50;
  static MIN_HEIGHT = 10;
  static DISTANCE_BEETWEN = 290;
  static SPEED = -4;

  top: Rect;
  bottom: Rect;
  x: number;
  y: number;
  behavior: Behavior<Pipe>;

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.behavior = new LinearMove(Pipe.SPEED);

    this.top = Rect.create({
      x: x,
      y: y,
      width: Pipe.WIDTH,
      height:
        Pipe.MIN_HEIGHT +
        Math.random() * (height - (Pipe.GAP + Pipe.MIN_HEIGHT)),
    });
    this.bottom = Rect.create({
      x: this.top.x,
      y: this.top.bottom + Pipe.GAP,
      width: Pipe.WIDTH,
      height: height - this.top.height - Pipe.GAP,
    });
  }

  think() {
    this.behavior.think(this);
    this.top.x = this.x;
    this.bottom.x = this.x;
  }
  render(ctx: CanvasRenderingContext2D) {
    this.top.render(ctx);
    this.bottom.render(ctx);
  }
  collision(bird: Rect) {
    /*
       bird 
      A*--*B
       |  |
      C*--*D 
      
       pipe
    x,y|   |
       |___|
     TPA     TPB

     TPC ___ TPD
        |   |
    */
    let A = { x: bird.x, y: bird.y };
    let B = { x: bird.x + bird.width, y: bird.y };
    let C = { x: bird.x, y: bird.y + bird.height };
    let D = { x: bird.x + bird.width, y: bird.y + bird.height };
    let TPA = { x: this.top.x, y: this.top.y + this.top.height };
    let TPB = { x: this.top.x + Pipe.WIDTH, y: this.top.y + this.top.height };
    let TPC = { x: this.bottom.x, y: this.bottom.y };
    let TPD = { x: this.bottom.x + Pipe.WIDTH, y: this.bottom.y };

    if (B.x < this.x) {
      return false;
    }
    if (this.x + Pipe.WIDTH < bird.x) {
      return false;
    }

    if (beetwen(TPA.x, B.x, TPB.x) && beetwen(this.y, B.y, TPA.y)) {
      return true;
    }
    if (beetwen(TPA.x, A.x, TPB.x) && beetwen(this.y, A.y, TPA.y)) {
      return true;
    }

    if (beetwen(TPC.x, D.x, TPD.x) && TPC.y < D.y) {
      return true;
    }

    if (beetwen(TPC.x, C.x, TPD.x) && TPC.y < C.y) {
      return true;
    }

    return false;
  }

  static create(screen: Rect) {
    let result = [];
    let x_position = screen.width;
    let y_position = screen.y;
    let screen_height = screen.height;

    let max_pipe = screen.width / (Pipe.WIDTH + Pipe.DISTANCE_BEETWEN) + 1;
    for (let i = 0; i < max_pipe; i++) {
      result.push(new Pipe(x_position, y_position, screen_height));
      x_position += Pipe.WIDTH + Pipe.DISTANCE_BEETWEN;
    }

    return result;
  }

  static move(pipes: Pipe[], screen: Rect) {
    let first = pipes[0];
    let last = pipes[pipes.length - 1];

    let x_min = screen.x - Pipe.WIDTH;

    if (first.x < x_min) {
      pipes.shift();
      let y_position = screen.y;
      let screen_height = screen.height;

      pipes.push(
        new Pipe(
          last.x + Pipe.WIDTH + Pipe.DISTANCE_BEETWEN,
          y_position,
          screen_height
        )
      );
    }
  }
}

function beetwen(r1, v, r2) {
  return r1 < v && v < r2;
}
