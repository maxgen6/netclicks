'use strict';
//меню

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger');

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

//фото

const photo = () => {
    const img = document.querySelectorAll('.tv-card__img');
        img.forEach((elem) => {
            elem.addEventListener('mouseenter', (event) => {
            let photoId = event.target.src;
            event.target.src = event.target.dataset.backdrop;
            
            elem.addEventListener('mouseleave', (event) => event.target.src = photoId); 
        });
    });
};
photo();