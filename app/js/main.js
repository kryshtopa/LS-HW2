// Слайдер
var slider = (function() {

  var _insertValues = function ($this) {
    var container = $this.closest('.options__slider'),
    from = container.find('.options__slider-input_from'),
    to = container.find('.options__slider-input_to');
    values = $this.slider('option', 'values');

    from.val(values[0]);
    to.val(values[1]);
  }

  return {
    init: function () {

      $('.options__slider-element').each(function(){
        var $this = $(this),
        min = parseInt($this.data('min')),
        max = parseInt($this.data('max'));

        $this.slider({
          range: true,
          min: min,
          max: max,
          values: [ min, max ],
          slide: function() {
            _insertValues($this);
          }
        });
      });

    }
  }

}());


$(document).ready(function() {


  // Вызывает слайдер
  if ($('.options__slider-element').length) {
    slider.init();
  }

  // Разделение текста на колонки
  $('.information__text').columnize({
    columns: 2
  })


  //  Деселект радио-кнопок
  var allRadios = document.getElementsByName('re');
          var booRadio;
          var x = 0;
          for(x = 0; x < allRadios.length; x++){

              allRadios[x].onclick = function() {
                  if(booRadio == this){
                      this.checked = false;
                      booRadio = null;
                  }else{
                      booRadio = this;
                  }
              };
          }

});
