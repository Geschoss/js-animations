import { Env } from 'src/entities/engine/2d/engine';
import { Point } from 'src/entities/engine/2d/entities';

export class Camera {
  left_x: number;
  right_x: number;
  top_y: number;
  bottom_y: number;

  static create(player_position: Point, env: Env) {
    let left_x = player_position.x - env.width / 2;
    let right_x = player_position.x + env.width / 2;
    let top_y = player_position.y - env.height / 2;
    let bottom_y = player_position.y + env.height / 2;
    return new Camera(left_x, right_x, top_y, bottom_y);
  }

  constructor(left_x, right_x, top_y, bottom_y) {
    this.left_x = left_x;
    this.right_x = right_x;
    this.top_y = top_y;
    this.bottom_y = bottom_y;
  }

  on_player_move(player_position: Point, env: Env) {
    this.left_x = player_position.x - env.width / 2;
    this.right_x = player_position.x + env.width / 2;
    this.top_y = player_position.y - env.height / 2;
    this.bottom_y = player_position.y + env.height / 2;
  }
}
