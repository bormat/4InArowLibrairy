"use strict";
/* convention
 Array s to the end else never s they don't begin by uppercase
 Classes begin by upperCase
 private var of Class begin par $ 
*/
var forOf =function(obj, func){
	var keys  = Object.keys(obj);
	var lg = keys.length
	for (var i = 0; i < lg; i++){
			var o = keys[i];
			func(obj[o], o, obj);     
	}
}
var forOfSome = function(obj, func){
	var keys  = Object.keys(obj);
	var lg = keys.length;
	for (var i = 0; i < lg; i++){
		var o = keys[i];
		if (func(obj[o], o, obj)){
			return;
		};     
	}
	return true;//all funcs return false we return true
}
var IA
 ~function(){
	var my = IA = {
		dif:100,
		setDif:function(dif){
			my.dif=dif;
		},
		boolSmart:[],
		isModelfound:function(){
			return $isModelfound;
		}		
	}	
	var $winningRedPairs = [];
	var $winningYellowOdds = [];
	var $winningRedOdds = [];
	var $winningYellowPairs=[];	
	var $forbids=[];
	var $inadvisables=[];
	var $isModelfound = false;
	var $pos=-1;
	var $modelId = 0;
	var $pos5;
	var $modele;
	var $playAt;
	var $param;
	var $currMod;//current modele
	var j;//
	//posJoueur derniere position Modele.play 
	//si retournerPosition on ne joue pas dans la Modele.grille mais retoune la position ou Modele.play parametre parfait pour les tests TDD
	my.p4BlockEasy=function(posJoueur,retournerPosition){
		my.posJoueur = posJoueur;
		var findAt,botSmart;
		if (Modele.isGameFinish()){
				return(false);
		};
		if (parseInt(my.dif)/100+Math.random() > 1){//dif is choose by player with slider
			my.boolSmart.push("true")//play smartly
			Modele.setPlayer(1);
			fillsWinningPos();
			$isModelfound = false;
			$pos=-1;
			$modelId=0;
			findAt={modelID:0};
			$pos5 = 48;
			[
	/*0*/		gagnerDirect,											
	/*1*/		bloquerDirect,											
	/*2*/		findForbiddenAndNotRecommandedPosition,
				winInTwoTurn.bind(my, 1),
	/*3*/		modeledetectorAndAnswer.bind(my, perfectModele,{modelID:0}),
	/*4*/		function(){
					$modelId=0;
					$pos5 = 48;
					playAvecModele();
				},											
	/*5*/		playWithoutModel.bind(my, posJoueur)					
			].some(function(func,i){//i pour debug
				func();
				return ~$pos;
			})
		}else{
			//push that we don't play in 100% mode  and take a pos randomly
			my.boolSmart.push("false");
			$pos=Math.floor(Math.random()*7);
		};	
		return Modele.play($pos,retournerPosition);
	}
	var gagnerDirect = function(){
		for ( var i = 8; --i;){
			$pos = Modele.play(i,true);
			if (Modele.isGameFinish()){
					Modele.isGameFinish(false);
					return $isModelfound = true;
			}
		}
		$pos=-1;
	}

	function giveMeACheckedPosition(functionWhoReturnFalseOrPosToCheck){
		var i=0;
		var param ={isModelfound:false}
		do{
			$pos = functionWhoReturnFalseOrPosToCheck();
			if($pos < 0){
				$isModelfound=false;
				break;
			}
			param = wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, $pos);
			$isModelfound = !param.isModelfound;
		} while(i++,param.isModelfound && i<7);
	}
	
	function playAvecModele(){
		var param= {modelID:0};
		var j = 0;
		$pos5 = 48;
		$modelId = 0;
		var pos2 = function rec(){
			var TabOfTab=[attaque,defense,miniDef,mesModele]
			for(;j < TabOfTab.length;j++ ){
				while (1){
					if(!($modelId < TabOfTab[j].length)){
						break;
					}
					var position3 = modeledetectorAndAnswer(TabOfTab[j]) ;
					$modelId/*=param.modelID*/;
					if ( ~position3){
						ifPlayHereGiveMeExactPos(position3);
						if (~$pos){
							var isPosBad = wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, $pos);
							if(isPosBad){
								rec();
							}
							return $pos;
						}
						$pos5--;
					}
					$modelId = param.modelID = ++$modelId;
				}
				$modelId = param.modelID = 0;
				$pos5 = 48;
			}
			$pos5 ="notFound";
			return -1;
		}();
		return pos2;
	}	
	
	
