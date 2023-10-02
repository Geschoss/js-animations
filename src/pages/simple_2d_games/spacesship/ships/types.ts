import { Bullet, Weapon } from '../weapons';

export type BaseShip = {
  x: number;
  y: number;
  moving: boolean;
  rotation: number;
}

export interface ShipViewInstance {
  weapon_name: string;
  name: string;

  changeWeapon(weapon: Weapon): void;

  shot(ship: BaseShip): Bullet[] | undefined;

  render(ctx: CanvasRenderingContext2D, ship: BaseShip): void;
}

export interface ShipView {
  new(weapon: Weapon): ShipViewInstance;
}