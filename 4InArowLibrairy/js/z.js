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
IA.addP({
	fillsWinningPos : function (){
	//initialiser les 2 tableaux -1 = pas de position gagnante sur cette colonne sinon c'est la position 

		for(var o=0; o<7 ;o++){
			IA.winningYellowPairs[o]= -1;
			IA.winningRedPairs[o]= -1;
			IA.winningYellowOdds[o]= -1;
			IA.winningRedOdds[o]= -1;
		}

		for(var o=42; o>0; o--){
			if ( Modele.grille[o]==0 ){
				Modele.grille[o]=1;
				var trouvePlayerImpaire=IA.winningYellowOdds[o%7];
				var trouveBotPaire=IA.winningRedPairs[o%7];
				var trouvePlayerPaire=IA.winningYellowPairs[o%7];
				var trouveBotImpaire=IA.winningRedOdds[o%7];

				if ( Math.floor(o/7)%2==1 && trouvePlayerImpaire== -1 && Modele.isGameFinish(o)){				
					IA.winningYellowOdds[o%7]=o;
				}
				else if ( Math.floor(o/7)%2==0 && trouvePlayerPaire== -1 && Modele.isGameFinish(o)){				
					IA.winningYellowPairs[o%7]=o;
				}
				
				Modele.grille[o]=2;
				if ( (Math.floor(o/7)%2)==0 && trouveBotPaire==-1 && Modele.isGameFinish(o)){
					IA.winningRedPairs[o%7]=o;
				}
				else if ( (Math.floor(o/7)%2)==1 && trouveBotImpaire==-1 && Modele.isGameFinish(o)){
					IA.winningRedOdds[o%7]=o;
				}
				Modele.grille[o]=0;

			}
		}		
	}

})

IA.switch = function(a,i,gotonextif,cont,b,o,impaire){
    var cont,gotonextif;
    switch(a){
        case 'q':case 'p':                      
                cont = IA.winningRedPairs[i%7] < IA.winningYellowOdds[i%7];
                if (a =='p') cont = !cont  ;
                break;
        case 'e': case 'r': case 'w':
                cont = IA.winningRedPairs[i%7] < IA.winningYellowOdds[i%7]|| IA.winningYellowOdds[i%7]==-1;
                /*ne pas prendre en compte les pairs au dessus de la position*/ 
                cont= cont && ((IA.winningRedPairs[i%7]<=i));
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
                cont = (IA.inadvisables.indexOf(i)+1);
                break;                  
        default:                            
                var gotonextif=true;
    };
    return [cont,gotonextif]
}
	
