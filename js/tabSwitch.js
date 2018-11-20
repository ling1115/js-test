function tabSwitch(id){
	var oDiv = document.getElementById(id);
	this.oBtn = oDiv.getElementsByTagName('button');
	this.oDiv = oDiv.getElementsByTagName('div');

	for(var i=0;i<this.oBtn.length;i++){
		this.oBtn[i].index = i;
		var _this = this;
		this.oBtn[i].onclick = function(){
			_this.tab(this);
		};
	}
}

tabSwitch.prototype = {
	tab:function(oBtn){
		for(var j=0;j<this.oBtn.length;j++){
			this.oBth[j].className = '';
			this.oDiv[j].style.display = 'none';
		}
		oBtn.className='active';
		this.oDiv[oBtn.index].style.dispaly = 'block';
	}
}