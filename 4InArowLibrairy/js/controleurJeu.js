// Generated by LiveScript 1.4.0
(function(){
  window.app = angular.module('myApp', ['uiSlider']);
  window.app.controller('myCtrl', function($scope, $timeout){
    return (function(){
      var x$, model, ia, DeplierClass, this$ = this;
      window.o = this;
      x$ = window.borto;
      model = x$.modele;
      ia = x$.ia;
      DeplierClass = (function(){
        DeplierClass.displayName = 'DeplierClass';
        var prototype = DeplierClass.prototype, constructor = DeplierClass;
        function DeplierClass(it){
          this[0] = it;
        }
        prototype.deplier = function(it){
          it == null && (it = !this[0]);
          return this[0] = it;
        };
        prototype.getClass = function(){
          if (this[0]) {
            return 'optionVisible';
          } else {
            return 'optionInvisible';
          }
        };
        prototype.isDisp = function(){
          return this[0];
        };
        return DeplierClass;
      }());
      this.ia = ia;
      this.model = model;
      this.threadIsntUsed = true;
      this.stackPosition = [];
      this.isBotActive = true;
      this.modeCreator = false;
      this.whyItIsFinish = false;
      this.animation2 = true;
      this.popup = new DeplierClass;
      this.fen = {
        disp: 'play',
        stayOpen: true
      };
      this.mode = 'normal';
      this.grille = [];
      this.message = 'ça va commencer';
      this.endGameMessage = true;
      this.minLine = 0;
      this.maxLine = 5;
      this.minCol = 0;
      this.maxCol = 6;
      this.tabColor = {
        '-30': 'rgb(255,0,234)',
        0: 'white',
        1: 'rgb(255,251,0)',
        2: 'rgb(255,0,0)',
        3: 'rgb(205,209,77)',
        4: 'rgb(160,166,0)',
        5: 'rgb(255,162,0)',
        6: 'rgb(99,99,99)',
        7: 'rgb(255,128,128)',
        8: 'rgb(140,0,0)',
        9: 'rgb(0,255,221)'
      };
      this.replayIcon = function(){
        return Modele.isGameFinish() && !this.whyItIsFinish || this.fen.disp === 'message';
      };
      this.darkWinningPos = function(dark){
        var f, colorNumber, this$ = this;
        f = model.winInfo;
        colorNumber = model.grille[f[0]] * (dark ? 4 : 1);
        return f.forEach(function(pos){
          return this$.$grille[pos] = colorNumber;
        });
      };
      this.fullscreen = function(){
        this.fen.disp = 'play';
        this.popup.deplier(true);
        return this.whyItIsFinish = false;
      };
      this.$messageF = function(egality){
        this.fen.disp = 'message';
        this.whyItIsFinish = false;
        if (egality) {
          this.message = 'ceci est une égalité mais pas une victoire';
        } else {
          this.darkWinningPos(true);
        }
        if (model.isHumanTurn()) {
          this.message = 'bravo vous avez gagné' + (in$(false, IA.boolSmart) ? 'augmentez un peu le niveau' : 'envoyer votre historique par commentaire pour améliorer le jeu');
        } else {
          this.message = 'Le robot gagne cette fois vous pouvez baisser le niveau de difficulté de quelques pourcents';
        }
        this.popup.deplier(true);
        return this.$digest();
      };
      this.anim = function(pos, player, callback){
        var anim2, this$ = this;
        anim2 = function(i){
          var clickOnUndo;
          clickOnUndo = void 8;
          if (i > 6) {
            this$.$grille[i - 7] = 0;
          }
          this$.$grille[i] = player;
          clickOnUndo = +model.grille[pos] === 0;
          if (clickOnUndo) {
            this$.$grille[i] = 0;
            if (callback) {
              callback();
            }
            this$.$digest();
            return;
          }
          if (i < pos) {
            return $timeout(function(){
              return anim2(i + 7);
            }, this$.time);
          } else if (callback) {
            return $timeout(callback, this$.time + 1);
          }
        };
        $timeout(function(){
          return anim2(pos % 7);
        });
        if (!(pos % 7)) {
          return this.$grille[0] = model.grille[0];
        }
      };
      this.endPreview = function($index){
        if (model.grille[$index % 7] === 0) {
          return this.$grille[$index % 7] = 0;
        }
      };
      this.loopThreatAnimation = function(){
        var pos, this$ = this;
        pos = void 8;
        if (model.isGameFinish()) {
          this.stackPosition.length = 0;
          this.threadIsntUsed = true;
          return;
        }
        if (this.stackPosition.length) {
          if (this.threadIsntUsed) {
            this.threadIsntUsed = false;
            this.time = this.animation2 ? 50 : 0;
            pos = model.play(this.stackPosition.shift());
            if (pos < 0) {
              this.threadIsntUsed = true;
            }
            if (model.isGameFinish()) {
              this.$messageF();
            } else {
              if (model.grille.indexOf(0) < 0) {
                this.messageF('égalité');
                this.threadIsntUsed = true;
              }
            }
            return this.anim(pos, model.getPlayer(1), function(){
              var callbackBotIfActiveElsePlayer1, posBot;
              callbackBotIfActiveElsePlayer1 = function(){
                this$.threadIsntUsed = true;
                if (model.isGameFinish()) {
                  this$.$messageF();
                }
                return this$.loopThreatAnimation();
              };
              if (this$.isBotActive) {
                posBot = IA.p4BlockEasy(pos, false);
                return this$.anim(posBot, 1, callbackBotIfActiveElsePlayer1);
              } else {
                return callbackBotIfActiveElsePlayer1();
              }
            });
          }
        }
      };
      this.clickOnBlack = function(){
        this.fen.disp = 'play';
        return this.popup.deplier(false);
      };
      this.reverse = function(aString){
        return o[aString] = !o[aString];
      };
      this.alert = function(text){
        return alert(text);
      };
      this.optionDisp = function(){
        if (this.optionsWidth === optionsWidthInit) {
          return 'block';
        } else {
          return 'none';
        }
      };
      this.loadStory = function(grille2){
        if (!grille2) {
          return false;
        }
        model.restore(grille2);
        if (!(model.backup.length % 2)) {
          this.undo();
        }
        this.$grille.safeClone(model.grille);
        return model.setPlayer(2);
      };
      this.load = function(grille2){
        model.setModel(grille2);
        return this.$grille.safeClone(model.grille);
      };
      this.modeleCreator = function(){
        var ref$;
        if (!this.modeCreator) {
          this.$keyCode = 5 + 96;
          this.endPreview(this.preview);
          this.grilleCreator = this.$grille.slice();
          this.grilleCreator[(ref$ = model.backup)[ref$.length - 1]] = 0;
        }
        return this.reverse('modeCreator');
      };
      this.goodGrille = function(){
        if (this.modeCreator) {
          return this.grilleCreator;
        } else {
          return this.$grille;
        }
      };
      this.displayOption = function(){
        if (!(this.endGameMessage && this.popup.isDisp())) {
          this.popup.deplier();
        }
        this.endGameMessage = false;
        return this.fen.disp = 'option';
      };
      this.init = function(){
        this.popup.deplier(false);
        this.threadIsntUsed = true;
        model.playAgain();
        IA.boolSmart.length = 0;
        this.endGameMessage = false;
        this.fen.disp = 'option';
        return this.$grille = model.grille.slice();
      };
      this.deplier = function(columClass, bool){
        if (bool !== void 8) {
          return o[columClass] = !bool ? 'optionInvisible' : 'optionVisible';
        } else {
          return o[columClass] = o[columClass] === 'optionVisible' ? 'optionInvisible' : 'optionVisible';
        }
      };
      this.previewF = function($index){
        var pos, ref$;
        if (this.modeCreator) {
          return false;
        }
        if (this.preview !== void 8) {
          this.endPreview(this.preview);
        }
        pos = ((($index) % (ref$ = 7) + ref$) % ref$);
        if (!isNaN(pos)) {
          if (this.$grille[pos] === 0) {
            this.$grille[pos] = model.getPlayer(0);
          }
          this.preview = pos;
        }
        if ($index % 7 !== 0) {
          return this.$grille[0] = model.grille[0];
        }
      };
      this.restore = function(){
        var backup;
        backup = $.cookie('backup');
        this.loadStory(backup);
        return IA.boolSmart = $.cookie('boolSmart');
      };
      this.save = function(){
        $.cookie('backup', model.backup);
        return $.cookie('boolSmart', JSON.stringify(IA.boolSmart));
      };
      this.graphique = function(colorNumber){
        return this.tabColor[colorNumber];
      };
      this.undo = function(){
        var pos;
        if (model.isGameFinish()) {
          this.darkWinningPos(false);
          model.isGameFinish(false);
        }
        this.threadIsntUsed = true;
        pos = model.undo();
        this.$grille[pos] = 0;
        IA.boolSmart.pop();
        if (this.isBotActive && model.getPlayer() === 1) {
          if (model.backup.length % 2 === 0) {
            this.undo();
          } else {
            model.setPlayer(2);
          }
        }
        return this.popup.deplier(false);
      };
      this.fallenPion = function(pos){
        if (this$.modeCreator) {
          this$.grilleCreator[pos] = this$.$keyCode - 96;
        }
        if (!model.isGameFinish()) {
          this$.stackPosition.push(pos);
        } else {
          this$.stackPosition = [];
        }
        return this$.loopThreatAnimation();
      };
      this.keydown = function(event){
        var ref$, inc, nextPos, i;
        event.preventDefault();
        this.$keyCode = event.which;
        if (this.modeCreator) {
          return;
        }
        if (47 < (ref$ = this.$keyCode) && ref$ < 58) {
          this.fallenPion(this.$keyCode - 48);
          return;
        }
        if (event.which === 90 && event.ctrlKey) {
          this.undo();
          return;
        }
        if (this.$keyCode === 37 || this.$keyCode === 39) {
          inc = this.$keyCode - 38;
          nextPos = this.preview;
          i = 7;
          for (;;) {
            nextPos = mod(nextPos + inc, 7);
            if (!(+model.grille[nextPos] && i--)) {
              break;
            }
          }
          this.previewF(nextPos);
          return;
        }
        if (this.$keyCode === 38) {
          this.undo();
          this.previewF();
          return;
        }
        if (this.$keyCode === 40) {
          return this.previewF(this.fallenPion(this.preview));
        }
      };
      this.scrollInPx = function(lg){
        return $(window).scrollTop($(window).scrollTop() - lg);
      };
      this.touchStart = function(element){
        this.displayScroll = 'block';
        this.lastY = event.touches[0].clientY;
        return this.touchMove(element);
      };
      this.touchMove = function(element){
        var pos, width;
        if (this.popup.isDisp()) {
          return off_;
        }
        width = element.P4.width();
        pos = event.touches.length >= 1
          ? event.touches[0].pageX
          : -1;
        if (pos < 0) {
          return false;
        }
        pos = (pos - element.P4.offset().left) * 7 / width;
        pos = Math.floor(pos);
        this.previewF(pos);
        return event.preventDefault();
      };
      this.touchEnd = function(element){
        if (this.popup.isDisp()) {
          return true;
        }
        event.preventDefault();
        return this.fallenPion(this.preview);
      };
      this.reverseIsBotActive = function(){
        this.reverse('isBotActive');
        if (model.backup.length % 2 === 0) {
          return this.undo();
        }
      };
      this.init();
      this.popup.deplier(true);
      this.fen.disp = 'message';
      return this.$grille.safeClone(model.grille);
    }.call($scope));
  });
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
