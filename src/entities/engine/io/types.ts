export interface ControllerConstructor {
  new (node: HTMLElement): Controller;
}

export interface Controller {
  x: number;
  y: number;
  pressed: boolean;
  destroy: () => void;
}
