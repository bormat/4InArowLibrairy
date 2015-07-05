
class Disc
	(pos) ->
		@pos = pos
		@initColorNumber = Modele.grille[@pos]
	
	goToDir: (dir) ->
		newPos = @pos
		loop
			pos = newPos
			newPos = pos + dir
			break if not ((@distance pos, newPos) <= 1 and Modele.grille[newPos] ~= @initColorNumber) #stop if color different or out of range
		pos

	distance :(disc1, disc2, xOrY) ->
		Math
			..floor
				distY = ..(disc2 / 7) - ..(disc1 / 7)
			..abs
				return ..(disc2 % 7 - disc1 % 7) >? ..(distY)
	getLoopIf4InARow: (dir) ->



	
window.Modele = Modele = {
	isGameFinish: ->
		var isGameFinish
		@isGameFinish = (pos) ->
			return off if pos < 0
			if (pos?)
				if typeof pos is \boolean
					isGameFinish := pos
				else
					disc = new Disc pos
					[1 6 7 8]some (dir) ->
						disc~goToDir
							Modele.winningPos = [i for i from ..(-dir) to  ..(dir) by dir]
						isGameFinish = 	Modele.winningPos.length > 3
			isGameFinish
	play: (position, test) ->
		position %= 7
		while Modele.grille[position + 7] ~= 0 and position < 37
			position += 7
		if Modele.grille[position] ~= 0
			Modele.mettrePion position, test
			return position
		-1
	mettrePion: mettrePion = (position, test) ->
		Modele.grille[position] = Modele.getPlayer!
		if not test
			Modele.nextPlayer!
			Modele.backup.push position
		Modele.isGameFinish position
		if test then Modele.grille[position] = 0
		Modele.isGameFinish!
	playAgain: (emplacement) ->
		Modele.isGameFinish false
		Modele.init!
		Modele.setPlayer 1
		Modele.play 3
		Modele.backup = [38]
	joueur: '1'
	grille: []
	backup: []
	init: ->
		i = 0
		while i < 42
			Modele.grille[i] = 0
			i++
		Modele.isGameFinish false
	setGrille: (tab) ->
		i = 0
		while i < 42
			Modele.grille[i] = tab[i]
			i++
	setModel: (tab) -> Modele.setGrille Modele.modelToArray tab
	modelToArray: (tab) ->
		tab2 = []
		lengthLine = tab.0.length
		i = 0
		while i < tab.length
			o = 0
			while o < lengthLine
				tab2.push tab[i][o]
				o++
			i++
		tab2
	loadTab: (tab, emplacement) -> Modele.grille = Modele.modelToArray tab
	nextPlayer: -> Modele.joueur = if Modele.joueur ~= 1 then 2 else 1
	getPlayer: (dec) ->
		nb = parseInt Modele.joueur
		nb = nb % 2 + 1 if dec ~= 1
		nb
	setPlayer: (number) -> Modele.joueur = number
	isHumanTurn: -> Modele.joueur ~= 1
	undo: (emplacement, Nothuman) ->
		Modele.isGameFinish false
		pos = Modele.backup.pop!
		return Modele.backup.push pos if pos ~= 38
		Modele.grille[pos] = 0
		Modele.nextPlayer!
		pos
	restore: (backup) ->
		Modele.partiFini = false
		Modele.init!
		joueur = 1
		Modele.backup = backup
		i = backup.lastIndexOf 38
		while i < backup.length
			if Modele.grille[backup[i]] ~= 0
				Modele.grille[backup[i]] = joueur
				joueur = joueur % 2 + 1
			i++
		Modele.setPlayer Modele.backup % 2 + 1
	saveGame: ->
		$.cookie 'grille', JSON.stringify Modele.backup
		$.cookie 'boolSmart', JSON.stringify IA.boolSmart
}

Modele.init!