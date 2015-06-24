"use strict"

forOf = (obj, func) ->
    keys = Object.keys(obj)
    for i in [0..keys.length-1]
        o = keys[i]
        func obj[o], o, obj

forOfSome = (obj, func) ->
    keys = Object.keys(obj)
    lg = keys.length
    i = 0

    while i < lg
        o = keys[i]
        return    if func(obj[o], o, obj)
        i++
    true #all funcs return false we return true

IA = window.IA =
    dif: 100
    setDif: (dif) ->
        IA.dif = dif

    
    #ne pas Modele.play dessous un endroit ou on gagnerais en jouant au dessus 
    notUnderMe: (inadvisables) ->
        
        # ne pas Modele.play dessous un endroit ou l'on gagne 
        i = 0

        while i < 7
            Modele.nextPlayer()
            position = Modele.play(i, true)
            
            #on la mit en fictif avec le parametre true    mais il faut qu'il reste dans la Modele.grille 
            Modele.grille[position] = "2"
            Modele.nextPlayer()
            Modele.play i, true
            
            #supprimer le pion rajouté précédemment 
            Modele.grille[position] = "0"
            
            #rajouter la position en déconseillé 
            inadvisables.push position    if position >= 0    if position isnt inadvisables.at(-1) and position >= 0    if Modele.isGameFinish()
            i++

    
    #retourne ou Modele.play sinon -1
    ifPlayHereGiveMeExactPos: (posJoueur) ->
        posJoueur = parseInt(posJoueur)
        posJoueur = Modele.play(posJoueur, true)
        if ~posJoueur
            cond1 = ~IA.forbids.indexOf(posJoueur)
            cond2 = ~IA.inadvisables.indexOf(posJoueur)
            unless cond1 or cond2
                IA.isModelfound = true
                posJoueur = Modele.play(posJoueur, true)
                IA.pos = posJoueur
                return (posJoueur)
        IA.pos = -1

    positionOfSym: (pos, length, sym) ->
        pos += sym and mod(length + ~pos, 7) - pos % 7

    fillsWinningPos: ->

        for o in [0..6]
            IA.winningYellowPairs[o]= -1;
            IA.winningRedPairs[o]= -1;
            IA.winningYellowOdds[o]= -1;
            IA.winningRedOdds[o]= -1;
                
        for o in [0..41]
            if Modele.grille[o] == 0
                Modele.grille[o] = 1;
                trouvePlayerImpaire = IA.winningYellowOdds[o%7]
                trouveBotPaire = IA.winningRedPairs[o%7]
                trouvePlayerPaire = IA.winningYellowPairs[o%7]
                trouveBotImpaire = IA.winningRedOdds[o%7]
                if ( Math.floor(o/7)%2==1 && trouvePlayerImpaire== -1 && Modele.isGameFinish(o))              
                    IA.winningYellowOdds[o%7] = o
                else if ( Math.floor(o/7)%2==0 && trouvePlayerPaire== -1 && Modele.isGameFinish(o))           
                    IA.winningYellowPairs[o%7] = o
                Modele.grille[o]=2
                if ((Math.floor(o/7)%2)==0 && trouveBotPaire==-1 && Modele.isGameFinish(o))
                    IA.winningRedPairs[o%7]=o
                else if ( (Math.floor(o/7)%2)==1 && trouveBotImpaire==-1 && Modele.isGameFinish(o))
                        IA.winningRedOdds[o%7]=o
                Modele.grille[o]=0
        null     
    

    playAllPos: (u) ->
        IA.pos = -1
        i = u - 7

        while i < u and IA.pos < 0
            IA.ifPlayHereGiveMeExactPos i
            i++

    playWithoutModel: ->
        firstTurn = true
        alert;
        loop
            IA.playAllPos IA.posJoueur
            if ~IA.pos and firstTurn #si une position est jouable
                loop #ttque qu'une position est jouable on interdit celles qui amenent au badmodel
                    (if stopLoop1 = true then break)  unless IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos)
                    IA.playAllPos(IA.posJoueur)
                    break unless ~IA.pos
                break    if stopLoop1
                firstTurn = false
            break unless (IA.inadvisables.pop()? or IA.forbids.pop()?) and IA.pos < 0

    boolSmart: []
    isModelfound: -> false
    winInTwoTurn: (playerTurn) ->
       for i in [0..6]
            Modele.setPlayer playerTurn
            IA.pos = Modele.play(i, true)
            if (if playerTurn is 1 then IA.forbids.indexOf(IA.pos) < 0 else not IA.comparerLigne("g", IA.pos - 7))
                position2 = IA.pos
                Modele.grille[IA.pos] = playerTurn
                cptGagnerDirect = 0
                o = 0

                while o < 7
                    IA.pos = Modele.play(o, true)
                    if Modele.isGameFinish() and ~IA.pos
                        cptGagnerDirect++
                        
                        #si il y a une position gagnante au dessus d'une autre 
                        WinnerPos = (if Modele.getPlayer() is 1 then "g" else "i")
                        otherPlayerWinOnMe = (if (Modele.getPlayer() is 1) then false else IA.comparerLigne("g", IA.pos))
                        if (cptGagnerDirect is 1 and IA.comparerLigne(WinnerPos, IA.pos - 7)) or (cptGagnerDirect > 1 and not otherPlayerWinOnMe)
                            Modele.grille[position2] = 0
                            IA.pos = i
                            IA.isModelfound = true
                            return (i)
                    o++
                Modele.grille[position2] = 0

        IA.pos = -1

    gagnerDirect: ->
        for i in [0..7]
            IA.pos = Modele.play(i, true)
            if Modele.isGameFinish()
                Modele.isGameFinish false
                return IA.isModelfound = true
        IA.pos = -1

    playAvecModele: ->
        param = modelID: 0
        j = 0
        IA.pos5 = 48
        IA.modelId = 0
        pos2 = do 
            rec = ->
                TabOfTab = [ attaque, defense, miniDef, mesModele ]
                while j < TabOfTab.length
                    loop
                        break    unless IA.modelId < TabOfTab[j].length
                        position3 = IA.modeledetectorAndAnswer(TabOfTab[j])
                        IA.modelId #=param.modelID
                        if ~position3
                            IA.ifPlayHereGiveMeExactPos position3
                            if ~IA.pos
                                isPosBad = IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos)
                                rec() if isPosBad
                                return IA.pos
                            IA.pos5--
                        IA.modelId = param.modelID = ++IA.modelId
                    IA.modelId = param.modelID = 0
                    IA.pos5 = 48
                    j++
                IA.pos5 = "notFound"
                -1

    falseOrModelIfFound: (param) ->
         if param.isModelfound then param else off

    giveMeACheckedPosition: (functionWhoReturnFalseOrPosToCheck) ->
        i = 0
        param = isModelfound: false
        loop
            IA.pos = functionWhoReturnFalseOrPosToCheck()
            if IA.pos < 0
                IA.isModelfound = false
                break
            param = IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos)
            IA.isModelfound = not param.isModelfound
            break unless i++
            param.isModelfound and i < 7

    wontBecomeLikeThisModel: (TabWontBecomeLikeThisModel, player, posBot) ->
        return {} if posBot < 0
        param = undefined
        posBot = Modele.play(posBot, true)
        Modele.grille[posBot] = player
        for i in [0..6]
            pos = Modele.play(i, true)
            Modele.grille[pos] = 2
            if ~pos
                IA.isModelfound = not forOfSome(TabWontBecomeLikeThisModel, (mod) ->
                    param = IA.structModelDetector(mod, 48)
                    true    if param.isModelfound
                )
                Modele.grille[pos] = 0
                if IA.isModelfound
                    IA.inadvisables.push parseInt(posBot)
                    break
        Modele.grille[posBot] = 0
        pos = (if param.isModelfound then -1 else pos)
        param

    futureIWant: (param, ModelInStruct, pos) ->
        for j in [0..6]
            break if param.isModelfound
            pos3 = Modele.play(j, true)
            if ~pos3
                Modele.grille[pos3] = 1
                param = IA.findModel(ModelInStruct, pos)
                Modele.grille[pos3] = 0
        if param.isModelfound
            IA.currMod = ModelInStruct.tab
            IA.playAt = pos3
        IA.isModelfound = param.isModelfound
        param

    modeledetectorAndAnswer: (modele, findAt) ->
        if findAt
            IA.modelId = 0
        else
            findAt = {}
        IA.modele = modele
        IA.param = isModelfound: false
        tab = []
        while IA.modelId < modele.length and IA.param.isModelfound is false
            tab = IA.getListOfMatchingPos(findAt)
            findAt.modelID++
            IA.modelId = findAt.modelID
        IA.pos = tab[0]
        findAt.modelID--
        IA.modelId--
        IA.isModelfound = IA.param.isModelfound
        IA.pos = (if IA.isModelfound then IA.pos else -1)

    findModel: (ModelInStruct, pos) ->
        param = {}
        IA.currMod = ModelInStruct.tab
        IA.isModelfound = false
        unless ModelInStruct.hasOwnProperty("logicalOperator")
            forOfSome IA.currMod, (mod) ->
                param = IA.modeleDetector3(mod, pos)
                true    if param.isModelfound

        else # by default it is the operator or between Model else do the next code
            otherOption = {}
            length = (if (ModelInStruct.hasOwnProperty("sym")) then 1 else 2)
            j = 0

            while j < length and IA.isModelfound is false
                otherOption.sym = Boolean(j)    if ModelInStruct.hasOwnProperty("sameSym") and length is 2
                stringToEVal = "param="
                logicalOperator = ModelInStruct.logicalOperator
                i = 0

                while i < logicalOperator.length - 1
                    stringToEVal += logicalOperator[i] + " IA.falseOrModelIfFound(IA.modeleDetector3(ModelInStruct.tab[" + i + "],pos,otherOption)) "
                    i++
                stringToEVal += logicalOperator[i]
                eval stringToEVal
                IA.isModelfound = param.isModelfound
                j++
        IA.currMod = ModelInStruct.tab
        param

    structModelDetector: (ModelInStruct, pos) ->
        param = {}
        IA.currMod = ModelInStruct.theTab
        param = IA.findModel(ModelInStruct, pos)
        
        #if we can reach a futur model that is not already reached
        param = (if param.isModelfound then isModelfound: false else IA.futureIWant(param, ModelInStruct, pos))    if ModelInStruct.mode is "futur"
        
        #watch exeptions if model found
        if param.isModelfound
            exept = ModelInStruct.exept
            param.theModelISelf = ModelInStruct
            if exept
                exept.sym = param.sym
                param.isModelfound = false    if IA.structModelDetector(exept, 48).isModelfound
            IA.playAt = ModelInStruct.playAt    if ModelInStruct.hasOwnProperty("playAt")
        IA.isModelfound = param.isModelfound
        param

    

    bloquerDirect: ->
        
        #cherche un endroit ou l'adversaire gagne pour le bloquer 
        Modele.nextPlayer()
        i = 0

        while i < 7
            IA.pos = Modele.play(i, true)
            if Modele.isGameFinish()
                Modele.nextPlayer()
                return IA.pos = Modele.play(IA.pos, true)
            i++
        Modele.nextPlayer()
        IA.pos = -1

    
    #remplit $forbids
    dontHelpJ2: ($forbids) ->
        i = 0

        while i < 7
            position = Modele.play(i, true)
            
            #on la mit en fictif avec le parametre true    mais il faut qu'il reste dans la Modele.grille 
            Modele.grille[position] = "1"
            Modele.nextPlayer()
            Modele.play i, true
            Modele.nextPlayer()
            
            #supprimer le pion rajouté précédemment 
            Modele.grille[position] = "0"
            $forbids.push position    if Modele.isGameFinish() and position isnt $forbids[$forbids.length - 1] and position >= 0
            i++

    
    #push where don't play without modele
    detectBadPositionAlgorythme: ->
        i = 0

        while i < 7
            Modele.setPlayer 1
            pos = Modele.play(i, true)
            Modele.grille[pos] = "1"
            IA.inadvisables.push pos    if ~IA.winInTwoTurn(2)
            IA.isModelfound = false
            Modele.grille[pos] = 0
            i++
        Modele.setPlayer 1

    getListOfMatchingPos: (findAt) ->
        tabPosInBigGrille = []
        
        #on cherche le modele
        model = IA.modele[findAt.modelID = IA.modelId]
        IA.param = IA.structModelDetector(model, IA.pos5)
        IA.currMod = IA.param.theTab
        IA.pos = IA.param.pos
        IA.currMod = ((if Array.isArray(IA.currMod[0]) then IA.currMod[0] else IA.currMod))    if IA.currMod
        
        #si trouvé 
        if IA.isModelfound is true
            if Array.isArray(IA.playAt)
                u = 0

                while u < IA.playAt.length
                    tabPosInBigGrille.push IA.addPosOkToGroup(IA.playAt[u])
                    u++
            else
                tabPosInBigGrille.push IA.addPosOkToGroup(IA.playAt)
            IA.pos5 = IA.beginToEnd(IA.pos)
        else #si pas trouvé
            IA.pos5 = 48
        tabPosInBigGrille

    addPosOkToGroup: (posRelativeToModele) ->
        if IA.param.theModelISelf and IA.param.theModelISelf.mode is "futur"
            IA.playAt
        else
            IA.pos + IA.positionOfSym(posRelativeToModele, IA.currMod[0].length, IA.param.sym)

    beginToEnd: (begin) ->
        begin + IA.currMod.length * 7 - 7

    findForbiddenAndNotRecommandedPosition: ->
        IA.forbids.length = IA.inadvisables.length = 0
        IA.dontHelpJ2 IA.forbids
        IA.detectBadPositionAlgorythme()
        findAt = {}
        IA.pos5 = 48
        IA.param = isModelfound: false
        tabForbids = [ modPosDeconseille, interditUnPeu ]
        o = 0

        while o < tabForbids.length
            IA.modele = tabForbids[o]
            IA.modelId = 0
            while IA.modelId < IA.modele.length
                
                #tant que le modele est trouvé on continue de le chercher et de pusher les positions interdites 
                tab = IA.getListOfMatchingPos(findAt)
                if IA.param.isModelfound is false
                    IA.pos5 = 48
                    IA.modelId++
                else
                    Array::push.apply IA.inadvisables, tab
                    IA.pos5--
            o++
        IA.notUnderMe IA.inadvisables
        IA.DeleteException()

    DeleteException: ->
        findAt = {}
        IA.modelId = 0
        IA.pos5 = 48
        while IA.modelId < mesModele.length
            IA.modeledetectorAndAnswer tabException
            if ~IA.pos
                position = IA.pos
                pos = IA.inadvisables.indexOf(position)
                while ~pos
                    IA.inadvisables.splice pos, 1
                    pos = IA.inadvisables.indexOf(position)
                IA.pos5--
            else
                break

    isModeleBottomFlat: (oneModele) ->
        forOfSome oneModele.at(-1), (pos) ->
            true    if pos isnt "a" and pos isnt "9"


    modeleDetector4: (oneModeleAndTheAnswer, position) ->
        r = IA.modeleDetector3(oneModeleAndTheAnswer[0], position)
        IA.pos = r.pos
        IA.playAt = oneModeleAndTheAnswer[1]
        IA.currMod = oneModeleAndTheAnswer[0]
        IA.pos = -1    unless r.isModelfound
        r

    modeleDetector3: (oneModele, position, otherOption) ->
        sym = true
        dontChangeSym = false
        otherOption = otherOption or {}
        if otherOption.hasOwnProperty("sym")
            sym = otherOption.sym
            dontChangeSym = true
        posOneModeleSym2 =
            true:
                pos: position

            false:
                pos: position

        stopLoopCond = ->
            posSym = posOneModeleSym2[sym].pos
            pos = posOneModeleSym2[not sym].pos
            posOneModeleSym2[sym].isModelfound or otherOption.hasOwnProperty("samepos") or (posSym < 0 and pos < 0) or (dontChangeSym and posSym < 0)

        loop
            poses = posOneModeleSym2[sym] = IA.modeleDectector1(oneModele, posOneModeleSym2[sym].pos, sym)
            unless poses.isModelfound
                
                #if we haven't the place to find the model at this pos go back until we have the place
                poses.pos = Math.min(Math.ceil(poses.pos / 7) * 7 - oneModele[0].length, poses.pos - 1)
                sym = not dontChangeSym and not sym
            break unless not stopLoopCond()
        IA.isModelfound = posOneModeleSym2[sym].isModelfound
        
        #IA.currMod = oneModele;
        pos: posOneModeleSym2[sym].pos - 7 * (oneModele.length - 1)
        sym: sym
        isModelfound: IA.isModelfound
        theTab: oneModele

    modeleDectector1: (oneModele, posOneModele, sym) ->
        if posOneModele isnt false
            i = 0 #i from 1 to lenght

            while i++ < oneModele.length
                line = oneModele.at(-i)
                line = line.reverse()    if sym
                break    unless IA.comparerLigne(line, posOneModele - 7 * (i - 1))
            if i > oneModele.length #if model found
                return (
                    pos: posOneModele
                    isModelfound: true
                )
        pos: posOneModele
        isModelfound: false

    topToBottom: (pos, length) ->
        pos + length * 7 - 7

    bottomToTop: (pos, length) ->
        pos + ~length * 7

    p4BlockEasy: (posJoueur, retournerPosition) ->
        IA.posJoueur = posJoueur
        findAt = undefined
        botSmart = undefined
        return (false)    if Modele.isGameFinish()
        if parseInt(IA.dif) / 100 + Math.random() > 1 #dif is choose by player with slider
            IA.boolSmart.push "true" #play smartly
            Modele.setPlayer 1
            IA.fillsWinningPos()
            IA.isModelfound = false
            IA.pos = -1
            IA.modelId = 0
            findAt = modelID: 0
            IA.pos5 = 48
            
            #0
            
            #1
            
            #2
            
            #3
            
            #4
            
            #5
            [ IA.gagnerDirect, IA.bloquerDirect, IA.findForbiddenAndNotRecommandedPosition, IA.winInTwoTurn.bind(IA, 1), IA.modeledetectorAndAnswer.bind(IA, perfectModele, #i pour debug
                modelID: 0
            ), ->
                IA.modelId = 0
                IA.pos5 = 48
                IA.playAvecModele()
            , IA.playWithoutModel.bind(IA, posJoueur) ].some (func, i) ->
                func()
                ~IA.pos

        else
            
            #push that we don't play in 100% mode    and take a pos randomly
            IA.boolSmart.push "false"
            IA.pos = Math.floor(Math.random() * 7)
        Modele.play IA.pos, retournerPosition

    winningRedPairs: []
    winningYellowOdds: []
    winningRedOdds: []
    winningYellowPairs: []
    forbids: []
    inadvisables: []
    pos: -1
    modelId: 0

