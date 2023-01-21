import { Point } from '../../common/entities';
import { Keyboard } from '../../common/io';
import { Env } from '../../common/module';
import { Camera } from './camera';
import { DungeonMap } from './map';

export class Player {
  position: Point;
  centre: Point;
  prevMove: number;

  static create(x = 0, y = 0, centre: Point) {
    return new Player(x, y, centre);
  }

  constructor(x: number, y: number, centre: Point) {
    this.position = Point.create(x, y);
    this.centre = centre;
    this.prevMove = 0;
    console.log(x, y, centre);
  }

  render(ctx: CanvasRenderingContext2D, env: Env) {
    ctx.save();
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.rect(
      this.centre.x,
      this.centre.y,
      env.tile_dimensions.x || 16,
      env.tile_dimensions.y || 16
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update(map: DungeonMap, camera: Camera, env: Env) {
    let now = new Date().getTime();

    if (now - this.prevMove > 50) {
      this.prevMove = now;
      let delta = this.move(env.injectors.keyboard);
      let new_position = this.position.add(delta);
      if (map.can_enter_tile(new_position)) {
        this.position = new_position;
        // camera.on_player_move(new_position, env);
      }
    }
  }

  move(keyboard: Keyboard): Point {
    if (keyboard.pressed(Keyboard.keys.ArrowLeft)) {
      return Point.from({ x: -1, y: 0 });
    }
    if (keyboard.pressed(Keyboard.keys.ArrowRight)) {
      return Point.from({ x: 1, y: 0 });
    }
    if (keyboard.pressed(Keyboard.keys.ArrowUp)) {
      return Point.from({ x: 0, y: -1 });
    }
    if (keyboard.pressed(Keyboard.keys.ArrowDown)) {
      return Point.from({ x: 0, y: 1 });
    }
    return Point.from({ x: 0, y: 0 });
  }
}
