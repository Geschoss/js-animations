import { Keyboard } from 'src/entities/engine/io/keyboard';
import { Point } from '../../../entities/engine/2d/entities';
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

  update(map: DungeonMap, keyboard: Keyboard) {
    let now = new Date().getTime();

    if (now - this.prevMove > 50) {
      this.prevMove = now;
      let delta = this.move(keyboard);
      let new_position = this.position.add(delta);
      if (map.can_enter_tile(new_position)) {
        this.position = new_position;
        // camera.on_player_move(new_position, env);
      }
    }
  }

  move(keyboard: Keyboard): Point {
    let point = Point.from({ x: 0, y: 0 });
    if (keyboard.pressed('ArrowLeft')) {
      point.left();
    }
    if (keyboard.pressed('ArrowRight')) {
      point.right();
    }
    if (keyboard.pressed('ArrowUp')) {
      point.up();
    }
    if (keyboard.pressed('ArrowDown')) {
      point.down();
    }
    return point;
  }
}
