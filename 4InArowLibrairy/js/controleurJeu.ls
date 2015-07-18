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
		preview: 
			pos : 0				
			add: ->	[return @on! if not model.grille[(@pos+= it)%%7] for i to 6]
			off: ->
				for i to 6 then o.grille[i] = model.grille[i]
			set: -> 
				@off!
				@pos =  it
				@on! if model.grille[it%7] ~= 0
			on: -> 
				@off!
				o.grille[@pos%%7] = model.getPlayer()
				
		replayIcon: -> Modele.isGameFinish() && !@whyItIsFinish || @fen.disp == 'message'
		darkWinningPos : (dark) ->
			f = model.winInfo
			colorNumber = model.grille[f.0] * (if dark then 4 else 1)
			f.forEach (pos) ~> @grille[pos] = colorNumber
		fullscreen: ->
			@fen.disp = 'play';
			@popup.deplier(true);
			@whyItIsFinish = false
		messageF : (egality) ->
			@fen.disp = 'message'
			@whyItIsFinish = false
			@message = if egality 
				'ceci est une égalité mais pas une victoire' 
			else 
				@darkWinningPos true
				if model.isHumanTurn!
					'bravo vous avez gagné' + if  IA.boolSmart isnt 2 * model.backup.length
						'augmentez un peu le niveau'
					else
						$(document).trigger(\historiqueJeu,[model.backup])
						'envoyer votre historique par commentaire pour améliorer le jeu'
				else
					'Le robot gagne cette fois vous pouvez baisser le 
					niveau de difficulté de quelques pourcents'
			@popup.deplier true
			@$digest!
		anim : (pos, player, callback) ->
			anim2 = (i) ~>
				@grille[i - 7] = 0 if i > 6
				@grille[i] = player
				if i < pos then 
					$timeout (-> anim2 i + 7), @time 
				else if callback
					$timeout callback, @time + 1
				else
					alert('end')
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
						@messageF!
					else
						if (model.grille.indexOf 0) < 0
							@messageF('égalité')
							@threadIsntUsed := on
					@anim pos, (model.getPlayer 1),  ~>
						callbackBotIfActiveElsePlayer1 = ~>
							@threadIsntUsed := on
							@messageF! if model.isGameFinish!
							@grille = model.grille[0 to 41]
							@loopThreatAnimation!

						if  model.backup.length%2 is 0
							if @isBotActive
								posBot = IA.p4BlockEasy pos, off
								@anim posBot, 1, callbackBotIfActiveElsePlayer1
							else
								callbackBotIfActiveElsePlayer1!
						else
							@grille = [.. for  model.grille]

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
				@keyCode = 5 + 96
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
			IA.boolSmart = 1
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
			if @isBotActive && model.getPlayer! is 1 
				if model.backup.length % 2 is 0 
					@undo!
				else 
					model.setPlayer 2
			else
				IA.boolSmart -- if IA.boolSmart > 1
			@popup.deplier off
		fallenPion: (pos) ~>
			if @modeCreator
				@grilleCreator[pos] = if 0 <= (n = @keyCode%48) < 10 then n
				else String.fromCharCode(@keyCode)toLowerCase!
			else if model.isGameFinish()
				@whyItIsFinish = off 
				@popup.deplier(on)
				@fen.disp = "" 			
				@stackPosition.lenght = 0 
			else 
				@stackPosition[*] = pos
				@loopThreatAnimation!
		keydown: (e) ->
			e.preventDefault!
			@keyCode = e.which
			if !@modeCreator
				switch e.which
				| 37,39 => @preview.add(that - 38)# left right arrow
				| 38,90 => @undo! #if event.ctrlKey useless because i don't use the touch z alone
				| 40 => @fallenPion @preview.pos
				| _ => @fallenPion n if 0 <= (n = that%48) < 10 # play at the column chosen
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