// 拖动使盒子变大
define(['range'] , function(range){
	var scale = function(node1,node2){
		var disX = 0;
		var disY = 0;
		var disW = 0;
		var disH = 0;
		node2.onmousedown = function(ev){
			var e = ev || event;
			disX = e.clientX;
			disY = e.clientY;
			disW = node1.offsetWidth;
			disH = node1.offsetHeight;
			document.onmousemove = function(ev){
				var e = ev || event;
				var _width = range.range(e.clientX - disX + disW, 500 ,100);
				var _height = range.range(e.clientY - disY + disH, 500,100);

				node1.style.width = _width + 'px';
				node1.style.height = _height + 'px'
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmousedown = null;
			}
		}
	}

	return {
		scale : scale
	}
})