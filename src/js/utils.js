const getToggleGame = () => {
  const toggleGameButton = document.querySelector('.toggle-btn__checkbox');
  const menu = document.querySelector('.navigation__list');
  const mainCardsWrapper = document.querySelector('.main-cards');
  const gameCardsWrapper = document.querySelector('.play-cards');
  const playButton = document.querySelector('.button--play');

  toggleGameButton.addEventListener('click', () => {
    if (toggleGameButton.checked) {
      if (menu) {
        menu.classList.add('navigation__list--game');
      }
      if (mainCardsWrapper) {
        mainCardsWrapper.classList.add('main-cards--game');
      }
      if (gameCardsWrapper) {
        gameCardsWrapper.classList.add('play-cards--game');
        playButton.style.display = 'block';
      }
    } else if (!toggleGameButton.checked) {
      if (menu) {
        menu.classList.remove('navigation__list--game');
      }
      if (mainCardsWrapper) {
        mainCardsWrapper.classList.remove('main-cards--game');
      }
      if (gameCardsWrapper) {
        gameCardsWrapper.classList.remove('play-cards--game');
        playButton.style.display = 'none';
      }
    }
  });
  toggleGameButton.checked = false;
  menu.classList.remove('navigation__list--game');
};

export default getToggleGame;
