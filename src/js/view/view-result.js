import View from './view';
import * as storage from '../storage';
import Router from '../router';

export default class ViewResult extends View {
  constructor() {
    super();
    this.data = storage.get('result');
  }

  get template() {
    return `
      <div class="result" style="background-image: url(./static/img/images/${this.data.unCorrect === 0 ? 'success' : 'failure'}.jpg)">
        <div>
          <h2 class="result__title">${this.data.unCorrect === 0 ? 'Поздравляю Победа!' : 'Вы проиграли!'}</h2>
          <p class="result__desc">Неправилшьных ответов: ${this.data.unCorrect}</p>
        </div>
        <button class="button button--main" type="button">главная</button>
      </div>
    `;
  }

  bind() {
    const mainButton = this.element.querySelector('.button');

    mainButton.addEventListener('click', () => {
      Router.showMainCards();
    });
  }
}
