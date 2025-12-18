import { EventBus } from '@/core/EventBus';
import { v4 as makeUUID } from 'uuid';

export enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type BlockEvents<P> = {
  [EVENTS.INIT]: [];
  [EVENTS.FLOW_CDM]: [];
  [EVENTS.FLOW_CDU]: [P, P];
  [EVENTS.FLOW_RENDER]: [];
};
type BlockType = Block<Record<string, unknown>>;
export abstract class Block<P extends Record<string, unknown>> {
  private _element: HTMLElement | null = null;
  private readonly _meta: { tagName: string, props: P };
  private readonly _id: string;

  protected props: P;
  protected children: Record<string, BlockType | BlockType[]>;
  private eventBus: () => EventBus<BlockEvents<P>>;

  protected constructor(tagName = 'div', propsAndChildren = {} as P) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);

    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: P) {
    const children: Record<string, BlockType | BlockType[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value as BlockType;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value as BlockType[];
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as P };
  }

  private _registerEvents(eventBus: EventBus<BlockEvents<P>>) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount(this.props);
    this.eventBus().emit(EVENTS.FLOW_RENDER);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(_oldProps: P) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
      this._element = newElement;
      this._addEvents();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  abstract render(): DocumentFragment;

  protected compile(template: (context: unknown) => string, context: P): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...context };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((item) => `<div data-id="${item._id}"></div>`).join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
          if (stub) {
            stub.replaceWith(component.getContent());
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      }
    });

    return fragment.content;
  }

  public getContent() {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  private _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop): unknown {
        const key = prop as keyof P;
        const value = target[key];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value: unknown) {
        const key = prop as keyof P;
        const oldProps = { ...target };

        target[key] = value as P[keyof P];

        self.eventBus().emit(EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  private _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
