export type Env = {
  width: number;
  height: number;
};

export interface Module {
  settings: {
    name: string;
  };
  init(): void;
  destroy(): void;
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
