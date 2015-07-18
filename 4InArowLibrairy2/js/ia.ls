'use strict'
borto = window.borto = window.borto || {}
# pos : position  where we  will play
# playAt : position  where we  will play relative to posMod
# posMod :position of top left place we find a model
# posModBot : position of bottom left place we find a model 
#             we begin to 48 and not 41 because some model have a ligne of '9'
#             to tell the model is flat

Modele = window.borto.modele
window.IA = IA = window.borto.ia = 
    playAt: -1
    dif: 100
    boolSmart: []
    found: false
    winningRedPairs: []
    winningYellowOdds: []
    winningRedOdds: []
    winningYellowPairs: []
    forbids: []
    inadvisables: []
    pos: -1
    modelId: 0
    p4BlockEasy: (posJoueur, retournerPosition) ~>
        IA.posJoueur = posJoueur
        var findAt, botSmart
        return false if borto.modele.isGameFinish!
        if (parseInt IA.dif) / 100 + Math.random! > 1
            IA.boolSmart[*] = on
            borto.modele.setPlayer 1
            IA.fillsWinningPos!
            IA.pos = -1
            IA.modelId = 0
            findAt = {modelID: 0}
            IA.posModBot = 48
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
                    IA.posModBot = 48
                    IA.playWithModel!
                ->IA.playWithoutModel posJoueur
            ].some ((func, i) ->
                func!
                ~IA.pos)
        else
            IA.boolSmart[*] = off
            IA.pos = Math.floor Math.random! * 7
        borto.modele.play IA.pos, retournerPosition
    playWithModel: ~>
        j = 0
        IA.posModBot = 48
        IA.modelId = 0
        pos2 =  
            do rec = ->
                TabOfTab = [ attaque, defense, miniDef, mesModele ]
                while j < TabOfTab.length
                    loop
                        break unless IA.modelId < TabOfTab[j].length
                        position3 = IA.modeledetectorAndAnswer(TabOfTab[j])
                        IA.modelId 
                        if ~position3
                            IA.ifPlayHereGiveMeExactPos position3
                            if ~IA.pos
                                IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos)
                                rec() if !IA.found
                                return IA.pos
                            IA.posModBot--
                        IA.modelId++
                    IA.modelId =  0
                    IA.posModBot = 48
                    j++
                IA.posModBot = "notFound"
                -1
    notUnderMe: (inadvisables) ~># don't play under positions we can win  add these positions in inadvisables
        for i to 6
            borto.modele.nextPlayer!
            position = borto.modele.play i, true
            borto.modele.grille[position] = 2
            borto.modele.nextPlayer!
            borto.modele.play i, true
            borto.modele.grille[position] = 0
            if borto.modele.isGameFinish!
                if position isnt inadvisables.at -1 and position >= 0 then if position >= 0 then inadvisables.push position
    ifPlayHereGiveMeExactPos: (+posJoueur) ~>
        IA.pos = borto.modele.play posJoueur, true
        if ~IA.pos
            cond1 = ~IA.forbids.indexOf IA.pos
            cond2 = ~IA.inadvisables.indexOf IA.pos
            if not (cond1 or cond2)
                IA.pos  = borto.modele.play IA.pos , true
                return  IA.pos
        IA.pos = -1
    positionOfSym: (pos, length, sym) ~> pos += sym and (length + ~pos) %% 7 - pos % 7
    fillsWinningPos: ~>
        for o to 6
            IA.winningYellowPairs[o] = -1; IA.winningRedPairs[o] = -1; IA.winningYellowOdds[o] = -1; IA.winningRedOdds[o] = -1
        for o to 41
            if borto.modele.grille[o] ~= 0
                borto.modele.grille[o] = 1; trouvePlayerImpaire = IA.winningYellowOdds[o % 7]
                trouveBotPaire = IA.winningRedPairs[o % 7]
                trouvePlayerPaire = IA.winningYellowPairs[o % 7]
                trouveBotImpaire = IA.winningRedOdds[o % 7]
                if (Math.floor o / 7) % 2 ~= 1 and trouvePlayerImpaire ~= -1 and borto.modele.isGameFinish o
                    IA.winningYellowOdds[o % 7] = o
                else
                    if (Math.floor o / 7) % 2 ~= 0 and trouvePlayerPaire ~= -1 and borto.modele.isGameFinish o then IA.winningYellowPairs[o % 7] = o
                borto.modele.grille[o] = 2
                if (Math.floor o / 7) % 2 ~= 0 and trouveBotPaire ~= -1 and borto.modele.isGameFinish o
                    IA.winningRedPairs[o % 7] = o
                else
                    if (Math.floor o / 7) % 2 ~= 1 and trouveBotImpaire ~= -1 and borto.modele.isGameFinish o then IA.winningRedOdds[o % 7] = o
                borto.modele.grille[o] = 0 
            null
    playAllPos: (u) ~>
        IA.pos = -1
        for u from u to u+6 
            IA.ifPlayHereGiveMeExactPos u
            return on  if ~IA.pos
        off
    playWithoutModel: ~>
        firstTurn = on
        do
            IA.playAllPos(IA.posJoueur)
            if IA.pos > 0 and firstTurn #si une position est jouable
                do #ttque qu'une position est jouable on interdit celles qui amenent au badmodel
                    IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos)
                    return if(IA.found)
                while IA.playAllPos(IA.posJoueur);
                firstTurn = false;
        while((IA.inadvisables.pop()?  || IA.forbids.pop()? )&& IA.pos<0);
        null
    winInTwoTurn: (playerTurn) ~>
        for i to 6
            borto.modele.setPlayer playerTurn
            IA.pos = borto.modele.play(i, true)
            if (if playerTurn ~= 1 then IA.forbids.indexOf(IA.pos) < 0 else not IA.comparerLigne("g", IA.pos - 7))
                position2 = IA.pos
                borto.modele.grille[IA.pos] = playerTurn
                cptGagnerDirect = 0
                for o to 6
                    IA.pos = borto.modele.play(o, true)
                    if borto.modele.isGameFinish() and ~IA.pos
                        cptGagnerDirect++                        
                        #si il y a une position gagnante au dessus d'une autre 
                        WinnerPos = (if borto.modele.getPlayer() ~= 1 then "g" else "i")
                        otherPlayerWinOnMe = (if (borto.modele.getPlayer() ~= 1) then false else IA.comparerLigne("g", IA.pos))
                        if (cptGagnerDirect ~= 1 and IA.comparerLigne(WinnerPos, IA.pos - 7)) or (cptGagnerDirect > 1 and not otherPlayerWinOnMe)
                            borto.modele.grille[position2] = 0
                            IA.pos = i
                            return (i)
                borto.modele.grille[position2] = 0

        IA.pos = -1
    gagnerDirect: ~>
        for i to 7
            IA.pos = borto.modele.play i, true
            if borto.modele.isGameFinish!
                borto.modele.isGameFinish false
                return true
        IA.pos = -1
    wontBecomeLikeThisModel: (TabWontBecomeLikeThisModel, player, posBot) ~>
        posBot = borto.modele.play(posBot, on)
        borto.modele.grille[posBot] = player
        for i to 6
            pos = borto.modele.play(i, on)
            borto.modele.grille[pos] = 2
            if ~pos
                for mod in TabWontBecomeLikeThisModel
                    IA.found = !!IA.structModelDetector2 mod, 48
                    if IA.found
                        break
                borto.modele.grille[pos] = 0
                if IA.found
                    IA.inadvisables.push parseInt posBot
                    break
        borto.modele.grille[posBot] = 0
        ! = IA.found
    futureIWant: (a, ModelInStruct, pos) ~>
        for j to 6
            break if IA.found
            pos3 = borto.modele.play j, true
            if ~pos3
                borto.modele.grille[pos3] = 1
                IA.found = IA.findModel2 ModelInStruct, pos
                borto.modele.grille[pos3] = 0
        if IA.found
            IA.currMod = ModelInStruct.tab
            IA.playAt = pos3
        IA.found
    modeledetectorAndAnswer: (modele) ~>
        IA.modele = modele
        tab = []
        while IA.modelId < modele.length 
            tab = IA.getListOfMatchingPos!
            IA.modelId++
            break if IA.found
        IA.modelId--
        IA.pos = if IA.found then tab.0 else -1
    findModel2: (ModelInStruct, pos) ~>
        IA.currMod = ModelInStruct.tab
        IA.found = false;
        if not ModelInStruct.logicalOperator
            IA.currMod.some (mod) -> IA.found = IA.modeleDetector3(mod, pos)
        else
            otherOption = {}
            stringToEVal = ''
            logicalOperator = ModelInStruct.logicalOperator                
            for i to logicalOperator.length - 2
                stringToEVal += logicalOperator[i] + "IA.modeleDetector3(ModelInStruct.tab[#i],pos,otherOption)"
            stringToEVal += logicalOperator[*-1]

            length = if ModelInStruct.sym then 1 else 2
            for j til length 
                otherOption.sym = !!j if (ModelInStruct.hasOwnProperty 'sameSym') and length ~= 2
                IA.found = eval stringToEVal
            IA.found

    #playAt < 0  is model not found but on terminal call it is the position relative to model 
    structModelDetector2: (ModelInStruct, pos) ~>
        IA.playAt = -1
        IA.found = IA.findModel2 ModelInStruct, pos
        if ModelInStruct.mode ~= 'futur'
            if IA.found
                IA.playAt= -1
                ! = IA.found
            else
                IA.found = IA.futureIWant {}, ModelInStruct, pos
        posMod = IA.posMod
        if (IA.found)
            IA.struct = ModelInStruct
            exept = ModelInStruct.exept
            if exept
                exept.sym = IA.sym
                IA.found = IA.structModelDetector2(exept, 48)
                IA.currMod = ModelInStruct.tab;
                IA.playAt = IA.found && -1 || on
                ! = IA.found
            if IA.found  && ModelInStruct.playAt? 
                IA.playAt = ModelInStruct.playAt
        IA.posMod = posMod
        IA.found
    bloquerDirect: ~>
        borto.modele.nextPlayer!
        for i to 6
            IA.pos = borto.modele.play i, true
            if borto.modele.isGameFinish!
                borto.modele.nextPlayer!
                return IA.pos = borto.modele.play IA.pos, true
        borto.modele.nextPlayer!
        IA.pos = -1
    dontHelpJ2: ($forbids) ~>
        for i to 6
            position = borto.modele.play i, true
            borto.modele.grille[position] = 1
            borto.modele.nextPlayer!
            borto.modele.play i, true
            borto.modele.nextPlayer!
            borto.modele.grille[position] = 0
            $forbids.push position if borto.modele.isGameFinish! and position isnt $forbids[$forbids.length - 1] and position >= 0
           
    detectBadPositionAlgorythme: ~>
        for i to 6
            borto.modele.setPlayer 1
            pos = borto.modele.play i, true
            borto.modele.grille[pos] = '1'
            IA.inadvisables.push pos if ~IA.winInTwoTurn 2
            borto.modele.grille[pos] = 0
        borto.modele.setPlayer 1
    getListOfMatchingPos : ~>
        addPosOkToGroup = (posRelativeToModele) ~>
                IA.posMod + IA.positionOfSym(posRelativeToModele, IA.currMod.0.length, IA.sym)

        tabPosInBigGrille = []
        model = IA.modele[IA.modelId]
        IA.found = IA.structModelDetector2 model, IA.posModBot
        IA.pos = IA.posMod
        IA.currMod = IA.currMod.0 
        if IA.found
            tabPosInBigGrille = 
                if Array.isArray IA.playAt
                    [addPosOkToGroup(posRelativeToModele) for posRelativeToModele in IA.playAt]
                else [
                    if IA.struct?mode ~= 'futur'
                        IA.playAt
                    else 
                        addPosOkToGroup(IA.playAt)
                ]
            IA.posModBot = IA.beginToEnd IA.posMod
        else
            IA.posModBot = 48
        tabPosInBigGrille


   
    beginToEnd: (begin) ~> begin + IA.currMod.length * 7 - 7
    findForbiddenAndNotRecommandedPosition: ~>
        IA.forbids.length = IA.inadvisables.length = 0
        IA.dontHelpJ2 IA.forbids
        IA.detectBadPositionAlgorythme!
        IA.posModBot = 48
        tabForbids = [modPosDeconseille, interditUnPeu]
        for IA.modele in tabForbids
            IA.modelId = 0
            while IA.modelId < IA.modele.length
                tab = IA.getListOfMatchingPos!
                if not IA.found
                    IA.posModBot = 48
                    IA.modelId++
                else
                    Array::push.apply IA.inadvisables, tab
                    IA.posModBot--
        IA.notUnderMe IA.inadvisables
        IA.DeleteException!
    DeleteException: ~>
        IA.modelId = 0
        IA.posModBot = 48
        while IA.modelId < mesModele.length
            IA.modeledetectorAndAnswer tabException
            if ~IA.pos
                position = IA.pos
                pos = IA.inadvisables.indexOf position
                while ~pos
                    IA.inadvisables.splice pos, 1
                    pos = IA.inadvisables.indexOf position
                IA.posModBot--
            else
                break
    modeleDetector3: (oneModele, pos, otherOption) ~>
        sym = true
        dontChangeSym = false
        otherOption = otherOption or {}
        if otherOption.hasOwnProperty 'sym'
            sym = otherOption.sym
            dontChangeSym = true
        posOneModeleSym = 
            true: {pos}
            false: {pos}
        stopLoopCond = ~>
            posSym = posOneModeleSym[sym].pos
            pos = posOneModeleSym[not sym].pos
            posOneModeleSym[sym].isModelfound or otherOption.hasOwnProperty 'samepos' or posSym < 0 and pos < 0 or dontChangeSym and posSym < 0
        loop
            poses = posOneModeleSym[sym] = IA.modeleDectector1 oneModele, posOneModeleSym[sym].pos, sym
            if not poses.isModelfound
                poses.pos = Math.min(Math.ceil(poses.pos / 7) * 7 - oneModele.0.length, poses.pos - 1)#decrement by -1 if model dont exceeds the possible size
                sym = not dontChangeSym and not sym
            if !!stopLoopCond! then break
        IA.posMod = IA.playAt = -1
        isModelfound = posOneModeleSym[sym].isModelfound
        if isModelfound
            IA.posMod = posOneModeleSym[sym].pos - 7 * (oneModele.length - 1)
            IA.playAt =  isModelfound 
            IA.sym = sym
        isModelfound
    #pos is the position bottom left of wher our model is found in the real game
    modeleDectector1: (oneModele, posOneModele, sym) ~>
        for i from 1 to oneModele.length 
            line = oneModele.[*-i]
            line = line.reverse! if sym
            if not IA.comparerLigne(line, posOneModele - 7 * (i - 1))
                return 
                    pos: posOneModele
        return 
            pos: posOneModele
            isModelfound: true
    topToBottom: (pos, length) ~> pos + length * 7 - 7
    bottomToTop: (pos, length) ~> pos + ~length * 7
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
            b = borto.modele.grille[i]
            impaire = Math.floor(i / 7) % 2
            cont = null
            if borto.modele.grille[i] ~= 0                    
                switch
                | a in \pq
                    cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7]            
                | a  ~= \t
                    cont = IA.inadvisables.indexOf(i) + 1
                | a ~= \r
                    cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] or IA.winningYellowOdds[i % 7] ~= -1
                    cont &&= IA.winningRedPairs[i % 7] <= i
                    borto.modele.grille[i] = 1
                    cont &&= borto.modele.isGameFinish(i)
                | a in \f. 
                    borto.modele.grille[i] = 1
                    cont = borto.modele.isGameFinish(i)
                    ! = cont if \f ~= a
                    if !cont
                        borto.modele.grille[i] = 2
                        cont = borto.modele.isGameFinish(i)                   
                | a in \erw
                    cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] or IA.winningYellowOdds[i % 7] ~= -1
                    cont = cont and IA.winningRedPairs[i % 7] <= i
                | a in \gj
                    borto.modele.grille[i] = 1
                    cont = borto.modele.isGameFinish(i)
                | a in \hi 
                    borto.modele.grille[i] = 2
                    cont = borto.modele.isGameFinish(i)                
                ! = cont if a in \hpwfj                            
                borto.modele.grille[i] = 0
            cont ?= IA.comparerCaractere(a, b, impaire) 
            return cont  if cont and i > modligne.length - 2 + o
            i++
        return