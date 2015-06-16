define(['app'], function (app) {

	var keyboard=(function (){
		// private methods
		var event,intKeyCode;
		var beetween = function(toComp,Min,Max){
				return (toComp>=Min && toComp<=Max);
		}
		var setAndnormalizeIntKeyCode = function(){
			intKeyCode=parseInt(event.keyCode);
			if (beetween(intKeyCode,96,105)){
				intKeyCode-=48;
			}
		}
		// public methods			
		return {
			"getCtrlKey":function(){
				return event.ctrlKey;
			},
			"isPush" : function(c){
					return (String.fromCharCode(intKeyCode)==c.toUpperCase())
			},
			"code" : function(c){
					return (intKeyCode)
			},
			"setEvent" : function (event1){
				event=event1;
				CtrlKey = event.ctrlKey
				setAndnormalizeIntKeyCode();
			}
		};
	})()
	
	app.factory("keyboard",function (){
		return keyboard;
	})
})
