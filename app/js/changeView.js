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
  };

  return {
    init: function() {
      $('.view__item_link').on('click', function(e) {
        e.preventDefault();

        _changeState($(this));
      });
    }
  };

}());

changeView.init();
