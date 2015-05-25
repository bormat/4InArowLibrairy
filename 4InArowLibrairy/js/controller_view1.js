var MyScopeAccess;
var lastY;
var lastX;
var originX;
var originY;

var lastScroll;
define(['app','ngcookies','slider','keyboardService','myRules','modele','ia','tableauDeModele','http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-animate.js'], function (app) {


app.controller('View1Ctrl',function ($scope,$timeout,keyboard,$cookieStore) {
		
		$scope.endGameMessage=false;
		loadjscssfile(path3+ 'css/theme.css','css');
		loadjscssfile(path3+ 'css/index_1.css','css');
		var time;
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
		$scope.pionWidth=function(){
			var width=Math.round($("#p4").width()*0.142857)-1;
			return width;
		}
		$scope.displayScroll="none";
	

		function setGrille(i,player){
			$scope.grille[i]=player;
		}
		$scope.loadStory=function(grille2){
			if (!grille2) return false;
			Modele.restore(grille2);
			//if not player2  undo last move
			if (Modele.backup.length%2==0){
				$scope.undo();
			}
			$scope.grille.safeClone(Modele.grille);
			Modele.setPlayer(2);
		}
		
		$scope.mode="normal";
		$scope.cost=100;
		$scope.columClass='optionInvisible';
		$scope.columClass2='optionInvisible';
		
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
				endPreview(preview)
				setGrille(Modele.backup.at(-1),0)
			}			
		}
		
	

		$scope.init=function(){
			Modele.playAgain();
			//setTimeout block the update of dom when user clic on replay 
			setTimeout(function (){
				$scope.endGameMessage=false;
			},0);
			grille=$scope.grille=Modele.grille.slice();
		}
		$scope.init();
		$scope.displayOption=function(){
			if (!( $scope.endGameMessage && $scope.columClass=='optionVisible')){
				$scope.deplier('columClass');
			}
			$scope.endGameMessage=false;			
		}
		
		$scope.deplier=function(columClass,bool){
			if(bool != undefined){
				$scope[columClass] = !bool ? 'optionInvisible' : 'optionVisible';
			}else{
				$scope[columClass]=($scope[columClass]== 'optionVisible') ? 'optionInvisible' : 'optionVisible';
			}
		}
		
		function setGrille(i,player){
			$scope.grille[i]=player;
		}
		
		var preview;
		$scope.preview = function ($index){
			if ($scope.mode=="creator"){
				return (false);
			}
			if (preview!==undefined){
				endPreview(preview)
			}
			var pos=($index+7)%7;
			if (!isNaN(pos)){
				if  (grille[pos]==0){
					setGrille(pos,Modele.getPlayer(0));// 0 the current player 1 for the next 
				}
				preview=pos;
			}
			debug($index)
        };
		function debug(pos){
			if (pos%7!=0){
				setGrille(0,Modele.grille[0])
			}
		}
		function endPreview ($index) {
			if  (Modele.grille[$index%7]%7==0){
				setGrille($index%7,0);
			}

        };
   
		$scope.color2='red';
		$scope.graphique = function (colorNumber) {
			if ($scope.mode=="creator"){
				color=creator.getColor(colorNumber);
				return color;
			}
			return (function(){
				switch(parseInt(colorNumber)){
					case 0: return "white";
					case 1: return "yellow";
					case 2: return "red";
					case 4: return "rgb(160,166,0)"; //black yellow 
					case 8: return "rgb(140,0,0)";//black red
				}
			})();
        };
		
		$scope.restore=function(){
			var backup =$cookieStore.get('backup');
			$scope.loadStory(backup);

		}
		
		$scope.save=function(){
			$cookieStore.put('backup', Modele.backup);			
		}
			
					

		var anim=function(pos,player,callback){
			anim2=function(i){			
				
				
				if (i>6){
					setGrille(i-7,0) ;
				}
				if (Modele.grille[i]!=0){ 
					player = (Modele.grille[i]);
				};
				setGrille(i, player);
				var clickOnUndo=Modele.grille[pos]*1==0 ;
				//test if we have click on undo during animation
				if (clickOnUndo ){
					setGrille(i,0);
					$scope.$digest();
					if (callback){
						callback();
					}
					return(false);
				}
				if (i<pos ){
					$timeout(function(){anim2(i+7)},time);
				}else if (callback){
					setTimeout( callback , time+1 );
				}
			};
			$timeout(function(){
				anim2(pos%7)
			});
			debug(pos)
		}
		
		$scope.undo=function(){
			if (Modele.isGameFinish()){
				darkWinningPos(false);
				Modele.isGameFinish(false);
			}
			var pos=Modele.undo();
			setGrille(pos,0);
			IA.boolSmart.pop();
			if ($scope.botActive && Modele.getPlayer()==1 ){
				if (Modele.backup.length%2==0){
					$scope.undo();
				}else{
					// if there is a problem with the player who have to play change the player
					Modele.setPlayer(2);
				}
			}
			$scope.deplier( 'columClass',false );
		}
		
		
		
		var stackPosition=[]
		$scope.fallenPion=function(pos){
			if ($scope.mode=="normal"){
				if (!Modele.isGameFinish()){
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
		$scope.message2=message;
		var threadIsntUsed=true;
		function loopThreatAnimation(){
			if (Modele.isGameFinish() && stackPosition.length==0){
				return false;
			}
			if (stackPosition.length!=0){
				if ( threadIsntUsed){
					threadIsntUsed=false;
					time=$scope.animation ? 50 : 0;
					// it is possible theplayer is really fast so we record all all position where he click in stackPosition and threat them now
					var pos=Modele.play(stackPosition.shift());
					if (pos<0){
						return(threadIsntUsed=true);
					}
					var stopAlert=false;
					if (Modele.isGameFinish()){
						function b(){
							message();
							$scope.$apply();
						}
						setTimeout(b,time);
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
					if (!stopAlert && Modele.isGameFinish()){
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
		function darkWinningPos(dark){
					var f=Modele.winInfo;
					if (!f){
						return false;
					}
					var i=f.pion1;
					var colorNumber= $scope.grille[i]%3;
					if (dark){
						 colorNumber = (colorNumber==1) ? 4 : 8;
					}
					for (;i!=f.pion2 + f.dir ;i+=f.dir){
						setGrille(i, colorNumber);
					}
		}
		function message(){
					//show winning pos
					darkWinningPos(true)					
					var message;
					if (Modele.isHumanTurn()){
						if (IA.boolSmart.indexOf("false")+1){
							message="bravo vous avez gagné  augmentez un peu le niveau";
						}
						else{
							message="bravo vous avez gagné  envoyer votre historique par commentaire pour améliorer le jeu";
							$("#comment").append("ne touchez pas cette ligne c'est votre historique de jeux"+JSON.stringify(Modele.backup));
						}
					}
					else{
						message="Le robot gagne cette fois vous pouvez baisser le niveau de difficulté de quelques pourcents";
					}
					$scope.message = message;
					$scope.endGameMessage=true;
					$scope.deplier( 'columClass',true );
					$scope.$digest();
				}
		$scope.message="ça va commencer";
		
	//MODELE CREATOR 
	$scope.minLine=0;
	$scope.maxLine=5;
	$scope.minCol=0;
	$scope.maxCol=6;
	creator=(function(){
		var colorNumber=1;
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
			var affectnumber= function(keyCode){
				colorNumber= String.fromCharCode(keyCode).toLowerCase();
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
		//play at the number push on keyboard
		keyboard.setEvent(event);
		var keyCode = keyboard.code();			
		if ($scope.mode=="creator"){
				return creator.affectnumber(keyCode)
		}
		//numerical number (0 to 9)
		if (keyCode>47 && keyCode<58){
			$scope.fallenPion(keyCode - 48);
		}else{			
			if (keyboard.getCtrlKey() && keyboard.isPush('Z')){
				$scope.undo();
			}
			//right key and left key change the preview  
			if (keyboard.code()==37||keyboard.code()==39){
				var nextPosDirection = keyboard.code()-38;
				var nextPos=preview;
				var i = 7;
				do{
					nextPos+=nextPosDirection;
					nextPos = mod(nextPos,7);						
				}while(parseInt(Modele.grille[nextPos]) && i--)
				$scope.preview(nextPos);
			}
			//top arrow
			else if (keyboard.code()==38){
				$scope.undo();
				$scope.preview();
			}
			//bottom arrow
			else if (keyboard.code()==40){
				$scope.preview($scope.fallenPion(preview));
			}
		}
	};

	$scope.scrollInPx=function(lg){
		var init= $(window).scrollTop();
		$(window).scrollTop(init-lg);
	}
	$scope.touchStart = function(element) {
			$scope.displayScroll="block";
			lastY=event.touches[0].clientY;
			$scope.touchMove(element);
	}

	var scroll=true;
	$(document).ready(function(){
		$(document)[0].addEventListener('touchmove',function(event){
			if (!scroll){
				event.preventDefault();
			}			
		})
	})
	$scope.scroll=true;
	//block or enable the scroll of page with finger on the p4
	var scollOption = function(){
		$(window).scrollTop($(window).scrollTop() - event.touches[0].clientY + lastY);
		lastY=event.touches[0].clientY;
	}

	$scope.touchMove = function(element) {	    	
			if ($scope.columClass=='optionVisible' || $scope.columClass2=='optionVisible'){
				return false;
			}
			if ($scope.scroll){
				scollOption();
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
			$scope.fallenPion(preview);
	}
	
});
	app.directive('mytOuchstart', [function() {
		return function(scope, element, attr) {
			MyScopeAccess.P4=element;
			element.on('touchstart', function(event) { 
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchstart); 
				});
			});
		}			
	}])

	app.directive('mytOuchmove', [function() {
		return function(scope, element, attr) {
			MyScopeAccess.P4=element;
			element.on('touchmove', function(event) { 
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchmove); 
				});
			});
		}
	}])

	app.directive('mytOuchend', [function() {
		return function(scope, element, attr) {
			if  (!MyScopeAccess){
				return false
			}
			MyScopeAccess.P4=element;
			element.on('touchend ', function(event) {
				scope.$apply(function() { 
					scope.$eval(attr.mytOuchend); 
				});
			});
		};
	}])
}); 




