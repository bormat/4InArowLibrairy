var Obj = {
	new : function(){
		return Object.create(Obj.prototype);
	},
	prototype : {
		add : function(methods){
			for (i in methods){
				this[i] = methods[i];
			}
		}
	}	
}



function Disc(nb){
	this.col = nb%7;
	this.line=Math.floor(nb/7);
	this.pos=nb;
}

var Disc = {
	new : function(nb){
		var disc =  Object.create(Disc.prototype);
		disc.col = nb%7;
		disc.line=Math.floor(nb/7);
		disc.pos=nb;
		return disc;
	},
	prototype : {
		value : function(){
			return(Modele.grille[this.pos]);
		},
		inc : function(val){
			var oldpos=this.pos;
			this.pos+=val;
			var lineDir=Math.abs(oldpos%7-this.pos%7) ;
			var colDir=Math.abs(Math.floor(oldpos/7)-Math.floor(this.pos/7))
			//si le décalage dépasse une ligne ou 1 colonne on annule
			if ( lineDir > 1 || colDir> 1){	
				this.pos=oldpos;
				return false;				
			}
			this.line= Math.floor((this.pos)/7);	
			this.col = (this.pos)%7;
			return true;
		},
		GoToDir : function(direction, colorValue){
			while (this.inc(direction)){
				if (this.value() != colorValue ){
					//on revient sur un Disc de la même couleur que Disc 0
					this.inc(-direction);
					break;
				}
			}
		}
	}
}



var Modele={
	joueur:"j1",
	grille:[],
	backup:[],
	isGameFinish:false,
	init:function(){
		for (var i=0;i<42;i++){
			Modele.grille[i]="0";
		}
	},
	setGrille:function(tab){
		for (var i=0;i<42;i++)
		{
			Modele.grille[i]=tab[i];
		}
	},
	setModel : function(tab){
		Modele.setGrille(Modele.modelToArray(tab));
	},
	modelToArray : function (tab){
		var tab2=[];
		var lengthLine=tab[0].length
		for(var i=0;i<tab.length;i++){
			for(var o=0;o<lengthLine;o++){
				tab2.push(tab[i][o])
			}
		}
		return(tab2)
	},
	loadTab : function(tab,emplacement){
		Modele.grille=Modele.modelToArray(tab)
	},
	nextPlayer : function(){
		return(Modele.joueur =(Modele.joueur=="j1")? "j2" : "j1");
	},
	getPlayer : function(dec){
		if (dec==1)
			return Modele.joueur.charAt(1)%2+1;
		return Modele.joueur.charAt(1)*1;
	},
	setPlayer : function(number){
		Modele.joueur="j"+number;
	},
	play : function(position,test){
		/*la position r[e]cup[e]r[e] est celle de la plus haute ligne */
		position=position%7;
		while ( Modele.grille[position+7] == "0" && position <37 ){
			position +=7;			
		}		
		if ( Modele.grille[position] == "0" ){
			Modele.mettreDisc(position,test);
			return position;
		}
		return (-1);
	},
	play2 : function(position,test){
		var toReturn = Obj.new();
		position %= 7;
		while ( Modele.grille[position+7] == "0" && position <37 ){
			position +=7;			
		}
		if ( Modele.grille[position] == "0" ){
			Modele.isGameFinish = Modele.mettreDisc(position,test)
			toReturn.add({
				isOK : true ,
				value : position
			})
		}else{
			toReturn.isOK = false;
		}		
		return toReturn;
	},
	mettreDisc : function mettreDisc(position,test){
		var numJoueur=Modele.joueur.charAt(1);
		Modele.grille[position]=""+numJoueur;
		if (!(test)){
			Modele.nextPlayer()
			Modele.backup.push(position);
		}
		Modele.isGameFinish = Modele.isGameEnd(position) ;
		if (test){	
			Modele.grille[position]="0";
		}
		return Modele.isGameFinish//false;
	},

	isGameEnd : function(lastPos){
		Modele.isGameFinish=false;
		//direction permettant un puissance 4
		var tabDir=[1,6,7,8];
		var start0 = Disc.new(lastPos);
		var colorValue = start0.value();
		for (var o=0,size=tabDir.length; o<size; o++){
			var start1 = Disc.new(lastPos);	//left of the align 
			var start2 = Disc.new(lastPos); //right of the align
			var direction=tabDir[o];
			var i=0;
			//continue in direction while color is same
			//lastPos is a Disc that contains the position writen in x,y or with number between 0,41 included 
		
			start1.GoToDir(direction,colorValue);
			start2.GoToDir(-direction,colorValue);
			var lineDiff=Math.abs(start2.line-start1.line);
			var collDiff=Math.abs(start2.col-start1.col);
			//if Disc are separate by 4 Discs the game is end
			if (lineDiff>=3 || collDiff>=3){
				Modele.winInfo = {disc1:start1 , disc2:start2, dir:-direction }
				Modele.isGameFinish=true;
				return true;
			}
		}
		return false;
	},	
	multiplePut : function(tab,testOrNot){
		for (var i=0;i< tab.length;i++){
			Modele.mettreDisc(tab[i],testOrNot);
		}
	},
	undo : function(emplacement,Nothuman){
			Modele.isGameFinish=false;
			var pos=Modele.backup.pop();
			if (pos==38)
				return Modele.backup.push(pos);
			Modele.grille[pos]=0;
			Modele.nextPlayer();
			return pos;
	},
	restore : function(backup){
		Modele.partiFini=false;
		Modele.init();
		//IA.boolSmart=JSON.parse($.cookie('boolSmart'));
		var joueur=1;
		//sometimes they are several 38 this is a small patch to find the last
		Modele.backup=backup;
		for(var i = backup.lastIndexOf(38);i<backup.length;i++)
		{
			
			if (Modele.grille[backup[i]]==0){
				Modele.grille[backup[i]]=joueur;
				joueur=(joueur==1) ? 2 : 1 ;
			}
		}
		//choose the good player
		Modele.setPlayer(Modele.backup%2+1);

	},	
	saveGame : function(){
		$.cookie('grille', JSON.stringify(Modele.backup));
		$.cookie('boolSmart', JSON.stringify(IA.boolSmart));
	},
	playAgain : function(emplacement){
		Modele.isGameFinish==false;
		Modele.init();
		Modele.joueur='j1';
		Modele.play(3);
		Modele.backup=[38];
	}
}
Modele.init();
