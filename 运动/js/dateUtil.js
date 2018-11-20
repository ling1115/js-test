
function date2String(d){
	return d.getFullYear() + "." + (d.getMonth()+1) + "." + d.getDate();
}

function string2Date(str) {
	return new Date(str);
}

function between(d1, d2) {
	var time = Math.abs(d1.getTime() - d2.getTime());
	return time/(1000*3600*24);
}

function getDateAfterN(n) {
	var now = new Date();
	now.setDate( now.getDate()+n );
	return date2String(now);
}

