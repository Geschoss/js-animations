import { init } from 'src/shared/lib/array';

import { Point } from '../../../entities/engine/2d/entities';
import { Player } from './player';
import { TilesE } from './tiles';

type Env = {
  tile_dimensions: {
    x: number;
    y: number;
  };
};

export enum TileType {
  Wall,
  Floor,
}

export class DungeonMap {
  tiles: TilesE;
  sectors: TileType[];
  width = 0;
  height = 0;

  static create(tiles: TilesE, width: number, height: number) {
    let sectors = init(width * height, TileType.Floor);
    return new DungeonMap(tiles, sectors, width, height);
  }

  constructor(tiles: TilesE, sectors: TileType[], width, height) {
    this.tiles = tiles;
    this.width = width;
    this.sectors = sectors;
    this.height = height;
  }

  render(ctx: CanvasRenderingContext2D, player: Player, env: Env) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let idx = this.idx(x, y);
        let tile = this.sectors[idx];
        let x_pos =
          player.centre.x + (x - player.position.x) * env.tile_dimensions.x;
        let y_pos =
          player.centre.y + (y - player.position.y) * env.tile_dimensions.y;

        switch (tile) {
          case TileType.Floor:
            this.tiles.renderFloor(ctx, Point.from({ x: x_pos, y: y_pos }));
            break;
          case TileType.Wall:
            // this.tiles.renderWall(ctx, Point.from({ x: x_pos, y: y_pos }));
            break;

          default:
            break;
        }
      }
    }
  }

  can_enter_tile(point: Point) {
    return (
      this.in_bounds(point) &&
      this.sectors[this.idx(point.x, point.y)] === TileType.Floor
    );
  }
  in_bounds(p: Point) {
    return (
      p.x >= 0 && p.x < this.width - 1 && p.y >= 0 && p.y < this.height - 1
    );
  }

  try_idx(p: Point) {
    if (this.in_bounds(p)) {
      return this.idx(p.x, p.y);
    }
    return undefined;
  }

  idx(x: number, y: number) {
    return y * this.width + x;
  }
}
