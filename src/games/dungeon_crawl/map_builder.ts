import { Point, Rect_ } from '../../common/entities';
import { Random } from '../../lib/random';
import { DungeonMap, TileType } from './map';

const NUM_ROOMS = 60;
const MAX_SIZE_ROOM = 25;
const MIN_ROOM_SIZE = 5;
const MAX_CREATE_TRY = 200;

export class MapBuilder {
  map: DungeonMap;
  rooms: Rect_[];
  player_start: Point;

  static create(width: number, height: number) {
    let mb = new MapBuilder(
      DungeonMap.create(width, height),
      [],
      Point.create()
    );
    mb.fill(TileType.Wall);
    // mb.mock_rooms(width, height);
    mb.build_random_rooms(width, height);
    mb.build_corridors();
    mb.player_start = mb.rooms[0].center_trunc();
    return mb;
  }

  constructor(map: DungeonMap, rooms: Rect_[], player_start: Point) {
    this.map = map;
    this.rooms = rooms;
    this.player_start = player_start;
  }

  fill(tile: TileType) {
    this.map.tiles = this.map.tiles.map(() => tile);
  }

  mock_rooms(width: number, height: number) {
    this.rooms = rooms_mock().map(
      ({ x1, x2, y1, y2 }) => new Rect_(x1, y1, x2, y2)
    );
    this.rooms.forEach((room) => {
      room.for_each(({ x, y }) => {
        if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
          let idx = this.map.idx(x, y);
          this.map.tiles[idx] = TileType.Floor;
        }
      });
    });
  }

  build_random_rooms(width: number, height: number) {
    let create_try = 0;
    while (this.rooms.length < NUM_ROOMS) {
      let room = Rect_.create(
        Random.range(-2, width - 2),
        Random.range(-2, height - 2),
        Random.range(MIN_ROOM_SIZE, MAX_SIZE_ROOM),
        Random.range(MIN_ROOM_SIZE, MAX_SIZE_ROOM)
      );
      room.cut_by_window(width - 2, height - 2);
      create_try += 1;
      let overlap = this.rooms.some((r) => r.intersect_with_padding(room, 1));
      if (!overlap) {
        create_try = 0;
        room.for_each(({ x, y }) => {
          let idx = this.map.idx(x, y);
          this.map.tiles[idx] = TileType.Floor;
        });
        this.rooms.push(room);
      }
      if (MAX_CREATE_TRY < create_try) {
        break;
      }
    }
  }

  apply_horizontal_tunnel(x1: number, x2: number, y: number) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      let idx = this.map.try_idx(Point.create(x, y));
      if (idx) {
        this.map.tiles[idx] = TileType.Floor;
      }
    }
  }

  apply_vertical_tunnel(y1: number, y2: number, x: number) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      let idx = this.map.try_idx(Point.create(x, y));
      if (idx) {
        this.map.tiles[idx] = TileType.Floor;
      }
    }
  }

  build_corridors() {
    let rooms = this.rooms.sort(
      (a, b) => a.center_trunc().x - b.center_trunc().x
    );
    let [head, ...rest] = rooms;
    rest.forEach((r) => {
      let next = r.center_trunc();
      let prev = head.center_trunc();

      if (Random.coin(true, false)) {
        this.apply_horizontal_tunnel(prev.x, next.x, prev.y);
        this.apply_vertical_tunnel(prev.y, next.y, next.x);
      } else {
        this.apply_vertical_tunnel(prev.y, next.y, prev.x);
        this.apply_horizontal_tunnel(prev.x, next.x, next.y);
      }
      head = r;
    });
  }
}

function rooms_mock() {
  return [
    {
      x1: 1,
      x2: 6,
      y1: 9,
      y2: 14,
    },
    {
      x1: 10,
      x2: 15,
      y1: 3,
      y2: 8,
    },
    {
      x1: 13,
      x2: 19,
      y1: 17,
      y2: 23,
    },
    // {
    //   x1: 17,
    //   x2: 23,
    //   y1: 3,
    //   y2: 9,
    // },
    // {
    //   x1: 21,
    //   x2: 27,
    //   y1: 11,
    //   y2: 17,
    // },
  ];
}
