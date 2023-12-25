/*use strict*/

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(
      /IEMobile/i
    ); /*|| navigator.userAgent.match(/WPDesktop/i);*/
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

/* если мобилка добовляем клас _tough , если комп то класс _pc*/
if (isMobile.any()) {
  document.body.classList.add("_touch"); /*класс мобилки*/

  let menuArrows =
    document.querySelectorAll(
      ".menu-arrow"
    ); /* все стрелочки собираем в переменную*/

  if (menuArrows.length > 0) {    /*проверка есть ли такие в массиве если есть запускаем цикл for   чтоб пробежаться по ним*/
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {        /* на каждую стрелку навешиваем событие click*/ 
			menuArrow.parentElement.classList.toggle( "_active" ); /*родителю добавляем класс active если его нет и наоборот */
      });
    }
  }
} else {
  document.body.classList.add("_pc"); /*класс пк*/
}

/* Прокрутка /плавная навигация по сайту/ к нужному разделу  классу data-goto=".page_section_2 или _1"*/
const menuLinks = document.querySelectorAll(".menu-link[data-goto]"); // выбирает только .menu-link[data-goto

if (menuLinks.length > 0) {
  //проверка
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick); // ищем их
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top +     pageYOffset -
        document.querySelector("header").offsetHeight;
      /* чтоб меню закрывалось при переходе на страницу*/
      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      /*-------*/
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

/**----Burger menu--- */
const iconMenu = document.querySelector(".menu-icon");
const menuBody = document.querySelector(".menu-body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle(
      "_lock"
    ); /**запрещает скролить страницу при открытом мерю */
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}




