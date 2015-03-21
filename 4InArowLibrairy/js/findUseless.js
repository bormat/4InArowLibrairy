function charComparator(a,b){
			a=''+a;
			b=''+b;
			if (a==b) return (true)
			if (b=='a') return (a=='9');
			if (b=='9')return (a!='a'&& a!='5')
			if (b=='5')return (a!='a' && a!='9')
			if (a=='3' ||a=='4' )return (b=='1')
			if (a=='7' ||a=='8' )return (b=='2')
			return false
		}
var t=0;	
function lineComparator(a,b,posBeginningInB){
	t++;
	if ( !b || a.length > b.length-posBeginningInB){
		return false;
	}
	for (var i =0;i<a.length;i++){
		if ( !charComparator( a.charAt(i) , b.charAt(posBeginningInB+i) ) ){		
			return false;
		}
	}
	return true;
}
function modeleComparator(modA,modB){
	for (var j=0 ; j<modB[0].length-modA[0].length+1 ; j++){
		var lineAIsContanedInLineB=true
		for (var i=0;i<modA.length && lineAIsContanedInLineB ; i++){
		
			lineAIsContanedInLineB=lineComparator(modA[i],modB[i],j);
		}
		if (lineAIsContanedInLineB){
			return true;
		}
	}
	return false;
}

var uselessMod=[];
var findUseless=function(){
	for (var j=0;j<mesModele.length;j++){
		for (var i=j;i<mesModele.length;i++){
			if (mesModele[i][0] && mesModele[i][0][0].length==mesModele[j][0][0].length   && i != j ){
				var sameModele=modeleComparator(mesModele[i][0],mesModele[j][0]);
				if (sameModele ){
					uselessMod.push("i: "+i+"j: "+j);
				}
			}
		}
	}
}
	

