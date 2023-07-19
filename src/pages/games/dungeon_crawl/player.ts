import { Point } from '../../../common/entities';
import { Keyboard } from '../../../common/io';
import { Env } from '../../../common/module';
import { DungeonMap } from './map';
import { TilesE } from './tiles';

export class Player {
  tiles: TilesE;
  centre: Point;
  position: Point;
  prevMove: number;

  static create(tiles: TilesE, x = 0, y = 0, centre: Point) {
    return new Player(tiles, x, y, centre);
  }

  constructor(tiles: TilesE, x: number, y: number, centre: Point) {
    this.tiles = tiles;
    this.centre = centre;
    this.position = Point.create(x, y);
    this.prevMove = 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.tiles.isReady()) {
      this.tiles.renderPlayer(ctx, this.centre);
    }
  }

  update(map: DungeonMap, env: Env) {
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
    let point = Point.from({ x: 0, y: 0 });
    if (keyboard.pressed(Keyboard.keys.ArrowLeft)) {
      point.left();
    }
    if (keyboard.pressed(Keyboard.keys.ArrowRight)) {
      point.right();
    }
    if (keyboard.pressed(Keyboard.keys.ArrowUp)) {
      point.up();
    }
    if (keyboard.pressed(Keyboard.keys.ArrowDown)) {
      point.down();
    }
    return point
  }
}
