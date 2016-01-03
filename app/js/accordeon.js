var accordeon = (function () {

  var _openSection = function($this){
    var container = $this.closest('.options__item'),
        content = container.find('.options-block__wrapper');

    if (!container.hasClass('active')) {
      container.addClass('active');
      console.log('ya tut');
      content.stop(true, true).slideDown(300);
    } else {
      container.removeClass('active');
      content.stop(true, true).slideUp(300);
    }
  };

  return {
    init: function() {
      $('.options-block__heading').on('click', function(e) {
        e.preventDefault();

        _openSection($(this));
      });
    }
  };

}());

accordeon.init();
