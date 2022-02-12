export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._reneredList = this._renderer(items);
    this._container.append(...this._reneredList)
  }

  addItem(element) {
    this._container.prepend(element);
  }
}