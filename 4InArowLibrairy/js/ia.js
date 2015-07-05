// Generated by LiveScript 1.4.0
(function(){
  'use strict';
  var IA;
  IA = window.IA = {
    playAt: -1,
    dif: 100,
    boolSmart: [],
    found: false,
    playWithModel: function(){
      var j, pos2, rec;
      j = 0;
      IA.posModBot = 48;
      IA.modelId = 0;
      return pos2 = (rec = function(){
        var TabOfTab, position3;
        TabOfTab = [attaque, defense, miniDef, mesModele];
        while (j < TabOfTab.length) {
          for (;;) {
            if (!(IA.modelId < TabOfTab[j].length)) {
              break;
            }
            position3 = IA.modeledetectorAndAnswer(TabOfTab[j]);
            IA.modelId;
            if (~position3) {
              IA.ifPlayHereGiveMeExactPos(position3);
              if (~IA.pos) {
                IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos);
                if (!IA.found) {
                  rec();
                }
                return IA.pos;
              }
              IA.posModBot--;
            }
            IA.modelId++;
          }
          IA.modelId = 0;
          IA.posModBot = 48;
          j++;
        }
        IA.posModBot = "notFound";
        return -1;
      })();
    },
    notUnderMe: function(inadvisables){
      var i$, i, position, results$ = [];
      for (i$ = 0; i$ <= 6; ++i$) {
        i = i$;
        Modele.nextPlayer();
        position = Modele.play(i, true);
        Modele.grille[position] = 2;
        Modele.nextPlayer();
        Modele.play(i, true);
        Modele.grille[position] = 0;
        if (Modele.isGameFinish()) {
          if (position !== inadvisables.at(-1) && position >= 0) {
            if (position >= 0) {
              results$.push(inadvisables.push(position));
            }
          }
        }
      }
      return results$;
    },
    ifPlayHereGiveMeExactPos: function(posJoueur){
      var cond1, cond2;
      posJoueur = +posJoueur;
      IA.pos = Modele.play(posJoueur, true);
      if (~IA.pos) {
        cond1 = ~IA.forbids.indexOf(IA.pos);
        cond2 = ~IA.inadvisables.indexOf(IA.pos);
        if (!(cond1 || cond2)) {
          IA.pos = Modele.play(IA.pos, true);
          return IA.pos;
        }
      }
      return IA.pos = -1;
    },
    positionOfSym: function(pos, length, sym){
      var ref$;
      return pos += sym && ((((length + ~pos)) % (ref$ = 7) + ref$) % ref$) - pos % 7;
    },
    fillsWinningPos: function(){
      var i$, o, trouvePlayerImpaire, trouveBotPaire, trouvePlayerPaire, trouveBotImpaire, results$ = [];
      for (i$ = 0; i$ <= 6; ++i$) {
        o = i$;
        IA.winningYellowPairs[o] = -1;
        IA.winningRedPairs[o] = -1;
        IA.winningYellowOdds[o] = -1;
        IA.winningRedOdds[o] = -1;
      }
      for (i$ = 0; i$ <= 41; ++i$) {
        o = i$;
        if (Modele.grille[o] == 0) {
          Modele.grille[o] = 1;
          trouvePlayerImpaire = IA.winningYellowOdds[o % 7];
          trouveBotPaire = IA.winningRedPairs[o % 7];
          trouvePlayerPaire = IA.winningYellowPairs[o % 7];
          trouveBotImpaire = IA.winningRedOdds[o % 7];
          if (Math.floor(o / 7) % 2 == 1 && trouvePlayerImpaire == -1 && Modele.isGameFinish(o)) {
            IA.winningYellowOdds[o % 7] = o;
          } else {
            if (Math.floor(o / 7) % 2 == 0 && trouvePlayerPaire == -1 && Modele.isGameFinish(o)) {
              IA.winningYellowPairs[o % 7] = o;
            }
          }
          Modele.grille[o] = 2;
          if (Math.floor(o / 7) % 2 == 0 && trouveBotPaire == -1 && Modele.isGameFinish(o)) {
            IA.winningRedPairs[o % 7] = o;
          } else {
            if (Math.floor(o / 7) % 2 == 1 && trouveBotImpaire == -1 && Modele.isGameFinish(o)) {
              IA.winningRedOdds[o % 7] = o;
            }
          }
          Modele.grille[o] = 0;
        }
        results$.push(null);
      }
      return results$;
    },
    playAllPos: function(u){
      var i$, to$;
      IA.pos = -1;
      for (i$ = u, to$ = u + 6; i$ <= to$; ++i$) {
        u = i$;
        IA.ifPlayHereGiveMeExactPos(u);
        if (~IA.pos) {
          return true;
        }
      }
      return false;
    },
    playWithoutModel: function(){
      var firstTurn;
      firstTurn = true;
      do {
        IA.playAllPos(IA.posJoueur);
        if (IA.pos > 0 && firstTurn) {
          do {
            IA.wontBecomeLikeThisModel(TabWontBecomeLikeThisModelPlayerTurn, 1, IA.pos);
            if (IA.found) {
              return;
            }
          } while (IA.playAllPos(IA.posJoueur));
          firstTurn = false;
        }
      } while ((IA.inadvisables.pop() != null || IA.forbids.pop() != null) && IA.pos < 0);
      return null;
    },
    winInTwoTurn: function(playerTurn){
      var i$, i, position2, cptGagnerDirect, j$, o, WinnerPos, otherPlayerWinOnMe;
      for (i$ = 0; i$ <= 6; ++i$) {
        i = i$;
        Modele.setPlayer(playerTurn);
        IA.pos = Modele.play(i, true);
        if (playerTurn == 1
          ? IA.forbids.indexOf(IA.pos) < 0
          : !IA.comparerLigne("g", IA.pos - 7)) {
          position2 = IA.pos;
          Modele.grille[IA.pos] = playerTurn;
          cptGagnerDirect = 0;
          for (j$ = 0; j$ <= 6; ++j$) {
            o = j$;
            IA.pos = Modele.play(o, true);
            if (Modele.isGameFinish() && ~IA.pos) {
              cptGagnerDirect++;
              WinnerPos = Modele.getPlayer() == 1 ? "g" : "i";
              otherPlayerWinOnMe = Modele.getPlayer() == 1
                ? false
                : IA.comparerLigne("g", IA.pos);
              if ((cptGagnerDirect == 1 && IA.comparerLigne(WinnerPos, IA.pos - 7)) || (cptGagnerDirect > 1 && !otherPlayerWinOnMe)) {
                Modele.grille[position2] = 0;
                IA.pos = i;
                return i;
              }
            }
          }
          Modele.grille[position2] = 0;
        }
      }
      return IA.pos = -1;
    },
    gagnerDirect: function(){
      var i$, i;
      for (i$ = 0; i$ <= 7; ++i$) {
        i = i$;
        IA.pos = Modele.play(i, true);
        if (Modele.isGameFinish()) {
          Modele.isGameFinish(false);
          return true;
        }
      }
      return IA.pos = -1;
    },
    wontBecomeLikeThisModel: function(TabWontBecomeLikeThisModel, player, posBot){
      var i$, i, pos, j$, len$, mod;
      posBot = Modele.play(posBot, true);
      Modele.grille[posBot] = player;
      for (i$ = 0; i$ <= 6; ++i$) {
        i = i$;
        pos = Modele.play(i, true);
        Modele.grille[pos] = 2;
        if (~pos) {
          for (j$ = 0, len$ = TabWontBecomeLikeThisModel.length; j$ < len$; ++j$) {
            mod = TabWontBecomeLikeThisModel[j$];
            IA.found = !!IA.structModelDetector2(mod, 48);
            if (IA.found) {
              break;
            }
          }
          Modele.grille[pos] = 0;
          if (IA.found) {
            IA.inadvisables.push(parseInt(posBot));
            break;
          }
        }
      }
      Modele.grille[posBot] = 0;
      return IA.found = !IA.found;
    },
    futureIWant: function(a, ModelInStruct, pos){
      var i$, j, pos3;
      for (i$ = 0; i$ <= 6; ++i$) {
        j = i$;
        if (IA.found) {
          break;
        }
        pos3 = Modele.play(j, true);
        if (~pos3) {
          Modele.grille[pos3] = 1;
          IA.found = IA.findModel2(ModelInStruct, pos);
          Modele.grille[pos3] = 0;
        }
      }
      if (IA.found) {
        IA.currMod = ModelInStruct.tab;
        IA.playAt = pos3;
      }
      return IA.found;
    },
    modeledetectorAndAnswer: function(modele){
      var tab;
      IA.modele = modele;
      tab = [];
      while (IA.modelId < modele.length) {
        tab = IA.getListOfMatchingPos();
        IA.modelId++;
        if (IA.found) {
          break;
        }
      }
      IA.modelId--;
      return IA.pos = IA.found
        ? tab[0]
        : -1;
    },
    findModel2: function(ModelInStruct, pos){
      var otherOption, stringToEVal, logicalOperator, i$, to$, i, length, j;
      IA.currMod = ModelInStruct.tab;
      IA.found = false;
      if (!ModelInStruct.logicalOperator) {
        return IA.currMod.some(function(mod){
          return IA.found = IA.modeleDetector3(mod, pos);
        });
      } else {
        otherOption = {};
        stringToEVal = '';
        logicalOperator = ModelInStruct.logicalOperator;
        for (i$ = 0, to$ = logicalOperator.length - 2; i$ <= to$; ++i$) {
          i = i$;
          stringToEVal += logicalOperator[i] + ("IA.modeleDetector3(ModelInStruct.tab[" + i + "],pos,otherOption)");
        }
        stringToEVal += logicalOperator[logicalOperator.length - 1];
        length = ModelInStruct.sym ? 1 : 2;
        for (i$ = 0; i$ < length; ++i$) {
          j = i$;
          if (ModelInStruct.hasOwnProperty('sameSym') && length == 2) {
            otherOption.sym = !!j;
          }
          IA.found = eval(stringToEVal);
        }
        return IA.found;
      }
    },
    structModelDetector2: function(ModelInStruct, pos){
      var posMod, exept;
      IA.playAt = -1;
      IA.found = IA.findModel2(ModelInStruct, pos);
      if (ModelInStruct.mode == 'futur') {
        if (IA.found) {
          IA.playAt = -1;
          IA.found = !IA.found;
        } else {
          IA.found = IA.futureIWant({}, ModelInStruct, pos);
        }
      }
      posMod = IA.posMod;
      if (IA.found) {
        IA.struct = ModelInStruct;
        exept = ModelInStruct.exept;
        if (exept) {
          exept.sym = IA.sym;
          IA.found = IA.structModelDetector2(exept, 48);
          IA.currMod = ModelInStruct.tab;
          IA.playAt = IA.found && -1 || true;
          IA.found = !IA.found;
        }
        if (IA.found && ModelInStruct.playAt != null) {
          IA.playAt = ModelInStruct.playAt;
        }
      }
      IA.posMod = posMod;
      return IA.found;
    },
    bloquerDirect: function(){
      var i$, i;
      Modele.nextPlayer();
      for (i$ = 0; i$ <= 6; ++i$) {
        i = i$;
        IA.pos = Modele.play(i, true);
        if (Modele.isGameFinish()) {
          Modele.nextPlayer();
          return IA.pos = Modele.play(IA.pos, true);
        }
      }
      Modele.nextPlayer();
      return IA.pos = -1;
    },
    dontHelpJ2: function($forbids){
      var i$, i, position, results$ = [];
      for (i$ = 0; i$ <= 6; ++i$) {
        i = i$;
        position = Modele.play(i, true);
        Modele.grille[position] = 1;
        Modele.nextPlayer();
        Modele.play(i, true);
        Modele.nextPlayer();
        Modele.grille[position] = 0;
        if (Modele.isGameFinish() && position !== $forbids[$forbids.length - 1] && position >= 0) {
          results$.push($forbids.push(position));
        }
      }
      return results$;
    },
    detectBadPositionAlgorythme: function(){
      var i$, i, pos;
      for (i$ = 0; i$ <= 6; ++i$) {
        i = i$;
        Modele.setPlayer(1);
        pos = Modele.play(i, true);
        Modele.grille[pos] = '1';
        if (~IA.winInTwoTurn(2)) {
          IA.inadvisables.push(pos);
        }
        Modele.grille[pos] = 0;
      }
      return Modele.setPlayer(1);
    },
    getListOfMatchingPos: function(){
      var addPosOkToGroup, tabPosInBigGrille, model, posRelativeToModele, ref$;
      addPosOkToGroup = function(posRelativeToModele){
        return IA.posMod + IA.positionOfSym(posRelativeToModele, IA.currMod[0].length, IA.sym);
      };
      tabPosInBigGrille = [];
      model = IA.modele[IA.modelId];
      IA.found = IA.structModelDetector2(model, IA.posModBot);
      IA.pos = IA.posMod;
      IA.currMod = IA.currMod[0];
      if (IA.found) {
        tabPosInBigGrille = Array.isArray(IA.playAt)
          ? (function(){
            var i$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = IA.playAt).length; i$ < len$; ++i$) {
              posRelativeToModele = ref$[i$];
              results$.push(addPosOkToGroup(posRelativeToModele));
            }
            return results$;
          }())
          : [((ref$ = IA.struct) != null ? ref$.mode : void 8) == 'futur'
            ? IA.playAt
            : addPosOkToGroup(IA.playAt)];
        IA.posModBot = IA.beginToEnd(IA.posMod);
      } else {
        IA.posModBot = 48;
      }
      return tabPosInBigGrille;
    },
    beginToEnd: function(begin){
      return begin + IA.currMod.length * 7 - 7;
    },
    findForbiddenAndNotRecommandedPosition: function(){
      var tabForbids, i$, len$, tab;
      IA.forbids.length = IA.inadvisables.length = 0;
      IA.dontHelpJ2(IA.forbids);
      IA.detectBadPositionAlgorythme();
      IA.posModBot = 48;
      tabForbids = [modPosDeconseille, interditUnPeu];
      for (i$ = 0, len$ = tabForbids.length; i$ < len$; ++i$) {
        IA.modele = tabForbids[i$];
        IA.modelId = 0;
        while (IA.modelId < IA.modele.length) {
          tab = IA.getListOfMatchingPos();
          if (!IA.found) {
            IA.posModBot = 48;
            IA.modelId++;
          } else {
            Array.prototype.push.apply(IA.inadvisables, tab);
            IA.posModBot--;
          }
        }
      }
      IA.notUnderMe(IA.inadvisables);
      return IA.DeleteException();
    },
    DeleteException: function(){
      var position, pos, results$ = [];
      IA.modelId = 0;
      IA.posModBot = 48;
      while (IA.modelId < mesModele.length) {
        IA.modeledetectorAndAnswer(tabException);
        if (~IA.pos) {
          position = IA.pos;
          pos = IA.inadvisables.indexOf(position);
          while (~pos) {
            IA.inadvisables.splice(pos, 1);
            pos = IA.inadvisables.indexOf(position);
          }
          results$.push(IA.posModBot--);
        } else {
          break;
        }
      }
      return results$;
    },
    modeleDetector3: function(oneModele, pos, otherOption){
      var sym, dontChangeSym, posOneModeleSym, stopLoopCond, poses, isModelfound;
      sym = true;
      dontChangeSym = false;
      otherOption = otherOption || {};
      if (otherOption.hasOwnProperty('sym')) {
        sym = otherOption.sym;
        dontChangeSym = true;
      }
      posOneModeleSym = {
        'true': {
          pos: pos
        },
        'false': {
          pos: pos
        }
      };
      stopLoopCond = function(){
        var posSym, pos;
        posSym = posOneModeleSym[sym].pos;
        pos = posOneModeleSym[!sym].pos;
        return posOneModeleSym[sym].isModelfound || otherOption.hasOwnProperty('samepos') || posSym < 0 && pos < 0 || dontChangeSym && posSym < 0;
      };
      for (;;) {
        poses = posOneModeleSym[sym] = IA.modeleDectector1(oneModele, posOneModeleSym[sym].pos, sym);
        if (!poses.isModelfound) {
          poses.pos = Math.min(Math.ceil(poses.pos / 7) * 7 - oneModele[0].length, poses.pos - 1);
          sym = !dontChangeSym && !sym;
        }
        if (!!stopLoopCond()) {
          break;
        }
      }
      IA.posMod = IA.playAt = -1;
      isModelfound = posOneModeleSym[sym].isModelfound;
      if (isModelfound) {
        IA.posMod = posOneModeleSym[sym].pos - 7 * (oneModele.length - 1);
        IA.playAt = isModelfound;
        IA.sym = sym;
      }
      return isModelfound;
    },
    modeleDectector1: function(oneModele, posOneModele, sym){
      var i$, to$, i, line;
      for (i$ = 1, to$ = oneModele.length; i$ <= to$; ++i$) {
        i = i$;
        line = oneModele[oneModele.length - i];
        if (sym) {
          line = line.reverse();
        }
        if (!IA.comparerLigne(line, posOneModele - 7 * (i - 1))) {
          return {
            pos: posOneModele
          };
        }
      }
      return {
        pos: posOneModele,
        isModelfound: true
      };
    },
    topToBottom: function(pos, length){
      return pos + length * 7 - 7;
    },
    bottomToTop: function(pos, length){
      return pos + ~length * 7;
    },
    p4BlockEasy: function(posJoueur, retournerPosition){
      var findAt, botSmart;
      IA.posJoueur = posJoueur;
      findAt = void 8;
      botSmart = void 8;
      if (Modele.isGameFinish()) {
        return false;
      }
      if (parseInt(IA.dif) / 100 + Math.random() > 1) {
        IA.boolSmart.push('true');
        Modele.setPlayer(1);
        IA.fillsWinningPos();
        IA.pos = -1;
        IA.modelId = 0;
        findAt = {
          modelID: 0
        };
        IA.posModBot = 48;
        [
          function(){
            return IA.gagnerDirect();
          }, function(){
            return IA.bloquerDirect();
          }, function(){
            return IA.findForbiddenAndNotRecommandedPosition();
          }, function(){
            return IA.winInTwoTurn(1);
          }, function(){
            IA.modelId = 0;
            return IA.modeledetectorAndAnswer(perfectModele);
          }, function(){
            IA.modelId = 0;
            IA.posModBot = 48;
            return IA.playWithModel();
          }, function(){
            return IA.playWithoutModel(posJoueur);
          }
        ].some(function(func, i){
          func();
          return ~IA.pos;
        });
      } else {
        IA.boolSmart.push('false');
        IA.pos = Math.floor(Math.random() * 7);
      }
      return Modele.play(IA.pos, retournerPosition);
    },
    winningRedPairs: [],
    winningYellowOdds: [],
    winningRedOdds: [],
    winningYellowPairs: [],
    forbids: [],
    inadvisables: [],
    pos: -1,
    modelId: 0
  };
  Array.prototype.has = function(variable){
    return ~this.indexOf(variable);
  };
  IA.comparerCaractere = function(a, car, impaire){
    car = +car;
    if (isNaN(a)) {
      return a == 'a' || a == 'y' && car !== 2 || a == 'z' && car !== 1;
    } else {
      a = +a;
      return car == a || a == 9 && car !== 0 || a == 6 && (car === 1 || car === 2) || a == 5 && (car === 1 || car === 2 || car === 0) || (impaire
        ? a == 8 && car == 2 || a == 4 && car == 1
        : car == 1 && a == 3 || a == 7 && car == 2);
    }
  };
  IA.comparerLigne = function(modligne, o){
    var cont, i, a, b, impaire;
    if (o < 0) {
      return false;
    }
    cont = true;
    i = o;
    while (i < modligne.length + o && cont) {
      if (o < 0) {
        return false;
      }
      a = modligne.charAt(i - o);
      b = Modele.grille[i];
      impaire = Math.floor(i / 7) % 2;
      cont = null;
      if (Modele.grille[i] == 0) {
        switch (false) {
        case !in$(a, 'pq'):
          cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7];
          break;
        case a != 't':
          cont = IA.inadvisables.indexOf(i) + 1;
          break;
        case a != 'r':
          cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] || IA.winningYellowOdds[i % 7] == -1;
          cont && (cont = IA.winningRedPairs[i % 7] <= i);
          Modele.grille[i] = 1;
          cont && (cont = Modele.isGameFinish(i));
          break;
        case !in$(a, 'f.'):
          Modele.grille[i] = 1;
          cont = Modele.isGameFinish(i);
          if ('f' == a) {
            cont = !cont;
          }
          if (!cont) {
            Modele.grille[i] = 2;
            cont = Modele.isGameFinish(i);
          }
          break;
        case !in$(a, 'erw'):
          cont = IA.winningRedPairs[i % 7] < IA.winningYellowOdds[i % 7] || IA.winningYellowOdds[i % 7] == -1;
          cont = cont && IA.winningRedPairs[i % 7] <= i;
          break;
        case !in$(a, 'gj'):
          Modele.grille[i] = 1;
          cont = Modele.isGameFinish(i);
          break;
        case !in$(a, 'hi'):
          Modele.grille[i] = 2;
          cont = Modele.isGameFinish(i);
        }
        if (in$(a, 'hpwfj')) {
          cont = !cont;
        }
        Modele.grille[i] = 0;
      }
      cont == null && (cont = IA.comparerCaractere(a, b, impaire));
      if (cont && i > modligne.length - 2 + o) {
        return cont;
      }
      i++;
    }
  };
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
