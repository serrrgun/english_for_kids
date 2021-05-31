import View from './view';
import Router from '../router';
import * as storage from '../storage';

export default class ViewGameCards extends View {
  constructor(data, it) {
    super();
    this.data = data.gameData[it];
    this.currentPlayedWord = '';
    this.countCorrectAnswers = 0;
    this.countErrorAnswers = 0;
  }

  get template() {
    return `
      <div>
        <div class="stars"></div>
        <ul class="play-cards">
          ${this.data.map((item) => `
          <li class="play-cards__item">
            <div class="play-cards__train">
              <div class="play-cards__item-front">
                <div class="play-cards__item-img">
                  <img src="./static/${item.image}" alt="${item.word}">
                </div>
                <div class="play-cards__item-desc">
                  <span>${item.word}</span>
                  <span class="play-cards__item-flip"></span>
                </div>
              </div>
              <div class="play-cards__item-back">
                <div class="play-cards__item-img">
                  <img src="./static/${item.image}" alt="${item.word}">
                </div>
                <div class="play-cards__item-desc">
                  <span>${item.translation}</span>
                </div>
              </div>
            </div>
            <div class="play-cards__game" data-key="${item.word}">
              <img src="./static/${item.image}" alt="${item.translation}">
              <audio class="audio-track" src="./static/${item.audioSrc}" preload="auto" data-key="${item.word}"></audio>
            </div>
          </li>`.trim()).join('')}
        </ul>
        <button class="button button--play" type="button">Play</button>
        <button class="button button--repeat" type="button"></button>
        <div class="audio-reaction">
          <audio class="audio-reaction__correct" src="./static/audio/correct.mp3" preload="auto"></audio>
          <audio class="audio-reaction__error" src="./static/audio/error.mp3" preload="auto"></audio>
        </div>
      </div>
    `;
  }

  playGame(array) {
    if (array.length !== 0) {
      const track = array.pop();
      this.currentPlayedWord = track.dataset.key;
      track.play();
    } else {
      storage.set('result', this.getResult());
      setTimeout(() => {
        Router.showResult();
      }, 1000);
    }
  }

  getResult() {
    return {
      correct: this.countCorrectAnswers,
      unCorrect: this.countErrorAnswers,
    };
  }

  repeatTrack(array) {
    array.forEach((element) => {
      if (element.dataset.key === this.currentPlayedWord) {
        element.play();
      }
    });
  }

  bind() {
    const cardGameWrapper = this.element.querySelector('.play-cards');
    const flipBtns = this.element.querySelectorAll('.play-cards__item-flip');
    const cardsFront = this.element.querySelectorAll('.play-cards__item-front');
    const cardsBack = this.element.querySelectorAll('.play-cards__item-back');
    const audioTracks = [...this.element.querySelectorAll('.audio-track')];
    const playBtn = this.element.querySelector('.button--play');
    const cardsGame = this.element.querySelectorAll('.play-cards__game');
    const cardsTrain = this.element.querySelectorAll('.play-cards__item-front .play-cards__item-img img');
    const repeatButton = this.element.querySelector('.button--repeat');
    const stars = this.element.querySelector('.stars');
    const audioCorrectAnsver = this.element.querySelector('.audio-reaction__correct');
    const audioFailAnsver = this.element.querySelector('.audio-reaction__error');

    flipBtns.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        cardsFront[index].style.transform = 'rotateX(-180deg)';
        cardsBack[index].style.transform = 'rotateX(0deg)';
      });
    });

    cardsBack.forEach((elem, index) => {
      elem.addEventListener('mouseleave', () => {
        cardsFront[index].style.transform = 'rotateX(0deg)';
        cardsBack[index].style.transform = 'rotateX(180deg)';
      });
    });

    const shuffledArr = audioTracks.slice().sort(() => Math.random() - 0.5);

    playBtn.addEventListener('click', () => {
      this.playGame(shuffledArr);
      repeatButton.style.display = 'block';
      playBtn.style.display = 'none';
      cardGameWrapper.classList.toggle('play-cards--pointer');
    });

    cardsGame.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (card.dataset.key === this.currentPlayedWord) {
          setTimeout(() => {
            this.playGame(shuffledArr, index + 1);
          }, 1000);
          card.classList.add('play-cards__game--true');
          stars.insertAdjacentHTML('afterbegin', '<span class="stars__true"></span>');
          audioCorrectAnsver.play();
          this.countCorrectAnswers += 1;
        } else {
          stars.insertAdjacentHTML('afterbegin', '<span class="stars__false"></span>');
          audioFailAnsver.play();
          this.countErrorAnswers += 1;
        }
      });
    });

    repeatButton.addEventListener('click', () => {
      this.repeatTrack(audioTracks);
    });

    cardsTrain.forEach((element, index) => {
      element.addEventListener('click', () => {
        audioTracks[index].play();
      });
    });
  }
}
