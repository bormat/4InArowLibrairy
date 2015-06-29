'use strict'
IA = window.IA = 
    playAt:-1
    dif: 100
    boolSmart: []
    playAvecModele: ->
        j = 0
        IA.pos5 = 48
        IA.modelId = 0
        pos2 =  
            do rec = ->
                TabOfTab = [ attaque, defense, miniDef, mesModele ]
                while j < TabOfTab.length
                    loop
                        break unless IA.modelId < TabOfTab[j].length
                        position3 = IA.modeledetectorAndAnswer(TabOfTab[j])
                        IA.modelId #=param.modelID
                        if ~position3
                            IA.ifPlayHereGiveMeExactPos position3
                            if ~IA.pos
                                isPosBad = IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos)
                                rec() if isPosBad
                                return IA.pos
                            IA.pos5--
                        IA.modelId++
                    IA.modelId =  0
                    IA.pos5 = 48
                    j++
                IA.pos5 = "notFound"
                -1
    notUnderMe: (inadvisables) -># don't play under positions we can win  add these positions in inadvisables
        for i to 6
            Modele.nextPlayer!
            position = Modele.play i, true
            Modele.grille[position] = '2'
            Modele.nextPlayer!
            Modele.play i, true
            Modele.grille[position] = '0'
            if Modele.isGameFinish!
                if position isnt inadvisables.at -1 and position >= 0 then if position >= 0 then inadvisables.push position
    ifPlayHereGiveMeExactPos: (+posJoueur) ->
        IA.pos = Modele.play posJoueur, true
        if ~IA.pos
            cond1 = ~IA.forbids.indexOf IA.pos
            cond2 = ~IA.inadvisables.indexOf IA.pos
            if not (cond1 or cond2)
                IA.pos  = Modele.play IA.pos , true
                return  IA.pos
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
        for u from u to u+6 
            IA.ifPlayHereGiveMeExactPos u
            return on  if ~IA.pos
        off
    playWithoutModel: ->
        firstTurn = on
        do
            IA.playAllPos(IA.posJoueur)
            if IA.pos > 0 and firstTurn #si une position est jouable
                do #ttque qu'une position est jouable on interdit celles qui amenent au badmodel
                    return if(!IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos))
                while IA.playAllPos(IA.posJoueur);
                firstTurn = false;
        while((IA.inadvisables.pop()?  || IA.forbids.pop()? )&& IA.pos<0);
        null
    winInTwoTurn: (playerTurn) ->
        for i to 6
            Modele.setPlayer playerTurn
            IA.pos = Modele.play(i, true)
            if (if playerTurn ~= 1 then IA.forbids.indexOf(IA.pos) < 0 else not IA.comparerLigne("g", IA.pos - 7))
                position2 = IA.pos
                Modele.grille[IA.pos] = playerTurn
                cptGagnerDirect = 0
                for o to 6
                    IA.pos = Modele.play(o, true)
                    if Modele.isGameFinish() and ~IA.pos
                        cptGagnerDirect++                        
                        #si il y a une position gagnante au dessus d'une autre 
                        WinnerPos = (if Modele.getPlayer() ~= 1 then "g" else "i")
                        otherPlayerWinOnMe = (if (Modele.getPlayer() ~= 1) then false else IA.comparerLigne("g", IA.pos))
                        if (cptGagnerDirect ~= 1 and IA.comparerLigne(WinnerPos, IA.pos - 7)) or (cptGagnerDirect > 1 and not otherPlayerWinOnMe)
                            Modele.grille[position2] = 0
                            IA.pos = i
                            return (i)
                Modele.grille[position2] = 0

        IA.pos = -1
    gagnerDirect: ->
        for i to 7
            IA.pos = Modele.play i, true
            if Modele.isGameFinish!
                Modele.isGameFinish false
                return true
        IA.pos = -1
    falseOrModelIfFound: (param) -> if ~IA.playAt then param else false
    wontBecomeLikeThisModel: (TabWontBecomeLikeThisModel, player, posBot) ->
        return {} if posBot < 0
        posBot = Modele.play posBot, true
        Modele.grille[posBot] = player
        for i to 6
            pos = Modele.play i, true
            Modele.grille[pos] = 2
            if ~pos
                for mod in TabWontBecomeLikeThisModel
                    param = !!IA.structModelDetector2 mod, 48
                    if ~IA.playAt
                        break
                Modele.grille[pos] = 0
                if ~IA.playAt
                    IA.inadvisables.push parseInt posBot
                    break
        Modele.grille[posBot] = 0
        param
    futureIWant: (param, ModelInStruct, pos) ->
        for j to 6
            break if ~IA.playAt
            pos3 = Modele.play j, true
            if ~pos3
                Modele.grille[pos3] = 1
                param = IA.findModel2 ModelInStruct, pos
                Modele.grille[pos3] = 0
        if ~IA.playAt
            IA.currMod = ModelInStruct.tab
            IA.playAt = pos3
        param
    modeledetectorAndAnswer: (modele) ->
        IA.modele = modele
        IA.param = {isModelfound: false}
        tab = []
        while IA.modelId < modele.length 
            tab = IA.getListOfMatchingPos!
            IA.modelId++
            break if ~IA.playAt
        IA.pos = tab.0
        IA.modelId--
        IA.pos = if ~IA.playAt then IA.pos else -1
    

    findModel2: (ModelInStruct, pos) ->
        IA.currMod = ModelInStruct.tab
        if not ModelInStruct.logicalOperator
            for mod in IA.currMod
                param = IA.modeleDetector3 mod, pos
                break if ~IA.posMod
        else
            otherOption = {}
            length = if ModelInStruct.hasOwnProperty 'sym' then 1 else 2
            for j til length 
                otherOption.sym = !!j if (ModelInStruct.hasOwnProperty 'sameSym') and length ~= 2
                stringToEVal = 'param='
                logicalOperator = ModelInStruct.logicalOperator                
                for i to logicalOperator.length - 2
                    stringToEVal += logicalOperator[i] + "IA.falseOrModelIfFound(IA.modeleDetector3(ModelInStruct.tab[#i],pos,otherOption))"
                stringToEVal += logicalOperator[*-1]
                eval stringToEVal
                break if ~IA.playAt

        IA.currMod = ModelInStruct.tab
        param

    #playAt < 0  is model not found but on terminal call it is the position relative to model 
    structModelDetector2: (ModelInStruct, pos) ->
        param = {}
        IA.playAt = -1
        IA.currMod = ModelInStruct.theTab
        param = IA.findModel2 ModelInStruct, pos
        if ModelInStruct.mode ~= 'futur'
            param = if ~IA.playAt
                IA.playAt= -1
                {}
            else
                IA.futureIWant {}, ModelInStruct, pos
        if (~ IA.playAt)
            param.theModelISelf = ModelInStruct
            exept = ModelInStruct.exept
            if exept
                exept.sym = param.sym
                IA.structModelDetector2(exept, 48)
                IA.playAt = IA.playAt >= 0 && -1 || on
            if ~IA.playAt  && ModelInStruct.playAt? 
                IA.playAt = ModelInStruct.playAt
        IA.currMod = ModelInStruct.theTab
        param
    bloquerDirect: ->
        Modele.nextPlayer!
        for i to 6
            IA.pos = Modele.play i, true
            if Modele.isGameFinish!
                Modele.nextPlayer!
                return IA.pos = Modele.play IA.pos, true
        Modele.nextPlayer!
        IA.pos = -1
    dontHelpJ2: ($forbids) ->
        for i to 6
            position = Modele.play i, true
            Modele.grille[position] = '1'
            Modele.nextPlayer!
            Modele.play i, true
            Modele.nextPlayer!
            Modele.grille[position] = '0'
            $forbids.push position if Modele.isGameFinish! and position isnt $forbids[$forbids.length - 1] and position >= 0
           
    detectBadPositionAlgorythme: ->
        for i to 6
            Modele.setPlayer 1
            pos = Modele.play i, true
            Modele.grille[pos] = '1'
            IA.inadvisables.push pos if ~IA.winInTwoTurn 2
            Modele.grille[pos] = 0
        Modele.setPlayer 1
    getListOfMatchingPos : ->
        addPosOkToGroup = (posRelativeToModele, theModelISelf) ->
            if theModelISelf?mode ~= 'futur' 
                IA.playAt
            else 
                IA.pos + IA.positionOfSym posRelativeToModele, IA.currMod.0.length, sym

        tabPosInBigGrille = []
        model = IA.modele[IA.modelId]
        p = IA.structModelDetector2 model, IA.pos5
        [IA.currMod, IA.pos,sym] = [p.theTab,p.pos,IA.sym]
        IA.currMod = if IA.currMod
            if Array.isArray IA.currMod.0 then IA.currMod.0 else IA.currMod 
        if ~IA.playAt
            if Array.isArray IA.playAt
                u = 0
                while u < IA.playAt.length
                    tabPosInBigGrille[*] = addPosOkToGroup(IA.playAt[u],model)
                    u++
            else
                tabPosInBigGrille[*] = addPosOkToGroup(IA.playAt,model)
            IA.pos5 = IA.beginToEnd IA.pos
        else
            IA.pos5 = 48
        tabPosInBigGrille


   
    beginToEnd: (begin) -> begin + IA.currMod.length * 7 - 7
    findForbiddenAndNotRecommandedPosition: ->
        IA.forbids.length = IA.inadvisables.length = 0
        IA.dontHelpJ2 IA.forbids
        IA.detectBadPositionAlgorythme!
        IA.pos5 = 48
        tabForbids = [modPosDeconseille, interditUnPeu]
        for IA.modele in tabForbids
            IA.modelId = 0
            while IA.modelId < IA.modele.length
                tab = IA.getListOfMatchingPos!
                if IA.playAt < 0
                    IA.pos5 = 48
                    IA.modelId++
                else
                    Array::push.apply IA.inadvisables, tab
                    IA.pos5--
        IA.notUnderMe IA.inadvisables
        IA.DeleteException!
    DeleteException: ->
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
    modeleDetector3: (oneModele, pos, otherOption) ->
        sym = true
        dontChangeSym = false
        otherOption = otherOption or {}
        if otherOption.hasOwnProperty 'sym'
            sym = otherOption.sym
            dontChangeSym = true
        posOneModeleSym = 
            true: {pos}
            false: {pos}
        stopLoopCond = ->
            posSym = posOneModeleSym[sym].pos
            pos = posOneModeleSym[not sym].pos
            posOneModeleSym[sym].isModelfound or otherOption.hasOwnProperty 'samepos' or posSym < 0 and pos < 0 or dontChangeSym and posSym < 0
        loop
            poses = posOneModeleSym[sym] = IA.modeleDectector1 oneModele, posOneModeleSym[sym].pos, sym
            if not poses.isModelfound
                poses.pos = Math.min(Math.ceil(poses.pos / 7) * 7 - oneModele.0.length, poses.pos - 1)#decrement by -1 if model dont exceeds the possible size
                sym = not dontChangeSym and not sym
            if !!stopLoopCond! then break
        IA.isModelfound = posOneModeleSym[sym].isModelfound
        IA.posMod = if IA.isModelfound then posOneModeleSym[sym].pos - 7 * (oneModele.length - 1) else -1
        IA.playAt =  IA.isModelfound && on || -1
        IA.sym = sym
        {
            pos: if IA.isModelfound then posOneModeleSym[sym].pos - 7 * (oneModele.length - 1) else -1
            sym: sym
            IA.isModelfound
            theTab: oneModele
        }
    #pos is the position bottom left of wher our model is found in the real game
    modeleDectector1: (oneModele, posOneModele, sym) ->
        for i from 1 to oneModele.length 
            line = oneModele.[*-i]
            line = line.reverse! if sym
            if not IA.comparerLigne(line, posOneModele - 7 * (i - 1))
                return 
                    pos: posOneModele
        return 
            pos: posOneModele
            isModelfound: true
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
            IA.pos = -1
            IA.modelId = 0
            findAt = {modelID: 0}
            IA.pos5 = 48
            [
                ->IA.gagnerDirect!
                ->IA.bloquerDirect!
                ->IA.findForbiddenAndNotRecommandedPosition!
                ->IA.winInTwoTurn 1
                ->
                    IA.modelId = 0
                    IA.modeledetectorAndAnswer perfectModele
                ->
                    IA.modelId = 0
                    IA.pos5 = 48
                    IA.playAvecModele!
                ->IA.playWithoutModel posJoueur
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

IA.comparerCaractere = (a, +car, impaire) ->
    if isNaN a
        a ~= 'a' or a ~= 'y' and car isnt 2 or a ~= 'z' and car isnt 1
    else
        a = +a
        car ~= a or 
        a ~= 9 and car isnt 0 or
        a ~= 6 and car in [1, 2] or
        a ~= 5 and car in [1 2 0] or
        if impaire
            a ~= 8 and car ~= 2 or 
            a ~= 4 and car ~= 1 
        else 
            car ~= 1 and a ~= 3 or 
            a ~= 7 and car ~= 2

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