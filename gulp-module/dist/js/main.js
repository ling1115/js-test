
require.config({
	index:'index',
	drag:'drag',
	scale:'scale',
	range:'range'
})
require(['index'] , function(index){
	index.main();
})