import {
  Injectable,
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SxGlobalRenderer extends Renderer2 {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    super();
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  get data(): { [key: string]: any } {
    return this.renderer.data;
  }

  destroy(): void {
    return this.renderer.destroy();
  }

  createElement(name: string, namespace?: string) {
    return this.renderer.createElement(name, namespace);
  }

  createComment(value: string) {
    return this.renderer.createComment(value);
  }

  createText(value: string) {
    return this.renderer.createText(value);
  }

  appendChild(parent: any, newChild: any): void {
    return this.renderer.appendChild(parent, newChild);
  }

  insertBefore(
    parent: any,
    newChild: any,
    refChild: any,
    isMove?: boolean
  ): void {
    return this.renderer.insertBefore(parent, newChild, refChild, isMove);
  }

  removeChild(parent: any, oldChild: any, isHostElement?: boolean): void {
    return this.renderer.removeChild(parent, oldChild, isHostElement);
  }

  selectRootElement(selectorOrNode: any, preserveContent?: boolean) {
    return this.renderer.selectRootElement(selectorOrNode, preserveContent);
  }

  parentNode(node: any) {
    return this.renderer.parentNode(node);
  }

  nextSibling(node: any) {
    return this.renderer.nextSibling(node);
  }

  setAttribute(el: any, name: string, value: string, namespace?: string): void {
    return this.renderer.setAttribute(el, name, value, namespace);
  }

  removeAttribute(el: any, name: string, namespace?: string): void {
    return this.renderer.removeAttribute(el, name, namespace);
  }

  addClass(el: any, name: string): void {
    return this.renderer.addClass(el, name);
  }

  removeClass(el: any, name: string): void {
    return this.renderer.removeClass(el, name);
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2
  ): void {
    return this.renderer.setStyle(el, style, value, flags);
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
    return this.renderer.removeStyle(el, style, flags);
  }

  setProperty(el: any, name: string, value: any): void {
    return this.renderer.setProperty(el, name, value);
  }

  setValue(node: any, value: string): void {
    return this.renderer.setValue(node, value);
  }

  listen(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {
    return this.renderer.listen(target, eventName, callback);
  }
}
