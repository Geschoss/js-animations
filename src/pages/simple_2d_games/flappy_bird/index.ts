import { Keyboard } from '@/entities/engine/io/keyboard';
import { Rect } from '../../../entities/engine/2d/entities/index';
import { Bird } from './bird';
import { Pipe } from './pipe';
import { Engine2D, Env } from '@/entities/engine/2d/engine';

type State = {
  type: 'dead' | 'play' | 'init';
  bird: Bird;
  screen: Rect;
  pipes: Pipe[];
  score: number;
};

export class FlappyBird {
  static id = 'FlappyBird';

  state: State;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;

    this.state = {
      type: 'init',
      bird: null,
      screen: createScreen(env),
      pipes: [],
      score: 0,
    };

    this.game2D.tick((ctx, _, keyboard) => {
      this.state.screen.render(ctx);

      switch (this.state.type) {
        case 'init':
          init(this.state, env, ctx, keyboard);
          break;

        case 'play':
          play(this.state, env, ctx, keyboard);
          break;

        case 'dead':
          dead(this.state, env, ctx, keyboard);
          break;

        default:
          break;
      }
    });
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}

function init(
  game: State,
  env: Env,
  ctx: CanvasRenderingContext2D,
  keyboard: Keyboard
) {
  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
  if (keyboard.pressed('Enter')) {
    game.type = 'play';
    game.bird = new Bird();
    game.pipes = Pipe.create(game.screen);
    game.score = 0;
  }
}

function play(
  game: State,
  env: Env,
  ctx: CanvasRenderingContext2D,
  keyboard: Keyboard
) {
  renderScore(game, env, ctx);
  if (keyboard.pressed('Space')) {
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

function dead(
  game: State,
  env: Env,
  ctx: CanvasRenderingContext2D,
  keyboard: Keyboard
) {
  renderScore(game, env, ctx);
  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`You are dead`, env.width / 2 - 100, env.height / 2 - 30);
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
  if (keyboard.pressed('Enter')) {
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
