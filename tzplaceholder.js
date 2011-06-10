$.fn.passwordPlaceholder = function(){
	if('placeholder' in document.createElement('input') || !this[0]){
		return;
	}
	
	this.bind('focus', function(){
		if(this.value == this.placeholder)
			password(this);
	}).bind('blur', function(){
		if(this.value == '')
			text(this);
	}).parents('form').bind('submit', function(e){
		var input = $(this).find('.marker').next();
		
		if(input.val() == input.attr('placeholder')){
			input.val('');
		}
	});
	
	var password = function password(obj){
		var _this = $(obj);
		var marker = _this.prev();
		_this.detach().attr('type', 'password').val('').insertAfter(marker).focus();
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
		return;
	}
	
	this.each(function(){
		this.value = this.placeholder;
	});
	
	this.focusin(function(){
		if(this.value == this.placeholder){
			this.value = '';
		}
	}).focusout(function(){
		if(this.value == '')
			this.value = this.placeholder;
	}).parents('form').bind('submit', function(e){
		var input = $(this).find('.marker').next();
		
		if(input.val() == input.attr('placeholder')){
			input.val('');
		}
	});
};