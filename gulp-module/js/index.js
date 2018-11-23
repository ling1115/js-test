//index.html代码上js文件
// 遵从AMD规范编写模块
define(['drag' , 'scale'] , function(drag,scale){
	var main = function(){
		var btn = document.getElementById('btn');
		var div1 = document.getElementById('div1');
		var div2 = document.getElementById('div2');
		var div3 = document.getElementById('div3');

		drag.drag(div3);
		btn.onclick = function(){
			div1.style.display = 'block';
			scale.scale(div1,div2);
		}
	}
	return {
		main:main
	}
})