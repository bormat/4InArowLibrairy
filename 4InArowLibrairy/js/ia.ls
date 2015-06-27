'use strict'

forOf = (obj, func) ->
    keys = Object.keys obj
    for i to keys.length - 1
        o = keys[i]
        func obj[o], o, obj

forOfSome = (obj, func) ->
    keys = Object.keys obj
    lg = keys.length
    i = 0
    while i < lg
        o = keys[i]
        return  if func obj[o], o, obj
        i++
    true

IA = window.IA = 
    dif: 100
    boolSmart: []
    setDif: (dif) -> IA.dif = dif
    playAvecModele: ->
        j = 0
        IA.pos5 = 48
        IA.modelId = 0
        pos2 =  
            do rec = ->
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
                        IA.modelId =  ++IA.modelId
                    IA.modelId =  0
                    IA.pos5 = 48
                    j++
                IA.pos5 = "notFound"
                -1
    notUnderMe: (inadvisables) ->
        i = 0
        while i < 7
            Modele.nextPlayer!
            position = Modele.play i, true
            Modele.grille[position] = '2'
            Modele.nextPlayer!
            Modele.play i, true
            Modele.grille[position] = '0'
            if Modele.isGameFinish!
                if position isnt inadvisables.at -1 and position >= 0 then if position >= 0 then inadvisables.push position
            i++
    ifPlayHereGiveMeExactPos: (posJoueur) ->
        posJoueur = parseInt posJoueur
        posJoueur = Modele.play posJoueur, true
        if ~posJoueur
            cond1 = ~IA.forbids.indexOf posJoueur
            cond2 = ~IA.inadvisables.indexOf posJoueur
            if not (cond1 or cond2)
                IA.isModelfound = true
                posJoueur = Modele.play posJoueur, true
                IA.pos = posJoueur
                return posJoueur
        IA.pos = -1
    positionOfSym: (pos, length, sym) -> pos += sym and (mod length + ~pos, 7) - pos % 7
    fillsWinningPos: ->
        for o to 6
            IA.winningYellowPairs[o] = -1; IA.winningRedPairs[o] = -1; IA.winningYellowOdds[o] = -1; IA.winningRedOdds[o] = -1
        for o to 41
            if Modele.grille[o] ~= 0
                Modele.grille[o] = 1; trouvePlayerImpaire = IA.winningYellowOdds[o % 7]
                trouveBotPaire = IA.winningRedPairs[o % 7]
                trouvePlayerPaire = IA.winningYellowPairs[o % 7]
                trouveBotImpaire = IA.winningRedOdds[o % 7]
                if (Math.floor o / 7) % 2 ~= 1 and trouvePlayerImpaire ~= -1 and Modele.isGameFinish o
                    IA.winningYellowOdds[o % 7] = o
                else
                    if (Math.floor o / 7) % 2 ~= 0 and trouvePlayerPaire ~= -1 and Modele.isGameFinish o then IA.winningYellowPairs[o % 7] = o
                Modele.grille[o] = 2
                if (Math.floor o / 7) % 2 ~= 0 and trouveBotPaire ~= -1 and Modele.isGameFinish o
                    IA.winningRedPairs[o % 7] = o
                else
                    if (Math.floor o / 7) % 2 ~= 1 and trouveBotImpaire ~= -1 and Modele.isGameFinish o then IA.winningRedOdds[o % 7] = o
                Modele.grille[o] = 0 
            null
    playAllPos: (u) ->
        IA.pos = -1
        i = u - 7
        while i < u and IA.pos < 0
            IA.ifPlayHereGiveMeExactPos i
            i++
        ~IA.pos
    playWithoutModel: ->
        firstTurn = on
        :loop1 do
            IA.playAllPos(IA.posJoueur)
            if IA.pos > 0 and firstTurn #si une position est jouable
                do #ttque qu'une position est jouable on interdit celles qui amenent au badmodel
                    break loop1 if(!IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos))
                while IA.playAllPos(IA.posJoueur);
                firstTurn = false;
        while((IA.inadvisables.pop()?  || IA.forbids.pop()? )&& IA.pos<0);  

    winInTwoTurn: (playerTurn) ->
        for i to 6
            Modele.setPlayer playerTurn
            IA.pos = Modele.play(i, true)
            if (if playerTurn ~= 1 then IA.forbids.indexOf(IA.pos) < 0 else not IA.comparerLigne("g", IA.pos - 7))
                position2 = IA.pos
                Modele.grille[IA.pos] = playerTurn
                cptGagnerDirect = 0
                o = 0

                while o < 7
                    IA.pos = Modele.play(o, true)
                    if Modele.isGameFinish() and ~IA.pos
                        cptGagnerDirect++
                        
                        #si il y a une position gagnante au dessus d'une autre 
                        WinnerPos = (if Modele.getPlayer() ~= 1 then "g" else "i")
                        otherPlayerWinOnMe = (if (Modele.getPlayer() ~= 1) then false else IA.comparerLigne("g", IA.pos))
                        if (cptGagnerDirect ~= 1 and IA.comparerLigne(WinnerPos, IA.pos - 7)) or (cptGagnerDirect > 1 and not otherPlayerWinOnMe)
                            Modele.grille[position2] = 0
                            IA.pos = i
                            IA.isModelfound = true
                            return (i)
                    o++
                Modele.grille[position2] = 0

        IA.pos = -1
    gagnerDirect: ->
        for i to 7
            IA.pos = Modele.play i, true
            if Modele.isGameFinish!
                Modele.isGameFinish false
                return IA.isModelfound = true
        IA.pos = -1
    falseOrModelIfFound: (param) -> if param.isModelfound then param else false
    wontBecomeLikeThisModel: (TabWontBecomeLikeThisModel, player, posBot) ->
        return {} if posBot < 0
        param = void
        posBot = Modele.play posBot, true
        Modele.grille[posBot] = player
        (for i to 6
            pos = Modele.play i, true
            Modele.grille[pos] = 2
            if ~pos
                IA.isModelfound = not forOfSome TabWontBecomeLikeThisModel, (mod) ->
                    param := IA.structModelDetector mod, 48
                    true if param.isModelfound
                Modele.grille[pos] = 0
                if IA.isModelfound
                    IA.inadvisables.push parseInt posBot
                    break)
        Modele.grille[posBot] = 0
        pos = if param.isModelfound then -1 else pos
        param
    futureIWant: (param, ModelInStruct, pos) ->
        for j to 6
            break if param.isModelfound
            pos3 = Modele.play j, true
            if ~pos3
                Modele.grille[pos3] = 1
                param = IA.findModel ModelInStruct, pos
                Modele.grille[pos3] = 0
        if param.isModelfound
            IA.currMod = ModelInStruct.tab
            IA.playAt = pos3
        IA.isModelfound = param.isModelfound
        param
    modeledetectorAndAnswer: (modele, findAt) ->
        if findAt then IA.modelId = 0 else findAt = {}
        IA.modele = modele
        IA.param = {isModelfound: false}
        tab = []
        while IA.modelId < modele.length and IA.param.isModelfound ~= false
            tab = IA.getListOfMatchingPos findAt
            findAt.modelID++
            IA.modelId = findAt.modelID
        IA.pos = tab.0
        findAt.modelID--
        IA.modelId--
        IA.isModelfound = IA.param.isModelfound
        IA.pos = if IA.isModelfound then IA.pos else -1
    findModel: (ModelInStruct, pos) ->
        param = {}
        IA.currMod = ModelInStruct.tab
        IA.isModelfound = false
        if not ModelInStruct.hasOwnProperty 'logicalOperator'
            forOfSome IA.currMod, (mod) ->
                param := IA.modeleDetector3 mod, pos
                true if param.isModelfound
        else
            otherOption = {}
            length = if ModelInStruct.hasOwnProperty 'sym' then 1 else 2
            j = 0
            while j < length and IA.isModelfound ~= false
                otherOption.sym = Boolean j if (ModelInStruct.hasOwnProperty 'sameSym') and length ~= 2
                stringToEVal = 'param='
                logicalOperator = ModelInStruct.logicalOperator
                i = 0
                while i < logicalOperator.length - 1
                    stringToEVal += logicalOperator[i] + ' IA.falseOrModelIfFound(IA.modeleDetector3(ModelInStruct.tab[' + i + '],pos,otherOption)) '
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
        param = IA.findModel ModelInStruct, pos
        if ModelInStruct.mode ~= 'futur'
            param = if param.isModelfound then {isModelfound: false} else IA.futureIWant param, ModelInStruct, pos
        if param.isModelfound
            exept = ModelInStruct.exept
            param.theModelISelf = ModelInStruct
            if exept
                exept.sym = param.sym
                param.isModelfound = false if (IA.structModelDetector exept, 48).isModelfound
            if ModelInStruct.hasOwnProperty 'playAt' then IA.playAt = ModelInStruct.playAt
        IA.isModelfound = param.isModelfound
        param
    bloquerDirect: ->
        Modele.nextPlayer!
        i = 0
        while i < 7
            IA.pos = Modele.play i, true
            if Modele.isGameFinish!
                Modele.nextPlayer!
                return IA.pos = Modele.play IA.pos, true
            i++
        Modele.nextPlayer!
        IA.pos = -1
    dontHelpJ2: ($forbids) ->
        i = 0
        while i < 7
            position = Modele.play i, true
            Modele.grille[position] = '1'
            Modele.nextPlayer!
            Modele.play i, true
            Modele.nextPlayer!
            Modele.grille[position] = '0'
            $forbids.push position if Modele.isGameFinish! and position isnt $forbids[$forbids.length - 1] and position >= 0
            i++
    detectBadPositionAlgorythme: ->
        i = 0
        while i < 7
            Modele.setPlayer 1
            pos = Modele.play i, true
            Modele.grille[pos] = '1'
            IA.inadvisables.push pos if ~IA.winInTwoTurn 2
            IA.isModelfound = false
            Modele.grille[pos] = 0
            i++
        Modele.setPlayer 1
    getListOfMatchingPos : (findAt) ->
        tabPosInBigGrille = []
        model = IA.modele[findAt.modelID = IA.modelId]
        IA.param = IA.structModelDetector model, IA.pos5
        IA.currMod = IA.param.theTab
        IA.pos = IA.param.pos
        IA.currMod = if IA.currMod
            if Array.isArray IA.currMod.0 then IA.currMod.0 else IA.currMod 
        if IA.isModelfound is true
            if Array.isArray IA.playAt
                u = 0
                while u < IA.playAt.length
                    tabPosInBigGrille.push IA.addPosOkToGroup IA.playAt[u]
                    u++
            else
                tabPosInBigGrille.push IA.addPosOkToGroup IA.playAt
            IA.pos5 = IA.beginToEnd IA.pos
        else
            IA.pos5 = 48
        tabPosInBigGrille
    addPosOkToGroup: (posRelativeToModele) ->
        if IA.param.theModelISelf and IA.param.theModelISelf.mode ~= 'futur' 
            IA.playAt
        else 
            IA.pos + IA.positionOfSym posRelativeToModele, IA.currMod.0.length, IA.param.sym
    beginToEnd: (begin) -> begin + IA.currMod.length * 7 - 7
    findForbiddenAndNotRecommandedPosition: ->
        IA.forbids.length = IA.inadvisables.length = 0
        IA.dontHelpJ2 IA.forbids
        IA.detectBadPositionAlgorythme!
        findAt = {}
        IA.pos5 = 48
        IA.param = {isModelfound: false}
        tabForbids = [modPosDeconseille, interditUnPeu]
        o = 0
        while o < tabForbids.length
            IA.modele = tabForbids[o]
            IA.modelId = 0
            while IA.modelId < IA.modele.length
                tab = IA.getListOfMatchingPos findAt
                if IA.param.isModelfound ~= false
                    IA.pos5 = 48
                    IA.modelId++
                else
                    Array::push.apply IA.inadvisables, tab
                    IA.pos5--
            o++
        IA.notUnderMe IA.inadvisables
        IA.DeleteException!
    DeleteException: ->
        findAt = {}
        IA.modelId = 0
        IA.pos5 = 48
        while IA.modelId < mesModele.length
            IA.modeledetectorAndAnswer tabException
            if ~IA.pos
                position = IA.pos
                pos = IA.inadvisables.indexOf position
                while ~pos
                    IA.inadvisables.splice pos, 1
                    pos = IA.inadvisables.indexOf position
                IA.pos5--
            else
                break
    isModeleBottomFlat: (oneModele) -> forOfSome (oneModele.at -1), (pos) -> true if pos isnt 'a' && pos isnt '9'
    modeleDetector4: (oneModeleAndTheAnswer, position) ->
        r = IA.modeleDetector3 oneModeleAndTheAnswer.0, position
        IA.pos = r.pos
        IA.playAt = oneModeleAndTheAnswer.1
        IA.currMod = oneModeleAndTheAnswer.0
        IA.pos = -1 if not r.isModelfound
        r
    modeleDetector3: (oneModele, position, otherOption) ->
        sym = true
        dontChangeSym = false
        otherOption = otherOption or {}
        if otherOption.hasOwnProperty 'sym'
            sym = otherOption.sym
            dontChangeSym = true
        posOneModeleSym2 = {
            true: {pos: position}
            false: {pos: position}
        }
        stopLoopCond = ->
            posSym = posOneModeleSym2[sym].pos
            pos = posOneModeleSym2[not sym].pos
            posOneModeleSym2[sym].isModelfound or otherOption.hasOwnProperty 'samepos' or posSym < 0 and pos < 0 or dontChangeSym and posSym < 0
        while true
            poses = posOneModeleSym2[sym] = IA.modeleDectector1 oneModele, posOneModeleSym2[sym].pos, sym
            if not poses.isModelfound
                poses.pos = Math.min (Math.ceil poses.pos / 7) * 7 - oneModele.0.length, poses.pos - 1
                sym = not dontChangeSym and not sym
            if !!stopLoopCond! then break
        IA.isModelfound = posOneModeleSym2[sym].isModelfound
        {
            pos: posOneModeleSym2[sym].pos - 7 * (oneModele.length - 1)
            sym: sym
            IA.isModelfound
            theTab: oneModele
        }
    modeleDectector1: (oneModele, posOneModele, sym) ->
        if posOneModele isnt false
            i = 0
            while i++ < oneModele.length
                line = oneModele.at -i
                line = line.reverse! if sym
                if not IA.comparerLigne line, posOneModele - 7 * (i - 1) then break
            if i > oneModele.length
                return {
                    pos: posOneModele
                    isModelfound: true
                }
        {
            pos: posOneModele
            isModelfound: false
        }
    topToBottom: (pos, length) -> pos + length * 7 - 7
    bottomToTop: (pos, length) -> pos + ~length * 7
    p4BlockEasy: (posJoueur, retournerPosition) ->
        IA.posJoueur = posJoueur
        findAt = void
        botSmart = void
        return false if Modele.isGameFinish!
        if (parseInt IA.dif) / 100 + Math.random! > 1
            IA.boolSmart.push 'true'
            Modele.setPlayer 1
            IA.fillsWinningPos!
            IA.isModelfound = false
            IA.pos = -1
            IA.modelId = 0
            findAt = {modelID: 0}
            IA.pos5 = 48
            [
                IA.gagnerDirect
                IA.bloquerDirect
                IA.findForbiddenAndNotRecommandedPosition
                IA.winInTwoTurn.bind IA, 1
                IA.modeledetectorAndAnswer.bind IA, perfectModele, {modelID: 0}
                ->
                    IA.modelId = 0
                    IA.pos5 = 48
                    IA.playAvecModele!
                IA.playWithoutModel.bind IA, posJoueur
            ].some ((func, i) ->
                func!
                ~IA.pos)
        else
            IA.boolSmart.push 'false'
            IA.pos = Math.floor Math.random! * 7
        Modele.play IA.pos, retournerPosition
    winningRedPairs: []
    winningYellowOdds: []
    winningRedOdds: []
    winningYellowPairs: []
    forbids: []
    inadvisables: []
    pos: -1
    modelId: 0


