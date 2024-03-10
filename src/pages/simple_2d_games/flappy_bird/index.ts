import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import { AssetsLoader, ImageAsset } from 'src/entities/engine/assets';
import { Keyboard } from 'src/entities/engine/io/keyboard';
import { Floor } from 'src/pages/simple_2d_games/flappy_bird/floor';
import { Score } from 'src/pages/simple_2d_games/flappy_bird/score';

import background_day_png from './assets/background-day.png';
import base_png from './assets/base.png';
import bluebird_downflap_png from './assets/bluebird-downflap.png';
import bluebird_midflap_png from './assets/bluebird-midflap.png';
import bluebird_upflap_png from './assets/bluebird-upflap.png';
import pipe_green_png from './assets/pipe-green.png';
import { Bird } from './bird';
import { Plumbing } from './pipe';

type State = {
  type: 'dead' | 'play' | 'init';
  bird: Bird;
  floor: Floor;
  score: Score;
  plumbing: Plumbing;
};

const TEST = false;

export class FlappyBird {
  static id = 'flappy_bird';

  state: State;
  game2D: Engine2D;

  constructor() {
    this.game2D = new Engine2D();
    const env = this.game2D.env;

    const imageLoader = new AssetsLoader([
      new ImageAsset(bluebird_downflap_png),
      new ImageAsset(bluebird_midflap_png),
      new ImageAsset(bluebird_upflap_png),
      new ImageAsset(background_day_png),
      new ImageAsset(pipe_green_png),
      new ImageAsset(base_png),
    ]);

    this.state = {
      type: 'init',
      bird: null,
      floor: null,
      score: 0,
    };

    imageLoader
      .load()
      .then(
        ([
          bluebird_downflap,
          bluebird_midflap,
          bluebird_upflap,
          background_day,
          pipe_green,
          base,
        ]) => {
          this.state.floor = new Floor(env, base);
          this.state.score = new Score();
          this.state.plumbing = new Plumbing(this.state.floor, env, pipe_green);
          this.state.bird = new Bird(
            env.height - this.state.floor.rect.height,
            {
              bluebird_downflap,
              bluebird_midflap,
              bluebird_upflap,
            }
          );

          const start_new_game = () => {
            this.state.bird.reset();
            this.state.floor.reset();
            this.state.score.reset();
            this.state.plumbing.reset();

            this.state.type = 'play';
          };

          TEST && start_new_game();

          this.game2D.tick(({ context, keyboard }) => {
            switch (this.state.type) {
              case 'init':
                init(context.ctx, env);
                if (keyboard.pressed('Enter')) {
                  start_new_game();
                }
                break;

              case 'play':
                play(this.state, env, context.ctx, keyboard);
                break;

              case 'dead':
                dead(this.state, env, context.ctx);
                if (keyboard.pressed('Enter')) {
                  start_new_game();
                }
                break;

              default:
                break;
            }
          });
        }
      );
  }

  destroy() {
    this.game2D.destroy();

    this.game2D = undefined;
  }
}

function init(ctx: CanvasRenderingContext2D, env: Env) {
  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
}

function play(
  game: State,
  env: Env,
  ctx: CanvasRenderingContext2D,
  keyboard: Keyboard
) {
  if (keyboard.pressed('Space')) {
    game.bird.jump();
  }

  !TEST && game.bird.think();
  game.bird.render(ctx);

  if (!TEST) {
    if (game.plumbing.collision(game.bird)) {
      game.type = 'dead';
      return;
    }

    if (game.floor.collision(game.bird)) {
      game.type = 'dead';
      return;
    }
  }
  game.floor.think();
  game.floor.render(ctx);

  game.plumbing.think(game.score);
  game.plumbing.render(ctx);

  if (game.plumbing.isPassed(game.bird)) {
    !TEST && game.score.increment();
  }

  game.score.render(ctx, env);
}

function dead(game: State, env: Env, ctx: CanvasRenderingContext2D) {
  game.bird.render(ctx);
  game.floor.render(ctx);
  game.plumbing.render(ctx);
  game.score.render(ctx, env);

  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`You are dead`, env.width / 2 - 100, env.height / 2 - 30);
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
}
