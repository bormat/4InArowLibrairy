"use strict";

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

var mod = function(a, n) {
	return a - Math.floor(a/n) * n;
}
//Math.floor(a/n) == Math.ceil(a/n)-1

Number.prototype.sign = function(n) {
	return (this>=0) ? 1 : -1;
}

Number.prototype.between=function(a,b){
	return (a<=this && b>=this);
}
Object.prototype.addP = function(o){
	var keys = Object.keys(o)
	var lg = keys.length;
	for(var i = 0; i < lg; i++){
		var u = keys[i];
		this[u] = o[u];
	}
}



//don't change reference
Array.prototype.safeClone=function(toClone) {
	for(var i in toClone){
		this[i]=toClone[i];
	}
}
Array.prototype.at = function(a){
	if (a<0) a+=this.length;
	return this[a];
}
Array.prototype.init = function(val,taille){
	for(var o=0; o<taille ;o++){	
		this[o]= val;
	}
}

//example whenReady("$('#applet span')[41]",disableDrag);
function whenReady(selector,callback,time){
	var time= time || 100;
	selector="s="+selector;
	var a = function(){
		var s=[];
		eval(selector);
		if (s &&  $(s).length ){
			callback();
		}else if (time++< 10000){
			setTimeout(a, time)
		}
	}
	a();
}

var ffalse =function(){return false};
var ftrue =function(){return true};