Array::has = (variable) ->
    ~@indexOf(variable)

IA.comparerCaractere = (a,car,impaire)->  
    car *= 1 ; 
    if(isNaN(a))
        a == 'a' or 
        a == 'y' && car != 2 or
        a == 'z' && car !=1
    else
        a = +a        
        car == a || 
        a == 9 && car !=0 ||
        a == 6 && car in [1,2] ||
        a == 5 && car in [1,2,0] ||
        (if impaire 
           a == 8 && car == 2 || a == 4 && car == 1
        else
            (car == 1 && a ==3 || (a==7 && car == 2) )
        )
              

IA.comparerLigne = (modligne, o) ->
    `var gotonextif`
    `var a`
    if o < 0
        return false
    cont = true
    i = o
    while i < modligne.length + o and cont
        a = modligne.charAt(i - o)
        a = '' + a
        b = Modele.grille[i]
        if o < 0
            return false
        impaire = Math.floor(i / 7) % 2
        if Modele.grille[i] == 0
            gotonextif = true
            switch a
                when 'q', 'p', 'e', 'r', 'w', 'g', 'j', '.', 'f', 'h', 'i', 't'
                    if a in ['q','p','e','r','w','g','j','.','f','h','i','t']
                        gotonextif = false
                        if a in ['q','p']
                            cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7]
                            if a == 'p'
                                cont = !cont
                        else if 't' == a 
                            cont = IA.inadvisables.indexOf(i) + 1
                        else if a == 'r'
                            cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] or IA.winningYellowOdds[i % 7] == -1
                            cont = cont and IA.winningRedPairs[i % 7] <= i
                            Modele.grille[i] = 1
                            cont = cont and Modele.isGameFinish(i)
                        else if a in ['.','f'] 
                            Modele.grille[i] = 1
                            cont = cont and Modele.isGameFinish(i)
                            if a == '.'
                                cont = !cont
                            if cont
                                contin = true
                                Modele.grille[i] = 2
                                cont = Modele.isGameFinish(i)
                                if  a == 'f'
                                    cont = !cont
                        else
                            if a in ['e','r','w']
                                cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] or IA.winningYellowOdds[i % 7] == -1
                                cont = cont and IA.winningRedPairs[i % 7] <= i
                                if a == 'w'
                                    cont = !cont
                            else if  a in ['g','j','.','f']
                                Modele.grille[i] = 1
                                cont = cont and Modele.isGameFinish(i)
                                if a == 'j' 
                                    cont = !cont
                            else if a in ['h','i'] 
                                Modele.grille[i] = 2
                                cont = Modele.isGameFinish(i)
                                if a == 'h' or a == 'f'
                                    cont = !cont
                        
                        contin = false;
                    ;

            ;
            Modele.grille[i] = 0
        cont = IA.comparerCaractere(a, b, impaire) if Modele.grille[i] != 0 or gotonextif
        return cont  if cont and i > modligne.length - 2 + o
        i++
    return