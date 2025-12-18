type EventMap = Record<string, unknown[]>;
export class EventBus<T extends EventMap> {
  private listeners: {
    [K in keyof T]?: Array<(...args: T[K]) => void>;
  } = {};
  constructor() {
    this.listeners = {};
  }

  on<K extends keyof T>(event: K, callback: (...args: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off<K extends keyof T>(event: K, callback: (...args: T[K]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Event "${String(event)}" dosnt exist`);
    }
    this.listeners[event] = this.listeners[event]!
      .filter((listener) => listener !== callback);
  }

  emit<K extends keyof T>(event: K, ...args: T[K]) {
    if (!this.listeners[event]) {
      throw new Error(`Event "${String(event)}" dosnt exist`);
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}
