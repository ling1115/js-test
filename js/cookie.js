function getCookie(key){
	 var str=document.cookie.split("; ");
	 var arr=[];
	 for (var i = 0; i < str.length; i++) {
	 	  var arr1= str[i].split("=");
		  if(arr1[0].indexOf(key)!=-1){
			  arr.push(arr1[1]);
		  }
	 } 
	 return arr;
}

function setCookie(key, value, expires, path) {
	expires = expires || 0 
	var d = null;
	if(expires) {
		d = new Date()
		d.setDate( d.getDate()+expires );
	}
	document.cookie = key+"="+value + (d?"; expires="+d:"") + (path?"; path="+path:"");
}

// function removeCookie(name){
// 	var value = getCookie(name)
// 	var now = new Date();
// 	now.setDate( now.getDate() - 10)
// 	if(value != null){
// 		document.cookie = name + ":value; "+"expires:"+now.toGMTString()+"; ";
// 	}
// }

// w3c
function removeCookie(name){
	var value = getCookie(name)
	if(value != null){
		setCookie(name,'',-10)
	}
}