export interface BaseEntity {
  think(...args: any[]): void;
  render(ctx: CanvasRenderingContext2D): void;
}
