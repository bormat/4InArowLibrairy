function Pion(nb){
		this.col = nb%7;
		this.line=Math.floor(nb/7);
		this.pos=nb;
}

Pion.prototype={
	value : function(){
		return(Modele.grille[this.pos]);
	},
	inc : function(val){
		var oldpos=this.pos;
		this.pos+=val;
		var lineD=Math.abs(oldpos%7-this.pos%7) ;
		var colD=Math.abs(Math.floor(oldpos/7)-Math.floor(this.pos/7))
		//si le décalage dépasse une ligne ou 1 colonne on annule
		if ( lineD > 1 || colD > 1){	
			this.pos=oldpos;
			return false;				
		}
		this.line= Math.floor((this.pos)/7);	
		this.col = (this.pos)%7;
		return true;
	}
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
		var start0=new Pion(start);
		for (var o=0,size=tabDir.length; o<size; o++){
			var start1=new Pion(start);	//left of the align 
			var start2=new Pion(start); //right of the align
			var direction=tabDir[o];
			var i=0;
			//continue in direction while color is same
			//start is a Pion that contains the position writen in x,y or with number between 0,41 included 
			function GoToDir(start,direction){
				while (start.inc(direction)){
					if (start.value()!=start0.value() ){
						//on revient sur un pion de la même couleur que pion 0
						start.inc(-direction);
						break;
					}
				}
			}
			GoToDir(start1,direction);
			GoToDir(start2,-direction);
			var lineDiff=Math.abs(start2.line-start1.line);
			var collDiff=Math.abs(start2.col-start1.col);
			if (lineDiff>=3 || collDiff>=3){
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
