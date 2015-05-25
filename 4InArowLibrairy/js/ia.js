"use strict";

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

var IA = new function(){
	var self=this;
	this.dif=100;
	this.setDif=function(dif){
		self.dif=dif;
	}
	var tabPosGananteRougePaire=[];
	var tabPosGananteJauneImpaire=[];
	var tabPosGananteRougeImpaire=[];
	var tabPosGananteJaunePaire=[];	
	var posInterdite=[];
	var posDeconseille=[];
	var	tabDiagoRight=[];//demis diagonnale vers la droite de haut en bas 
	var	tabDiagoLeft=[];//demis diagonnale vers la gauche de haut en bas 
	this.boolSmart=[];

	//posJoueur derniere position Modele.play 
	//si retournerPosition on ne joue pas dans la Modele.grille mais retoune la position ou Modele.play parametre parfait pour les tests TDD
	this.p4BlockEasy=function(posJoueur,retournerPosition)
	{
		var botSmart = parseInt(self.dif)/100+Math.random() > 1 //dif is choose by player with slider
		if (Modele.isGameFinish()){
				return(false);
		};
		if (botSmart){
			this.boolSmart.push("true")
			Modele.setPlayer(1);
			fillsWinningPos();	
			var pos = false;
			for(var step=0;step<6 && (pos >48 || pos<0 || pos===false );step++){
				switch(step){
				case 0:
						pos=gagnerDirect();break;
				case 1: 
						pos=bloquerDirect(true);break;
				case 2: 
						findForbiddenAndNotRecommandedPosition();
						pos=gagneEn2Coup(1);
						break;
				case 3: 
						var findAt={modelID:0,positionInGrille:48};
						pos=modeledetectorAndAnswer(perfectModele,findAt);
						break;
				case 4:	
						pos=giveMeACheckedPosition(function(){ 
							findAt={modelID:0,positionInGrille:48,tabNumber:0};
							return (playAvecModele(findAt))
						})
						break;
				case 5: 
						pos=giveMeACheckedPosition(function(){
							return (playSansModele(posJoueur));
						})
						if (pos===false){
							playSansModele(posJoueur);
						}
						break;
				}
			}
		}else{
			//push that we don't play in 100% mode  and take a pos randomly
			this.boolSmart.push("false");
			var pos=Math.floor(Math.random()*7);
		};	
		return Modele.play(pos,retournerPosition);
	}

	function giveMeACheckedPosition(functionWhoReturnFalseOrPosToCheck){
		var i=0;
		do{
			var pos = functionWhoReturnFalseOrPosToCheck();
			if(pos === false){
				break;
			}
			var param = wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, pos);
			i++;
		} while(param.isModelfound && i<7);
		return pos;
	}

	
	function playAvecModele(findAt){
		var TabOfTab=[attaque,defense,miniDef,mesModele]
		var pos=false;
		while(findAt.tabNumber < TabOfTab.length ){
			while (findAt.modelID < TabOfTab[findAt.tabNumber].length){
				var position = modeledetectorAndAnswer(TabOfTab[findAt.tabNumber],findAt);
				if ( position!==false){
					var pos=ifPlayHereGiveMeExactPos(position);
					if (pos!==false){
						return pos;
					}
					findAt.positionInGrille--;	
				}
				findAt.modelID++;
			}
			findAt.modelID = 0;
			findAt.positionInGrille=48;
			findAt.tabNumber++;
		}
		findAt.positionInGrille="notFound";
		return false;
	}	
	
	
function falseOrModelIfFound(param){
	if (param.isModelfound){
		return param;
	}
	return false;
}	
//return boolean true if after play to a position a model is matched
function wontBecomeLikeThisModel(TabWontBecomeLikeThisModel, player, posBot){
	var isModelfound=false
	var param;
	posBot = Modele.play(posBot,true);
	Modele.grille[posBot]  = player;
    for (var i=0; i<7 && !isModelfound;i++){
		var pos=Modele.play(i,true);
		Modele.grille[pos]=2;
		if (pos >= 0 ){
			isModelfound = ! forOfSome(TabWontBecomeLikeThisModel, function(mod){
				param= structModelDetector(mod, 48) ;
				if (param.isModelfound){
					return true;
				}
			})
			if (isModelfound){
				posDeconseille.push(parseInt(posBot));
			}		
			Modele.grille[pos]=0;
		}
	}
	Modele.grille[posBot]=0;
	return param;
}

