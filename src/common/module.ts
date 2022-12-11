export interface Module {
  settings: {
    name: string;
    width?: number;
    height?: number;
  };
  init(canvas: HTMLCanvasElement): void;
  render(ctx: CanvasRenderingContext2D): void;
  destroy(canvas: HTMLCanvasElement): void;
}
