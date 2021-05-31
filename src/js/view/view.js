export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can`t instantiate AbstractView, only concrete one');
    }
  }

  get template() {
    throw new Error('Template is required');
  }

  get element() {
    if (this.elem) {
      return this.elem;
    }
    this.elem = document.createElement('div');
    this.elem.innerHTML = this.template.trim();
    this.bind();
    return this.elem.firstChild;
  }

  bind() {}
}
