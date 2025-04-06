import { Engine2D, Env } from 'src/entities/engine/2d/engine';
import {
  AssetsLoader,
  AudioAsset,
  ImageAsset,
} from 'src/entities/engine/assets';
import { Keyboard } from 'src/entities/engine/io/keyboard';
import { Background } from 'src/pages/simple_2d_games/flappy_bird/background';
import { Floor } from 'src/pages/simple_2d_games/flappy_bird/floor';
import { Score } from 'src/pages/simple_2d_games/flappy_bird/score';

import background_day_png from './assets/background-day.png';
import base_png from './assets/base.png';
import bluebird_downflap_png from './assets/bluebird-downflap.png';
import bluebird_midflap_png from './assets/bluebird-midflap.png';
import bluebird_upflap_png from './assets/bluebird-upflap.png';
import die_wav from './assets/hit.wav';
import pipe_green_png from './assets/pipe-green.png';
import point_wav from './assets/point.wav';
import wing_wav from './assets/wing.wav';
import { Bird } from './bird';
import { Plumbing } from './pipe';

type State = {
  type: 'dead' | 'play' | 'init';
  bird: Bird;
  floor: Floor;
  score: Score;
  plumbing: Plumbing;
  background: Background;
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
      new AudioAsset(wing_wav),
      new AudioAsset(die_wav),
      new AudioAsset(point_wav),
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
          wing_audio,
          die_audio,
          point_audio,
        ]) => {
          this.state.floor = new Floor(env, base);
          this.state.background = new Background(
            {
              width: env.width,
              height: env.height - this.state.floor.rect.height,
            },
            background_day
          );

          this.state.score = new Score();
          this.state.plumbing = new Plumbing(this.state.floor, env, pipe_green);
          this.state.bird = new Bird(
            env.height - this.state.floor.rect.height,
            wing_audio,
            {
              bluebird_downflap,
              bluebird_midflap,
              bluebird_upflap,
            }
          );

          const start_new_game = () => {
            this.state.background.reset();
            this.state.bird.reset();
            this.state.floor.reset();
            this.state.score.reset();
            this.state.plumbing.reset();

            this.state.type = 'play';
          };

          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          TEST && start_new_game();

          this.game2D.tick(({ context, keyboard }) => {
            switch (this.state.type) {
              case 'init':
                init(this.state, context.ctx, env);
                if (keyboard.pressed('Enter')) {
                  start_new_game();
                }
                break;

              case 'play':
                play(
                  this.state,
                  env,
                  context.ctx,
                  keyboard,
                  die_audio,
                  point_audio
                );
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

function init(game: State, ctx: CanvasRenderingContext2D, env: Env) {
  game.background.render(ctx);
  game.floor.render(ctx);

  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`ENTER to start`, env.width / 2 - 100, (env.height - 200) / 2);
  ctx.fillText(`SPACE to jump`, env.width / 2 - 100, (env.height - 100) / 2);
}

function play(
  game: State,
  env: Env,
  ctx: CanvasRenderingContext2D,
  keyboard: Keyboard,
  die_audio: AudioAsset,
  point_audio: AudioAsset
) {
  game.background.think();
  game.background.render(ctx);

  if (keyboard.pressed('Space')) {
    game.bird.jump();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  !TEST && game.bird.think();
  game.bird.render(ctx);

  if (!TEST) {
    if (game.plumbing.collision(game.bird)) {
      game.type = 'dead';
      die_audio.data.play();
      return;
    }

    if (game.floor.collision(game.bird)) {
      game.type = 'dead';
      die_audio.data.play();
      return;
    }
  }
  game.floor.think();
  game.floor.render(ctx);

  game.plumbing.think(game.score);
  game.plumbing.render(ctx);

  if (game.plumbing.isPassed(game.bird)) {
    if (!TEST) {
      point_audio.data.pause();
      point_audio.data.currentTime = 0;
      point_audio.data.play();
      game.score.increment();
    }
  }

  game.score.render(ctx, env);
}

function dead(game: State, env: Env, ctx: CanvasRenderingContext2D) {
  game.background.render(ctx);
  game.bird.render(ctx);
  game.floor.render(ctx);
  game.plumbing.render(ctx);
  game.score.render(ctx, env);

  ctx.font = '30px Arial';
  ctx.fillStyle = '#0000ff';
  ctx.fillText(`You are dead`, env.width / 2 - 100, env.height / 2 - 30);
  ctx.fillText(`Press ENTER to start`, env.width / 2 - 150, env.height / 2);
}
