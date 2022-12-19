export type Env = {
  width: number;
  height: number;
  injectors: Record<string, any>;
};

export interface Module {
  settings: {
    name: string;
    width?: number;
    height?: number;
    injectors?: any[];
  };
  init(canvas: HTMLCanvasElement, env: Env): void;
  render(ctx: CanvasRenderingContext2D, env: Env): (() => void) | void;
  destroy(canvas: HTMLCanvasElement): void;
}

// написать норм типы
export type Injectors = {
  name: 'mouse';
  deps: { name: string }[];
  instance: Newable;
};

interface Newable<T = void> {
  new (n: T): Newable<T>;
}

export type Chapter = {
  name: string;
  expamples: Module[];
};
