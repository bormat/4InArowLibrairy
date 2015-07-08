#please learn what ~ does in js

class Disc
	(pos) ->
		@pos = pos
		@color = Modele.grille[@pos]	
	goToDir: (dir) ->
		tab=[@pos]
		loop
			tab[*] = tab[*-1] + dir
			break if Modele.grille[tab[*-1]] !~= @color 
			break if (@distance(tab[*-2], tab[*-1]) > 1)
		tab[*-2]
	distance : (d1, d2) -> Math.abs d1 % 7 - d2 % 7 || ~(d1 / 7) - ~(d2 / 7)
		

window.Modele = Modele =
	isGameFinish: ->
		var isGameFinish
		@isGameFinish = (pos) ->
			return off if pos < 0
			if (pos?)
				if typeof pos is \boolean
					isGameFinish := pos
				else
					Modele.grille[-1] = null 
					f = (new Disc(pos))~goToDir
					[1 6 7 8]some (dir) ->
						Modele.winInfo = [f(-dir) to f(dir) by dir]
						isGameFinish := Modele.winInfo.length > 2 #4-1-1
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
			Modele.backup.* = position
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
		tab.forEach (tabI)->
			for o til lengthLine
				tab2.push tabI[o]
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

Modele.init!