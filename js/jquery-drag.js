$.fn.extend({
	drag:function(ev){
		var offsetX = 0;
		var offsetY = 0;
		$(this).mousedown(function(){
			offsetX = ev.clientX - $(this).offset().left();
			offsetY = ev.clientY - $(this).offset().top();
			var _this = this;
			$(document).mousemove(function(){
				var _left = Math.min( Math.max( ev.clientX - offsetX , 0) , 
									$(window).width() - $(_this).width());
				var _top = Math.min( Math.max( ev.clientY - offsetY , 0) , 
									$(window).height() - $(_this).height())
				$(_this).css({
					left : _left,
					top : _top
				})
			})

			$(document).mouseup(function(){
				$(document).off("mousedown mouseup");
			})
		})
	},


})     