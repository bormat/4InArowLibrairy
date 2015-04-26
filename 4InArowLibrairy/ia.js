"use strict";
var toto=0;
var IA=new function()
{
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
		if (Modele.partieFini){
				return(false);
		};
		if (botSmart){
			this.boolSmart.push("true")
			Modele.setPlayer(1);
			fillsWinningPos();	
			var pos = -1;
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
		pos=Modele.play(pos,retournerPosition);
		return pos;
	}

	function giveMeACheckedPosition(functionWhoReturnAStringPosToCheck){
		var i=0;
		var param
		do{
			var pos = functionWhoReturnAStringPosToCheck();	
			param=wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, pos);
			i++;
		} while(param.isModelfound && pos && i<7);
		return pos;
	}

	
	function playAvecModele(findAt){	
		var TabOfTab=[attaque,defense,miniDef,mesModele]
		var pos=false;
		while(findAt.tabNumber < TabOfTab.length ){
			var length=TabOfTab[findAt.tabNumber].length;
			while (findAt.modelID < length){
				var position=modeledetectorAndAnswer(TabOfTab[findAt.tabNumber],findAt);
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
	
	
	
//return boolean true if after play to a position a model is matched
function wontBecomeLikeThisModel(TabWontBecomeLikeThisModel, playerInNumber, posBot){
var isModelfound=false
	posBot=Modele.play(posBot,true);
	Modele.grille[posBot]=playerInNumber;
	bigloop : for (var i=0;i<7 && !isModelfound;i++){
		var pos=Modele.play(i,true);
		Modele.grille[pos]=2;
		if (pos >= 0 ){
			for ( var j=0; j<TabWontBecomeLikeThisModel.length && ! isModelfound ; j++ ){
				var param= structModelDetector(TabWontBecomeLikeThisModel[j], 48) ;
				isModelfound=param.isModelfound
			}
			if (isModelfound){
				posDeconseille.push(parseInt(posBot));
			}		
			Modele.grille[pos]=0;
		}
	}
	Modele.grille[posBot]=0;
	return param;
}
function falseOrModelIfFound(param){
	if (param.isModelfound){
		return param;
	}
	return false;
}
function futureTab1(ModelInStruct,pos,otherOption,param){
	var futureTab=ModelInStruct.futureTab;
	var isModelfound=false;
	var findTheFirstModelInGrille=function(){
		for (var i=0; i<futureTab.length && !isModelfound; i++){
			param= modeleDetector3(ModelInStruct.futureTab[i],pos,otherOption) ;
			isModelfound=param.isModelfound;
		}
	}
	findTheFirstModelInGrille();
	for (var j=0; j<7 && !isModelfound; j++){
		var pos3 = Modele.play(j,true);
		if (pos3 >= 0 && pos3!==false ){
			Modele.grille[pos3]=1
			findTheFirstModelInGrille()
			Modele.grille[pos3]=0;
		}
	}
	if (isModelfound){
		param.theTab=ModelInStruct.futureTab;
		param.playAt=pos3;
	}
	return isModelfound;
}
var futureIWant=function(param,ModelInStruct,pos,otherOption){
	var theTab=ModelInStruct.futureTab;
	for (var j=0; j<7 && !param.isModelfound; j++){
		var pos3 = Modele.play(j,true);
		if (pos3 >= 0 && pos3!==false ){
			Modele.grille[pos3]=1;
			param=findWithOrWithoutLogicalOperator(param,ModelInStruct ,pos,otherOption, theTab);
			Modele.grille[pos3]=0;
		}
	}
	if (param.isModelfound){
		param.theTab = theTab;
		param.playAt = pos3;
	}
	return param;
}

function findWithOrWithoutLogicalOperator(param,ModelInStruct ,pos,otherOption,theTab){
			var isModelfound=false;
			if( ! ModelInStruct.hasOwnProperty("logicalOperator") ){
					for (var i=0; i<theTab.length && isModelfound===false; i++){
						param=modeleDetector3(theTab[i],pos,otherOption);
						if ( !(param.pos>42 || param.pos===false) ){
							isModelfound=true;
						}
					}
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
	playAt : position to play is the modele is found 
	theTab: contain the tab found it can be a futureTab or a  (present) tab 
	pos : the position or the modele is found in the grille
	param.sameSym : BooleanValue forces the symmetry to be the same for all model of the struct 
	param.sym : BooleanValue force the symetry to be true or false 
}*///fstruct
function structModelDetector(ModelInStruct,pos){
	var param={};var otherOption={};
	if (ModelInStruct.hasOwnProperty("sym")){
		otherOption.sym=ModelInStruct.sym
	}
	var theTab= ModelInStruct[(ModelInStruct.hasOwnProperty("futureTab")) ? "futureTab" : "tab"] ;
	if ( ModelInStruct.hasOwnProperty("samePos")){
		otherOption.samePos=true
		otherOption.posTopLeftIWant=ModelInStruct.posTopLeftIWantposTopLeftIWant;
	}
	param =findWithOrWithoutLogicalOperator(param,ModelInStruct ,pos,otherOption,theTab);
	if( ModelInStruct.hasOwnProperty("futureTab")){
		param= (!param.isModelfound) ? futureIWant(param,ModelInStruct,pos,otherOption) : {isModelfound :false};
	}
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
		param.theModelItSelf=ModelInStruct;
		if (ModelInStruct.hasOwnProperty("otherCondToBeTrue") && propertyExist(ModelInStruct.otherCondToBeTrue) ){
			pos2=ModelInStruct.otherCondToBeTrue(param);
		}
		if (ModelInStruct.hasOwnProperty("playAt")){
			param.playAt=ModelInStruct.playAt
			param.theTab=ModelInStruct.tab;
		}
	}else{
		param={isModelfound:false};
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
		var pos=Modele.play(i,true);
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
		var cond = false;
		//
		var pos=Modele.play(i,true);
		cond = (playerTurn==1)	? positionInterdite(pos,posInterdite) : comparerLigne("g",pos-7);
		if (!cond){
			var position2=pos;
			Modele.grille[pos]=playerTurn;
			var cptGagnerDirect=0;
			for(var o=0;o<7;o++){
				//
				var pos = Modele.play(o,true);
				if (Modele.partieFini && pos >=0){
					cptGagnerDirect++;
					//si il y a une position gagnante au dessus d'une autre 
					var WinnerPos=(!Modele.isHumanPlayer()) ? "g" : "i";
					var otherPlayerWinOnMe= (!Modele.isHumanPlayer()) ? false: comparerLigne("g",pos);
					if ( (cptGagnerDirect ==1 && comparerLigne(WinnerPos,pos-7) )|| (cptGagnerDirect >1 && !otherPlayerWinOnMe) ){	
						Modele.grille[position2]=0;
						return(i)
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

	
	function execute_callback_if_Model_at_ModelID_Found(findAt){
		var tabPosInBigGrille=[];
		var nbline=0;
		findAt.isModelfoundParams = (!Array.isArray(findAt.modele[findAt.modelID])) ? structModelDetector(findAt.modele[findAt.modelID], findAt.positionInGrille) : modeleDetector4(findAt.modele[findAt.modelID], findAt.positionInGrille);
		
		if ( findAt.isModelfoundParams.isModelfound==true ){
			
			var addPos2 = function (posRelativeToModele){
				var theTab =findAt.isModelfoundParams.theTab[0];
				if (Array.isArray(theTab)){
					nbline=theTab.length;
					theTab=theTab[0];
				}else{
					nbline=findAt.isModelfoundParams.theTab.length;
				}
				theTab=theTab.length;
				var positionmodele = findAt.isModelfoundParams.pos + positionOfSym(posRelativeToModele,theTab, findAt.isModelfoundParams.sym);
				tabPosInBigGrille.push(positionmodele);		
			}
			if (Array.isArray(findAt.isModelfoundParams.playAt)){
				for (var u=0;u<findAt.isModelfoundParams.playAt.length ;u++){	
					addPos2(findAt.isModelfoundParams.playAt[u])
				}
			}else{
				addPos2(findAt.isModelfoundParams.playAt);
			}
			findAt.positionInGrille=beginToEnd(findAt.isModelfoundParams.pos, nbline);
			findAt.callback(tabPosInBigGrille,findAt);
		}else{
			findAt.positionInGrille=48;
		}
	}
	
	function beginToEnd(begin,nbLine){
		return begin + nbLine*7-7;
	}
	
	//fmodele
	this.modeledetectorAndAnswer =modeledetectorAndAnswer;
	function modeledetectorAndAnswer(modele,findAt){
		var positionRelativeModel, lengthModel;
		var position=false;		
		findAt.modele=modele;
		findAt.callback = function(tabPosInBigGrille){
			findAt.positionToPlay=tabPosInBigGrille[0];
			findAt.modelID--;
		},
		findAt.isModelfoundParams={isModelfound:false};
		while ( findAt.modelID<modele.length && findAt.isModelfoundParams.isModelfound==false){
			execute_callback_if_Model_at_ModelID_Found(findAt);	
			findAt.modelID++;
		}
		return (findAt.isModelfoundParams.isModelfound===false) ? false : findAt.positionToPlay;
	}
	


	function findForbiddenAndNotRecommandedPosition(){
		posDeconseille=[];
		posInterdite=[];
		dontHelpJ2(posInterdite);
		detectBadPositionAlgorythme();
		var findAt = {positionInGrille:48};
		
		findAt.callback = function(tabPosInBigGrille){
			for (var i=0;i<tabPosInBigGrille.length;i++){
				posDeconseille.push(tabPosInBigGrille[i]);
			}
			findAt.positionInGrille--;
		},
		findAt.isModelfoundParams={isModelfound:false};
		var tabForbids=[modPosDeconseille,interditUnPeu];
		for ( var o=0 ; o < tabForbids.length ;o++){
			findAt.modele=tabForbids[o];
			findAt.modelID=0;
			while (findAt.modelID < findAt.modele.length ){
				//tant que le modele est trouvé on continue de le chercher et de pusher les positions interdites 
				execute_callback_if_Model_at_ModelID_Found(findAt);
				if (findAt.isModelfoundParams.isModelfound==false ){
					findAt.positionInGrille=48;	
					findAt.modelID++;
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
		var line=oneModele.at(-1);
		for ( var i=0; i<line.length ; i++ ){
			if (line[i]!='a' && line[i]!='9') break;
		}
		return (i<line.length) ? 0 : 1 ;
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
			posOneModeleSym2[sym]=modeleDectector1(oneModele,posOneModeleSym2[sym].pos,sym);
			if (!posOneModeleSym2[sym].isModelfound ){
				posOneModeleSym2[sym].pos -=  1+posPart( (posOneModeleSym2[sym].pos-1)%7 + oneModele[0].length -7)
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
			var continuerBoucle = true;
			for (var i = 0 ; i< oneModele.length && continuerBoucle ; i++ ){
				var line=symetrique2(oneModele.at(-i-1),sym);
				continuerBoucle=comparerLigne(line,posOneModele-7*i);
			}
			if (i == oneModele.length  && continuerBoucle){
				return { pos:posOneModele, isModelfound:true };
			}
		}
		return { pos: posOneModele, isModelfound:false }; 
	}
				
				
	function posPart(pos){
		return pos > 0 ? pos : false;
	}
	
	function topToBottom (pos, length){
		return ( pos + length*7 -7 )
	}
	
	function bottomToTop (pos, length){
		return ( pos - length*7 +7 )
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
								continuerBoucle.et(Modele.partieFinie(i));
								if (a == 'j' || a == '.')continuerBoucle.inv();
								if (a !='.' && a !='f' ||  !continuerBoucle.b){
									break;
								}
						case 'h':case 'i':
								Modele.grille[i]=2;
								continuerBoucle.et(Modele.partieFinie(i));
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
				if (Modele.partieFini && position >=0)
				{		
						//remettre partie fini à faux pour qu'il n'affiche pas la fin du jeu alors qu'on empeche le Modele.joueur de gagner à cette place 
						Modele.partieFini=false;
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
			if (Modele.partieFini)
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

			if (Modele.partieFini && position !=posInterdite[posInterdite.length-1] && position >= 0)
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
			if (Modele.partieFini)
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

	function positionOfSym(pos,length,sym)
	{
		var position;
		if (sym){
			var position = length - pos%7 -1 ;
			if (pos%7!=6){
				pos+=6-pos%7
			}
			while (position<=pos){position+=7}
			position-=7;
		}else{
			position=pos;
		}
		return position;
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

				if ( Math.floor(o/7)%2==1 && trouvePlayerImpaire== -1 && Modele.partieFinie(o)){				
					tabPosGananteJauneImpaire[o%7]=o;
				}
				else if ( Math.floor(o/7)%2==0 && trouvePlayerPaire== -1 && Modele.partieFinie(o)){				
					tabPosGananteJaunePaire[o%7]=o;
				}
				
				Modele.grille[o]=2;
				if ( (Math.floor(o/7)%2)==0 && trouveBotPaire==-1 && Modele.partieFinie(o)){
					tabPosGananteRougePaire[o%7]=o;
				}
				else if ( (Math.floor(o/7)%2)==1 && trouveBotImpaire==-1 && Modele.partieFinie(o)){
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

	function symetrique2(leModele,symetrique){
		if (symetrique==true)
		{
			var mod =leModele.reverse();
			return(leModele.reverse());
		}
		else
		{
			return(leModele);
		}
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
	
