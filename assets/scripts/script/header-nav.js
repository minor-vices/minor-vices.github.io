/* Header Nav */

(function(document, window) {
  var body = document.body;

  var className = 'header'
  var activeClassName = className + '--nav-active';

  var isActive = false;

  var element;

  function init() {
    element = document.getElementsByClassName(className)[0];

    var toggles = element.getElementsByClassName(className + '__nav-toggle');
    [].forEach.call(toggles, function(el) {
      el.addEventListener('click', toggle);
    });
  }

  function toggle(event) {
    event.preventDefault();

    element.classList.toggle(activeClassName);

    update();
  }

  function update() {
    isActive = element.classList.contains(activeClassName);

    var top;

    if (isActive) {
      top = body.getBoundingClientRect().top;
      body.dataset.top = top;
      body.style.top = top + 'px';
      body.style.position = 'fixed';
    }

    if (!isActive) {
      top = Math.abs(body.dataset.top);
      body.style.top = '';
      body.style.position = '';

      if (top) {
        window.scrollTo(0, top);
        body.dataset.top = '';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})(document, window);
