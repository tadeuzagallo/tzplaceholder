$.fn.passwordPlaceholder = function(){
	if('placeholder' in document.createElement('input') || !this[0]){
		//return;
	}
	
	this.bind('focus', function(){
		var _this = $(this);
		if(_this.attr('type') == 'text'){
			password(this);
			this.focus();
		}
	}).bind('blur', function(){
		var _this = $(this);
		if(_this.val() == ''){
			text(this);
		}
	}).parents('form').bind('submit', function(e){
		var input = $(this).find('.marker').next();
		
		if(input.val() == input.attr('placeholder')){
			input.val('');
		}
	});
	
	var password = function password(obj){
		var _this = $(obj);
		var marker = _this.prev();
		_this.detach().attr('type', 'password').val('').insertAfter(marker);
	};
	
	var text = function password(obj){
		var _this = $(obj);
		var marker = _this.prev();
		_this.detach().attr('type', 'text').val(_this.attr('placeholder')).insertAfter(marker);
	};
	
	this.each(function(){
		var marker = $('<span class="marker" />');
		marker.insertBefore(this);
		text(this);
	});
};

$.fn.placeholder = function(){
	if('placeholder' in document.createElement('input') || !this[0]){
		//return;
	}
	
	this.each(function(){
		var _this = $(this);
		_this.val(_this.attr('placeholder'));
	});
	
	this.focusin(function(){
		var _this = $(this);
		if(_this.val() == _this.attr('placeholder')){
			_this.val('');
		}
	}).focusout(function(){
		var _this = $(this);
		if(_this.val() == '')
			_this.val(_this.attr('placeholder'));
	}).parents('form').bind('submit', function(e){
		var input = $(this).find('.marker').next();
		
		if(input.val() == input.attr('placeholder')){
			input.val('');
		}
	});
};
