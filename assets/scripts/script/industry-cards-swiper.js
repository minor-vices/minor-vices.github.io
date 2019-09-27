/* Industry Cards Swiper */

(function(_, Swiper, document, window) {
  var active = '';
  var navElements;
  var options = {
    lg: {
      effect: 'fade'
    },
    sm: {
      loop: true,
      pagination: {
        clickable: true,
        el: '.swiper-pagination',
        type: 'bullets'
      }
    }
  };
  var selector = '.industry-cards';
  var swiper = null;

  function init() {
    navElements = document.querySelectorAll('.industries-nav a');
    
    update();

    window.addEventListener('resize', _.throttle(update, 200));
  }

  function create(key) {
    swiper = new Swiper(selector, options[key]);
    active = key;

    [].forEach.call(navElements, function(el) {
      el.addEventListener('click', handleNav);
      el.addEventListener('mouseenter', handleNav);
      el.addEventListener('mouseleave', handleNav);
    });
  }

  function destroy() {
    swiper.destroy();

    active = '';
    swiper = null;
  }

  function handleNav(event) {
    event.preventDefault();

    var listItem = event.target.closest('li');
    var list = listItem.closest('ul');
    var listItems = list.getElementsByTagName('li');
    var index = [].indexOf.call(list.children, listItem);

    [].forEach.call(listItems, function(el) {
      el.classList.remove('industries-nav__item--active');
    });

    listItem.classList.add('industries-nav__item--active');

    swiper.slideTo(index);
  }

  function update() {
    var breakpoint = window.matchMedia('(min-width: 48em)').matches;

    if (active !== 'sm' && !breakpoint) {
      if (active) {
        destroy();
      }

      create('sm');
    }

    if (active !== 'lg' && breakpoint) {
      if (active) {
        destroy();
      }

      create('lg');
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})(_, Swiper, document, window);