function falseOrModelIfFound(param){
	if (param.isModelfound){
		return param;
	}
	return false;
}	
//return boolean true if after play to a position a model is matched
function wontBecomeLikeThisModel(TabWontBecomeLikeThisModel, player, posBot){
	if(posBot<0){return {}}
		
	var param;
	posBot = Modele.play(posBot,true);
	Modele.grille[posBot]  = player;
    for (var i=0; i<7  ;i++){
		var pos=Modele.play(i,true);
		Modele.grille[pos]=2;
		if (~pos){
			$isModelfound = ! forOfSome(TabWontBecomeLikeThisModel, function(mod){
				param= structModelDetector(mod, 48) ;
				if (param.isModelfound){
					return true;
				}
			})
			Modele.grille[pos]=0;
			if ($isModelfound){
				$inadvisables.push(parseInt(posBot))
				break;
			};
		}
	}
	Modele.grille[posBot]=0;
	pos= param.isModelfound ? -1 : pos;
	return param;
}

function wontBecomeLikeThisModel2(TabWontBecomeLikeThisModel, player, posBot){
	if(posBot<0){return false}
	var lastMod;
	var param={};
	posBot = Modele.play(posBot,true);
	Modele.grille[posBot]  = player;
    for (var i=0; i<7  ;i++){
		var pos=Modele.play(i,true);
		Modele.grille[pos]=2;
		if (~pos){
			$isModelfound = ! forOfSome(TabWontBecomeLikeThisModel, function(mod){
				lastMod = mod;
				param = structModelDetector(mod, 48) ;
				if (param.isModelfound){
					return true;
				}
			})
			Modele.grille[pos]=0;
			if ($isModelfound){
				$inadvisables.push(parseInt(posBot))
				break;
			};
		}
	}
	Modele.grille[posBot]=0;
	pos= param.isModelfound ? -1 : pos;
	return param.isModelfound;
}

var futureIWant=function(param,ModelInStruct,pos){
	for (var j=0; j<7 && !param.isModelfound; j++){
		var pos3 = Modele.play(j,true);
		if (~pos3){
			Modele.grille[pos3]=1;
			param=findModel(ModelInStruct ,pos);
			Modele.grille[pos3]=0;
		}
	}
	if (param.isModelfound){
		$currMod = ModelInStruct.tab;
		$playAt = pos3;
	}
	$isModelfound = param.isModelfound;
	return param;
}

function findModel(ModelInStruct ,pos){
			var param ={}
			$currMod = ModelInStruct.tab;
			$isModelfound=false;
			if( !ModelInStruct.hasOwnProperty("logicalOperator") ){
				forOfSome($currMod, function(mod){
					param=modeleDetector3(mod, pos);
					if ( param.isModelfound ){
						return true;
					}
				})
			}else{// by default it is the operator or between Model else do the next code
				var otherOption={}
				var length=(ModelInStruct.hasOwnProperty("sym")) ? 1 : 2 ;
				for (var j=0;j<length && $isModelfound===false; j++){
					if (ModelInStruct.hasOwnProperty("sameSym") && length == 2){
						otherOption.sym=Boolean(j);
					}
					var stringToEVal="param=";
					var logicalOperator = ModelInStruct.logicalOperator;
					for (var i=0; i<logicalOperator.length-1; i++){
							stringToEVal+=logicalOperator[i]+" falseOrModelIfFound(modeleDetector3(ModelInStruct.tab["+i+"],pos,otherOption)) ";
					}
					stringToEVal+=logicalOperator[i];
					eval(stringToEVal);
					$isModelfound=param.isModelfound;
				}
			}
			$currMod = ModelInStruct.tab;
			return param ;
		}

/*param{
	isModelfound : false or true always exist 
	playAt : position to play if the modele is found 
	theTab: contain the tab found it can be a futureTab or a  (present) tab 
	pos : the position or the modele is found in the grille
	param.sameSym : BooleanValue forces the symmetry to be the same for all model of the struct 
	param.sym : BooleanValue force the symetry to be true or false 
}*///fstruct
function structModelDetector(ModelInStruct,pos){
	var param = {};
	$currMod = ModelInStruct.theTab;
	param = findModel(ModelInStruct ,pos);
	//if we can reach a futur model that is not already reached
	if(ModelInStruct.mode == "futur" ){
		param = param.isModelfound ? {isModelfound:false} : futureIWant(param,ModelInStruct,pos);
	}
	//watch exeptions if model found
	if (param.isModelfound){
		var exept = ModelInStruct.exept;
		param.theModelISelf = ModelInStruct;
		if(exept){
			exept.sym = param.sym;
			if(structModelDetector(exept, 48).isModelfound){
				param.isModelfound=false;
			}
		}
		if(ModelInStruct.hasOwnProperty("playAt")){
			$playAt =  ModelInStruct.playAt;
		}
	}
	$isModelfound = param.isModelfound;
	return param;
}



