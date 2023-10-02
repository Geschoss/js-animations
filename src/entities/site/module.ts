export interface Module {
  destroy(): void;
}

export interface ModuleConstructor {
  id: string;
  new (): Module;
}