var futureIWant=function(param,ModelInStruct,pos,otherOption){
	var theTab=ModelInStruct.tab;
	for (var j=0; j<7 && !param.isModelfound; j++){
		var pos3 = Modele.play(j,true);
		if (pos3 >= 0 && pos3!==false ){
			Modele.grille[pos3]=1;
			param=findWithOrWithoutLogicalOperator(param,ModelInStruct ,pos);
			Modele.grille[pos3]=0;
		}
	}
	if (param.isModelfound){
		param.theTab = theTab;
		param.playAt = pos3;
	}
	return param;
}

function findWithOrWithoutLogicalOperator(param,ModelInStruct ,pos){
			var otherOption={}
			var theTab = ModelInStruct.tab;
			var isModelfound=false;
			if( !ModelInStruct.hasOwnProperty("logicalOperator") ){
					forOfSome(theTab, function(mod){
						param=modeleDetector3(mod, pos, otherOption);
						if ( param.isModelfound ){
							return true;
						}
					})
			}else{// by default it is the operator or between Model else do the next code
				var length=(ModelInStruct.hasOwnProperty("sym")) ? 1 : 2 ;
				for (var j=0;j<length && isModelfound===false; j++){
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
					isModelfound=param.isModelfound;
				}
			}
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
	var param={isModelfound:false};
	var otherOption={};
	if (ModelInStruct.hasOwnProperty("sym")){
		//otherOption.sym=ModelInStruct.sym
	}
	var theTab= ModelInStruct.tab ;
	if ( ModelInStruct.hasOwnProperty("samePos")){
		//otherOption.samePos=true
		//otherOption.posTopLeftIWant=ModelInStruct.posTopLeftIWant;
	}
	param =findWithOrWithoutLogicalOperator(param,ModelInStruct ,pos);
	//if we can reach a futur model that is not already reached
	if( !param.isModelfound && ModelInStruct.mode == "futur" ){
		param = futureIWant(param,ModelInStruct,pos,otherOption)
	}
	//watch exeptions if model found
	if (param.isModelfound){
		param.theTab=theTab;
		if (ModelInStruct.hasOwnProperty("exept")){
			if (ModelInStruct.exept.hasOwnProperty("sameSym") && ModelInStruct.exept.sameSym===true ){
				ModelInStruct.exept.sym=param.sym
			}
			if ( ModelInStruct.exept.hasOwnProperty("samePos")){
				var posBottomLeftIWant= topToBottom(param.pos, ModelInStruct.exept.tab[0].length)
				ModelInStruct.posTopLeftIWant=param.pos;
				var param2=structModelDetector( ModelInStruct.exept, posBottomLeftIWant)
				if (param2.isModelfound==true ){
					if (param2.positionInGrille==param.positionInGrille){
						param.isModelfound=false;
					}
				}
			}else{
				ModelInStruct.exept.samePosAt=false;
				var param2=structModelDetector( ModelInStruct.exept, 48 )
				if (param2.isModelfound==true ){
					param.isModelfound=false;
				}				
			}
		}
		param.theModelItSelf = ModelInStruct;
		/*if (ModelInStruct.hasOwnProperty("otherCondToBeTrue") && propertyExist(ModelInStruct.otherCondToBeTrue) ){
			pos2=ModelInStruct.otherCondToBeTrue(param);
		}*/
		if (ModelInStruct.hasOwnProperty("playAt")){
			param.playAt=ModelInStruct.playAt
			param.theTab=ModelInStruct.tab;
		}
	}
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
		var j2Win=gagneEn2Coup(2);
		if (j2Win!==false){
			posDeconseille.push(pos);
		}
		Modele.grille[pos]=0;
	}
	Modele.setPlayer(1);
}
	