function propertyExist(prop){
	return (prop!="")
}


//push where don't play without modele
function detectBadPositionAlgorythme(){
	for (var i=0;i<7;i++){
		Modele.setPlayer(1);
		var pos = Modele.play(i,true);
		Modele.grille[pos]="1";
		if (~winInTwoTurn(2)){
			$inadvisables.push(pos);
		}
		$isModelfound = false;
		Modele.grille[pos]=0;
	}
	Modele.setPlayer(1);
}
	
//compte les positions gagnantes crées si on joue dans les 7 poositions possibles et joue là ou il faut pour gagner en 2 coups
//ne fonctionne pas pour toutes les grilles de jeu
function winInTwoTurn(playerTurn){
	for(var i=0;i<7;i++){
		Modele.setPlayer(playerTurn);
		$pos=Modele.play(i,true);
		if ( playerTurn==1 ? $forbids.indexOf($pos) < 0 : !comparerLigne("g",$pos-7)){
			var position2=$pos;
			Modele.grille[$pos]=playerTurn;
			var cptGagnerDirect=0;
			for(var o=0;o<7;o++){
				$pos = Modele.play(o,true);
				if (Modele.isGameFinish() && ~$pos){
					cptGagnerDirect++;
					//si il y a une position gagnante au dessus d'une autre 
					var WinnerPos= Modele.getPlayer() == 1 ? "g" : "i";
					var otherPlayerWinOnMe=(Modele.getPlayer() == 1) ? false: comparerLigne("g",$pos);
					if ( (cptGagnerDirect == 1 && comparerLigne(WinnerPos,$pos-7) )|| (cptGagnerDirect >1 && !otherPlayerWinOnMe) ){	
						Modele.grille[position2] = 0;
						$pos = i;
						$isModelfound = true;
						return(i);
					}
				}
			}
			Modele.grille[position2]=0;
		}
	}
	return $pos = -1;
}
	function getListOfMatchingPos(findAt){
		var tabPosInBigGrille=[];
		//on cherche le modele
		var model = $modele[findAt.modelID = $modelId]
		$param = structModelDetector(model, $pos5);
		$currMod = $param.theTab;
		$pos = $param.pos;
		if($currMod){
			$currMod  = (Array.isArray($currMod[0]) ? $currMod[0] : $currMod);
		}
		//si trouvé 
		if ( $isModelfound==true ){			
			if (Array.isArray($playAt)){
				for (var u=0;u<$playAt.length ;u++){	
					tabPosInBigGrille.push(addPosOkToGroup($playAt[u]))
				}
			}else{
				tabPosInBigGrille.push(addPosOkToGroup($playAt));
			}
			$pos5=beginToEnd($pos);
		}else{//si pas trouvé 
			$pos5 = 48;
		}
		return tabPosInBigGrille;
	}
	
	var addPosOkToGroup = function (posRelativeToModele){
		if( $param.theModelISelf && $param.theModelISelf.mode == "futur"){
			return $playAt;
		}else{
			return $pos + positionOfSym(posRelativeToModele,$currMod[0].length, $param.sym);
		}
	}
			
	function beginToEnd(begin){
		return begin + $currMod.length*7-7;
	}
	
	//fmodele
	var modeledetectorAndAnswer=my.modeledetectorAndAnswer = function (modele,findAt){
		if (findAt){
			$modelId = 0;
		}else{
			var findAt = {};
		}
		$modele=modele;
		$param={isModelfound:false};
		var tab=[];
		while ( $modelId < modele.length && $param.isModelfound==false){
			tab = getListOfMatchingPos(findAt);	
			findAt.modelID++;
			$modelId = findAt.modelID;
		}
		$pos = tab[0];
		findAt.modelID--;
		$modelId--;
		$isModelfound=$param.isModelfound;
		return $pos = !$isModelfound ? -1 : $pos;
	}

	function findForbiddenAndNotRecommandedPosition(){
		$forbids.length = $inadvisables.length = 0;
		dontHelpJ2($forbids);
		detectBadPositionAlgorythme();
		var findAt = {};
		$pos5 = 48;
		$param={isModelfound:false};
		var tabForbids=[modPosDeconseille,interditUnPeu];
		for ( var o=0 ; o < tabForbids.length ;o++){
			$modele=tabForbids[o];
			$modelId = 0;
			while ($modelId< $modele.length ){
				//tant que le modele est trouvé on continue de le chercher et de pusher les positions interdites 
				var tab = getListOfMatchingPos(findAt);
				if ($param.isModelfound==false ){
					$pos5 = 48;
					$modelId++;

				}else{
					Array.prototype.push.apply($inadvisables, tab)
					$pos5--;
				}
			}
		}
		notUnderMe($inadvisables);
		DeleteException();	
	}


	function DeleteException(){
		var findAt={}
		$modelId = 0;
		$pos5 = 48;
		while($modelId  < mesModele.length){
			modeledetectorAndAnswer(tabException);
			if (~$pos){
				var position = $pos;
				var pos= $inadvisables.indexOf(position)
				while ( ~pos ){
					$inadvisables.splice(pos,1);
					pos= $inadvisables.indexOf(position)
				}	
				$pos5--;
			}
			else
			{
				break;
			}
		}
	}

	function isModeleBottomFlat(oneModele){
		return forOfSome(oneModele.at(-1), function(pos){
			if (pos!='a' && pos!='9'){
				return true;
			}
		}) 
	}
	my.modeleDetector4=modeleDetector4;
	function modeleDetector4(oneModeleAndTheAnswer,position){
		var r=modeleDetector3(oneModeleAndTheAnswer[0],position)
		$pos = r.pos;
		$playAt = oneModeleAndTheAnswer[1];
		$currMod = oneModeleAndTheAnswer[0];
		if(!r.isModelfound){
			$pos = -1;
		}
		return r;
	}
	my.modeleDetector3=modeleDetector3;
	function modeleDetector3(oneModele,position,otherOption){
		var sym=true;
		var dontChangeSym=false;
		var otherOption = otherOption || {}
		if (otherOption.hasOwnProperty("sym")){
			sym=otherOption.sym
			dontChangeSym=true;
		}
		var posOneModeleSym2={ true:{pos:position}, false:{pos:position} };
		var stopLoopCond=function(){
			var posSym = posOneModeleSym2[sym].pos
			var pos = posOneModeleSym2[!sym].pos
			return (posOneModeleSym2[sym].isModelfound || otherOption.hasOwnProperty("samepos") 
					|| (posSym < 0  && pos < 0)  || (dontChangeSym && posSym < 0));
		}
		do {
			var poses = posOneModeleSym2[sym]=modeleDectector1(oneModele,posOneModeleSym2[sym].pos,sym);
			if (!poses.isModelfound ){
				//if we haven't the place to find the model at this pos go back until we have the place
				poses.pos = Math.min(Math.ceil(poses.pos/7)*7 - oneModele[0].length, poses.pos-1);
				sym= !dontChangeSym && !sym;
			}
		} while( !stopLoopCond() );
		$isModelfound = posOneModeleSym2[sym].isModelfound;
		//$currMod = oneModele;
		return { pos: posOneModeleSym2[sym].pos-7*(oneModele.length-1), sym:sym, isModelfound: $isModelfound, theTab:oneModele};
	}

	
	my.modeleDectector1=modeleDectector1;
	function modeleDectector1(oneModele,posOneModele,sym){
		if ( posOneModele !==false ){
			for (var i = 0; i++ < oneModele.length ;){//i from 1 to lenght
				var line= oneModele.at(-i);
				if (sym){ 
					line = line.reverse();
				}
				if (!comparerLigne(line,posOneModele-7*(i-1))){
					break;
				}				
			}
			if (i > oneModele.length){//if model found
				return { pos:posOneModele, isModelfound:true };
			}
		}
		return { pos: posOneModele, isModelfound:false }; 
	}
	
	function topToBottom (pos, length){
		return ( pos + length*7 -7 )
	}
	
	function bottomToTop (pos, length){
		return ( pos + ~length * 7 )
	}
	
	//fcomparerLigne
	// compare le modele avec une ligne de même longueur que le modele dans Modele.grille commençant à  l'indice o 
	//h rouge ne gagne pas a cette ligne 
	//g jaune gagne à cette ligne 
	//e si il n'y a pas de paire gagnant rouge j2 sur cette colonne et valeur vaut 0 
	//w inverse de e
	//p iil n'y a pas de impaire jaune gagnant 
	//q il y a un impaire jaune gagnant 
	//i les rouges gagne à cette ligne contraire de h
	//j jaune ne gagne pas à cette ligne inverse de g
	//. combiner de  j et i ouais  ils ont un point en commun haha ok je sort
	//r combiner de e et g jaune gagne à cette ligne et pas de rouge pair gagnant en dessous
	// t position déconseillé/interdite
	
	my.comparerLigne=comparerLigne;
	function comparerLigne(modligne,o) 
	{
		if (o <0) return false;
		var cont= true
		for (var i=o;i< modligne.length + o  && cont;i++){
				var a=modligne.charAt(i - o);
				var a=""+a;
				var b=Modele.grille[i];	
				if (o <0) return false;
				var impaire=Math.floor(i/7)%2;
				if (Modele.grille[i]==0 )
				{	
					var gotonextif=false;
					switch(a)
					{
						case 'q':case 'p':						
								cont = $winningRedPairs[i%7] < $winningYellowOdds[i%7];
								if (a =='p') cont = !cont  ;
								break;
						case 'e': case 'r': case 'w':
								cont = $winningRedPairs[i%7] < $winningYellowOdds[i%7]|| $winningYellowOdds[i%7]==-1;
								//ne pas prendre en compte les pairs au dessus de la position 
								cont= cont && (($winningRedPairs[i%7]<=i));
								if (a == 'w') cont =!cont ;
								if (a !='r')break;							
						case 'g':case 'j':case '.':case 'f':
								Modele.grille[i]=1;
								cont= cont && Modele.isGameFinish(i);
								if (a == 'j' || a == '.')cont = !cont;
								if (a !='.' && a !='f' ||  !cont){
									break;
								}
						case 'h':case 'i':
								Modele.grille[i]=2;
								cont = (Modele.isGameFinish(i));
								if (a == 'h' || a =='f')cont = !cont;
								break;
						case 't':
								cont = ($inadvisables.indexOf(i)+1);
								break;					
						default:							
								var gotonextif=true; 
					}
					Modele.grille[i]=0;
				}
				if (Modele.grille[i]!=0 || gotonextif)
				{
					cont = (comparerCaractere( a,b,impaire));
				}
				
				if (( cont) && (i >  modligne.length - 2 + o  ))
				{
							//return if line are equals 
							return 	cont
				}
		}
	}

	
	Array.prototype.has = function(variable){
		return ~this.indexOf(variable);
	}

	

	//fcomparerCaractere
	//5 peu importe et
	//1 pour j1 et 2 pour j2 0 pour vide 
	//3 pour un j1 en paire 4 pour un j1 en impaire 
	//6 pas de 0 mais la position doit exister
	//7 pour j2 en paire et 8 pour j2 en impaire 
	//9 pas de 0 renvoie true si la position n'existe pas
	//g indique une position gagnante en mettant un pion adverse à cette position 
