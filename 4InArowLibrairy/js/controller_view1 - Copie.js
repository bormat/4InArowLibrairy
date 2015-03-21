var MyScopeAccess;
define(['app','ngcookies','slider','keyboardService','myRules','modele','ia','tableauDeModele','http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-animate.js'], function (app) {


app.controller('View1Ctrl',function ($scope,$timeout,keyboard,$cookieStore) {
		
		MyScopeAccess=$scope;
		$scope.load=function(grille2){
			Modele.setModel(grille2)
			$scope.grille.safeClone(Modele.grille);
		}
		$scope.load2=function(grille2,player){
			$scope.load(grille2);
			if (parseInt(Modele.joueur)!=parseInt(player)){
				Modele.nextPlayer();
			}
		}
		$scope.loadStory=function(grille2,player){
			Modele.backup=grille2;
			for (var i=0;i<42;i++){
				$scope.grille[i]=0;
			}
			for (var i=0;i<grille2.length;i++){
			
				var pos=grille2[i];
				if (pos<42 && pos>0)
				$scope.grille[pos]=i%2+1;
			}
			Modele.grille.safeClone($scope.grille);
		}
		
		$scope.mode="normal";
		$scope.cost=100;
		$scope.path5="http://bormat2.free.fr/rjs2/"
		$scope.columClass='optionInvisible';
		$scope.alert = function(text) {
			alert(text);
		};
		$scope.optionDisp=function(){
					return ($scope.optionsWidth==optionsWidthInit ) ? "block" : "none" ;
		}
		$scope.Modele = Modele;
		$scope.grille2 = "jeu2"; 
		$scope.grille = [];
		$scope.botActive=true;
		$scope.animation=true;
		var grille=$scope.grille;
		var grilleCreator;
		$scope.modeleCreator=function(){
			if ($scope.mode=="creator"){
				$scope.mode="normal";
				$scope.grille=grille;
			}else{
				$scope.mode="creator";
				grilleCreator=grille.slice();
				$scope.grille=grilleCreator;
			}			
		}
		
	

		$scope.init=function(){
			Modele.playAgain();
			grille=$scope.grille=Modele.grille.slice();
		}
		$scope.init();
		
		$scope.deplier=function(){
			$scope.columClass=($scope.columClass== 'optionInvisible') ? 'optionVisible' : 'optionInvisible';
		}
		var tabPreview=[];
		$scope.preview = function ($index){
			if (tabPreview.length>0){
				endPreview(tabPreview.pop())
			}
			var pos=($index+7)%7;
			
			if (!isNaN(pos)){
				if  (grille[pos]==0){
					grille[pos]=Modele.getPlayer(0);// 0 the current player 1 for the next 
				}
				tabPreview.push(pos);
			}
        };
		
		function endPreview ($index) {
			if  (Modele.grille[$index%7]%7==0){
				grille[$index%7]=0;
			}
        };
		$scope.color2='red';
		$scope.graphique = function (colorNumber) {
			if ($scope.mode=="creator"){
				color=creator.getColor(colorNumber);
				return color;
			}
			var color=0;
			if (colorNumber==1)
				color ="yellow";
			else if (colorNumber==2)
				color ="red";
			else if (colorNumber==0)
				color= "white";
			else 
				color= "black";				
			return color;
        };
		
		$scope.restore=function(){
			var backup =$cookieStore.get('backup');
			Modele.restore(backup);
			for (var i=0;i<42;i++){
				grille[i]=Modele.grille[i];
			}
		}
		
		$scope.save=function(){
			$cookieStore.put('backup', Modele.backup);			
		}
			
					

		var anim=function(pos,player,callback){
			anim2=function(i){			
				var time=$scope.animation ? 50 : 0;
				if (i>6){
					$scope.grille[i-7]=0 ;
				}
				$scope.grille[i]=player ;
				var clickOnUndo=Modele.grille[pos]*1==0 ;
				//test if we have click on undo during animation
				if (clickOnUndo ){
					grille[i]=0;
					$scope.$digest();
					if (callback){
						callback();
					}
					return(false);
				}
				if (i<pos ){
					$timeout(function(){anim2(i+7)},time);
				}else if (callback){
					
					callback();
				}
			};
			$timeout(function(){
				anim2(pos%7)
			});

		}
		
		$scope.undo=function(){
			Modele.partieFini=false;
			var pos=Modele.undo();
			grille[pos]=0;
			IA.boolSmart.pop();
			if ($scope.botActive && Modele.getPlayer()==1){
				$scope.undo();
			}
		}
		
		
		
		var stackPosition=[]
		$scope.fallenPion=function(pos){
			if ($scope.mode=="normal"){
				if (!Modele.partieFini){
					stackPosition.push(pos);
				}	
				else{
					stackPosition=[]
				}
				loopThreatAnimation();
			}else{
				modelCreatorClick(pos);
			}
		}
		function modelCreatorClick(pos){
			grilleCreator[pos]=creator.getColorNumber()
		}

		var threadIsntUsed=true;
		function loopThreatAnimation(){
			if (Modele.partieFini && stackPosition.length==0){
				return false;
			}
			if (stackPosition.length!=0){
				if ( threadIsntUsed){
					threadIsntUsed=false;
					// it is possible theplayer is really fast so we record all all position where he click in stackPosition and threat them now
					var pos=Modele.play(stackPosition.shift());
					if (pos<0){
						return(threadIsntUsed=true);
					}
					var stopAlert=false;
					if (Modele.partieFini){
						message();
						stopAlert=true
					}
					player=Modele.getPlayer(1);
					botPlayer=Modele.getPlayer(0);
					anim(pos,player,callbackPlayer);
				}
			}
			
			function callbackPlayer(){
				function callbackBotIfActiveElsePlayer1(){
					threadIsntUsed=true;
					if (!stopAlert && Modele.partieFini){
						message();
					}
					//threat other position if player play during animation
					loopThreatAnimation();
					
				}	

				if ($scope.botActive){
					IA.setDif($scope.cost);
					var posBot=IA.p4BlockEasy(pos,false);
					anim(posBot,botPlayer,callbackBotIfActiveElsePlayer1);
				}
				else{				
					callbackBotIfActiveElsePlayer1();
				}
			}
		}
		
		function message(){
					var message;
					if (Modele.joueur==="j1"){
						if (IA.boolSmart.indexOf("false")+1){
							message="bravo vous avez gagnez  augmentez un peu le niveau";
						}
						else{
							message="bravo vous avez gagnez  envoyer votre historique par commentaire pour améliorer le jeu";
							$("#comment").append("ne touchez pas cette ligne c'est votre historique de jeux"+JSON.stringify(Modele.backup));
						}
					}
					else{
						message="Le robot gagne cette fois vous pouvez baisser le niveau de difficulté de quelques pourcents";
					}
					alert(message);
		}
		$scope.message="salut";
		
	//MODELE CREATOR 
	$scope.minLine=0;
	$scope.maxLine=5;
	$scope.minCol=0;
	$scope.maxCol=6;
	creator=(function(){
		var colorNumber=1;0
		var getColor = function (chara){
				var color='transparent';
				switch(''+chara){				
					case 'A':case 'a':
						color="rgb(255,0,234)";break;
					case '1':
						color="rgb(255,251,0)";break;
					case '2':
						color="rgb(255,0,0)";break;
					case '3':
						color="rgb(205,209,77)";break;
					case '4':
						color="rgb(160,166,0)";break;
					case '5':
						color="rgb(255,162,0)";break;
					case '6':
						color="rgb(99,99,99)";break;
					case '7':
						color="rgb(255,128,128)";break;
					case '8':
						color="rgb(140,0,0)";break;
					case '9':
						color="rgb(0,255,221)";break;
				}
				return(color);
			};			
			var affectnumber= function(pos){
					var chara=String.fromCharCode(keyboard.code());
					colorNumber= chara.toLowerCase();
			}
		return {
			//'chooseColor' : chooseColor
			'affectnumber': affectnumber,
			'getColor':		getColor,
			'getColorNumber': function(){ return colorNumber;}
		}
	})()
	
	$scope.keydown=function(event){
		event.preventDefault();
		keyboard.setEvent(event);
		if ($scope.mode=="creator"){
			creator.affectnumber()
			return true;
		}
		if (keyboard.getCtrlKey()){
			if ( keyboard.isPush('Z')){	
				$scope.undo();
			}
		}
		//right key and left key change the preview  
		if (keyboard.code()==37||keyboard.code()==39){
			var nextPosDirection=keyboard.code()-38;
			var nextPos=tabPreview.at(-1);
			for(var i=0;i==0 || Modele.grille[nextPos]!=0 && i<8;i++ ){
				nextPos+=nextPosDirection;
				if (nextPos.isNaN){nextPos=5;break;}
				nextPos=nextPos.mod(7);						
			}
			$scope.preview(nextPos);
		}
		//top arrow
		else if (keyboard.code()==38){
			$scope.preview($scope.undo());
		}
		//bottom arrow
		else if (keyboard.code()==40){
			var pos= (tabPreview.at(-1));
			$scope.preview($scope.fallenPion(pos));
		}
		//play at the number push on keyboard
		for (var i=0;i<10;i++){
			if (keyboard.isPush(""+i)){
				$scope.fallenPion(i);
			}
		} 			
	};
	$scope.touchStartMove = function(element) {
			if ($scope.columClass=='optionVisible'){
				return false;
			}
			event.preventDefault();
			var width=element.P4.width();
			var pos= (event.touches.length>=1) ? event.touches[0].pageX : -1;
			if (pos<0) return false;
			pos=(pos-element.P4.offset().left)*7/width;
			pos=Math.floor(pos);
			$scope.preview(pos);
	}
	
	
	$scope.touchEnd = function(element) {
			if ($scope.columClass=='optionVisible'){
				return false;
			}
			event.preventDefault();
			$scope.fallenPion(tabPreview.at(-1));
	}
	
});
	app.directive('mytOuchstart', [function() {
		return function(scope, element, attr) {
			MyScopeAccess.P4=element;
			element.on('touchstart touchmove ', function(event) {		
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchstart); 
				});
			});
			
			
		};
	}])
			
	app.directive('mytOuchend', [function() {
		return function(scope, element, attr) {
			MyScopeAccess.P4=element;
			element.on('touchend ', function(event) {
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchend); 
				});
			});
		};
	}])
}); 





