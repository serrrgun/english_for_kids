import menuData from './data_menu';
import gameData from './game_data';
import ViewHeader from './view/view_header';
import ViewMainCards from './view/view_maincards';
import ViewGameCards from './view/view_gamecards';
import ViewResult from './view/view-result';
import getToggleGame from './utils';

export default class Router {
  static showHeader() {
    const header = new ViewHeader(menuData);
    return header.element;
  }

  static showMainCards() {
    const showMainCards = new ViewMainCards(menuData);
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';
    mainContainer.append(showMainCards.element);
    getToggleGame();
  }

  static showGameCardrs(index) {
    const showGameCards = new ViewGameCards(gameData, index);
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';
    mainContainer.append(showGameCards.element);
    getToggleGame();
  }

  static showResult() {
    const showResult = new ViewResult();
    const mainContainer = document.querySelector('.main-container');
    mainContainer.innerHTML = '';
    mainContainer.append(showResult.element);
    getToggleGame();
  }
}
