ModeleClase=function()
{

var self=this;
	self.joueur="j1";
	self.grille=[];
	self.backup=[];
	self.init=function(){
		for (var i=0;i<42;i++){
			self.grille[i]="0";
		}
	}
	self.init();
	
	self.setGrille=function(tab){
		for (var i=0;i<42;i++)
		{
			self.grille[i]=tab[i];
		}
	}

	self.nextPlayer=function(){
		return(self.joueur =(self.joueur=="j1")? "j2" : "j1");
	}
	self.partieFini=false;
	//uselless but i cant delete them 
	positionGlobal=0;
	numeroMod=[0][0];
	
	
	this.afficher=function(){	
		var numeroMod2=numeroMod[0];
		if (self.joueur=="j1"){
				$("#p5").html("red");
		}
		else{
			$("#p5").html("jaune");
		}
		$("#p5").append("<br/>numero modele vaut"+numeroMod2+"<br>");
		if (numeroMod2){
			numeroMod2--;
			tab=mesModele[numeroMod2][0];
			for(var i in tab){
				$("#p5").append("\""+tab[i]+"\",<br>");
			}
			$("#p5").append("<br>posmodele "+positionGlobal);
		}
	}

	self.getPlayer=function(dec){
		if (dec==1)
			return self.joueur.charAt(1)%2+1;
		return self.joueur.charAt(1)*1;
	}
	self.setPlayer=function(number){
		self.joueur="j"+number;
	}
	self.play=function(position,test)
	{
		/*la position r[e]cup[e]r[e] est celle de la plus haute ligne */
		position=position%7;
		while ( self.grille[position+7] == "0" && position <37 )
		{
			position +=7;			
		}
		
		if ( self.grille[position] == "0" )
		{
			mettrePion(position,test);
			return position;
		}
		return (-1);
	}

	function mettrePion(position,test)
	{
		var numJoueur=self.joueur.charAt(1);
		self.grille[position]=""+numJoueur;
		if (!(test))
		{
			self.nextPlayer()
			self.backup.push(position);
			
		}
		
		if (self.partieFinie(position))
		{	
				self.partieFini=1;
		}
		else
		{			
				self.partieFini=0;
		}
		if ((test))
		{	
			self.grille[position]="0";
		}
		return self.partieFini//false;
	}



	self.partieFinie=function(start){
		self.partieFini=false;
		//direction permettant un puissance 4
		var tabDir=[1,6,7,8];
		var start0=new Pion(start);
		for (var o=0,size=tabDir.length; o<size; o++){
			var start1=new Pion(start);	//left of the align 
			var start2=new Pion(start); //right of the align
			var direction=tabDir[o];
			var i=0;
			//continue in direction until color is same
			//start is a Pion that contains the position write in x,y or with number between 0,41 included 
			function GoToDir(start,direction){
				while (start.inc(direction)){
					if (!(start.value()==start0.value() && start.value()!=0)){
						//on revient sur un pion de la même couleur que pion 0
						start.inc(-direction);
						break;
					}
					i++;
				}
			}
			GoToDir(start1,direction);
			GoToDir(start2,-direction);
			var lineDiff=Math.abs(start2.line-start1.line);
			var collDiff=Math.abs(start2.col-start1.col);
			if (lineDiff>=3 || collDiff>=3){
				self.winInfo={pion1:start1 , pion2:start2, dir:-direction }
				self.partieFini=true;
				return true;
			}
		}
		return false;
	}
	self.multiplePut=function(tab,testOrNot){
		for (var i=0;i< tab.length;i++){
			mettrePion(tab[i],testOrNot);
		}
	}
	//constructeur
	function Pion(nb){
			this.col = nb%7;
			this.line=Math.floor(nb/7);
			this.pos=nb;
	}

	Pion.prototype.value=function(){
		return(self.grille[this.pos]);
	}

	Pion.prototype.inc=function(val){
		var oldpos=this.pos;
		this.pos+=val;
		var lineD=Math.abs(oldpos%7-this.pos%7) ;
		var colD=Math.abs(Math.floor(oldpos/7)-Math.floor(this.pos/7))
		//si le décalage dépaqsse une ligne ou 1 colonne on annule
		if ( lineD > 1 || colD > 1){	
			this.pos=oldpos;
			return false;				
		}
		this.line= Math.floor((this.pos)/7);	
		this.col = (this.pos)%7;
		return 1;
	}


	self.undo=function(emplacement,Nothuman){
			Modele.partieFini=false;
			var pos=self.backup.pop();
			if (pos==38)
				return self.backup.push(pos);
			self.grille[pos]=0;
			self.nextPlayer();
			return pos;
	}

	self.restore=function(backup){
		Modele.partiFini=false;
		self.init();
		//IA.boolSmart=JSON.parse($.cookie('boolSmart'));
		var joueur=1;
		//sometimes they are several 38 this is a small patch to find the last
		self.backup=backup;
		for(var i = backup.lastIndexOf(38);i<backup.length;i++)
		{
			
			if (self.grille[backup[i]]==0){
				self.grille[backup[i]]=joueur;
				joueur=(joueur==1) ? 2 : 1 ;
			}
		}
		//choose the good player
		self.setPlayer(self.backup%2+1);

	}	
	
	self.saveGame=function(){
		$.cookie('grille', JSON.stringify(self.backup));
		$.cookie('boolSmart', JSON.stringify(IA.boolSmart));
	}
	self.playAgain=function(emplacement){
		Modele.partieFini==false;
		Modele.init();
		Modele.joueur='j1';
		Modele.play(3);
		Modele.backup=[38];
	}
	
	this.modelToArray = function (tab)
	{
		var tab2=[];
		var lengthLine=tab[0].length
		for(var i=0;i<tab.length;i++)
		{
			for(var o=0;o<lengthLine;o++)
			{
				tab2.push(tab[i][o])
			}
		}
		return(tab2)
	}
	
	this.loadTab=function(tab,emplacement){
		self.grille=self.modelToArray(tab)
	}
	this.setModel=function(tab){
		self.setGrille(self.modelToArray(tab));
	}
}
Modele=new ModeleClase();

