_styleAdded = false
_addStyle = ->
	if _styleAdded
		return

	_styleAdded = true
	$('<style type="text/css">.tzplaceholder{color:#ddd;}</style>').appendTo('head')

$.fn.pwdPlaceholder = (force)->
	if ('placeholder' of document.createElement('input') and not force) or not @[0]
		return
	
	do _addStyle

	password = (obj)->
		marker = do obj.prev
		obj.detach().attr('type', 'password').removeClass('tzplaceholder').val('').insertAfter marker
	
	text = (obj)->
		marker = do obj.prev
		obj.detach().attr('type', 'text').addClass('tzplaceholder').val(obj.attr('placeholder')).insertAfter marker

	@each ->
		marker = $ '<span class="marker" />'
		marker.insertBefore @
		text $ @

	.bind 'focus', ->
		_this = $ @
		if _this.attr('type') is 'text'
			password _this
			do @focus
	.bind 'blur', ->
		_this = $ @
		unless do _this.val
			text _this
	.parents('form').bind 'submit', ->
		inputs = do $(@).find('.marker')
		
		inputs.each ->
			input = $ @
			
			if do input.val  is input.attr 'placeholder'
				input.val ''

$.fn.placeholder = (force)->
	if ('placeholder' of document.createElement('input') and not force) or not @[0]
		return
	
	do _addStyle

	@each ->
		_this = $ @
		_this.addClass('tzplaceholder').val _this.attr 'placeholder'
	
	.bind 'focus', ->
		_this = $ @
		if do _this.val is _this.attr 'placeholder'
			_this.removeClass('tzplaceholder').val ''
	.bind 'blur', ->
		_this = $ @
		
		unless do _this.val
			_this.addClass('tzplaceholder').val _this.attr 'placeholder'
	.parents('form').bind 'submit', ->
		inputs = $(@).find('.marker')
		
		inputs.each ->
			input = $ @
			if do input.val is input.attr 'placeholder'
				input.val ''