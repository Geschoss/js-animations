import { Point } from '../../common/entities';
import { KeyboardInjector } from '../../common/io';
import { Module } from '../../common/module';
import { Camera } from './camera';
import { DungeonMap } from './map';
import { MapBuilder } from './map_builder';
import { Player } from './player';

const POSITION_SIZE = 24;

type State = {
  map: DungeonMap;
  camera: Camera;
  player: Player;
};
const game: State = {
  map: null,
  camera: null,
  player: null,
};
export const dungeonCrawlModule: Module = {
  settings: {
    name: 'dungeon_crawl',
    injectors: [KeyboardInjector],
    tile_dimensions: {
      x: POSITION_SIZE,
      y: POSITION_SIZE,
    },
  },
  init(canvas, env) {
    let map_builder = MapBuilder.create(100, 100);
    game.map = map_builder.map;
    game.player = Player.create(
      map_builder.player_start.x,
      map_builder.player_start.y,
      Point.create(env.width / 2, env.height / 2)
    );
    // game.camera = Camera.create(map_builder.player_start, {
    //   width: 11,
    //   height: 11,
    // });
  },
  render(ctx, env, time) {
    game.player.update(game.map, game.camera, env);
    game.map.render(ctx, game.player, env);
    game.player.render(ctx, env);
  },
  resize(canvas, env) {
    // game.camera = Camera.create(20, env);
    // game.player.position = { x: env.width / 2, y: env.height / 2 };
    // let norm_width = Math.trunc(env.width / POSITION_SIZE);
    // let norm_height = Math.trunc(env.height / POSITION_SIZE) + 1;
    // let map_builder = MapBuilder.create(norm_width, norm_height, POSITION_SIZE);
    // game.map = map_builder.map;
  },
  destroy() {},
};
