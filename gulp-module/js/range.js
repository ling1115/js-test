// 限制函数
define(function(){
	function range(isNUM, isMAX,isMIN){
		if(isNUM > isMAX){
			return isMAX;
		}else if(isNUM < isMIN){
			return isMIN;
		}else{
			return isNUM;
		}
	}

	return {
		range:range
	}
})