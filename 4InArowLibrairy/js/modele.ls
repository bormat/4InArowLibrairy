#please learn what ~ does in js
#->@<<< is like class but it is a litéral bound of this for function
borto = window.borto = window.borto || {}
borto.disc =
	setPos: (@pos) ->		
		@color = borto.modele.grille[@pos]
	goToDir: (dir) ->
		tab = [@pos]
		loop
			tab[*] = tab[*-1] + dir
			break if borto.modele.grille[tab[*-1]] !~= @color 
			break if (@distance(tab[*-2], tab[*-1]) > 1)
		tab[*-2]
	distance : (d1, d2) -> Math.abs d1 % 7 - d2 % 7 || ~(d1 / 7) - ~(d2 / 7)		
f = borto.disc~goToDir

borto.modele =
	isGameFinish: (pos) -># setteur if boolean,getteur if no args and calcule if number
		return off if pos < 0
		return @isGameEnd if pos ~= null
		if typeof pos is \boolean
			return @isGameEnd := pos
		else
			@grille[-1] = null 
			borto.disc.setPos(pos)
			for dir in [1 6 7 8] 
				@winInfo = [f(-dir) to f(dir) by dir]
				@isGameEnd := @winInfo.length > 3 #4-1-1
				return on if @isGameEnd
	play: ( pos , test) ->
		for pos from pos % 7 to 42 by 7
			if @grille[pos + 7] !~= 0 && @grille[pos] == 0
				@mettrePion pos, test
				return pos
		-1
	mettrePion: (position, test) ->
		@grille[position] = @getPlayer!
		if not test
			@nextPlayer!
			@backup.* = position
		@isGameFinish position
		if test then @grille[position] = 0
		@isGameFinish!
	playAgain: ->
		@isGameFinish false
		@init!
		@setPlayer 1
		@play 3
		@backup = [38]
	joueur: 1
	grille: []
	backup: []
	nextPlayer: -> @player = if @player ~= 1 then 2 else 1
	getPlayer: (dec = 0) -> (dec + @player) % 2 || 2
	setPlayer: (number) -> @player = number
	isHumanTurn: -> @player ~= 1
	undo: ->
		@isGameFinish false		
		if @backup[*-1] !~= 38
			pos = @backup.pop!
			@grille[pos] = 0
			@nextPlayer!
		pos
	restore: (@backup) ->
		@init!
		@setPlayer(if @backup.length % 2 then 1 else 2)
	init: ->
		@grille = [0] * 42
		@isGameFinish false
	loadTab: (tab, emplacement) -> @grille = @modelToArray tab
	setGrille: (tab) -> @grille = tab
	setModel: (tab) -> @setGrille(@modelToArray tab)
	modelToArray: (tab) -> [disc for line in tab for disc in line]
borto.modele.init!
window.Modele = borto.modele