Array::has = (variable) -> ~@indexOf variable

IA.comparerCaractere = (a, car, impaire) ->
    car *= 1; if isNaN a
        a ~= 'a' or a ~= 'y' and car isnt 2 or a ~= 'z' and car isnt 1
    else
        a = +a
        car ~= a or a ~= 9 and car isnt 0 or a ~= 6 and car in [1, 2] or a ~= 5 and car in [
            1
            2
            0
        ] or if impaire then a ~= 8 and car ~= 2 or a ~= 4 and car ~= 1 else car ~= 1 and a ~= 3 or a ~= 7 and car ~= 2

IA.comparerLigne = (modligne, o) ->
        if o < 0
                return false
        cont = true
        i = o
        while i < modligne.length + o and cont
            return false if o < 0
            a = modligne.charAt(i - o)
            b = Modele.grille[i]
            impaire = Math.floor(i / 7) % 2
            cont = null
            if Modele.grille[i] ~= 0                    
                switch
                | a in \pq
                        cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7]            
                | a  ~= \t
                        cont = IA.inadvisables.indexOf(i) + 1
                | a ~= \r
                        cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] or IA.winningYellowOdds[i % 7] ~= -1
                        cont &&= IA.winningRedPairs[i % 7] <= i
                        Modele.grille[i] = 1
                        cont &&= Modele.isGameFinish(i)
                | a in \f. 
                        Modele.grille[i] = 1
                        cont = Modele.isGameFinish(i)
                        ! = cont if \f ~= a
                        if !cont
                            Modele.grille[i] = 2
                            cont = Modele.isGameFinish(i)                   
                | a in \erw
                    cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] or IA.winningYellowOdds[i % 7] ~= -1
                    cont = cont and IA.winningRedPairs[i % 7] <= i
                | a in \gj
                    Modele.grille[i] = 1
                    cont = Modele.isGameFinish(i)
                | a in \hi 
                    Modele.grille[i] = 2
                    cont = Modele.isGameFinish(i)                
                ! = cont if a in \hpwfj                            
                Modele.grille[i] = 0
            cont ?= IA.comparerCaractere(a, b, impaire) 
            return cont  if cont and i > modligne.length - 2 + o
            i++
        return