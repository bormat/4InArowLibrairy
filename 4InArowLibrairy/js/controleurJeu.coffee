window.app = angular.module('myApp', [ 'uiSlider' ])
window.app.controller 'myCtrl', ($scope, $timeout) ->
    o = $scope
    lastY = lastX =  originX =  originY = lastScroll =  $keyCode = 
    window.MyScopeAccess = $grille = stackPosition = 
    preview =  time = o.endPreview=  anim = DeplierClass= null
    threadIsntUsed= on
    stackPosition = [] 
    o.tabColor =
        '-30': 'rgb(255,0,234)'##a
        0: 'white'
        1: 'rgb(255,251,0)'
        2: 'rgb(255,0,0)'
        3: 'rgb(205,209,77)'
        4: 'rgb(160,166,0)' # black yellow 
        5: 'rgb(255,162,0)'
        6: 'rgb(99,99,99)'
        7: 'rgb(255,128,128)'
        8: 'rgb(140,0,0)' #black red    
        9: 'rgb(0,255,221)'

    o.endPreview = ($index) ->
        if Modele.grille[$index % 7] is 0
            $grille[$index % 7] = 0
        ;
    ;

    class DeplierClass 
        constructor: (bool) ->
            @[0] = bool
        deplier: (bool) ->
            @[0] = if bool? then bool else !@[0] ;
        getClass: ->
           if @[0] then 'optionVisible' else 'optionInvisible'
        isDisp: ->
            @[0]
    

    anim = (pos, player, callback) ->
        anim2 = (i) ->
            $grille[i - 7] = 0 if i > 6
            $grille[i] = player 
            ###test if we have click on undo during animation###
            clickOnUndo = +Modele.grille[pos] is 0
            if clickOnUndo
                $grille[i] = 0
                if callback
                    callback()
                o.$digest()
                return
            if i < pos
                $timeout(
                    -> anim2(i + 7)
                    time
                )
            else 
                 $timeout(callback,time + 1) if callback
        ;
        $timeout(->anim2(pos%7))
        $grille[0] = Modele.grille[0] unless pos%7


    callbackPlayer = -> 
        callbackBotIfActiveElsePlayer1 = ->
            threadIsntUsed = on;                
            message() if Modele.isGameFinish()                             
            o.loopThreatAnimation(); #threat other position if player play during animation
        if o.isBotActive
            IA.setDif(o.cost);
            posBot = IA.p4BlockEasy(pos,off);
            anim(posBot,1,callbackBotIfActiveElsePlayer1);
        else                             
            callbackBotIfActiveElsePlayer1();

    o.loopThreatAnimation = ->
        if Modele.isGameFinish()
            stackPosition.length = 0
            threadIsntUsed = on
            return
        if stackPosition.length
            if threadIsntUsed
                threadIsntUsed = off
                time = if o.animation2 then 50 else 0
                ### it is possible theplayer is really fast so we record all all position where he click in stackPosition and threat them now###
                pos = Modele.play(stackPosition.shift())
                threadIsntUsed = on if pos < 0
                if Modele.isGameFinish()
                    message()
                else if Modele.grille.indexOf(0) < 0
                    message('égalité')
                    threadIsntUsed = on
                anim(pos, Modele.getPlayer(1), callbackPlayer)
    ;

    darkWinningPos = (dark)->
        f = Modele.winInfo
        return off unless f
        i = f.pion1;
        colorNumber = $grille[i];
        if dark
            colorNumber = if (colorNumberis1) then  4 else 8                                   
        loop
            $grille[i] = colorNumber
            i += f.dir
            break unless i <= f.pion2

    message = (egality) ->
        $("#author").val() or $("#author").val("anonymous")
        $("#email").val() or $("#email").val("anonymous@gmail.com")
        o.fen.disp = "message"
        o.whyItIsFinish = off
        if egality
            o.message = "ceci est une égalité mais pas une victoire"
        else

        #show winning pos
        darkWinningPos on
        if Modele.isHumanTurn()
          if IA.boolSmart.indexOf("off") + 1
            o.message = "bravo vous avez gagné    augmentez un peu le niveau"
          else
            o.message = "bravo vous avez gagné    envoyer votre historique par commentaire pour améliorer le jeu"
            $("#comment").append "ne touchez pas cette ligne c est votre historique de jeux" + JSON.stringify(Modele.backup)
        else
          o.message = "Le robot gagne cette fois vous pouvez baisser le niveau de difficulté de quelques pourcents"
        o.popup.deplier on
        o.$digest()

    $.extend(o,{
        o: o
        isBotActive : on
        modeCreator: off
        message: 'ça va commencer'
        whyItIsFinish: off
        animation2: on
        endGameMessage: off
        popup: new DeplierClass
        IA: IA
        Modele: Modele
        fen:
            disp: 'play'
            stayOpen: on
        mode: 'normal'
        cost: 100
        grille: []
        message: 'ça va commencer'
        message: message
        endGameMessage: on
        minLine: 0
        maxLine: 5
        minCol: 0
        maxCol: 6
    })
    
    o.addP
       

    o.addP
        clickOnBlack: ->
            o.fen.disp = 'play'
            o.popup.deplier off
            return
        reverse: (aString) ->
            o[aString] = !o[aString]
            return
        alert: (text) ->
            alert text
            return
        optionDisp: ->
            if o.optionsWidth is optionsWidthInit then 'block' else 'none'
        clickOnBlack: ->
            o.fen.disp = 'play'
            o.popup.deplier off
            return
        reverse: (aString) ->
            o[aString] = !o[aString]
            return
        alert: (text) ->
            alert text
            return
        optionDisp: ->
            if o.optionsWidth is optionsWidthInit then 'block' else 'none'
        loadStory: (grille2) ->
            if !grille2
                return off
            Modele.restore grille2

            ###if not player2        undo last move###

            unless (Modele.backup.length%2)
                o.undo()
            $grille.safeClone Modele.grille
            Modele.setPlayer 2
            return
        load: (grille2) ->
            Modele.setModel grille2
            $grille.safeClone Modele.grille
            return
        modeleCreator: ->
            if !o.modeCreator
                o.endPreview preview
                o.grilleCreator = $grille.slice()
                o.grilleCreator[Modele.backup.at(-1)] = 0
            o.reverse 'modeCreator'
            return
        goodGrille: ->
            if o.modeCreator then o.grilleCreator else $grille
        displayOption: ->
            if !(o.endGameMessage and o.popup.isDisp())
                o.popup.deplier()
            o.endGameMessage = off
            o.fen.disp = 'option'
            return
        init: ->
            o.popup.deplier off
            threadIsntUsed = on
            Modele.playAgain()

            ###setTimeout block the update of dom when user clic on replay ###

            setTimeout (->
                o.endGameMessage = off
                o.fen.disp = 'message'
                return
            ), 0
            $grille = Modele.grille.slice()
            return
        deplier: (columClass, bool) ->
            if bool != undefined
                o[columClass] = if !bool then 'optionInvisible' else 'optionVisible'
            else
                o[columClass] = if o[columClass] is 'optionVisible' then 'optionInvisible' else 'optionVisible'
            return
        preview: ($index) ->
            if o.modeCreator
                return off
            if preview != undefined
                o.endPreview preview
            pos = ($index + 7) % 7
            if !isNaN(pos)
                if $grille[pos] is 0
                    $grille[pos] = Modele.getPlayer(0)

                    ### 0 the current player 1 for the next###

                preview = pos
            if $index % 7 != 0
                $grille[0] = Modele.grille[0]
            return
        restore: ->
            backup = $.cookie('backup')
            o.loadStory backup
            return
        save: ->
            $.cookie 'backup', Modele.backup
            return
        graphique: (colorNumber) ->
            o.tabColor[colorNumber]
        undo: ->
            if Modele.isGameFinish()
                darkWinningPos off
                Modele.isGameFinish off
            threadIsntUsed = on
            pos = Modele.undo()
            $grille[pos] = 0
            IA.boolSmart.pop()
            if o.isBotActive and Modele.getPlayer() is 1
                if Modele.backup.length % 2 is 0
                    o.undo()
                else

                    ### if there is a problem with the player who have to play change the player###

                    Modele.setPlayer 2
            o.popup.deplier off
            return
        fallenPion: (pos) ->
            o.grilleCreator[pos] = $keyCode - 96 if o.modeCreator
            if !Modele.isGameFinish()
                stackPosition.push pos
            else
                stackPosition = []
            o.loopThreatAnimation()
        keydown: (event) ->
            event.preventDefault()
            return if o.modeCreator
            $keyCode = event.which
            

            ###play at the number push on keyboard
            numerical number (0 to 9)###
            
            if $keyCode > 47 and $keyCode < 58
                o.fallenPion $keyCode - 48
                return
            if event.which is 90 and event.ctrlKey
                o.undo()
                return

            ###right key and left key change the preview ###

            if $keyCode is 37 or $keyCode is 39
                inc = $keyCode - 38
                nextPos = preview
                i = 7
                loop
                    nextPos = mod(nextPos + inc, 7)
                    unless +Modele.grille[nextPos] and i--
                        break
                o.preview nextPos
                return

            ###top arrow###

            if $keyCode is 38
                o.undo()
                o.preview()
                return

            ###bottom arrow###

            if $keyCode is 40
                o.preview o.fallenPion(preview)
            return
        scrollInPx: (lg) ->
            $(window).scrollTop($(window).scrollTop() - lg)
        touchStart: (element) ->
            o.displayScroll = 'block'
            lastY = event.touches[0].clientY
            o.touchMove element
        touchMove: (element) ->
            return off_  if o.popup.isDisp()
            width = element.P4.width()
            pos = (if (event.touches.length >= 1) then event.touches[0].pageX else -1)
            return off if pos < 0
            pos = (pos - element.P4.offset().left) * 7 / width
            pos = Math.floor(pos)
            o.preview pos
            event.preventDefault()

        touchEnd: (element) ->
            return true  if o.popup.isDisp()
            event.preventDefault()
            o.fallenPion preview

        reverseIsBotActive: ->
            o.reverse "isBotActive"
            o.undo()  if Modele.backup.length % 2 is 0
                    
    
    o.init();
    $grille.safeClone(Modele.grille);

