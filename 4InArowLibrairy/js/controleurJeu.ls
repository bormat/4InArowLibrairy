window.app = angular.module 'myApp', ['uiSlider']
window.app.controller 'myCtrl', ($scope,$rootScope, $timeout,$q) -> let @ = $scope
	window.o = @
	window.borto
		model = ..modele
		ia = ..ia

	isGameOver = model~isGameOver
	class DeplierClass
		tab = {false:'optionInvisible',true:'optionVisible'}
		-> @0 = it
		deplier : (it = !@0) ->  @0 = it
		getClass : -> 
			return tab[@0]  
		getClassF : -> 
			return tab[@0()]  		  
		isDisp : -> @0
	$ = jQuery 
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
			stayOpen: true
		mode: 'normal'
		message: 'ça va commencer'
		endGameMessage: true
		minLine: 0
		maxLine: 5
		minCol: 0
		maxCol: 6
		tabColor :
			'a': 'rgb(255,50,234)'
			'e': 'rgb(21,90,22)'
			'f': 'rgb(97,1,234)'
			'h': 'rgb(0,200,180)'
			'i': 'rgb(97,28,34)'
			'n': 'rgb(97,234,0)' # '.'equivalent
			'g': 'rgb(200,200,234)'
			'j': 'rgb(12,20,234)'
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
				it
			on: -> 
				return off if o.animRun
				@off!
				o.grille[@pos%%7] = model.getPlayer()
				
		replayIcon: -> (isGameOver! && !@whyItIsFinish || @fen.disp == 'message')
		darkWinningPos : (dark) ->
			f = model.winInfo
			colorNumber = model.grille[f.0] * (if dark then 4 else 1)
			f.forEach (pos) ~> @grille[pos] = colorNumber
		fullscreen: ->
			@fen.disp = 'play';
			@popup.deplier(true);
			@whyItIsFinish = false
		messageIfEndGame : ->
			if model.weHaveAWinner!			
				@darkWinningPos true
				@message = if model.isHumanTurn!
					'bravo vous avez gagné' + if  2 * IA.boolSmart is model.backup.length
						$(document).trigger(\historiqueJeu,[model.backup])
						'envoyer votre historique par commentaire pour améliorer le jeu'
					else
						'augmentez un peu le niveau'
				else
					'Le robot gagne cette fois vous pouvez baisser le 
					niveau de difficulté de quelques pourcents'
			else if model.isGameFull!
				@message = 'ceci est une égalité mais pas une victoire'
			else 
				return off
			@fen.disp = 'message'
			@whyItIsFinish = false
			@popup.deplier true
			on 
			#@$digest!
		anim : (To, player)~>$q((resolve)~>			
			@animRun = on 
			i = To%7
			do asyncronousFor = ~>  
				$timeout(if i <= To then ~>
					@grille[i-7] = 0 if i > 6
					@grille[i] = player
					i+=7
					asyncronousFor!
				else
					resolve
				,@time)
		)
		fallenPion: (pos) ~>
			if @modeCreator
				n = @keyCode%48
				@grilleCreator[pos] = 
					|-1 < n < 10 	=> n
					|_ 	=> String.fromCharCode(@keyCode)toLowerCase!
			else if isGameOver!
				@whyItIsFinish = off 
				@popup.deplier(on)
				@fen.disp = "" 			
				@stackPosition.length = 0
			else 
				@stackPosition[*] = pos
				@loopThreatAnimation!
		loopThreatAnimation : ->
			return if not (@stackPosition.length && @threadIsntUsed)
			if isGameOver!
				@stackPosition.length = 0
				@threadIsntUsed = on
				return 
			@threadIsntUsed = off
			@time = if @animation2 then 50 else 0
			pos = model.play @stackPosition.shift!
			return @threadIsntUsed = on if pos < 0			
			@anim(pos,model.getPlayer(1))then(~>
				@animRun = off
				return if @messageIfEndGame!
				if @isBotActive && model.backup.length%2 is 0#bot don't play if we undo during anim
					posBot = IA.p4BlockEasy pos, off
					return @anim(posBot, 1)#promise
			)then(~>
				@grille = model.grille[0 to 41] #in case of undo action during anim
				@threadIsntUsed = on
				@messageIfEndGame! if @isBotActive
				@animRun = off
				@loopThreatAnimation!
			)
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
			@grille = model.grille.slice!
			@replayIconPop = new DeplierClass(~>@replayIcon!)
		restore: ->
			@loadStory borto.cookies.getTab(\backup)
			IA.boolSmart = borto.cookies.getTab(\boolSmart)
		save: -> 
			borto.cookies.set \backup, model.backup
			borto.cookies.set \boolSmart, IA.boolSmart
		graphique: (colorNumber) -> @tabColor[colorNumber]
		undo: ->
			if isGameOver!
				@fen.disp = ''; 
				@popup.deplier(false);
				@darkWinningPos off
				if @whyItIsFinish 
					@whyItIsFinish = off
				else
					model.weHaveAWinner off
				#@fen.disp = "option"
			@threadIsntUsed := on
			pos = model.undo!
			@grille[pos] = 0
			if @isBotActive && model.getPlayer! is 1 
				if model.backup.length % 2 is 0 
					@undo!
				else 
					model.setPlayer 2
				IA.boolSmart -- if IA.boolSmart > 1
			@popup.deplier off
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
			@preview.set ~~( (pos - $(\#p4).offset!.left) * 7 / $(\#p4).width! )
			event.preventDefault!
		touchEnd: ->
			return on if @popup.isDisp!
			event.preventDefault!
			@fallenPion @preview.pos
	@init!
	@popup.deplier on
	@fen.disp = 'message'
