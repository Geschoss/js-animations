import { Ball } from './ball';
import { Engine2D } from 'src/entities/engine/2d/engine';

export class Pidor {
  static id = 'Pidor';

  balls: Ball[];
  player: Ball;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();

    this.balls = makeP_dor_Text().map((ball) => {
      ball.set(100 + Math.random() * 500, 100 + Math.random() * 400);
      return ball;
    });
    this.player = new Ball(100, 100, 20, '#eebe0a');

    let physics = {
      friction: friction(0.8),
      spring: spring(0.007),
    };
    this.game2D.tick((ctx, mouse) => {
      this.player.set(mouse.x, mouse.y);
      this.player.render(ctx);
      this.balls.forEach((ball) => {
        ball.think(this.player, physics);
        ball.render(ctx);
      });
    });
  }
  destroy() {
    this.game2D.destroy();

    this.balls = undefined;
    this.game2D = undefined;
    this.player = undefined;
  }
}

const textColor = '#ff0000';
const textSize = 2;
const c = (x, y, color = textColor) => new Ball(x, y, textSize, color);
const lineCount = 20;
function makeP_dor_Text() {
  return [
    ...makeT(),
    ...makeЫ(),
    ...makeP(),
    ...makeИ(),
    ...makeD(),
    ...makeO(),
    ...makeR(),
  ];
}

function makeT() {
  return [
    ...line(200, 250, lineCount, (n) => c(n, 100)),
    ...line(100, 150, lineCount, (n) => c(225, n)),
  ];
}

function makeЫ() {
  return [
    ...line(100, 150, lineCount, (n) => c(270, n)),
    ...half_cicle(270, 135, lineCount),
    ...line(100, 150, lineCount, (n) => c(310, n)),
  ];
}

function makeP() {
  return [
    ...line(170, 220, lineCount, (n) => c(150, n)),
    ...line(150, 170, lineCount, (n) => c(n, 170)),
    ...line(170, 220, lineCount, (n) => c(170, n)),
  ];
}

function makeИ() {
  return [
    ...line(170, 220, lineCount, (n) => c(190, n)),
    ...diagonal(190, 220, lineCount),
    ...line(170, 220, lineCount, (n) => c(230, n)),
  ];
}

function makeD() {
  return [
    ...line(170, 220, lineCount, (n) => c(260, n)),
    ...half_cicle(260, 195, lineCount, 25),
  ];
}

function makeO() {
  return [
    ...half_cicle(325, 185, lineCount, 15, 1),
    ...line(180, 210, lineCount, (n) => c(310, n)),
    ...line(180, 210, lineCount, (n) => c(340, n)),
    ...half_cicle(325, 205, lineCount, 15, 2),
  ];
}

function makeR() {
  return [
    ...line(170, 220, lineCount, (n) => c(370, n)),
    ...half_cicle(370, 185, lineCount, 15, 1.5),
  ];
}

function half_cicle(x, y, n, r = 15, a = 1.5) {
  let result = [];
  for (var i = 0; i <= n; i++) {
    result.push(
      c(
        x + r * Math.cos((Math.PI * i) / n + Math.PI * a),
        y + r * Math.sin((Math.PI * i) / n + Math.PI * a)
      )
    );
  }
  return result;
}

function diagonal(x, y, count) {
  let result = [];
  for (var i = 0; i < count; i++) {
    result.push(c(x + 2 * i, y - 2.5 * i));
  }
  return result;
}

function line(s, e, n, cb) {
  let distance = e - s;
  let range = Math.trunc(distance / (n - 1));
  let result = [];
  for (let i = s; i <= e; i += range) {
    result.push(cb(i));
  }
  return result;
}

function spring(factor) {
  return {
    vx(x_1, x_2) {
      let dxs = -(x_1 - x_2);
      return dxs * factor;
    },
    vy(y_1, y_2) {
      let dys = -(y_1 - y_2);
      return dys * factor;
    },
  };
}

function friction(factor) {
  return {
    vx() {
      return factor;
    },
    vy() {
      return factor;
    },
  };
}
