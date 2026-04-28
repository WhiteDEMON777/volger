

const burger = document.querySelector('.site-header__burger');
const menu = document.querySelector('.site-header');
const links = document.querySelectorAll('.site-header__link');

burger.addEventListener('click', () => {
  if (menu.classList.contains('site-header--active')) {
      menu.classList.remove('site-header--open');
      setTimeout(()=>{
        menu.classList.remove('site-header--active');
      }, 380)
  } else {
    menu.classList.add('site-header--active');
    setTimeout(()=>{
      menu.classList.add('site-header--open');
    }, 0)
  }
})
links.forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('site-header--active')) {
      menu.classList.remove('site-header--open');
      setTimeout(()=>{
        menu.classList.remove('site-header--active');
      }, 380)
    }
  })
})

document.addEventListener('click', (e) => {
  if (
      !menu.contains(e.target) &&
      !burger.contains(e.target)
  ) {
    menu.classList.remove('site-header--open');
    setTimeout(()=>{
      menu.classList.remove('site-header--active');
    }, 380)
  }
});

const logoHeader = document.querySelector('.site-header__logo');
const logo = document.querySelector('.hero__glass');
const hero = document.querySelector('.hero');
if(hero) {

  window.addEventListener('scroll', () => {
    if (window.scrollY > (hero.scrollHeight-50)) {
      logo.classList.add('hero__glass--active');
      logoHeader.classList.add('site-header__logo--active');
    } else {
      logo.classList.remove('hero__glass--active');
      logoHeader.classList.remove('site-header__logo--active');
    }
  });
}



window.addEventListener('DOMContentLoaded', () => {
  new Swiper('.hero__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 7000,
    },
    navigation: {
      nextEl: '.hero__slider-next',
      prevEl: '.hero__slider-prev',
    },
  });

  Fancybox.bind('[data-fancybox]', {
    animated: true,
    dragToClose: false,
  });

  const inputMasks = document.querySelectorAll('[name="phone"]');

  if (inputMasks) {
    inputMasks.forEach((inputMask) => {
      const maskOptions = {
        mask: '+{7} (000) 000-00-00',
      };
      IMask(inputMask, maskOptions);
    });
  }

  const tabs = document.querySelectorAll('.tab');

  if (tabs.length) tabs.forEach((tab) => tabLogic(tab));

  function tabLogic(tab) {
    const triggers = tab.querySelectorAll('.tab__item');
    const contents = tab.querySelectorAll('.tab__content');
    const tabList = tab.querySelector('.tab__list');
    const tabContainer = tab.querySelector('.tab__container');

    const open = tab.getAttribute('data-open') || 1;

      triggers.forEach((trigger, index) => {
        trigger.setAttribute('data-tab', index + 1);
        if (+open === index + 1) {
          trigger.classList.add('tab__item--active');
        }
      });
      contents.forEach((content, index) => {
        if (+open === index + 1) {
          content.classList.add('tab__content--active');
          content.classList.add('tab__content--opacity');
        }
      });

    contents.forEach((content, index) => {
      content.setAttribute('data-tab', index + 1);
    });


    const clickHandler = (event) => {
      triggers.forEach((t) => {
        t.classList.remove('tab__item--active');
      });

      contents.forEach((c) => {
        c.classList.remove('tab__content--active');
        c.classList.remove('tab__content--opacity');
      });

      const index = event.currentTarget.getAttribute('data-tab');
      const arrowAnimate = document.querySelector('.about__mission-quote');


      if (index !== '2') {
        arrowAnimate.classList.remove('about__mission-quote--open');
      }
        if(index === '2') {
          setTimeout(() => {
              arrowAnimate.classList.add('about__mission-quote--open');
          }, 380)
        }
      const selectedTrigger = tabList.querySelector(`[data-tab="${index}"]`);
      selectedTrigger?.classList.add('tab__item--active');

      const selectedContent = tabContainer.querySelector(`[data-tab="${index}"]`);
      selectedContent.classList.add('tab__content--active');

      setTimeout(() => {
        selectedContent.classList.add('tab__content--opacity');
      }, 200);
    };


    triggers.forEach((trigger) => {
      trigger.addEventListener('click', clickHandler);
    });
  }

  const cookie = document.querySelector('.cookie');
  const cookieBtn = document.querySelector('.cookie__button');
  if(cookieBtn) {
    cookieBtn.addEventListener('click', (e) => {
      cookie.classList.add('cookie--none');
    })
  }
});