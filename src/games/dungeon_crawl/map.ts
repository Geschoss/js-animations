import { Point } from '../../common/entities';
import { Env } from '../../common/module';
import { range } from '../../lib';
import { Player } from './player';

export enum TileType {
  Wall,
  Floor,
}

export class DungeonMap {
  tiles: TileType[];
  width = 0;
  height = 0;

  static create(width: number, height: number) {
    let tiles = range(width * height, () => TileType.Floor);
    return new DungeonMap(tiles, width, height);
  }

  constructor(tiles: TileType[], width, height) {
    this.width = width;
    this.tiles = tiles;
    this.height = height;
  }

  render(ctx: CanvasRenderingContext2D, player: Player, env: Env) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let idx = this.idx(x, y);
        let tile = this.tiles[idx];
        let x_pos =
          player.centre.x + (x - player.position.x) * env.tile_dimensions.x;
        let y_pos =
          player.centre.y + (y - player.position.y) * env.tile_dimensions.y;

        switch (tile) {
          case TileType.Floor:
            renderFloor(
              ctx,
              x_pos,
              y_pos,
              env.tile_dimensions.x,
              env.tile_dimensions.y
            );
            break;
          case TileType.Wall:
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
      this.tiles[this.idx(point.x, point.y)] === TileType.Floor
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

function renderFloor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size_x: number,
  size_y: number
) {
  ctx.save();
  ctx.fillStyle = '#ff00ff';
  ctx.beginPath();
  ctx.rect(x, y, size_x, size_y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// function renderPixelIndex(
//   ctx: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   size_x: number,
//   size_y: number
// ) {
//   ctx.font = '8px Arial';
//   ctx.fillStyle = '#ff0000';
//   ctx.fillText(`${x}:${y}`, x * size_x + 4, y * size_y + 16);
// }
