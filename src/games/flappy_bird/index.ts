// import { LinearMove } from '../../common/behaviors';
import { Rect } from '../../common/entities/index';
import { Keyboard, KeyboardInjector } from '../../common/io';
import { Env, Module } from '../../common/module';
import { Bird } from './bird';
import { Pipe } from './pipe';

type State = {
  type: 'dead' | 'play' | 'init';
  bird: Bird;
  screen: Rect;
  pipes: Pipe[];
  score: number;
};

let game: State = {
  type: 'init',
  bird: null,
  screen: null,
  pipes: [],
  score: 0,
};
export const flappyBirdModule: Module = {
  settings: {
    name: 'Flappy_Bird',
    injectors: [KeyboardInjector],
  },
  init(_, env) {
    game.screen = createScreen(env);
  },
  render(ctx, env) {
    game.screen.render(ctx);
    switch (game.type) {
      case 'init':
        init(game, env, ctx);
        break;

      case 'play':
        play(game, env, ctx);
        break;

      case 'dead':
        dead(game, env, ctx);
        break;

      default:
        break;
    }
  },
  destroy() {
    game = {
      type: 'init',
      bird: null,
      screen: null,
      pipes: [],
      score: 0,
    };
  },
};

function init(game: State, env: Env, ctx: CanvasRenderingContext2D) {
  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
  if (env.injectors.keyboard.pressed(Keyboard.keys.Enter)) {
    game.type = 'play';
    game.bird = new Bird();
    game.pipes = Pipe.create(game.screen);
    game.score = 0;
  }
}

function play(game: State, env: Env, ctx: CanvasRenderingContext2D) {
  renderScore(game, env, ctx);
  if (env.injectors.keyboard.pressed(Keyboard.keys.Space)) {
    game.bird.velocity = -6;
  }
  game.bird.think();

  if (game.bird.collision(game.pipes, game.screen)) {
    game.type = 'dead';
    return;
  }

  game.bird.render(ctx);
  game.pipes.forEach((pipe) => {
    pipe.think();
    pipe.render(ctx);
  });
  if (Pipe.move(game.pipes, game.screen, game.score)) {
    game.score += 1;
  }
}

function dead(game: State, env: Env, ctx: CanvasRenderingContext2D) {
  renderScore(game, env, ctx);
  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`You are dead`, env.width / 2 - 100, env.height / 2 - 30);
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
  if (env.injectors.keyboard.pressed(Keyboard.keys.Enter)) {
    game.type = 'play';
    game.bird = new Bird();
    game.pipes = Pipe.create(game.screen);
    game.score = 0;
  }
}

function createScreen(env: Env) {
  let w_padding = (env.width * 5) / 100;
  let h_padding = (env.height * 10) / 100;
  return new Rect(
    w_padding,
    h_padding,
    env.width - 2 * w_padding,
    env.height - 2 * h_padding,
    '#0000ff'
  );
}
function renderScore(game: State, env: Env, ctx: CanvasRenderingContext2D) {
  ctx.font = '35px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`Score: ${game.score}`, env.width / 2 - 70, 150);
}
