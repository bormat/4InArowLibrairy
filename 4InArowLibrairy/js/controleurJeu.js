	var MyScopeAccess;
	var lastY;
	var lastX;
	var originX;
	var originY;
	var lastScroll;
	var app = angular.module('myApp', ['uiSlider']);
	app.controller('myCtrl', function($scope,$$timeout){
		var $keyCode;
		var o = MyScopeAccess = $scope;
				//MODELE CREATOR 
		o.minLine=0;
		o.maxLine=5;
		o.minCol=0;
		o.maxCol=6;
		o.tabColor = {
	/*a*/ '-30' : "rgb(255,0,234)",
			'0' : 'white',
			'1' : "rgb(255,251,0)",
			'2' : "rgb(255,0,0)",
			'3' : "rgb(205,209,77)",
			'4' : "rgb(160,166,0)",//black yellow 
	/*5*/	'5' : "rgb(255,162,0)",
			'6' : "rgb(99,99,99)",
			'7' : "rgb(255,128,128)",
			'8' : "rgb(140,0,0)",//black red	
	/*9*/	'9' : "rgb(0,255,221)"
		}
		
		declare : {  var
			$grille,
			$stackPosition = [],
			$threadIsntUsed = true,
			$preview,
			$time,
			DeplierClass = function(bool){
				this[0] = bool;
			},					
			darkWinningPos = function(dark){
				var f=Modele.winInfo;
				if (!f){
					return false;
				}
				var i=f.pion1;
				var colorNumber= $grille[i]%3;
				if (dark){
					 colorNumber = (colorNumber==1) ? 4 : 8;
				}					
				do{
					$grille[i] = colorNumber;		
				}while(i+=f.dir, i <= f.pion2)
			},
			message = function(egality){
				o.fen.disp = "message";
				o.whyItIsFinish = false;
				var message;
				if(egality){
					message="ceci est une égalité mais pas une victoire"
				}else{
					//show winning pos
					darkWinningPos(true)					
					
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
				}				
				o.deplier( 'columClass',true );
				o.$digest();
			}
		}	
		
		o.addP({
			o : o,
			modeCreator : false,
			message : "ça va commencer",
			//boolean
			isBotActive : true,
			whyItIsFinish : false,
			animation2 : true,
			endGameMessage : false,
			popup : new DeplierClass(),
			IA : IA,
			Modele : Modele,
			fen :  {disp :  "play",stayOpen: !1},
			mode : "normal",
			cost : 100,
			columClass : 'optionVisible',
			columClass2 : 'optionInvisible',
			grille : [],
			message : "ça va commencer",
			message : message,
			endGameMessage : true,
		})

		//function
		o.addP({
			clickOnBlack : function(){
				o.fen.disp = 'play',
				o.columClass = 'optionVisible'
			},
			reverse : function(aString){
				o[aString] = !o[aString]		
			},
			alert : function(text) {
				alert(text);
			},
			optionDisp : function(){
				return (o.optionsWidth==optionsWidthInit ) ? "block" : "none" ;
			},
			loadStory : function(grille2){
				if (!grille2) return false;
				Modele.restore(grille2);
				//if not player2  undo last move
				if (Modele.backup.length%2==0){
					o.undo();
				}
				$grille.safeClone(Modele.grille);
				Modele.setPlayer(2);
			},
			load : function(grille2){
				Modele.setModel(grille2)
				$grille.safeClone(Modele.grille);
			},
			modeleCreator : function(){
				if (!o.modeCreator){
					end$preview($preview);
					o.grilleCreator = $grille.slice();
					o.grilleCreator[Modele.backup.at(-1)] = 0;
				}
				o.reverse('modeCreator');				
			},
			goodGrille : function(){
				return o.modeCreator ?  o.grilleCreator : $grille ;
			},
			displayOption : function(){
				if (!( o.endGameMessage && o.columClass=='optionVisible')){
					o.deplier('columClass');
				}
				o.endGameMessage=false;
				o.fen.disp = "option";
			},
			init : function(){
				o.columClass = 'optionInvisible'
				$threadIsntUsed = true;
				Modele.playAgain();
				//set$timeout block the update of dom when user clic on replay 
				set$timeout(function (){
					o.endGameMessage=false;
					o.fen.disp = "message"
				},0);
				$grille = Modele.grille.slice();
			},
			deplier : function(columClass,bool){
				if(bool != undefined){
					o[columClass] = !bool ? 'optionInvisible' : 'optionVisible';
				}else{
					o[columClass]=(o[columClass]== 'optionVisible') ? 'optionInvisible' : 'optionVisible';
				}
			},
			$preview : function ($index){
				if (o.modeCreator){
					return (false);
				}
				if ($preview!==undefined){
					end$preview($preview)
				}
				var pos=($index+7)%7;
				if (!isNaN(pos)){
					if  ($grille[pos]==0){
						$grille[pos] = Modele.getPlayer(0);// 0 the current player 1 for the next 
					}
					$preview=pos;
				}
				
				if ($index%7!=0){
					$grille[0] = Modele.grille[0]
				}
			},
			restore : function(){
				var backup = $.cookie("backup");
				o.loadStory(backup);
			},			
			save : function(){
				$.cookie("backup",  Modele.backup)
			},
			graphique : function (colorNumber) {
				return o.tabColor[colorNumber];
			},
			undo : function(){
				if (Modele.isGameFinish()){
					darkWinningPos(false);
					Modele.isGameFinish(false);
				}
				$threadIsntUsed = true;
				var pos=Modele.undo();
				$grille[pos] = 0;
				IA.boolSmart.pop();
				if (o.isBotActive && Modele.getPlayer()==1 ){
					if (Modele.backup.length%2==0){
						o.undo();
					}else{
						// if there is a problem with the player who have to play change the player
						Modele.setPlayer(2);
					}
				}
				o.deplier( 'columClass',false );
			},
			fallenPion : function(pos){
				if (o.modeCreator){
					o.grilleCreator[pos] = $keyCode - 96 ;return //96 -> 0
				}
				if (!Modele.isGameFinish()){
					$stackPosition.push(pos);
				}	
				else{
					$stackPosition=[]
				}
				loopThreatAnimation();
			},						
			keydown : function(event){
				event.preventDefault();
				$keyCode = event.which;
				if (o.modeCreator){
					return ;
				}		
				//play at the number push on keyboard
				//numerical number (0 to 9)
				if ( $keyCode > 47 && $keyCode < 58){
					o.fallenPion( $keyCode - 48);return
				}			
				if (event.which == 90 && event.ctrlKey){
					o.undo();return
				}
				//right key and left key change the $preview  
				if ( $keyCode ==37|| $keyCode==39){
					var inc = $keyCode - 38;
					var nextPos=$preview;
					var i = 7;
					do{
						nextPos = mod(nextPos + inc,7);						
					}while( +Modele.grille[nextPos] && i--)
					o.$preview(nextPos);
					return;
				}
				//top arrow
				if ( $keyCode==38){
					o.undo();
					o.$preview();return
				}
				//bottom arrow
				if ( $keyCode==40){
					o.$preview(o.fallenPion($preview));
				}
			},
			scrollInPx : function(lg){
				var init= $(window).scrollTop();
				$(window).scrollTop(init-lg);
			},
			touchStart : function(element){
				o.displayScroll="block";
				lastY=event.touches[0].clientY;
				o.touchMove(element);
			},
			touchMove : function(element){   	
				if (o.columClass=='optionVisible' || o.columClass2=='optionVisible'){
					return false;
				}
				var width = element.P4.width();
				var pos= (event.touches.length>=1) ? event.touches[0].pageX : -1;
				if (pos<0) return false;
				pos=(pos-element.P4.offset().left)*7/width;
				pos=Math.floor(pos);
				o.$preview(pos);			
				event.preventDefault();
			},
			touchEnd : function(element){
				if (o.columClass=='optionVisible'){
					return false;
				}
				event.preventDefault();
				o.fallenPion($preview);
			},
			reverseIsBotActive : function(){
				o.reverse("isBotActive");
				if (Modele.backup.length%2 == 0){
					o.undo();
				}
			}
		})
			
		function end$preview ($index) {
			if  (Modele.grille[$index%7]%7==0){
				$grille[$index%7] = 0;
			}
		}	

		var anim = function(pos,player,callback){
			anim2 = function(i){
				if (i>6){
					$grille[i-7] = 0 ;
				}
				if (Modele.grille[i]!=0){ 
					player = (Modele.grille[i]);
				};
				$grille[i] = player;
				var clickOnUndo=Modele.grille[pos]*1==0 ;
				//test if we have click on undo during animation
				if (clickOnUndo ){
					$grille[i] = 0;
					o.$digest();
					if (callback){
						callback();
					}
					return(false);
				}
				if (i<pos ){
					$$timeout(function(){anim2(i+7)},$time);
				}else if (callback){
					set$timeout( callback , $time+1 );
				}
			};
			$$timeout(function(){
				anim2(pos%7)
			});
			if (pos%7!=0){
				$grille[0] = Modele.grille[0];
			}
		}
		
		
		
		o.init();
		$grille.safeClone(Modele.grille);		
	
		function loopThreatAnimation(){
			if (Modele.isGameFinish()){
				$stackPosition.length=0;
				$threadIsntUsed = true
				return;
			}
			if ($stackPosition.length!=0){
				if ( $threadIsntUsed){
					$threadIsntUsed=false;
					$time=o.animation2 ? 50 : 0;
					// it is possible theplayer is really fast so we record all all position where he click in $stackPosition and threat them now
					var pos=Modele.play($stackPosition.shift());
					if (pos<0){
						$threadIsntUsed = true
						return;
					}
					/*var stopAlert=false;*/
					if (Modele.isGameFinish()){
						message();
						//stopAlert=true
					}else if(Modele.grille.indexOf(0) < 0 ){
						message("égalité");
						$threadIsntUsed = true
					}
					player=Modele.getPlayer(1);
					botPlayer=Modele.getPlayer(0);
					anim(pos,player,callbackPlayer);
				}
			}
			
			function callbackPlayer(){
				function callbackBotIfActiveElsePlayer1(){
					$threadIsntUsed=true;
					if (/*!stopAlert &&*/ Modele.isGameFinish()){
						message();
					}					//threat other position if player play during animation
					loopThreatAnimation();					
				}	

				if (o.isBotActive){
					IA.setDif(o.cost);
					var posBot=IA.p4BlockEasy(pos,false);
					anim(posBot,botPlayer,callbackBotIfActiveElsePlayer1);
				}
				else{				
					callbackBotIfActiveElsePlayer1();
				}
			}
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

	
