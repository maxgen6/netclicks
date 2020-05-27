'use strict';


const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if(res.ok){
            console.log(res.json());
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }

}

new DBService().getTestData().then((data) => {

})


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

//фото

const photo = () => {
    const img = document.querySelectorAll('.tv-card__img');
        img.forEach((elem) => {
            elem.addEventListener('mouseenter', (event) => {
            if(event.target.dataset.backdrop){
            let photoId = event.target.src;
            event.target.src = event.target.dataset.backdrop;
        
            elem.addEventListener('mouseleave', (event) => event.target.src = photoId); 
        }
        });
    });
};
photo();

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


