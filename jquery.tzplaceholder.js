(function() {
  var _addStyle, _styleAdded;

  _styleAdded = false;

  _addStyle = function() {
    if (_styleAdded) return;
    _styleAdded = true;
    return $('<style type="text/css">.tzplaceholder{color:#ddd;}</style>').appendTo('head');
  };

  $.fn.pwdPlaceholder = function(force) {
    var password, text;
    if (('placeholder' in document.createElement('input') && !force) || !this[0]) {
      return;
    }
    _addStyle();
    password = function(obj) {
      var marker;
      marker = obj.prev();
      return obj.detach().attr('type', 'password').removeClass('tzplaceholder').val('').insertAfter(marker);
    };
    text = function(obj) {
      var marker;
      marker = obj.prev();
      return obj.detach().attr('type', 'text').addClass('tzplaceholder').val(obj.attr('placeholder')).insertAfter(marker);
    };
    return this.each(function() {
      var marker;
      marker = $('<span class="marker" />');
      marker.insertBefore(this);
      return text($(this));
    }).bind('focus', function() {
      var _this;
      _this = $(this);
      if (_this.attr('type') === 'text') {
        password(_this);
        return this.focus();
      }
    }).bind('blur', function() {
      var _this;
      _this = $(this);
      if (!_this.val()) return text(_this);
    }).parents('form').bind('submit', function() {
      var inputs;
      inputs = $(this).find('.marker')();
      return inputs.each(function() {
        var input;
        input = $(this);
        if (input.val() === input.attr('placeholder')) return input.val('');
      });
    });
  };

  $.fn.placeholder = function(force) {
    if (('placeholder' in document.createElement('input') && !force) || !this[0]) {
      return;
    }
    _addStyle();
    return this.each(function() {
      var _this;
      _this = $(this);
      return _this.addClass('tzplaceholder').val(_this.attr('placeholder'));
    }).bind('focus', function() {
      var _this;
      _this = $(this);
      if (_this.val() === _this.attr('placeholder')) {
        return _this.removeClass('tzplaceholder').val('');
      }
    }).bind('blur', function() {
      var _this;
      _this = $(this);
      if (!_this.val()) {
        return _this.addClass('tzplaceholder').val(_this.attr('placeholder'));
      }
    }).parents('form').bind('submit', function() {
      var inputs;
      inputs = $(this).find('.marker');
      return inputs.each(function() {
        var input;
        input = $(this);
        if (input.val() === input.attr('placeholder')) return input.val('');
      });
    });
  };

}).call(this);
