//生成一个指定范围的随机整数
function randomInt(min,max){
	var num = min + parseInt(Math.random()*(max-min));
	return Math.round(num);
}

//生成一个随机颜色
function randomColor(){
	return "rgb("+randomInt(0,255)+","+randomInt(0,255)+","+randomInt(0,255)+")";
}

//根据rgb三原色，生成16进制颜色值
function rgb2string(r,g,b){
	r = r.toString(16).length>1? r.toString(16) : "0"+r.toString(16);
	g = g.toString(16).length>1? g.toString(16) : "0"+g.toString(16);
	b = b.toString(16).length>1? b.toString(16) : "0"+b.toString(16);
}

// 找出数组最小值
function min(arr){
	return Math.min(...arr);
}
// 找出数组的最大值
function max(arr){
	return Math.max(...arr);
}

// 冒泡排序
function bubbleSort(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr.length-i-1;j++){
			if(arr[j]>arr[j+1]){
				var temp=[];
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	return arr;
}

// 选择排序
function selectSort(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				var temp=[];
				temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}

// 快速排序
function quickSort(arr){
	if(arr.length<1) return arr;
	var middle = parseInt(arr.length/2);
	var left =[];
	var right=[];

	for(var i=0;i<arr.length;i++){
		if(i==middle){
			continue;
		}
		if(arr[i]>arr[middle]){
			right[right.lenght]=arr[i];
		}else{
			left[left.length]=arr[i];
		}
	}
	return quickSort(left).concat(arr[middle]).concat(quickSort(right));
}

//字符串反转
function stringReverse(str){
	return str.split('').reverse().join('');
}

// 统计字符串中每个字符出现的个数
function countNum(str){
	for(var i =97;i<=122;i++){
		var cha = String.fromCharCode(i);
		var count =0;
		for(var j =0 ;j<str.length;j++){
			if(str[i]==cha){
				count++;
			}
		}
		if(count!=0){
			console.log(cha+count);
		}
	}
}

// 字符串去重
function string2quchong(str){
	var arr = str.split();
	var newarr = [];
	for(var i=0;i<arr.length;i++){
		if(arr.indexOf(arr[i]) == i){
			newarr.push(arr[i]);
		}
	}
	return newarr.join('');
}


// 随机四位数字验证码
function checkCode4(){
	var str='';
	for(var i=0;i<4;i++){
		str += parseInt(Math.random()*9);
	}
	return +str;
}

// 随机六位数字字母验证码
function checkCode6(){
	var str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var arr=str.split('');
	var newarr=[];
	for(var i=0;i<6;i++){
		newarr[i] = arr[Math.floor(Math.random()*36)];
	}
	return newarr.join('');
}

// 获取n天后的天数
function getDateAfterN(n) {
	var now = new Date();
	now.setDate( now.getDate()+n );
	return date2String(now);
}

// 显示当前时间
function timego(){
	var now=new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	// console.log(month);
	var date = now.getDate();
	var week = now.getDay();
	var hours = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();

	var str = "当前时间为："+year+"年"+month+"月"+date+"日 "+toweek(week)+" "+today(hours)+":"+today(minute)+":"+today(second);
	oDiv1.innerHTML=str;
}

// 倒计时
function timeleft(){
	var future = new Date("2019 01 01");
	var now = new Date();
	var futureYear = future.getFullYear();
	var futureMonth = future.getMonth()+1;
	var futureDtae = future.getDate();

	var left = parseInt((future-now)/1000);
	var day = parseInt(left/84600);
	var hours = parseInt(left%84600/60*60);
	var mintue = parseInt(left%84600%3600/60);
	var second = parseInt(left%60);

	var str = "距离"+futureYear+"年"+futureMonth+"月"
			+futureDate+"日"+"还有："+day+" 天 "+today(hour)+':'
			+today(minute)+":"+today(second);

	oDiv2.innerHTML=str;
}

function toweek(n){
	switch(n){
		case 0: return '星期日';
		case 1: return '星期一';
		case 2: return '星期二';
		case 3: return '星期三';
		case 4: return '星期四';
		case 5: return '星期五';
		case 6: return '星期六';
	}
}

function today(n){
	if(n<10){
		return '0'+n;
	}else{
		return n;
	}
}

// IE兼容ByClassName
function getElementsByClassName(className){
	var all = document.getElementsByTagName("*");
	var temp = [];
	for(var i = 0;i<all.length;i++){
		var classlist = all[i].className.split(" ");
		for(var j in classlist){
			if(className == classlist[j]){
				temp.push(all[i]);
				break;
			}
		}
	}
	return temp;
}


function getStyle(ele){
	return ele.currentStyle?ele.currentStyle:getComputedStyle(ele);
}

function addEvent(ele,eventtype,func,isCapture){
	if(ele.addEventListener){
		return ele.addEventListener(eventtype,func,!!isCapture)
	}else{
		return ele.attachEvent("on"+eventtype,function(){
			ele.fff = func;
			ele.fff();
		})
	}
}