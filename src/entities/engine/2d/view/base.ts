export interface View<T> {
  render(ctx: CanvasRenderingContext2D, data: T): void;
}
