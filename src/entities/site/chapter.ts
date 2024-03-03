import { ModuleConstructor } from "src/entities/site/module";

export class Chapter {
  name: string;
  modules: ModuleConstructor[];

  constructor(name: string, modules: ModuleConstructor[]) {
    this.name = name;
    this.modules = modules;
  }
}
