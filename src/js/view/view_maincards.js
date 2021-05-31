import View from './view';
import Router from '../router';

export default class ViewMainCards extends View {
  constructor(data) {
    super();
    this.data = data.menuData;
  }

  get template() {
    return `
      <ul class="main-cards">
        ${this.data.map((item) => `
          <li class="main-cards__item">
            <a href="#" data-key="${item.title}">${item.title}
              <img src="./static/${item.image}" alt="${item.title}">
            </a>
          </li>`.trim()).join('')}
      </ul>
    `;
  }

  bind() {
    const linkItems = this.element.querySelectorAll('.main-cards__item');

    linkItems.forEach((element, index) => {
      element.addEventListener('click', () => {
        Router.showGameCardrs(index);
      });
    });
  }
}
