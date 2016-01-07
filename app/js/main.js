// Слайдер
var slider = (function() {

  // Меняет значение в инпуте в сответствии с положением слайдера
  var _insertValues = function ($this) {
    var container = $this.closest('.options__slider'),
    from = container.find('.options__slider-input_from'),
    to = container.find('.options__slider-input_to');
    values = $this.slider('option', 'values');

    from.val(values[0]);
    to.val(values[1]);

  }

  // Передвигает слайдер в соответсвии с введенным в инпут значением
  var _moveSlider = function ($this) {
    $(".options__slider-input_from").change(function(){
    	var value1 = $(".options__slider-input_from").val();
    	var value2 = $(".options__slider-input_to").val();

        if(parseInt(value1) > parseInt(value2)){
    		value1 = value2;
    		$(".options__slider-input_from").val(value1);
    	}
    	$(".options__slider-element").slider("values",0,value1);
    });

    $(".options__slider-input_to").change(function(){
    	var value1 = $(".options__slider-input_from").val();
    	var value2 = $(".options__slider-input_to").val();

    	if (value2 > 50000) { value2 = 50000; $(".options__slider-input_to").val(50000)}

    	if(parseInt(value1) > parseInt(value2)){
    		value2 = value1;
    		$(".options__slider-input_to").val(value2);
    	}
    	$(".options__slider-element").slider("values",1,value2);
    });

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

        _moveSlider($this);

      });
    }
  }

}());

// Аккордеон
var accordeon = (function () {

  var _openSection = function($this){
    var container = $this.closest('.options__item'),
        content = container.find('.options-block__wrapper');

    if (!container.hasClass('active')) {
      container.addClass('active');
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

// Смена вида блока с товарами
var changeView = (function () {

  var _previousClass = '';

  var _changeState = function ($this) {
    var item = $this.closest('.view__item'),
        view = item.data('view'),
        listOfItems = $('#products-list'),
        modificationPrefix = 'products__list_',
        classOfViewState = modificationPrefix + view;

    if (_previousClass == '') {
      _previousClass = listOfItems.attr('class');
    }

    listOfItems.attr('class', _previousClass + ' ' + classOfViewState);


    // Анимация
    var bounce = $('.products__item')

    if (!bounce.hasClass('animated bounce')){
      bounce.addClass('animated bounce')
    }
    $('.view__item_link').mouseout(function(){
      bounce.removeClass('animated bounce')
    });


  };

  return {
    init: function() {
      $('.view__item_link').on('click', function(e) {
        e.preventDefault();

        $('.view__item_link').removeClass('active');

        var $this = $(this);

        if (!$this.hasClass('active')) {
          $this.addClass('active');
        }

        _changeState($(this));
      });
    }
  };

}());

// Слайдшоу
var slideshow = (function(){

  var _changeSlide = function ($this) {
    var container = $this.closest('.products__slideshow'),
        path = $this.find('img').attr('src'),
        display = container.find('.products__slideshow-img');

    $this.closest('.products__slideshow-item').addClass('active')
      .siblings().removeClass('active');

    display.fadeOut(function() {
      $(this).attr('src', path).fadeIn();
    });
  }

  return {
    init: function () {
      $('.products__slideshow-link').on('click', function(e){
        e.preventDefault();

        var $this = $(this);

        _changeSlide($this);

      });
    }
  }

}());

// Добавляет пробел в ценник
var priceSpace = (function() {

    return {
      init: function () {
        var priceDiv = $('.products__price');
        var price = priceDiv.html();

        price += '';
        var x = price.split(' ');
        var x1 = x[0];
        var x2 = x.length > 1 ? ' ' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }

        price = x1 + x2;
        priceDiv.html(price);
      }
    }
  }());

// Лайтбокс
var lightbox = (function() {

    return {
      init: function () {
        $('.products__slideshow-display').on('click', function(e){
          e.preventDefault();

          var container = $(this).closest('.products__slideshow-block'),
              image = container.find('.products__slideshow-img'),
              src = image.attr('src');

          $(this).attr('href', src);

        });
      }
    }

  }());

// Фильтр по цвету
var colorFilter = (function() {

    return {
      init: function () {
        $('.options__colors-link').on('click', function(e){
          e.preventDefault();

          // var container = $(this).closest('.products__slideshow-block'),
          //     image = container.find('.products__slideshow-img'),
          //     src = image.attr('src');

          $(this).addClass('active');

        });
      }
    }

  }());

$(document).ready(function() {

  // Вызывает аккордеон
  accordeon.init();

  // Вызывает смену вида
  changeView.init();

  // Вызывает слайдшоу
  slideshow.init();

  // Вызывает слайдер
  if ($('.options__slider-element').length) {
    slider.init();
  };

  // Вызывает лайтбокс
  lightbox.init();

  // Вызывает фильтр по цвету
  colorFilter.init();

  // Вызывает пиковую даму!
  // А, нет. Только добавляет пробел в ценник
  priceSpace.init();

  // Селектор
  if ($('.sort__select-elem').length) {
      $('.sort__select-elem').select2({
        minimumResultsForSearch: Infinity
      });
  };

  // Разделение текста на колонки
  $('.information__text').columnize({
    columns: 2
  });

  // Сброс чекбоксов и цвета
  $('.options-block__reset').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        container = $this.closest('.options__item'),
        colors = container.find('.options__colors-link'),
        checkboxes = container.find('input:checkbox');

    checkboxes.each(function() {
      $(this).removeAttr('checked');
    });
    colors.each(function() {
      $(this).removeClass('active');
    });
  });

  // Деселект радио-кнопок
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
