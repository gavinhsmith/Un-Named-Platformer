for (var i in document.getElementsByTagName('a')) {
  document.getElementsByTagName('a')[i].addEventListener('click',function (e) {
    e.preventDefault();
    openInBrowser(this.href);
  });
};
