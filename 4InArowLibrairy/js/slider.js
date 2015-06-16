// I just correct some bugs on mobile and make change to make it compatible with last update of angularJs
//original file and  licence  https://github.com/elialbert/kissandtell/blob/master/app/lib/angular-slider.js~
(function() {
    var MODULE_NAME, SLIDER_TAG, angularize, bindHtml, gap, halfWidth, hide, inputEvents, module, offset, offsetLeft, pixelize, qualifiedDirectiveDefinition, roundStep, show, sliderDirective, width;
    MODULE_NAME = 'uiSlider';
    SLIDER_TAG = 'slider';
    angularize = function(element) {
        return angular.element(element);
    };
    pixelize = function(position) {
        return "" + position + "px";
    };
    hide = function(element) {
        return element.css({
            opacity: 0
        });
    };
    show = function(element) {
        return element.css({
            opacity: 1
        });
    };
    offset = function(element, position) {
        return element.css({
            left: position
        });
    };
    halfWidth = function(element) {
        return element[0].offsetWidth / 2;
    };
    offsetLeft = function(element) {
        return element[0].offsetLeft;
    };
    width = function(element) {
        return element[0].offsetWidth;
    };
    gap = function(element1, element2) {
        return offsetLeft(element2) - offsetLeft(element1) - width(element1);
    };

    roundStep = function(value, precision, step, floor) {
        var decimals, remainder, roundedValue, steppedValue;
        if (floor == null) {
            floor = 0;
        }
        if (step == null) {
            step = 1 / Math.pow(10, precision);
        }
        remainder = (value - floor) % step;
        steppedValue = remainder > (step / 2) ? value + step - remainder : value - remainder;
        decimals = Math.pow(10, precision);
        roundedValue = steppedValue * decimals / decimals;
        return roundedValue.toFixed(precision);
    };
    inputEvents = {
        mouse: {
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup'
        },
        touch: {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend'
        }
    };
    sliderDirective = function($timeout) {
        return {
            restrict: 'EA',
            scope: {
                floor: '@',
                ceiling: '@',
                step: '@',
                precision: '@',
                ngModel: '=?',
                ngModelLow: '=?',
                ngModelHigh: '=?',
                translate: '&'
            },
            template: '<span class="bar"></span><span class="bar selection"></span><span class="pointer"></span><span class="pointer"></span><span class="bubble selection"></span><span class="bubble limit"> {{floor}}</span><span class="bubble limit">{{ ceiling}}</span><span class="bubble">{{ngModel}}</span><span class="bubble"></span><span class="bubble"></span>',
            compile: function(element, attributes) {
                var ceilBub, cmbBub, e, flrBub, fullBar, highBub, lowBub, maxPtr, minPtr, range, refHigh, refLow, selBar, selBub, watchables, _i, _len, _ref, _ref1;
                if (attributes.translate) {
                    attributes.$set('translate', "" + attributes.translate + "(value)");
                }
                range = (attributes.ngModel == null) && ((attributes.ngModelLow != null) && (attributes.ngModelHigh != null));
                _ref = (function() {
                    var _i, _len, _ref, _results;
                    _ref = element.children();
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        e = _ref[_i];
                        _results.push(angularize(e));
                    }
                    return _results;
                })(), fullBar = _ref[0], selBar = _ref[1], minPtr = _ref[2], maxPtr = _ref[3], selBub = _ref[4], flrBub = _ref[5], ceilBub = _ref[6], lowBub = _ref[7], highBub = _ref[8], cmbBub = _ref[9];
                refLow = range ? 'ngModelLow' : 'ngModel';
                refHigh = 'ngModelHigh';
              
                if (!range) {
                    _ref1 = [selBar, maxPtr, selBub, highBub, cmbBub];
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                        element = _ref1[_i];
                        element.remove();
                    }
                }
                watchables = [refLow, 'floor', 'ceiling'];
                if (range) {
                    watchables.push(refHigh);
                }
                return {
                    post: function(scope, element, attributes) {
                        var barWidth, boundToInputs, dimensions, maxOffset, maxValue, minOffset, minValue, ngDocument, offsetRange, pointerHalfWidth, updateDOM, valueRange, w, _j, _len1;
                        boundToInputs = false;
                        ngDocument = angularize(document);
                        if (!attributes.translate) {
                            scope.translate = function(value) {
                                return value.value;
                            };
                        }
                        pointerHalfWidth = barWidth = minOffset = maxOffset = minValue = maxValue = valueRange = offsetRange = void 0;
                        dimensions = function() {
                            var value, _j, _len1, _ref2, _ref3;
                            if ((_ref2 = scope.precision) == null) {
                                scope.precision = 0;
                            }
                            if ((_ref3 = scope.step) == null) {
                                scope.step = 1;
                            }
                            for (_j = 0, _len1 = watchables.length; _j < _len1; _j++) {
                                value = watchables[_j];
                                scope[value] = roundStep(parseFloat(scope[value]), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
                            }
                            scope.diff = roundStep(scope[refHigh] - scope[refLow], parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
                            pointerHalfWidth = halfWidth(minPtr);
                            barWidth = width(fullBar);
                            minOffset = 0;
                            maxOffset = barWidth - width(minPtr);
                            minValue = parseFloat(attributes.floor);
                            maxValue = parseFloat(attributes.ceiling);
                            valueRange = maxValue - minValue;
                            return offsetRange = maxOffset - minOffset;
                        };
                        updateDOM = function() {
                            var adjustBubbles, bindToInputEvents, fitToBar, percentOffset, percentToOffset, percentValue, setBindings, setPointers;
                            dimensions();
                            percentOffset = function(offset) {
                                return ((offset - minOffset) / offsetRange) * 100;
                            };
                            percentValue = function(value) {
                                return ((value - minValue) / valueRange) * 100;
                            };
                            percentToOffset = function(percent) {
                                return pixelize(percent * offsetRange / 100);
                            };
                            fitToBar = function(element) {
                                return offset(element, pixelize(Math.min(Math.max(0, offsetLeft(element)), barWidth - width(element))));
                            };
                            setPointers = function() {
                                var newHighValue, newLowValue;
                                offset(ceilBub, pixelize(barWidth - width(ceilBub)));
                                newLowValue = percentValue(scope[refLow]);
                                offset(minPtr, percentToOffset(newLowValue));
                                offset(lowBub, pixelize(offsetLeft(minPtr) - (halfWidth(lowBub)) + pointerHalfWidth));
                                if (range) {
                                    newHighValue = percentValue(scope[refHigh]);
                                    offset(maxPtr, percentToOffset(newHighValue));
                                    offset(highBub, pixelize(offsetLeft(maxPtr) - (halfWidth(highBub)) + pointerHalfWidth));
                                    offset(selBar, pixelize(offsetLeft(minPtr) + pointerHalfWidth));
                                    selBar.css({
                                        width: percentToOffset(newHighValue - newLowValue)
                                    });
                                    offset(selBub, pixelize(offsetLeft(selBar) + halfWidth(selBar) - halfWidth(selBub)));
                                    return offset(cmbBub, pixelize(offsetLeft(selBar) + halfWidth(selBar) - halfWidth(cmbBub)));
                                }
                            };
                            adjustBubbles = function() {
                                var bubToAdjust;
                                fitToBar(lowBub);
                                bubToAdjust = highBub;
                                if (range) {
                                    fitToBar(highBub);
                                    fitToBar(selBub);
                                    if (gap(lowBub, highBub) < 10) {
                                        hide(lowBub);
                                        hide(highBub);
                                        fitToBar(cmbBub);
                                        show(cmbBub);
                                        bubToAdjust = cmbBub;
                                    } else {
                                        show(lowBub);
                                        show(highBub);
                                        hide(cmbBub);
                                        bubToAdjust = highBub;
                                    }
                                }
                                if (gap(flrBub, lowBub) < 5) {
                                    hide(flrBub);
                                } else {
                                    if (range) {
                                        if (gap(flrBub, bubToAdjust) < 5) {
                                            hide(flrBub);
                                        } else {
                                            show(flrBub);
                                        }
                                    } else {
                                        show(flrBub);
                                    }
                                }
                                if (gap(lowBub, ceilBub) < 5) {
                                    return hide(ceilBub);
                                } else {
                                    if (range) {
                                        if (gap(bubToAdjust, ceilBub) < 5) {
                                            return hide(ceilBub);
                                        } else {
                                            return show(ceilBub);
                                        }
                                    } else {
                                        return show(ceilBub);
                                    }
                                }
                            };
                            var listenerInAction=false;
                            bindToInputEvents = function(pointer, ref, events) {
                                var onEnd, onMove, onStart;
                                onEnd = function() {
                                    pointer.removeClass('active');
                                	ngDocument[0].removeEventListener(events.end, onEnd, false);
                                	ngDocument[0].removeEventListener(events.move, onMove, false);
                                    listenerInAction=false;
                                     };
                                onMove = function(event) {
                          
                                    var eventX, newOffset, newPercent, newValue;
                                    phoneCoord = event.touches ? event.touches[0] : 0;
                                    eventX = event.clientX || phoneCoord.clientX;
                                    newOffset = eventX - element[0].getBoundingClientRect().left - pointerHalfWidth;
                                    newOffset = Math.max(Math.min(newOffset, maxOffset), minOffset);
                                    newPercent = percentOffset(newOffset);
                                    newValue = minValue + (valueRange * newPercent / 100.0);
                                    if (range) {
                                        if (ref === refLow) {
                                            if (newValue > scope[refHigh]) {
                                                ref = refHigh;
                                                minPtr.removeClass('active');
                                                maxPtr.addClass('active');
                                            }
                                        } else {
                                            if (newValue < scope[refLow]) {
                                                ref = refLow;
                                                maxPtr.removeClass('active');
                                                minPtr.addClass('active');
                                            }
                                        }
                                    }
                                    newValue = roundStep(newValue, parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
                                    scope[ref] = newValue;
                                    return scope.$apply();
                                };
                                onStart = function(event) {
                                    pointer.addClass('active');
                                    dimensions();
									window.clic2=false;
                                   /* event.stopPropagation();
                                    event.preventDefault();*/
                                    if (!listenerInAction){
	                                    ngDocument[0].addEventListener(events.move, onMove);
	                                    ngDocument[0].addEventListener(events.end, onEnd);
	                                    listenerInAction=true;
                               		}
                                };
                                return pointer.bind(events.start, onStart);
                            };
                            setBindings = function() {
                                var bind, inputMethod, _j, _len1, _ref2, _results;
                                boundToInputs = true;
                                bind = function(method) {
                                    bindToInputEvents(minPtr, refLow, inputEvents[method]);
                                    return bindToInputEvents(maxPtr, refHigh, inputEvents[method]);
                                };
                                _ref2 = ['touch', 'mouse'];
                                _results = [];
                                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                                    inputMethod = _ref2[_j];
                                    _results.push(bind(inputMethod));
                                }
                                return _results;
                            };
                            setPointers();
                            adjustBubbles();
                            if (!boundToInputs) {
                                return setBindings();
                            }
                        };
                        $timeout(updateDOM);

                        function updateReally(i) {
                            if (i > 0) {
                                $timeout(function() {
                                    updateDOM()
                                    updateReally(i - 1);
                                }, 500);
                            }
                        }
                        updateReally(5)
                        for (_j = 0, _len1 = watchables.length; _j < _len1; _j++) {
                            w = watchables[_j];
                            scope.$watch(w, updateDOM);
                        }
                        return window.addEventListener("resize", updateDOM);
                    }
                };
            }
        };
    };
    qualifiedDirectiveDefinition = ['$timeout', sliderDirective];
    module = function(window, angular) {
        return angular.module(MODULE_NAME, []).directive(SLIDER_TAG, qualifiedDirectiveDefinition);
    };
    module(window, window.angular);
}).call(this);