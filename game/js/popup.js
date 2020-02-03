function createPopup(html) {
  var elm = document.createElement('div');
  elm.innerHTML = html;

  elm.classList.add('popup');

  elm.style.top = '150%';

  elm.show = function () {
    elm.style.top = '50%';
  };

  elm.hide = function () {
    elm.style.top = '150%';
  };

  return elm;
};
