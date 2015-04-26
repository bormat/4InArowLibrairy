function Disc(pos){
		this.pos=pos;
		this.initColorNumber = Modele.grille[this.pos];
}

Disc.distance =function(disc1, disc2, xOrY){
		var distX =  (disc2 % 7 - disc1 % 7);
		var distY = Math.floor(disc2/7) - Math.floor(disc1/7);
		return  Math.max(Math.abs(distX), Math.abs(distY));
}
Disc.prototype={
	goToDir: function(dir){
		var newPos = this.pos;
		do {
			pos = newPos;
			newPos = pos  + dir
		} while(Disc.distance(pos, newPos ) <= 1  && Modele.grille[newPos] == this.initColorNumber );
		return pos;
	},
}



var Modele={
	joueur:"j1",
	grille:[],
	backup:[],
	partieFini:false,
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

	isHumanTurn : function(){
		return Modele.joueur=="j1";
	},
	play : function(position,test){
		/*la position r[e]cup[e]r[e] est celle de la plus haute ligne */
		position=position%7;
		while ( Modele.grille[position+7] == "0" && position <37 ){
			position +=7;			
		}		
		if ( Modele.grille[position] == "0" ){
			Modele.mettrePion(position,test);
			return position;
		}
		return (-1);
	},
	mettrePion : function mettrePion(position,test){
		var numJoueur=Modele.joueur.charAt(1);
		Modele.grille[position]=""+numJoueur;
		if (!(test)){
			Modele.nextPlayer()
			Modele.backup.push(position);
		}
		Modele.partieFini = Modele.partieFinie(position) ;
		if (test){	
			Modele.grille[position]="0";
		}
		return Modele.partieFini//false;
	},

	partieFinie : function(start){
		Modele.partieFini=false;
		//direction permettant un puissance 4
		var tabDir=[1,6,7,8];
		var disc = new Disc(start);	//left of the align 
		for (var o=0,size=tabDir.length; o<size; o++){
			var direction=tabDir[o];
			//continue in direction while color is same
			var start1 = disc.goToDir(direction);
			var start2 = disc.goToDir(-direction);
			if (Disc.distance(start1 ,start2)>=3){
				Modele.winInfo={pion1:start1 , pion2:start2, dir:-direction }
				Modele.partieFini=true;
				return true;
			}
		}
		return false;
	},	
	multiplePut : function(tab,testOrNot){
		for (var i=0;i< tab.length;i++){
			Modele.mettrePion(tab[i],testOrNot);
		}
	},
	undo : function(emplacement,Nothuman){
			Modele.partieFini=false;
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
		Modele.partieFini==false;
		Modele.init();
		Modele.joueur='j1';
		Modele.play(3);
		Modele.backup=[38];
	}
}
Modele.init();
