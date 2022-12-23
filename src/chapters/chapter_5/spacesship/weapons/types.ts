export interface Bullet {
  think(): void;
  render(ctx: CanvasRenderingContext2D): void;
}
export interface Weapon {
  shot(shooter: Shooter, bullets: Bullet[]): void;
}
export type Shooter = {
  x: number;
  y: number;
  rotation: number;
};
