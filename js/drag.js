function Drag(id){
	this.el = document.getElementById(id);
	this.Y = 0;
	this.X = 0;
	this.init();
}
Drag.prototype = {
	// 初始方法
	init:function(){
		//用箭头函数：自动绑定this
		this.el.onmousedown = (e) => {
			this.down(e);
			document.onmousemove = (e) =>{
				this.move(e);
			}
			document.onmouseup = () => {
				this.up();
			} 
		}
	},
	// 鼠标按下：记录位置
	down:function(ev){
		this.X = ev.offsetX;
		this.Y = ev.offsetY;
	},
	// 鼠标移动：box跟随鼠标的位置移动
	move:function(ev){
		var _left = Math.min(Math.max(ev.clientX - this.X , 0) , 
					window.innerWidth - this.el.offsetWidth);
		var _top = Math.min(Math.max(ev.clientY - this.Y , 0) , 
					window.innerHeight - this.el.offsetHeight);

		this.el.style.left = _left +"px";
		this.el.style.top = _top +"px";
	},
	// 鼠标松开：清除按下与移动事件
	up:function(){
		document.onmousedown = null;
		document.onmousemove = null;
	}
}

// Drag.prototype.init = function () {
// 	//这里只能用箭头函数？？
// 	this.el.onmousedown = (e) => {
// 		this.down(e);
// 		document.onmousemove = (e) =>{
// 			this.move(e);
// 		}
// 		document.onmouseup = () => {
// 			this.up();
// 		}
// 	} 
// }
// Drag.prototype.down = function(ev){
// 	this.X = ev.offsetX;
// 	this.Y = ev.offsetY;
// }
// Drag.prototype.move = function(ev){
// 	this.el.style.left = ev.clientX - this.X +"px" ;
// 	this.el.style.top = ev.clientY - this.Y + "px";
// }
// Drag.prototype.up = function(){
// 	document.onmousedown = null;
// 	document.onmousemove = null;
// }