export interface Bullet {
  think(arg: any): void;

  render(ctx: CanvasRenderingContext2D): void;
}

export interface WeaponInstance {
  name: string;

  shot(position: Position): Bullet | undefined;
}

export interface Weapon {
  new(): WeaponInstance;
}

export type Position = {
  x: number;
  y: number;
  rotation: number;
};
