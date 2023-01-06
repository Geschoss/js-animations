import { isNil } from '../../lib';

export enum Keys {
  KeyO = 'KeyO',
  KeyP = 'KeyP',
  KeyL = 'KeyL',
  Space = 'Space',
  ArrowUp = 'ArrowUp',
  Semicolon = 'Semicolon',
  ArrowLeft = 'ArrowLeft',
  ArrowDown = 'ArrowDown',
  ArrowRight = 'ArrowRight',
}

type Hash = { hash: string };
type Subscriber = {
  keys: Keys[];
  cb: (key: Keys) => void;
};
type HashSubscriber = Subscriber & Hash;
function unique() {
  return Math.random().toString(16).slice(2);
}

export class Keyboard {
  static keys = Keys;
  private keys_pressed: Keys[] = [];
  private up_subscribers: HashSubscriber[] = [];
  private down_subscribers: HashSubscriber[] = [];

  constructor() {
    window.addEventListener('keydown', this.keydown, false);
    window.addEventListener('keyup', this.keyup, false);
  }
  destroy() {
    window.removeEventListener('keydown', this.keydown, false);
    window.removeEventListener('keyup', this.keyup, false);
  }

  keydown = (event: KeyboardEvent) => {
    let key = event.code as Keys;
    this.keys_pressed.push(key);
    this.down_subscribers.forEach(({ keys, cb }) => {
      if (keys.length === 0) {
        cb(key);
      } else if (keys.includes(key)) {
        cb(key);
      }
    });
  };

  keyup = (event: KeyboardEvent) => {
    this.keys_pressed = this.keys_pressed.filter((key) => key !== event.code);

    let key = event.code as Keys;
    this.up_subscribers.forEach(({ keys, cb }) => {
      if (keys.length === 0) {
        cb(key);
      } else if (keys.includes(key)) {
        cb(key);
      }
    });
  };

  pressed(key?: Keys) {
    if (isNil(key)) {
      return this.keys_pressed.length != 0;
    }
    return this.keys_pressed.includes(key);
  }

  down(subscriber: Subscriber) {
    let hash = unique();
    this.down_subscribers.push({ ...subscriber, hash });
    return hash;
  }

  up(subscriber: Subscriber) {
    let hash = unique();
    this.up_subscribers.push({ ...subscriber, hash });
    return hash;
  }
}

export const KeyboardInjector = {
  name: 'keyboard',
  instance: Keyboard,
  deps: [],
};
