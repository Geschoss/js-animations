export type Env = {
  width: number;
  height: number;
};

export interface Module {
  settings: {
    name: string;
    width?: number;
    height?: number;
  };
  init(canvas: HTMLCanvasElement, env: Env): void;
  render(ctx: CanvasRenderingContext2D, env: Env): void | boolean;
  destroy(canvas: HTMLCanvasElement): void;
}
