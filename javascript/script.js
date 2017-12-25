window.onload=function(){
	waterfall("main","box");

	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'}]}
	window.onscroll=function(){
		if (checkScrollSlide) {
			var oparent=document.getElementById('main');
			//将数据块渲染当前页面的尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox=document.createElement('div');
				oBox.className='box';
				oparent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall("main","box");

		}
	}
}
function waterfall(parent,box){
	//将main下所有class为box的元素取出来
	var oparent=document.getElementById(parent);
	var oBoxs=getByClass(oparent,box);
	//计算宽度和列数
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//console.log(cols);
	//设施main的宽度
	oparent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto";

	var hArr=[];//存放每一列高度的数组
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		} else {
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array(),//用来存储获取到的所有class为box的元素
	    oElements=parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if (oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinhIndex(arr,val){
	for (var i in arr){
		if (arr[i]==val) {
			return i;
		}
	}
}

//检测是否具备加载条件
function checkScrollSlide(){
	var oparent=document.getElementsById('main');
	var oBoxs=getByClass(oparent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrllTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}