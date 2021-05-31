import View from './view';
import Router from '../router';

export default class ViewHeader extends View {
  constructor(data) {
    super();
    this.data = data.menuData;
  }

  get template() {
    return `
      <header class="header wrapper">
        <nav class="navigation">
          <div class="navigation__button">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul class="navigation__list" data-set="menu">
            <li class="navigation__item">
              <a class="navigation__link" href="#" data-key="Menu">Menu</a>
            </li>
            ${this.data.map((item) => `
              <li class="navigation__item">
                <a class="navigation__link" href="#" data-key="${item.title}">${item.title}</a>
              </li>
            `.trim()).join('')}
          </ul>
        </nav>
        <div class="toggle-btn">
          <input class="toggle-btn__checkbox" type="checkbox">
          <div class="toggle-btn__container">
            <span class="toggle-btn__slide"></span>
          </div>
        </div>
      </header>
    `;
  }

  bind() {
    const navButton = this.element.querySelector('.navigation__button');
    const menuList = this.element.querySelector('.navigation__list');
    const navigationLinks = this.element.querySelectorAll('.navigation__link');

    navButton.addEventListener('click', () => {
      menuList.classList.toggle('navigation__list--active');
      navButton.classList.toggle('navigation__button--active');
    });

    navigationLinks.forEach((element, index) => {
      element.addEventListener('click', (evt) => {
        evt.preventDefault();
        navigationLinks.forEach((elem) => {
          elem.classList.remove('navigation__link--active');
        });
        element.classList.add('navigation__link--active');
        if (evt.target.dataset.key === 'Menu') {
          Router.showMainCards();
          menuList.classList.remove('navigation__list--active');
          navButton.classList.remove('navigation__button--active');
        } else {
          Router.showGameCardrs(index - 1);
          menuList.classList.remove('navigation__list--active');
          navButton.classList.remove('navigation__button--active');
        }
      });
    });
  }
}
