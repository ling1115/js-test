// 拖拽函数
define(['range'] , function(range){
	function drag(node){
		var disX = 0;
		var disY = 0;
		node.onmousedown = function(ev){
			var e = ev || event;
			disX = e.clientX - node.offsetLeft;
			disY = e.clientY - node.offsetTop;
			document.onmousemove = function(ev){
				var e = ev || event;
				var _left = range.range(e.clientX - disX , 
							document.documentElement.clientWdith - node.offsetWidth, 0);
				var _top = range.range(e.clientY - disY , 
							document.documentElement.clientHeight - node.offsetHeight, 0);

				node.style.left = _left + 'px';
				node.style.top = _top + 'px';
			}

			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmousedown = null;
			}
		}
	}

	return {
		drag : drag
	}
})