function comparerCaractere (carMod,car,impaire){	
	car+="";
	var a =carMod +"" ;
	return (
		impaire && a == 8 && car == 2 || impaire && a == 4 && car == 1 
	)||(
		!impaire && (car == 1 && a ==3 || (a ==7 && car == 2) )
	)||(
		car == a
	)||(
		a =='a'
	)||(
		a =='y' && car != 2
	)||(
		a =='z' && car !=1
	)||(
		a =='9' && car !=0
	)||(
		carMod =='6' && ["1","2"].has(car)
	)||(
		carMod =='5' && ["1","2","0"].has(car)
	);			
}


	function bloquerDirect (){
	//cherche un endroit ou l'adversaire gagne pour le bloquer 
		Modele.nextPlayer();
		for ( var i = 0;i<7;i++){
			$pos = Modele.play(i,true);
			if (Modele.isGameFinish()){
					Modele.nextPlayer();
					return $pos=Modele.play($pos,true);
			}		
		}
		Modele.nextPlayer();
		$pos = -1;
	}
	//remplit $forbids
	function dontHelpJ2($forbids){
		for ( var i = 0;i<7;i++)
		{
			var position=Modele.play(i,true);
			//on la mit en fictif avec le parametre true  mais il faut qu'il reste dans la Modele.grille 
			Modele.grille[position]="1";
			Modele.nextPlayer();
			Modele.play(i,true);
			Modele.nextPlayer();
			//supprimer le pion rajouté précédemment 
			Modele.grille[position]="0";

			if (Modele.isGameFinish() && position !=$forbids[$forbids.length-1] && position >= 0)
			{
					$forbids.push(position);
			}		
		}
	}

	//ne pas Modele.play dessous un endroit ou on gagnerais en jouant au dessus 
	function notUnderMe($inadvisables){
		// ne pas Modele.play dessous un endroit ou l'on gagne 
		for ( var i = 0;i<7;i++){
			Modele.nextPlayer();
			var position=Modele.play(i,true);
			//on la mit en fictif avec le parametre true  mais il faut qu'il reste dans la Modele.grille 
			Modele.grille[position]="2";		
			Modele.nextPlayer();
			Modele.play(i,true);
			//supprimer le pion rajouté précédemment 
			Modele.grille[position]="0";		
			if (Modele.isGameFinish()){
				//rajouter la position en déconseillé 
				if (position !=$inadvisables.at(-1) && position >=0)				
				{
						if (position >=0){
							$inadvisables.push(position);
						}
				}
			}				
		}

	}

	//retourne ou Modele.play sinon -1
	function ifPlayHereGiveMeExactPos(posJoueur){
		posJoueur=parseInt(posJoueur);
		posJoueur=Modele.play(posJoueur,true);
		if (~posJoueur){
			var cond1 = ~$forbids.indexOf(posJoueur) ;
			var cond2 = ~$inadvisables.indexOf(posJoueur);
			if (!(cond1 || cond2)){
				$isModelfound = true
				posJoueur = Modele.play(posJoueur,true);
				$pos = posJoueur;
				return(posJoueur);
			}
		}
		return($pos = -1);
	}
	function positionOfSym(pos,length,sym){
		return pos += sym && mod(length + ~pos, 7) - pos%7 ;
	}
	
	my.positionOfSym=positionOfSym;
	//remplit la position gagnante la plus basse en pair pour le j2 rouge et et impaire pour le j1 jaune 
	my.fillsWinningPos=fillsWinningPos;
	function fillsWinningPos(){
	//initialiser les 2 tableaux -1 = pas de position gagnante sur cette colonne sinon c'est la position 

		for(var o=0; o<7 ;o++){
			$winningYellowPairs[o]= -1;
			$winningRedPairs[o]= -1;
			$winningYellowOdds[o]= -1;
			$winningRedOdds[o]= -1;
		}

		for(var o=42; o>0; o--){
			if ( Modele.grille[o]==0 ){
				Modele.grille[o]=1;
				var trouvePlayerImpaire=$winningYellowOdds[o%7];
				var trouveBotPaire=$winningRedPairs[o%7];
				var trouvePlayerPaire=$winningYellowPairs[o%7];
				var trouveBotImpaire=$winningRedOdds[o%7];

				if ( Math.floor(o/7)%2==1 && trouvePlayerImpaire== -1 && Modele.isGameFinish(o)){				
					$winningYellowOdds[o%7]=o;
				}
				else if ( Math.floor(o/7)%2==0 && trouvePlayerPaire== -1 && Modele.isGameFinish(o)){				
					$winningYellowPairs[o%7]=o;
				}
				
				Modele.grille[o]=2;
				if ( (Math.floor(o/7)%2)==0 && trouveBotPaire==-1 && Modele.isGameFinish(o)){
					$winningRedPairs[o%7]=o;
				}
				else if ( (Math.floor(o/7)%2)==1 && trouveBotImpaire==-1 && Modele.isGameFinish(o)){
					$winningRedOdds[o%7]=o;
				}
				Modele.grille[o]=0;

			}
		}		
	}

	//teste toute position à partir de u et joue à celle pas interdite  
	function joueToutePosition(u){
		$pos=-1;
		for (var i=u-7;i < u && $pos < 0 ;i++  ){
			ifPlayHereGiveMeExactPos(i);
		}		
	}

	function playWithoutModel(){
		var firstTurn = true;
		loop1:do {
			joueToutePosition(my.posJoueur);
			if (~$pos && firstTurn){//si une position est jouable
				do{//ttque qu'une position est jouable on interdit celles qui amenent au badmodel
					if(!wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, $pos)){
						break loop1;
					}	
					joueToutePosition(my.posJoueur);
				}while (~$pos);
				firstTurn = false;
			}
		}while($inadvisables.pop() || $forbids.pop());
	}
}();
	
