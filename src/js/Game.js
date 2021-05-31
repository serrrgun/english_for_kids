import Router from './router';
import getToggleGame from './utils';

export default class Game {
  constructor() {
    this.app = null;
    this.container = null;
    this.header = null;
    this.mainContainer = null;
  }

  init() {
    const mainContainer = document.createElement('main');
    mainContainer.setAttribute('class', 'main-container wrapper');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    this.app = document.querySelector('.app');
    this.container = container;
    this.mainContainer = mainContainer;

    this.app.prepend(this.container);
    this.container.append(Router.showHeader());
    this.container.append(this.mainContainer);

    Router.showMainCards();
    getToggleGame();
  }
}
