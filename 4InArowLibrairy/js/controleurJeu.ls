window.app = angular.module 'myApp', ['uiSlider']
window.app.controller 'myCtrl', ($scope, $timeout) -> let @ = $scope
	window.o = @
	model = borto.modele
	class DeplierClass
		-> @0 = it
		deplier : (it = !@0) ->  @0 = it
		getClass : -> if @0 then 'optionVisible' else 'optionInvisible'
		isDisp : -> @0

	@ <<<		
		threadIsntUsed : true
		stackPosition : []
		isBotActive: true
		modeCreator: false
		whyItIsFinish: false
		animation2: true
		popup: new DeplierClass
		IA: IA
		model: model
		fen: 
			disp: 'play'
			stayOpen: true
		mode: 'normal'
		cost: 100
		grille: []
		message: 'ça va commencer'
		endGameMessage: true
		minLine: 0
		maxLine: 5
		minCol: 0
		maxCol: 6
		tabColor :
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
		replayIcon: -> Modele.isGameFinish() && !@whyItIsFinish || @fen.disp == 'message'
		darkWinningPos : (dark) ->
			f = model.winInfo
			colorNumber = model.grille[f.0] * (if dark then 4 else 1)
			f.forEach (pos) ~> @$grille[pos] = colorNumber
		fullscreen: ->
			@fen.disp = 'play';
			@popup.deplier(true);
			@whyItIsFinish = false
		$messageF : (egality) ->
			@fen.disp = 'message'
			@whyItIsFinish = false
			if egality 
				@message = 'ceci est une égalité mais pas une victoire' 
			else 
				@darkWinningPos true
			if model.isHumanTurn!
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
				clickOnUndo = +model.grille[pos] is 0
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
			@$grille.0 = model.grille.0 if not (pos % 7)
		endPreview : ($index) ->  
			if model.grille[$index % 7] is 0
				@$grille[$index % 7] = 0		
		loopThreatAnimation : ->
			pos = void
			if model.isGameFinish!
				@stackPosition.length = 0
				@threadIsntUsed := true
				return 
			if @stackPosition.length
				if @threadIsntUsed
					@threadIsntUsed := false
					@time := if @animation2 then 50 else 0
					pos = model.play @stackPosition.shift!
					@threadIsntUsed := true if pos < 0
					if model.isGameFinish!
						@$messageF!
					else
						if (model.grille.indexOf 0) < 0
							@messageF('égalité')
							@threadIsntUsed := true
					@anim pos, (model.getPlayer 1),  ~>
						callbackBotIfActiveElsePlayer1 = ~>
							@threadIsntUsed := true
							@$messageF! if model.isGameFinish!
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
		reverse: (aString) -> ! = o[aString]
		alert: (text) -> alert text
		optionDisp: -> if @optionsWidth is optionsWidthInit then 'block' else 'none'
		loadStory: (grille2) ->
			return false if not grille2
			model.restore grille2
			if not (model.backup.length % 2) then @undo!
			@$grille.safeClone model.grille
			model.setPlayer 2
		load: (grille2) ->
			model.setModel grille2
			@$grille.safeClone model.grille
		modeleCreator: ->
			if not @modeCreator
				@$keyCode = 5 + 96
				@endPreview @preview
				@grilleCreator = @$grille.slice!
				@grilleCreator[model.backup[*-1]] = 0
			@reverse 'modeCreator'
		goodGrille: -> if @modeCreator then @grilleCreator else @$grille
		displayOption: ->
			@popup.deplier! if not (@endGameMessage && @popup.isDisp!)
			@endGameMessage = false
			@fen.disp = 'option'
		init: ->
			@popup.deplier false
			@threadIsntUsed := true
			model.playAgain!
			@endGameMessage = false
			@fen.disp = 'option'
			@$grille := model.grille.slice!
		deplier: (columClass, bool) ->
			if bool isnt void
				o[columClass] = if not bool then 'optionInvisible' else 'optionVisible'
			else
				o[columClass] = if o[columClass] is 'optionVisible' then 'optionInvisible' else 'optionVisible'
		previewF: ($index) ->
			return false if @modeCreator
			if @preview isnt void then @endPreview @preview
			pos = $index %% 7
			if not isNaN pos
				@$grille[pos] = model.getPlayer 0 if @$grille[pos] is 0
				@preview := pos
			if $index % 7 isnt 0 then @$grille.0 = model.grille.0
		restore: ->
			backup = $.cookie 'backup'
			@loadStory backup
		save: -> $.cookie 'backup', model.backup
		graphique: (colorNumber) -> @tabColor[colorNumber]
		undo: ->
			if model.isGameFinish!
				@darkWinningPos false
				model.isGameFinish false
			@threadIsntUsed := true
			pos = model.undo!
			@$grille[pos] = 0
			IA.boolSmart.pop!
			if @isBotActive && model.getPlayer! is 1 then if model.backup.length % 2 is 0 then @undo! else model.setPlayer 2
			@popup.deplier false
		fallenPion: (pos) ~>
			@grilleCreator[pos] = @$keyCode - 96 if @modeCreator
			if not model.isGameFinish! then @stackPosition.push pos else @stackPosition := []
			@loopThreatAnimation!
		keydown: (event) ->
			event.preventDefault!
			@$keyCode := event.which
			return  if @modeCreator
			if  47 < @$keyCode < 58
				@fallenPion @$keyCode - 48
				return 
			if event.which is 90 && event.ctrlKey
				@undo!
				return 
			if @$keyCode is 37 || @$keyCode is 39
				inc = @$keyCode - 38
				nextPos = @preview
				i = 7
				loop
					nextPos = mod nextPos + inc, 7
					break if not (+model.grille[nextPos] && i--)
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
			var pos, width 
			return off_ if @popup.isDisp!
			width = element.P4.width!
			pos = if event.touches.length >= 1 then event.touches.0.pageX else -1
			return false if pos < 0 
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
			@undo! if model.backup.length % 2 is 0
	@init!
	@popup.deplier true
	@fen.disp = 'message'
	@$grille.safeClone model.grille