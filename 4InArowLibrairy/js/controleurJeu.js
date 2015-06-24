// Generated by CoffeeScript 1.9.0
(function() {
  window.app = angular.module('myApp', ['uiSlider']);

  window.app.controller('myCtrl', function($scope, $timeout) {
    var $grille, $keyCode, DeplierClass, anim, callbackPlayer, darkWinningPos, lastScroll, lastX, lastY, message, o, originX, originY, preview, stackPosition, threadIsntUsed, time;
    o = $scope;
    lastY = lastX = originX = originY = lastScroll = $keyCode = window.MyScopeAccess = $grille = stackPosition = preview = time = o.endPreview = anim = DeplierClass = null;
    threadIsntUsed = true;
    stackPosition = [];
    o.tabColor = {
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
    o.endPreview = function($index) {
      if (Modele.grille[$index % 7] === 0) {
        return $grille[$index % 7] = 0;
      }
    };
    DeplierClass = (function() {
      function DeplierClass(bool) {
        this[0] = bool;
      }

      DeplierClass.prototype.deplier = function(bool) {
        return this[0] = bool != null ? bool : !this[0];
      };

      DeplierClass.prototype.getClass = function() {
        if (this[0]) {
          return 'optionVisible';
        } else {
          return 'optionInvisible';
        }
      };

      DeplierClass.prototype.isDisp = function() {
        return this[0];
      };

      return DeplierClass;

    })();
    anim = function(pos, player, callback) {
      var anim2;
      anim2 = function(i) {
        var clickOnUndo;
        if (i > 6) {
          $grille[i - 7] = 0;
        }
        $grille[i] = player;

        /*test if we have click on undo during animation */
        clickOnUndo = +Modele.grille[pos] === 0;
        if (clickOnUndo) {
          $grille[i] = 0;
          if (callback) {
            callback();
          }
          o.$digest();
          return;
        }
        if (i < pos) {
          return $timeout(function() {
            return anim2(i + 7);
          }, time);
        } else {
          if (callback) {
            return $timeout(callback, time + 1);
          }
        }
      };
      $timeout(function() {
        return anim2(pos % 7);
      });
      if (!(pos % 7)) {
        return $grille[0] = Modele.grille[0];
      }
    };
    callbackPlayer = function() {
      var callbackBotIfActiveElsePlayer1, posBot;
      callbackBotIfActiveElsePlayer1 = function() {
        threadIsntUsed = true;
        if (Modele.isGameFinish()) {
          message();
        }
        return o.loopThreatAnimation();
      };
      if (o.isBotActive) {
        IA.setDif(o.cost);
        posBot = IA.p4BlockEasy(pos, false);
        return anim(posBot, 1, callbackBotIfActiveElsePlayer1);
      } else {
        return callbackBotIfActiveElsePlayer1();
      }
    };
    o.loopThreatAnimation = function() {
      var pos;
      if (Modele.isGameFinish()) {
        stackPosition.length = 0;
        threadIsntUsed = true;
        return;
      }
      if (stackPosition.length) {
        if (threadIsntUsed) {
          threadIsntUsed = false;
          time = o.animation2 ? 50 : 0;

          /* it is possible theplayer is really fast so we record all all position where he click in stackPosition and threat them now */
          pos = Modele.play(stackPosition.shift());
          if (pos < 0) {
            threadIsntUsed = true;
          }
          if (Modele.isGameFinish()) {
            message();
          } else if (Modele.grille.indexOf(0) < 0) {
            message('�galit�');
            threadIsntUsed = true;
          }
          return anim(pos, Modele.getPlayer(1), callbackPlayer);
        }
      }
    };
    darkWinningPos = function(dark) {
      var colorNumber, f, i, _results;
      f = Modele.winInfo;
      if (!f) {
        return false;
      }
      i = f.pion1;
      colorNumber = $grille[i];
      if (dark) {
        colorNumber = colorNumberis1 ? 4 : 8;
      }
      _results = [];
      while (true) {
        $grille[i] = colorNumber;
        i += f.dir;
        if (!(i <= f.pion2)) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    message = function(egality) {
      $("#author").val() || $("#author").val("anonymous");
      $("#email").val() || $("#email").val("anonymous@gmail.com");
      o.fen.disp = "message";
      o.whyItIsFinish = false;
      if (egality) {
        o.message = "ceci est une �galit� mais pas une victoire";
      } else {

      }
      darkWinningPos(true);
      if (Modele.isHumanTurn()) {
        if (IA.boolSmart.indexOf("off") + 1) {
          o.message = "bravo vous avez gagn�    augmentez un peu le niveau";
        } else {
          o.message = "bravo vous avez gagn�    envoyer votre historique par commentaire pour am�liorer le jeu";
          $("#comment").append("ne touchez pas cette ligne c est votre historique de jeux" + JSON.stringify(Modele.backup));
        }
      } else {
        o.message = "Le robot gagne cette fois vous pouvez baisser le niveau de difficult� de quelques pourcents";
      }
      o.popup.deplier(true);
      return o.$digest();
    };
    $.extend(o, {
      o: o,
      isBotActive: true,
      modeCreator: false,
      message: '�a va commencer',
      whyItIsFinish: false,
      animation2: true,
      endGameMessage: false,
      popup: new DeplierClass,
      IA: IA,
      Modele: Modele,
      fen: {
        disp: 'play',
        stayOpen: true
      },
      mode: 'normal',
      cost: 100,
      grille: [],
      message: '�a va commencer',
      message: message,
      endGameMessage: true,
      minLine: 0,
      maxLine: 5,
      minCol: 0,
      maxCol: 6
    });
    o.addP;
    o.addP({
      clickOnBlack: function() {
        o.fen.disp = 'play';
        o.popup.deplier(false);
      },
      reverse: function(aString) {
        o[aString] = !o[aString];
      },
      alert: function(text) {
        alert(text);
      },
      optionDisp: function() {
        if (o.optionsWidth === optionsWidthInit) {
          return 'block';
        } else {
          return 'none';
        }
      },
      clickOnBlack: function() {
        o.fen.disp = 'play';
        o.popup.deplier(false);
      },
      reverse: function(aString) {
        o[aString] = !o[aString];
      },
      alert: function(text) {
        alert(text);
      },
      optionDisp: function() {
        if (o.optionsWidth === optionsWidthInit) {
          return 'block';
        } else {
          return 'none';
        }
      },
      loadStory: function(grille2) {
        if (!grille2) {
          return false;
        }
        Modele.restore(grille2);

        /*if not player2        undo last move */
        if (!(Modele.backup.length % 2)) {
          o.undo();
        }
        $grille.safeClone(Modele.grille);
        Modele.setPlayer(2);
      },
      load: function(grille2) {
        Modele.setModel(grille2);
        $grille.safeClone(Modele.grille);
      },
      modeleCreator: function() {
        if (!o.modeCreator) {
          o.endPreview(preview);
          o.grilleCreator = $grille.slice();
          o.grilleCreator[Modele.backup.at(-1)] = 0;
        }
        o.reverse('modeCreator');
      },
      goodGrille: function() {
        if (o.modeCreator) {
          return o.grilleCreator;
        } else {
          return $grille;
        }
      },
      displayOption: function() {
        if (!(o.endGameMessage && o.popup.isDisp())) {
          o.popup.deplier();
        }
        o.endGameMessage = false;
        o.fen.disp = 'option';
      },
      init: function() {
        o.popup.deplier(false);
        threadIsntUsed = true;
        Modele.playAgain();

        /*setTimeout block the update of dom when user clic on replay */
        setTimeout((function() {
          o.endGameMessage = false;
          o.fen.disp = 'message';
        }), 0);
        $grille = Modele.grille.slice();
      },
      deplier: function(columClass, bool) {
        if (bool !== void 0) {
          o[columClass] = !bool ? 'optionInvisible' : 'optionVisible';
        } else {
          o[columClass] = o[columClass] === 'optionVisible' ? 'optionInvisible' : 'optionVisible';
        }
      },
      preview: function($index) {
        var pos;
        if (o.modeCreator) {
          return false;
        }
        if (preview !== void 0) {
          o.endPreview(preview);
        }
        pos = ($index + 7) % 7;
        if (!isNaN(pos)) {
          if ($grille[pos] === 0) {
            $grille[pos] = Modele.getPlayer(0);

            /* 0 the current player 1 for the next */
          }
          preview = pos;
        }
        if ($index % 7 !== 0) {
          $grille[0] = Modele.grille[0];
        }
      },
      restore: function() {
        var backup;
        backup = $.cookie('backup');
        o.loadStory(backup);
      },
      save: function() {
        $.cookie('backup', Modele.backup);
      },
      graphique: function(colorNumber) {
        return o.tabColor[colorNumber];
      },
      undo: function() {
        var pos;
        if (Modele.isGameFinish()) {
          darkWinningPos(false);
          Modele.isGameFinish(false);
        }
        threadIsntUsed = true;
        pos = Modele.undo();
        $grille[pos] = 0;
        IA.boolSmart.pop();
        if (o.isBotActive && Modele.getPlayer() === 1) {
          if (Modele.backup.length % 2 === 0) {
            o.undo();
          } else {

            /* if there is a problem with the player who have to play change the player */
            Modele.setPlayer(2);
          }
        }
        o.popup.deplier(false);
      },
      fallenPion: function(pos) {
        if (o.modeCreator) {
          o.grilleCreator[pos] = $keyCode - 96;
        }
        if (!Modele.isGameFinish()) {
          stackPosition.push(pos);
        } else {
          stackPosition = [];
        }
        return o.loopThreatAnimation();
      },
      keydown: function(event) {
        var i, inc, nextPos;
        event.preventDefault();
        if (o.modeCreator) {
          return;
        }
        $keyCode = event.which;

        /*play at the number push on keyboard
        numerical number (0 to 9)
         */
        if ($keyCode > 47 && $keyCode < 58) {
          o.fallenPion($keyCode - 48);
          return;
        }
        if (event.which === 90 && event.ctrlKey) {
          o.undo();
          return;
        }

        /*right key and left key change the preview */
        if ($keyCode === 37 || $keyCode === 39) {
          inc = $keyCode - 38;
          nextPos = preview;
          i = 7;
          while (true) {
            nextPos = mod(nextPos + inc, 7);
            if (!(+Modele.grille[nextPos] && i--)) {
              break;
            }
          }
          o.preview(nextPos);
          return;
        }

        /*top arrow */
        if ($keyCode === 38) {
          o.undo();
          o.preview();
          return;
        }

        /*bottom arrow */
        if ($keyCode === 40) {
          o.preview(o.fallenPion(preview));
        }
      },
      scrollInPx: function(lg) {
        return $(window).scrollTop($(window).scrollTop() - lg);
      },
      touchStart: function(element) {
        o.displayScroll = 'block';
        lastY = event.touches[0].clientY;
        return o.touchMove(element);
      },
      touchMove: function(element) {
        var pos, width;
        if (o.popup.isDisp()) {
          return off_;
        }
        width = element.P4.width();
        pos = (event.touches.length >= 1 ? event.touches[0].pageX : -1);
        if (pos < 0) {
          return false;
        }
        pos = (pos - element.P4.offset().left) * 7 / width;
        pos = Math.floor(pos);
        o.preview(pos);
        return event.preventDefault();
      },
      touchEnd: function(element) {
        if (o.popup.isDisp()) {
          return true;
        }
        event.preventDefault();
        return o.fallenPion(preview);
      },
      reverseIsBotActive: function() {
        o.reverse("isBotActive");
        if (Modele.backup.length % 2 === 0) {
          return o.undo();
        }
      }
    });
    o.init();
    return $grille.safeClone(Modele.grille);
  });

}).call(this);
