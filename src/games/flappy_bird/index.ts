// import { LinearMove } from '../../common/behaviors';
import { Rect } from '../../common/entities/index';
import { Env, Module } from '../../common/module';
import { Pipe } from './pipe';

type World = {
  bird: Rect;
  screen: Rect;
  pipes: Pipe[];
};
let world: World = {
  bird: null,
  screen: null,
  pipes: [],
};
export const flappyBirdModule: Module = {
  settings: {
    name: 'Flappy Bird',
  },
  init(_, env) {
    let screen = createScreen(env);
    let bird = createBird();
    let pipes = createPipes(screen);

    world = {
      bird,
      screen,
      pipes,
    };
  },
  render(ctx) {
    world.screen.render(ctx);
    world.bird.render(ctx);

    world.pipes.forEach((pipe) => {
      pipe.think();
      pipe.render(ctx);
    });

    movePipe(world);
  },
  destroy() {
    world = null;
  },
};

function createPipes(screen: Rect) {
  let result = [];
  let x_position = screen.width / 2;
  let y_position = screen.y;
  let screen_height = screen.height;

  let max_pipe = screen.width / (Pipe.WIDTH + Pipe.DISTANCE_BEETWEN) + 1;
  for (let i = 0; i < max_pipe; i++) {
    result.push(new Pipe(x_position, y_position, screen_height));
    x_position += Pipe.WIDTH + Pipe.DISTANCE_BEETWEN;
  }

  return result;
}

function movePipe(world: World) {
  let first = world.pipes[0];
  let last = world.pipes[world.pipes.length - 1];

  let x_min = world.screen.x - Pipe.WIDTH;

  if (first.x < x_min) {
    world.pipes.shift();
    let y_position = world.screen.y;
    let screen_height = world.screen.height;

    world.pipes.push(
      new Pipe(
        last.x + Pipe.WIDTH + Pipe.DISTANCE_BEETWEN,
        y_position,
        screen_height
      )
    );
  }
}

function createBird() {
  return Rect.create({
    x: 150,
    y: 350,
    width: 50,
    height: 50,
    color: '#00ff00',
  });
}
function createScreen(env: Env) {
  let w_padding = env.width * 5 / 100;
  let h_padding = env.height * 10 / 100;
  return new Rect(
    w_padding,
    h_padding,
    env.width - 2 * w_padding,
    env.height - 2 * h_padding,
    '#0000ff'
  );
}
