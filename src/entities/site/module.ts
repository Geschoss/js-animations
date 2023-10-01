export interface Module {
  name: string;
  destroy(): void;
}

export interface ModuleConstructor {
  name: string;
  new (): Module;
}
