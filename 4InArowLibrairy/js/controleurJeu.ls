window.app = angular.module 'myApp', ['uiSlider']
window.app.controller 'myCtrl', ($scope, $timeout) -> let @ = $scope
	window.o = @
	window.borto
		model = ..modele
		ia = ..ia

	class DeplierClass
		-> @0 = it
		deplier : (it = !@0) ->  @0 = it
		getClass : -> if @0 then 'optionVisible' else 'optionInvisible'
		isDisp : -> @0
	$ = jquery 
	@ <<<
		ia: ia
		model: model	
		threadIsntUsed : true
		stackPosition : []
		isBotActive: true
		modeCreator: false
		whyItIsFinish: false
		animation2: true
		popup: new DeplierClass
		fen: 
			disp: 'play'
			stayOpen: true
		mode: 'normal'
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
		pathI: './images/'
		preview: 
			pos : 0				
			add: ->	[return @on! if not model.grille[(@pos+= it)%%7] for i to 6]
			off: ->
				for i to 6 then o.grille[i] = model.grille[i]
			set: -> 
				@off!
				@pos =  it
				@on!
			on: -> 
				@off!
				o.grille[@pos%%7] = 2
				
		replayIcon: -> Modele.isGameFinish() && !@whyItIsFinish || @fen.disp == 'message'
		darkWinningPos : (dark) ->
			f = model.winInfo
			colorNumber = model.grille[f.0] * (if dark then 4 else 1)
			f.forEach (pos) ~> @grille[pos] = colorNumber
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
				@message = 'bravo vous avez gagné' +
				if off in IA.boolSmart 
					'augmentez un peu le niveau'
				else
					'envoyer votre historique par commentaire pour améliorer le jeu'
			else
				@message = 'Le robot gagne cette fois vous pouvez baisser le 
				niveau de difficulté de quelques pourcents'
			@popup.deplier true
			@$digest!
		anim : (pos, player, callback) ->
			anim2 = (i) ~>
				clickOnUndo = void
				@grille[i - 7] = 0 if i > 6
				@grille[i] = player
				clickOnUndo = +model.grille[pos] is 0
				if clickOnUndo
					@grille[i] = 0
					callback! if callback
					@$digest!
					return 
				if i < pos then 
					$timeout (-> anim2 i + 7), @time 
				else if callback
					$timeout callback, @time + 1 
			$timeout (-> anim2 pos % 7)
			@grille.0 = model.grille.0 if not (pos % 7)	
		loopThreatAnimation : ->
			pos = void
			if model.isGameFinish!
				@stackPosition.length = 0
				@threadIsntUsed := on
				return 
			if @stackPosition.length
				if @threadIsntUsed
					@threadIsntUsed = off
					@time = if @animation2 then 50 else 0
					pos = model.play @stackPosition.shift!
					return @threadIsntUsed = on if pos < 0
					if model.isGameFinish!
						@$messageF!
					else
						if (model.grille.indexOf 0) < 0
							@messageF('égalité')
							@threadIsntUsed := on
					@anim pos, (model.getPlayer 1),  ~>
						callbackBotIfActiveElsePlayer1 = ~>
							@threadIsntUsed := on
							@$messageF! if model.isGameFinish!
							@loopThreatAnimation!

						if @isBotActive
							posBot = IA.p4BlockEasy pos, off
							@anim posBot, 1, callbackBotIfActiveElsePlayer1
						else
							callbackBotIfActiveElsePlayer1!
		clickOnBlack: ->
			@fen.disp = 'play'
			@popup.deplier off
		reverse: (aString) -> ! = o[aString]
		alert: (text) -> alert text
		optionDisp: -> if @optionsWidth is optionsWidthInit then 'block' else 'none'
		loadStory: (grille2) ->
			return off if not grille2
			model.restore grille2
			if not (model.backup.length % 2) then @undo!
			@grille.safeClone model.grille
			model.setPlayer 2
		load: (grille2) ->
			model.setModel grille2
			@grille.safeClone model.grille
		modeleCreator: ->
			if not @modeCreator
				@$keyCode = 5 + 96
				#@endPreview @getPrev!
				@grilleCreator = @grille.slice!
				@grilleCreator[model.backup[*-1]] = 0
			@reverse 'modeCreator'
		goodGrille: -> if @modeCreator then @grilleCreator else @grille
		displayOption: ->
			@popup.deplier! if not (@endGameMessage && @popup.isDisp! or @replayIcon! )
			@whyItIsFinish = on
			@endGameMessage = off
			@fen.disp = 'option'
		init: ->
			@popup.deplier off
			@threadIsntUsed := on
			model.playAgain!
			IA.boolSmart.length = 0
			@endGameMessage = off
			@fen.disp = 'option'
			@grille := model.grille.slice!
		restore: ->
			@loadStory borto.cookies.getTab(\backup)
			IA.boolSmart = borto.cookies.getTab(\boolSmart)
		save: -> 
			borto.cookies.set \backup, model.backup
			borto.cookies.set \boolSmart, IA.boolSmart
		graphique: (colorNumber) -> @tabColor[colorNumber]
		undo: ->
			if model.isGameFinish!
				@fen.disp = ''; 
				@popup.deplier(false);
				@darkWinningPos off
				if @whyItIsFinish 
					@whyItIsFinish = off
				else
					model.isGameFinish off
				#@fen.disp = "option"
			@threadIsntUsed := on
			pos = model.undo!
			@grille[pos] = 0
			IA.boolSmart.pop!
			if @isBotActive && model.getPlayer! is 1 
				if model.backup.length % 2 is 0 
					@undo!
				else 
					model.setPlayer 2
			@popup.deplier off
		fallenPion: (pos) ~>
			if @modeCreator
				@grilleCreator[pos] = @$keyCode - 96
			else if model.isGameFinish()
				@whyItIsFinish = off 
				@popup.deplier(on)
				@fen.disp = "" 			
				@stackPosition.lenght = 0 
			else 
				@stackPosition[*] = pos
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
				@preview.add(@$keyCode - 38)
				return 
			if @$keyCode is 38
				@undo!
				return 
			if @$keyCode is 40 then @fallenPion @preview.pos
		scrollInPx: (lg) -> ($ window).scrollTop ($ window).scrollTop! - lg
		reverseIsBotActive: ->
			@reverse 'isBotActive'
			@undo! if model.backup.length % 2 is 0
		touchStart: ->
			@displayScroll = 'block'
			@lastY = event.touches.0.clientY
			@touchMove!
		touchMove: ->
			return off if @popup.isDisp!
			pos = if event.touches.length >= 1 then event.touches.0.pageX else -1
			return off if pos < 0 
			pos = ~~( (pos - $(\#p4).offset!.left) * 7 / $(\#p4).width! )
			event.preventDefault!
		touchEnd: ->
			return on if @popup.isDisp!
			event.preventDefault!
			@fallenPion @getPrev
	@init!
	@popup.deplier on
	@fen.disp = 'message'
	@grille.safeClone model.grille