//compte les positions gagnantes crées si on joue dans les 7 poositions possibles et joue là ou il faut pour gagner en 2 coups
//ne fonctionne pas pour toutes les grilles de jeu
function gagneEn2Coup(playerTurn){
	for(var i=0;i<7;i++){
		Modele.setPlayer(playerTurn);
		var pos=Modele.play(i,true);
		var cond = (playerTurn==1)	? positionInterdite(pos,posInterdite) : comparerLigne("g",pos-7);
		if (!cond){
			var position2=pos;
			Modele.grille[pos]=playerTurn;
			var cptGagnerDirect=0;
			for(var o=0;o<7;o++){
				//
				var pos = Modele.play(o,true);
				if (Modele.isGameFinish() && pos >=0){
					cptGagnerDirect++;
					//si il y a une position gagnante au dessus d'une autre 
					var WinnerPos=(Modele.getPlayer() == 1) ? "g" : "i";
					var otherPlayerWinOnMe=(Modele.getPlayer() == 1) ? false: comparerLigne("g",pos);
					if ( (cptGagnerDirect == 1 && comparerLigne(WinnerPos,pos-7) )|| (cptGagnerDirect >1 && !otherPlayerWinOnMe) ){	
						Modele.grille[position2] = 0;
						return(i);
					}
				}
			}
			Modele.grille[position2]=0;
		}
	}
	return false;
}
	this.positionOfSym=positionOfSym;
	//retourne si la position est interdite ou non 
	function positionInterdite(position,posInterdite){
		return ( posInterdite.indexOf(position) >= 0 ) ;
	}
	function getListOfMatchingPos(findAt){
		var tabPosInBigGrille=[];
		var nbLine;
		//on cherche le modele
		var model = findAt.modele[findAt.modelID]
		findAt.isModelfoundParams = Array.isArray(model) ? 
			modeleDetector4(model, findAt.positionInGrille)
		:
			structModelDetector(model, findAt.positionInGrille)
		;
		//si trouvé 
		if ( findAt.isModelfoundParams.isModelfound==true ){			
			if (Array.isArray(findAt.isModelfoundParams.playAt)){
				for (var u=0;u<findAt.isModelfoundParams.playAt.length ;u++){	
					nbLine = addPosOkToGroup(findAt.isModelfoundParams.playAt[u] , findAt,tabPosInBigGrille)
				}
			}else{
				nbLine = addPosOkToGroup(findAt.isModelfoundParams.playAt, findAt,tabPosInBigGrille);
			}
			findAt.positionInGrille=beginToEnd(findAt.isModelfoundParams.pos, nbLine);
		}else{//si pas trouvé 
			findAt.positionInGrille=48;
		}
		return tabPosInBigGrille;
	}
	
	var addPosOkToGroup = function (posRelativeToModele, findAt,tabPosInBigGrille){
			var theTab =findAt.isModelfoundParams.theTab[0];
			if (Array.isArray(theTab)){
				var nbLine=theTab.length;
				theTab=theTab[0];
			}else{
				var nbLine=findAt.isModelfoundParams.theTab.length;
			}
			if( findAt.isModelfoundParams.theModelItSelf && findAt.isModelfoundParams.theModelItSelf.mode == "futur"){
				var positionmodele = findAt.isModelfoundParams.playAt;
			}else{
				var positionmodele = findAt.isModelfoundParams.pos + positionOfSym(posRelativeToModele,theTab.length, findAt.isModelfoundParams.sym);
			}
			tabPosInBigGrille.push(positionmodele);
			return [nbLine,];
		}
			
	function beginToEnd(begin,nbLine){
		return begin + nbLine*7-7;
	}
	
	//fmodele
	this.modeledetectorAndAnswer =modeledetectorAndAnswer;
	function modeledetectorAndAnswer(modele,findAt){
		findAt.modele=modele;
		var positionToPlay;
		findAt.isModelfoundParams={isModelfound:false};
		var tab=[];
		while ( findAt.modelID<modele.length && findAt.isModelfoundParams.isModelfound==false){
			tab = getListOfMatchingPos(findAt);	
			findAt.modelID++;
		}
		for(var i = tab.length;i--;){
				positionToPlay = tab[0];
				findAt.modelID--;
		}
		return (findAt.isModelfoundParams.isModelfound===false) ? false : positionToPlay;
	}
	


	function findForbiddenAndNotRecommandedPosition(){
		posDeconseille=[];
		posInterdite=[];
		dontHelpJ2(posInterdite);
		detectBadPositionAlgorythme();
		var findAt = {positionInGrille:48};
		findAt.isModelfoundParams={isModelfound:false};
		var tabForbids=[modPosDeconseille,interditUnPeu];
		for ( var o=0 ; o < tabForbids.length ;o++){
			findAt.modele=tabForbids[o];
			findAt.modelID=0;
			while (findAt.modelID < findAt.modele.length ){
				//tant que le modele est trouvé on continue de le chercher et de pusher les positions interdites 
				var tab = getListOfMatchingPos(findAt);
				if (findAt.isModelfoundParams.isModelfound==false ){
					findAt.positionInGrille=48;	
					findAt.modelID++;
				}else{
					Array.prototype.push.apply(posDeconseille, tab)
					findAt.positionInGrille--;
				}
			}
		}
		notUnderMe(posDeconseille);
		DeleteException();	
	}


	function DeleteException(){
		var findAt={}
		findAt.modelID = 0;
		findAt.positionInGrille=48;;
		while( findAt.modelID < mesModele.length)
		{
			var position=modeledetectorAndAnswer(tabException,findAt);
			if (position!==false)
			{				
				position=parseInt(position);
				var pos= posDeconseille.indexOf(position)
				while ( pos>=0 )
				{
					posDeconseille.splice(pos,1);
					pos= posDeconseille.indexOf(position)
				}			
				findAt.positionInGrille--;
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
	this.modeleDetector4=modeleDetector4;
	function modeleDetector4(oneModeleAndTheAnswer,position){
		var r=modeleDetector3(oneModeleAndTheAnswer[0],position)
		r.playAt=oneModeleAndTheAnswer[1];
		return r;
	}
	this.modeleDetector3=modeleDetector3;
	function modeleDetector3(oneModele,position,otherOption){
		var sym=true;
		var dontChangeSym=false;
		var otherOption = otherOption || {}
		if (otherOption.hasOwnProperty("sym")){
			sym=otherOption.sym
			dontChangeSym=true;
		}
		
		//var flat = isModeleBottomFlat(oneModele);		
		var posOneModeleSym2={ true:{pos:position}, false:{pos:position} };
		var continueLoopCond=function(){
			if (posOneModeleSym2[sym].isModelfound || otherOption.hasOwnProperty("samepos")){
				return false;
			}
			if ( posOneModeleSym2[!sym].pos < 0 ){
				if (posOneModeleSym2[sym].pos < 0 ){
					return false;
				}
			}
			if (dontChangeSym && posOneModeleSym2[sym].pos < 0 ){
				return false;
			}
			return true;			
		}		
		do {
			try {
			posOneModeleSym2[sym]=modeleDectector1(oneModele,posOneModeleSym2[sym].pos,sym);
			}catch(e){
				alert(e)
			}
			if (!posOneModeleSym2[sym].isModelfound ){
				posOneModeleSym2[sym].pos -=  1+positiveOrFalse( (posOneModeleSym2[sym].pos-1)%7 + oneModele[0].length -7)
				if (!dontChangeSym){
					sym=!sym;
				}
			}
		} while( continueLoopCond() );
		
		return { pos: posOneModeleSym2[sym].pos-7*(oneModele.length-1), sym:sym, isModelfound: posOneModeleSym2[sym].isModelfound, theTab:oneModele};
	}
	
	this.modeleDectector1=modeleDectector1;
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
			if (i > oneModele.length){
				return { pos:posOneModele, isModelfound:true };
			}
		}
		return { pos: posOneModele, isModelfound:false }; 
	}
				
				
	function positiveOrFalse(pos){
		return pos > 0 ? pos : false;
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
	
	this.comparerLigne=comparerLigne;
	function comparerLigne(modligne,o) 
	{
		if (o <0) return false;
		var continuerBoucle= new bol(true)
		for (var i=o;i< modligne.length + o  && continuerBoucle.b;i++)
		{
				var a=modligne.charAt(i - o);
				var a=""+a;
				var b=Modele.grille[i];		if (o <0) return false;
				var impaire=Math.floor(i/7);
				if (impaire%2==0)
					impaire=false;
				else
					impaire=true;
						
				if (Modele.grille[i]==0 )
				{	
					var gotonextif=false;
					switch(a)
					{
						case 'q':case 'p':						
								continuerBoucle.cond(tabPosGananteRougePaire[i%7] < tabPosGananteJauneImpaire[i%7]);
								if (a =='p') continuerBoucle.inv();
								break;
						case 'e': case 'r': case 'w':
								continuerBoucle.cond(tabPosGananteRougePaire[i%7] < tabPosGananteJauneImpaire[i%7]|| tabPosGananteJauneImpaire[i%7]==-1);
								//ne pas prendre en compte les pairs au dessus de la position 
								continuerBoucle.et((tabPosGananteRougePaire[i%7]<=i));
								if (a == 'w') continuerBoucle.inv();
								if (a !='r')break;							
						case 'g':case 'j':case '.':case 'f':
								Modele.grille[i]=1;
								continuerBoucle.et(Modele.isGameFinish(i));
								if (a == 'j' || a == '.')continuerBoucle.inv();
								if (a !='.' && a !='f' ||  !continuerBoucle.b){
									break;
								}
						case 'h':case 'i':
								Modele.grille[i]=2;
								continuerBoucle.et(Modele.isGameFinish(i));
								if (a == 'h' || a =='f')continuerBoucle.inv();
								break;
						case 't':
								//indexof -1 pour faux
								continuerBoucle.cond(posDeconseille.indexOf(i)+1);
								break;					
						default:							
								var gotonextif=true; 
					}
					Modele.grille[i]=0;
				}
				if (Modele.grille[i]!=0 || gotonextif)
				{
					continuerBoucle.cond(comparerCaractere( a,b,impaire));
				}
				
				if (( continuerBoucle.b) && (i >  modligne.length - 2 + o  ))
				{
							//return if line are equals 
							return 	continuerBoucle.b
				}
		}
	}

	
	
	//fcomparerCaractere
	//5 peu importe et
	//1 pour j1 et 2 pour j2 0 pour vide 
	//3 pour un j1 en paire 4 pour un j1 en impaire 
	//6 pas de 0 mais la position doit exister
	//7 pour j2 en paire et 8 pour j2 en impaire 
	//9 pas de 0 renvoie true si la position n'existe pas
	//g indique une position gagnante en mettant un pion adverse à cette position 
function comparerCaractere (carMod,car,impaire)
	{
		carMod=''+carMod;
		var comp=new bol(true);true
		switch(carMod)
		{
			case '6' :	case '5':
				comp.cond( car == 1 || car == 2 )
				if (carMod=='6') break
				comp.ou(car == 0);	
				break
			case '3':
				comp.cond( car == 1 && impaire==false );
				break
			case  '4':
				comp.cond( car == 1 && impaire==true );
				break
			case  '7':
				comp.cond( car == 2 && impaire==false );
				break
			case '8':
				comp.cond( car == 2 && impaire==true );
				break
			case  '9':
					comp.cond ( car !=0 );	
					break;
			case 'z':
					comp.cond(car !=1) ;
					break;			
			case  'y':
					comp.cond(car!=2) ;	
					break;
			case  'a':
				comp.cond(1);
				break;
			default: comp.cond(car == carMod);
			
		}
		return comp.b;
	}

	function gagnerDirect ()
	{
		for ( var i = 0;i<7;i++)
		{
				var position=Modele.play(i,true);
				if (Modele.isGameFinish() && position >=0)
				{		
						//remettre partie fini à faux pour qu'il n'affiche pas la fin du jeu alors qu'on empeche le Modele.joueur de gagner à cette place 
						Modele.isGameFinish(false);
						//retour en chaine pour que 0 soit pas faux 
						return ""+position ;
				}		
		}
		return false;
	}

	function bloquerDirect (bool)
	{
	//cherche un endroit ou l'adversaire gagne pour le bloquer 
		Modele.nextPlayer();
		for ( var i = 0;i<7;i++)
		{
			var position=Modele.play(i,true);
			if (Modele.isGameFinish())
			{
					Modele.nextPlayer();
					var pos=Modele.play(position,bool);
					//retour en chaine pour que 0 soit pas faux 
					return ""+position ;
			}		
		}
		Modele.nextPlayer();
		return false;
	}
	//remplit posInterdite
	function dontHelpJ2(posInterdite)
	{
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

			if (Modele.isGameFinish() && position !=posInterdite[posInterdite.length-1] && position >= 0)
			{
					posInterdite.push(position);
			}		
		}
	}

	//ne pas Modele.play dessous un endroit ou on gagnerais en jouant au dessus 
	function notUnderMe(posDeconseille)
	{

		// ne pas Modele.play dessous un endroit ou l'on gagne 
		for ( var i = 0;i<7;i++)
		{
			Modele.nextPlayer();
			var position=Modele.play(i,true);
			//on la mit en fictif avec le parametre true  mais il faut qu'il reste dans la Modele.grille 
			Modele.grille[position]="2";		
			Modele.nextPlayer();
			Modele.play(i,true);
			//supprimer le pion rajouté précédemment 
			Modele.grille[position]="0";		
			if (Modele.isGameFinish())
			{
					//rajouter la position en déconseillé 
				if (position !=posDeconseille.at(-1) && position >=0)				
				{
						if (position >=0){
							posDeconseille.push(position);
						}
				}
			}				
		}

	}

	//retourne ou Modele.play sinon -1
	function ifPlayHereGiveMeExactPos(posJoueur)
	{	
		posJoueur=parseInt(posJoueur);
		posJoueur=Modele.play(posJoueur,true);
		if (posJoueur < 0){
			return(false);
		}
		var cond1 = (positionInterdite(posJoueur,posInterdite)) ;
		var cond2 = (positionInterdite(posJoueur,posDeconseille));
		if ( !(cond1 || cond2) )
		{
			posJoueur = Modele.play(posJoueur,true);
			return(""+posJoueur);
		}
		return(false);
	}

function positionOfSym(pos,length,sym){
		if (sym){
			pos += mod(length + ~pos, 7) - pos%7 ;
		}
		return pos;
	}
	
	//remplit la position gagnante la plus basse en pair pour le j2 rouge et et impaire pour le j1 jaune 
	this.fillsWinningPos=fillsWinningPos;
	function fillsWinningPos(){
	//initialiser les 2 tableaux -1 = pas de position gagnante sur cette colonne sinon c'est la position 

		for(var o=0; o<7 ;o++){
			tabPosGananteJaunePaire[o]= -1;
			tabPosGananteRougePaire[o]= -1;
			tabPosGananteJauneImpaire[o]= -1;
			tabPosGananteRougeImpaire[o]= -1;
		}

		for(var o=42; o>0; o--){
			if ( Modele.grille[o]==0 ){
				Modele.grille[o]=1;
				var trouvePlayerImpaire=tabPosGananteJauneImpaire[o%7];
				var trouveBotPaire=tabPosGananteRougePaire[o%7];
				var trouvePlayerPaire=tabPosGananteJaunePaire[o%7];
				var trouveBotImpaire=tabPosGananteRougeImpaire[o%7];

				if ( Math.floor(o/7)%2==1 && trouvePlayerImpaire== -1 && Modele.isGameFinish(o)){				
					tabPosGananteJauneImpaire[o%7]=o;
				}
				else if ( Math.floor(o/7)%2==0 && trouvePlayerPaire== -1 && Modele.isGameFinish(o)){				
					tabPosGananteJaunePaire[o%7]=o;
				}
				
				Modele.grille[o]=2;
				if ( (Math.floor(o/7)%2)==0 && trouveBotPaire==-1 && Modele.isGameFinish(o)){
					tabPosGananteRougePaire[o%7]=o;
				}
				else if ( (Math.floor(o/7)%2)==1 && trouveBotImpaire==-1 && Modele.isGameFinish(o)){
					tabPosGananteRougeImpaire[o%7]=o;
				}
				Modele.grille[o]=0;

			}
		}
		
	}


	//mes booleens
	var bol=function(bole)
	{
		this.b=(bole) ? 1 : 0;
	}

	bol.prototype.et=function(bole)
	{
		this.b =(this.b && bole) ? 1 : 0;
	}

	bol.prototype.ou=function(bole)
	{
		this.b = (this.b || bole) ? 1 : 0 ;
	}

	bol.prototype.inv=function()
	{
		this.b =(this.b)  ? 0 : 1;
	}
	bol.prototype.cond=function(bole)
	{
		this.b = bole? 1 : 0;
	}

	

	//teste toute position à partir de u et joue à celle pas interdite  
	function joueToutePosition(u,retournerPosition){		
		var i=u;
		//tant que la position est pas autorisé tester une autre 
		while ( i< u+7 ){	
			var pos = ifPlayHereGiveMeExactPos(i);
			if (pos !== false){
				return(pos);
			}
			i++;
		}
		return (false);
	}		

	function playSansModele(position){
		while(1){		
			//on retestes toutes les  positions cad 7 possibles et on y joue si possible
			var pos = joueToutePosition(position);
			if (pos!==false){
				break;
			}	
			//on supprime les moins déconseillés
			if (posDeconseille.length==0){
				if (posInterdite.length==0){
					break;
				}
				posInterdite.pop();
			}else{
				posDeconseille.pop();
			}
		}
		return(pos);
	}
	
}
	
