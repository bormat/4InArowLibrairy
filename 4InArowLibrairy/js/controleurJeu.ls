window.app = angular.module 'myApp', ['uiSlider']
window.app.controller 'myCtrl', ($scope, $timeout) ->
	o = $scope
	DeplierClass = void
	anim = void
	callbackPlayer = void
	darkWinningPos = void
	message = void
	preview = void
	o.stackPosition = void
	time = void
	
	threadIsntUsed = true
	window.MyScopeAccess = $scope

	class DeplierClass
		(bool) ->
			@0 = bool
		deplier : (bool = !@0) ->  @0 = bool
		getClass : -> if @0 then 'optionVisible' else 'optionInvisible'
		isDisp : -> @0
	anim = (pos, player, callback) ->
		anim2 = void
		anim2 = (i) ->
			clickOnUndo = void
			o.$grille[i - 7] = 0 if i > 6
			o.$grille[i] = player
			clickOnUndo = +Modele.grille[pos] is 0
			if clickOnUndo
				o.$grille[i] = 0
				callback! if callback
				o.$digest!
				return 
			if i < pos then $timeout (-> anim2 i + 7), time else $timeout callback, time + 1 if callback
		$timeout (-> anim2 pos % 7)
		o.$grille.0 = Modele.grille.0 if not (pos % 7)
	callbackPlayer = ->
		callbackBotIfActiveElsePlayer1 = void
		posBot = void
		callbackBotIfActiveElsePlayer1 = ->
			threadIsntUsed := true
			o.$messageF! if Modele.isGameFinish!
			o.loopThreatAnimation!
		if o.isBotActive
			IA.setDif o.cost
			posBot = IA.p4BlockEasy pos, false
			anim posBot, 1, callbackBotIfActiveElsePlayer1
		else
			callbackBotIfActiveElsePlayer1!
	
	darkWinningPos = (dark) ->
		f = Modele.winInfo
		return false if not f
		i = f.pion1
		colorNumber = o.$grille[i]
		if dark 
			colorNumber = if colorNumber is 1 then 4 else 8
		loop
			o.$grille[i] = colorNumber
			i += f.dir
			break if (i > f.pion2)  

	o.$messageF = (egality) ->
		o.fen.disp = 'message'
		o.whyItIsFinish = false
		if egality then o.message = 'ceci est une égalité mais pas une victoire' else darkWinningPos true
		if Modele.isHumanTurn!
			if (IA.boolSmart.indexOf 'off') + 1
				o.message = 'bravo vous avez gagné    augmentez un peu le niveau'
			else
				o.message = 'bravo vous avez gagné   envoyer votre historique par commentaire pour améliorer le jeu'
		else
			o.message = 'Le robot gagne cette fois vous pouvez baisser le niveau de difficulté de quelques pourcents'
		o.popup.deplier true
		o.$digest!
	o<<<
		o: o
		loopThreatAnimation : ->
			pos = void
			if Modele.isGameFinish!
				o.stackPosition.length = 0
				threadIsntUsed := true
				return 
			if o.stackPosition.length
				if threadIsntUsed
					threadIsntUsed := false
					time := if o.animation2 then 50 else 0
					pos = Modele.play o.stackPosition.shift!
					threadIsntUsed := true if pos < 0
					if Modele.isGameFinish!
						o.$messageF!
					else
						if (Modele.grille.indexOf 0) < 0
							message 'égalité'
							threadIsntUsed := true
					anim pos, (Modele.getPlayer 1), callbackPlayer

		tabColor : {
			'-30': 'rgb(255,0,234)'
			0: 'white'
			1: 'rgb(255,251,0)'
			2: 'rgb(255,0,0)'
			3: 'rgb(205,209,77)'
			4: 'rgb(160,166,0)'
			5: 'rgb(255,162,0)'
			6: 'rgb(99,99,99)'
			7: 'rgb(255,128,128)'
			8: 'rgb(140,0,0)'
			9: 'rgb(0,255,221)'
		},
		endPreview : ($index) ->  
			if Modele.grille[$index % 7] is 0
				o.$grille[$index % 7] = 0
		stackPosition : []
		isBotActive: true
		modeCreator: false
		whyItIsFinish: false
		animation2: true
		popup: new DeplierClass
		IA: IA
		Modele: Modele
		fen: {
			disp: 'play'
			stayOpen: true
		}
		mode: 'normal'
		cost: 100
		grille: []
		message: 'ça va commencer'
		endGameMessage: true
		minLine: 0
		maxLine: 5
		minCol: 0
		maxCol: 6

		clickOnBlack: ->
			o.fen.disp = 'play'
			o.popup.deplier false
		reverse: (aString) -> o[aString] = not o[aString]
		alert: (text) -> alert text
		optionDisp: -> if o.optionsWidth is optionsWidthInit then 'block' else 'none'

		
		loadStory: (grille2) ->
			return false if not grille2
			Modele.restore grille2
			if not (Modele.backup.length % 2) then o.undo!
			o.$grille.safeClone Modele.grille
			Modele.setPlayer 2
		load: (grille2) ->
			Modele.setModel grille2
			o.$grille.safeClone Modele.grille
		modeleCreator: ->
			if not o.modeCreator
				o.endPreview preview
				o.grilleCreator = o.$grille.slice!
				o.grilleCreator[Modele.backup.at -1] = 0
			o.reverse 'modeCreator'
		goodGrille: -> if o.modeCreator then o.grilleCreator else o.$grille
		displayOption: ->
			o.popup.deplier! if not (o.endGameMessage && o.popup.isDisp!)
			o.endGameMessage = false
			o.fen.disp = 'option'
		init: ->
			o.popup.deplier false
			threadIsntUsed := true
			Modele.playAgain!
			o.endGameMessage = false
			o.fen.disp = 'option'
			o.$grille := Modele.grille.slice!
		deplier: (columClass, bool) ->
			if bool isnt void
				o[columClass] = if not bool then 'optionInvisible' else 'optionVisible'
			else
				o[columClass] = if o[columClass] is 'optionVisible' then 'optionInvisible' else 'optionVisible'
		preview: ($index) ->
			pos = void
			return false if o.modeCreator
			if preview isnt void then o.endPreview preview
			pos = ($index + 7) % 7
			if not isNaN pos
				o.$grille[pos] = Modele.getPlayer 0 if o.$grille[pos] is 0
				preview := pos
			if $index % 7 isnt 0 then o.$grille.0 = Modele.grille.0
		restore: ->
			backup = void
			backup = $.cookie 'backup'
			o.loadStory backup
		save: -> $.cookie 'backup', Modele.backup
		graphique: (colorNumber) -> o.tabColor[colorNumber]
		undo: ->
			pos = void
			if Modele.isGameFinish!
				WinningPos false
				Modele.isGameFinish false
			threadIsntUsed := true
			pos = Modele.undo!
			o.$grille[pos] = 0
			IA.boolSmart.pop!
			if o.isBotActive && Modele.getPlayer! is 1 then if Modele.backup.length % 2 is 0 then o.undo! else Modele.setPlayer 2
			o.popup.deplier false
		fallenPion: (pos) ->
			o.grilleCreator[pos] = o.$keyCode - 96 if o.modeCreator
			if not Modele.isGameFinish! then o.stackPosition.push pos else o.stackPosition := []
			o.loopThreatAnimation!
		keydown: (event) ->
			i = void
			inc = void
			nextPos = void
			event.preventDefault!
			return  if o.modeCreator
			o.$keyCode := event.which
			if o.$keyCode > 47 && o.$keyCode < 58
				o.fallenPion o.$keyCode - 48
				return 
			if event.which is 90 && event.ctrlKey
				o.undo!
				return 
			if o.$keyCode is 37 || o.$keyCode is 39
				inc = o.$keyCode - 38
				nextPos = preview
				i = 7
				while true
					nextPos = mod nextPos + inc, 7
					break if not (+Modele.grille[nextPos] && i--)
				o.preview nextPos
				return 
			if o.$keyCode is 38
				o.undo!
				o.preview!
				return 
			if o.$keyCode is 40 then o.preview o.fallenPion preview
		scrollInPx: (lg) -> ($ window).scrollTop ($ window).scrollTop! - lg
		touchStart: (element) ->
			o.displayScroll = 'block'
			o.lastY := event.touches.0.clientY
			o.touchMove element
		touchMove: (element) ->
			pos = void
			width = void
			return off_ if o.popup.isDisp!
			width = element.P4.width!
			pos = if event.touches.length >= 1 then event.touches.0.pageX else -1
			if pos < 0 then return false
			pos = (pos - element.P4.offset!.left) * 7 / width
			pos = Math.floor pos
			o.preview pos
			event.preventDefault!
		touchEnd: (element) ->
			return true if o.popup.isDisp!
			event.preventDefault!
			o.fallenPion preview
		reverseIsBotActive: ->
			o.reverse 'isBotActive'
			o.undo! if Modele.backup.length % 2 is 0
	o.init!
	o.popup.deplier true
	o.fen.disp = 'message'
	o.$grille.safeClone Modele.grille