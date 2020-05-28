'use strict';

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'd4285807aaee833251fb1a07502814f0';



//меню

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvShowList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');

//открытие/закрытие меню

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if(!event.target.closest('.left-menu')){
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

//дроп-меню

leftMenu.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.dropdown');
    if(target) {
        target.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});



//модальное окно

tvShowList.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    target = target.closest('.tv-card');

    if(target) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }

});

//закрытие модального окна

modal.addEventListener('click', (event) => {
    if(event.target.closest('.cross') ||
       event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});


//запрос на сервер и формирование карточек

const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if(res.ok){
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}`)
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }

}

const renderCard = (response) => {
    tvShowList.textContent = '';

    response.results.forEach((item) => {

        const { 
            backdrop_path : backdrop,
            name : title,
            poster_path: poster, 
            vote_average: vote
        } = item;

        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = backdrop ? 'img/no-poster.jpg' : IMG_URL + backdrop ;
        const voteElem = '';

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = `
            <a href="#" class="tv-card">
                <span class="tv-card__vote">${vote}</span>
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${IMG_URL + backdrop}"
                    alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;

        tvShowList.append(card);
    
    });


};

new DBService().getTestData().then(renderCard);

//смена карточки

const changeImg = event => {
    const card = event.target.closest('.tv-shows__item');

    if(card){
        const img = card.querySelector('.tv-card__img');
        
        if(img.dataset.backdrop){
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowList.addEventListener('mouseover', changeImg);
tvShowList.addEventListener('mouseout', changeImg);
