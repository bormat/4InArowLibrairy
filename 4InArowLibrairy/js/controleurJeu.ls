window.app = angular.module 'myApp', ['uiSlider']
window.app.controller 'myCtrl', ($scope, $timeout) -> let @ = $scope
	window.o = o = $scope

	class DeplierClass
		-> @0 = it
		deplier : (it = !@0) ->  @0 = it
		getClass : -> if @0 then 'optionVisible' else 'optionInvisible'
		isDisp : -> @0

	o <<<		
		threadIsntUsed : true
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
		}
		darkWinningPos : (dark) ->
			{dir, pion1, pion2} = Modele.winInfo
			colorNumber = @Modele.grille[pion1] * (dark * 4) || 1 # 1 or 2 => if dark 4 or 8 
			loop
				@$grille[pion1] = colorNumber
				pion1 += dir
				break if (pion1 > pion2)  
		$messageF : (egality) ->
			@fen.disp = 'message'
			@whyItIsFinish = false
			if egality 
				@message = 'ceci est une égalité mais pas une victoire' 
			else 
				@darkWinningPos true
			if Modele.isHumanTurn!
				if (IA.boolSmart.indexOf 'off') + 1
					@message = 'bravo vous avez gagné    augmentez un peu le niveau'
				else
					@message = 'bravo vous avez gagné   envoyer votre historique par commentaire pour améliorer le jeu'
			else
				@message = 'Le robot gagne cette fois vous pouvez baisser le niveau de difficulté de quelques pourcents'
			@popup.deplier true
			@$digest!
		anim : (pos, player, callback) ->
			anim2 = (i) ~>
				clickOnUndo = void
				@$grille[i - 7] = 0 if i > 6
				@$grille[i] = player
				clickOnUndo = +Modele.grille[pos] is 0
				if clickOnUndo
					@$grille[i] = 0
					callback! if callback
					@$digest!
					return 
				if i < pos then 
					$timeout (-> anim2 i + 7), @time 
				else if callback
					$timeout callback, @time + 1 
			$timeout (-> anim2 pos % 7)
			@$grille.0 = Modele.grille.0 if not (pos % 7)

		endPreview : ($index) ->  
			if Modele.grille[$index % 7] is 0
				@$grille[$index % 7] = 0
		
		loopThreatAnimation : ->
			pos = void
			if Modele.isGameFinish!
				@stackPosition.length = 0
				@threadIsntUsed := true
				return 
			if @stackPosition.length
				if @threadIsntUsed
					@threadIsntUsed := false
					@time := if @animation2 then 50 else 0
					pos = Modele.play @stackPosition.shift!
					@threadIsntUsed := true if pos < 0
					if Modele.isGameFinish!
						@$messageF!
					else
						if (Modele.grille.indexOf 0) < 0
							@messageF('égalité')
							@threadIsntUsed := true
					@anim pos, (Modele.getPlayer 1),  ~>
						callbackBotIfActiveElsePlayer1 = ~>
							@threadIsntUsed := true
							@$messageF! if Modele.isGameFinish!
							@loopThreatAnimation!

						if @isBotActive
							IA.dif = @cost
							posBot = IA.p4BlockEasy pos, false
							@anim posBot, 1, callbackBotIfActiveElsePlayer1
						else
							callbackBotIfActiveElsePlayer1!
					

		clickOnBlack: ->
			@fen.disp = 'play'
			@popup.deplier false
		reverse: (aString) -> o[aString] = not o[aString]
		alert: (text) -> alert text
		optionDisp: -> if @optionsWidth is optionsWidthInit then 'block' else 'none'
		loadStory: (grille2) ->
			return false if not grille2
			Modele.restore grille2
			if not (Modele.backup.length % 2) then @undo!
			@$grille.safeClone Modele.grille
			Modele.setPlayer 2
		load: (grille2) ->
			Modele.setModel grille2
			@$grille.safeClone Modele.grille
		modeleCreator: ->
			if not @modeCreator
				@endPreview @preview
				@grilleCreator = @$grille.slice!
				@grilleCreator[Modele.backup.at -1] = 0
			@reverse 'modeCreator'
		goodGrille: -> if @modeCreator then @grilleCreator else @$grille
		displayOption: ->
			@popup.deplier! if not (@endGameMessage && @popup.isDisp!)
			@endGameMessage = false
			@fen.disp = 'option'
		init: ->
			@popup.deplier false
			@threadIsntUsed := true
			Modele.playAgain!
			@endGameMessage = false
			@fen.disp = 'option'
			@$grille := Modele.grille.slice!
		deplier: (columClass, bool) ->
			if bool isnt void
				o[columClass] = if not bool then 'optionInvisible' else 'optionVisible'
			else
				o[columClass] = if o[columClass] is 'optionVisible' then 'optionInvisible' else 'optionVisible'
		previewF: ($index) ->
			pos = void
			return false if @modeCreator
			if @preview isnt void then @endPreview @preview
			pos = ($index + 7) % 7
			if not isNaN pos
				@$grille[pos] = Modele.getPlayer 0 if @$grille[pos] is 0
				@preview := pos
			if $index % 7 isnt 0 then @$grille.0 = Modele.grille.0
		restore: ->
			backup = void
			backup = $.cookie 'backup'
			@loadStory backup
		save: -> $.cookie 'backup', Modele.backup
		graphique: (colorNumber) -> @tabColor[colorNumber]
		undo: ->
			@fen.disp = 'option'
			if Modele.isGameFinish!
				@darkWinningPos false
				Modele.isGameFinish false
			@threadIsntUsed := true
			pos = Modele.undo!
			@$grille[pos] = 0
			IA.boolSmart.pop!
			if @isBotActive && Modele.getPlayer! is 1 then if Modele.backup.length % 2 is 0 then @undo! else Modele.setPlayer 2
			@popup.deplier false
		fallenPion: (pos) ~>
			if @modeCreator
				@grilleCreator[pos] = @$keyCode - 96 
			else 
				if not Modele.isGameFinish!
					@stackPosition[*] = pos
				else 
					@stackPosition = []
				@loopThreatAnimation!
		keydown: (event) ->
			event.preventDefault!
			@$keyCode = event.which
			return if @modeCreator
			if @$keyCode > 47 && @$keyCode < 58
				@fallenPion @$keyCode - 48
				return 
			if event.which is 90 && event.ctrlKey
				@undo!
				return 
			if @$keyCode is 37 || @$keyCode is 39
				inc = @$keyCode - 38
				nextPos = @preview
				i = 7
				while true
					nextPos = mod nextPos + inc, 7
					break if not (+Modele.grille[nextPos] && i--)
				@previewF nextPos
				return 
			if @$keyCode is 38
				@undo!
				@previewF()
				return 
			if @$keyCode is 40 then @previewF(@fallenPion @preview)
		scrollInPx: (lg) -> ($ window).scrollTop ($ window).scrollTop! - lg
		touchStart: (element) ->
			@displayScroll = 'block'
			@lastY := event.touches.0.clientY
			@touchMove element
		touchMove: (element) ->
			pos = void
			width = void
			return off_ if @popup.isDisp!
			width = element.P4.width!
			pos = if event.touches.length >= 1 then event.touches.0.pageX else -1
			if pos < 0 then return false
			pos = (pos - element.P4.offset!.left) * 7 / width
			pos = Math.floor pos
			@previewF pos
			event.preventDefault!
		touchEnd: (element) ->
			return true if @popup.isDisp!
			event.preventDefault!
			@fallenPion @preview
		reverseIsBotActive: ->
			@reverse 'isBotActive'
			@undo! if Modele.backup.length % 2 is 0
	@init!
	@popup.deplier true
	@fen.disp = 'message'
	@$grille.safeClone Modele.grille