/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initCatGame = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initCatGame = exports.initCatGame = function () {
    function initCatGame() {
        _classCallCheck(this, initCatGame);

        this.domCache = {
            inputContainer: document.getElementById("catGrid"),
            outputContainer: document.getElementById("catGridResult"),
            gridTemplate: document.getElementById("gridTemplate"),
            resetGame: document.getElementById("resetGame"),
            imageGrid: document.querySelectorAll("#catGridResult .grid__img")
        };
        this.bindEvents();
        this.setInitialState();
    }

    _createClass(initCatGame, [{
        key: "setInitialState",
        value: function setInitialState() {
            this.domCache.outputContainer.innerHTML = this.domCache.gridTemplate.innerHTML;
            this.state = {
                outputGrid: [[], [], [], []],
                counter: -1
            };
        }
    }, {
        key: "bindEvents",
        value: function bindEvents() {
            var _this = this;

            var self = this;
            (0, _helpers.$delegate)(this.domCache.inputContainer, ".grid__item", "click", function (e) {
                if (self.state.counter < 11) {
                    self.state.counter++;
                    self.updateOutputGrid(e.target.dataset, this.querySelector("img").src);
                }
            });

            (0, _helpers.$on)(this.domCache.resetGame, "click", function () {
                _this.setInitialState();
            });
        }
    }, {
        key: "updateOutputGrid",
        value: function updateOutputGrid() {
            var cat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var imgPath = arguments[1];
            var id = cat.id;

            var row = parseInt(this.state.counter / 3);
            var col = this.state.counter % 3;
            this.state.outputGrid[row][col] = id;
            this.updateOutputView(imgPath);
        }
    }, {
        key: "updateOutputView",
        value: function updateOutputView(imgPath) {
            var _this2 = this;

            var template = '<img src="{{imgUrl}}" alt="cat" title="cat"/>';
            template = template.replace("{{imgUrl}}", imgPath);
            document.querySelectorAll("#catGridResult .grid__img")[this.state.counter].innerHTML = template;
            if (this.state.counter == 11) {
                setTimeout(function () {
                    _this2.chechDuplicate() ? alert("“YOU LOSE") : alert("“YOU WIN”");
                }, 10);
            }
        }
    }, {
        key: "chechDuplicate",
        value: function chechDuplicate() {
            var isDuplicate = false;
            this.state.outputGrid.some(function (row) {
                if (isDuplicate == true) {
                    return true;
                }
                var tempMap = {};
                row.some(function (val) {
                    if (!tempMap[val]) {
                        tempMap[val] = 1;
                    } else {
                        isDuplicate = true;
                    }
                });
            });
            return isDuplicate;
        }
    }]);

    return initCatGame;
}();

new initCatGame();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$on = $on;
exports.$delegate = $delegate;
function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

function $delegate(target, selector, type, handler, capture) {
	var dispatchEvent = function dispatchEvent(event) {
		var targetElement = event.target;
		var potentialElements = target.querySelectorAll(selector);
		var i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	$on(target, type, dispatchEvent, !!capture);
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTdjZTg5NDA0MGIzMDU3MjM1ODIiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImluaXRDYXRHYW1lIiwiZG9tQ2FjaGUiLCJpbnB1dENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvdXRwdXRDb250YWluZXIiLCJncmlkVGVtcGxhdGUiLCJyZXNldEdhbWUiLCJpbWFnZUdyaWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYmluZEV2ZW50cyIsInNldEluaXRpYWxTdGF0ZSIsImlubmVySFRNTCIsInN0YXRlIiwib3V0cHV0R3JpZCIsImNvdW50ZXIiLCJzZWxmIiwiZSIsInVwZGF0ZU91dHB1dEdyaWQiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicXVlcnlTZWxlY3RvciIsInNyYyIsImNhdCIsImltZ1BhdGgiLCJpZCIsInJvdyIsInBhcnNlSW50IiwiY29sIiwidXBkYXRlT3V0cHV0VmlldyIsInRlbXBsYXRlIiwicmVwbGFjZSIsInNldFRpbWVvdXQiLCJjaGVjaER1cGxpY2F0ZSIsImFsZXJ0IiwiaXNEdXBsaWNhdGUiLCJzb21lIiwidGVtcE1hcCIsInZhbCIsIiRvbiIsIiRkZWxlZ2F0ZSIsInR5cGUiLCJjYWxsYmFjayIsImNhcHR1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwic2VsZWN0b3IiLCJoYW5kbGVyIiwiZGlzcGF0Y2hFdmVudCIsInRhcmdldEVsZW1lbnQiLCJldmVudCIsInBvdGVudGlhbEVsZW1lbnRzIiwiaSIsImxlbmd0aCIsImNhbGwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFD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QUFDQTtBQUNBO0FBQ0Q7QUFDRCxFQVhEOztBQWFBVixLQUFJcEIsTUFBSixFQUFZc0IsSUFBWixFQUFrQk0sYUFBbEIsRUFBaUMsQ0FBQyxDQUFDSixPQUFuQztBQUNBLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTdjZTg5NDA0MGIzMDU3MjM1ODIiLCJpbXBvcnQge1xuICAgICRvbixcbiAgICAkZGVsZWdhdGVcbn0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5leHBvcnQgY2xhc3MgaW5pdENhdEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRvbUNhY2hlID0ge1xuICAgICAgICAgICAgaW5wdXRDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2F0R3JpZFwiKSxcbiAgICAgICAgICAgIG91dHB1dENvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXRHcmlkUmVzdWx0XCIpLFxuICAgICAgICAgICAgZ3JpZFRlbXBsYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRUZW1wbGF0ZVwiKSxcbiAgICAgICAgICAgIHJlc2V0R2FtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldEdhbWVcIiksXG4gICAgICAgICAgICBpbWFnZUdyaWQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjY2F0R3JpZFJlc3VsdCAuZ3JpZF9faW1nXCIpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgIH1cblxuICAgIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kb21DYWNoZS5vdXRwdXRDb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5kb21DYWNoZS5ncmlkVGVtcGxhdGUuaW5uZXJIVE1MO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgb3V0cHV0R3JpZDogW1xuICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY291bnRlcjogLTFcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICRkZWxlZ2F0ZSh0aGlzLmRvbUNhY2hlLmlucHV0Q29udGFpbmVyLCBcIi5ncmlkX19pdGVtXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24oXG4gICAgICAgICAgICBlXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUuY291bnRlciA8IDExKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0ZS5jb3VudGVyKys7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVPdXRwdXRHcmlkKGUudGFyZ2V0LmRhdGFzZXQsIHRoaXMucXVlcnlTZWxlY3RvcihcImltZ1wiKS5zcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkb24odGhpcy5kb21DYWNoZS5yZXNldEdhbWUsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlT3V0cHV0R3JpZChjYXQgPSB7fSwgaW1nUGF0aCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9ID0gY2F0O1xuICAgICAgICBsZXQgcm93ID0gcGFyc2VJbnQodGhpcy5zdGF0ZS5jb3VudGVyIC8gMyk7XG4gICAgICAgIGxldCBjb2wgPSB0aGlzLnN0YXRlLmNvdW50ZXIgJSAzO1xuICAgICAgICB0aGlzLnN0YXRlLm91dHB1dEdyaWRbcm93XVtjb2xdID0gaWQ7XG4gICAgICAgIHRoaXMudXBkYXRlT3V0cHV0VmlldyhpbWdQYXRoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVPdXRwdXRWaWV3KGltZ1BhdGgpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gJzxpbWcgc3JjPVwie3tpbWdVcmx9fVwiIGFsdD1cImNhdFwiIHRpdGxlPVwiY2F0XCIvPic7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShcInt7aW1nVXJsfX1cIiwgaW1nUGF0aCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjY2F0R3JpZFJlc3VsdCAuZ3JpZF9faW1nXCIpW1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb3VudGVyXG4gICAgICAgIF0uaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvdW50ZXIgPT0gMTEpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2hEdXBsaWNhdGUoKSA/IGFsZXJ0KFwi4oCcWU9VIExPU0VcIikgOiBhbGVydChcIuKAnFlPVSBXSU7igJ1cIik7XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVjaER1cGxpY2F0ZSgpIHtcbiAgICAgICAgbGV0IGlzRHVwbGljYXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGUub3V0cHV0R3JpZC5zb21lKHJvdyA9PiB7XG4gICAgICAgICAgICBpZiAoaXNEdXBsaWNhdGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRlbXBNYXAgPSB7fTtcbiAgICAgICAgICAgIHJvdy5zb21lKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0ZW1wTWFwW3ZhbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE1hcFt2YWxdID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpc0R1cGxpY2F0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXNEdXBsaWNhdGU7XG4gICAgfVxufVxuXG5uZXcgaW5pdENhdEdhbWUoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvanMvaW5kZXguanMiLCJcbmV4cG9ydCBmdW5jdGlvbiAkb24odGFyZ2V0LCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRkZWxlZ2F0ZSh0YXJnZXQsIHNlbGVjdG9yLCB0eXBlLCBoYW5kbGVyLCBjYXB0dXJlKSB7XG5cdGNvbnN0IGRpc3BhdGNoRXZlbnQgPSBldmVudCA9PiB7XG5cdFx0Y29uc3QgdGFyZ2V0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblx0XHRjb25zdCBwb3RlbnRpYWxFbGVtZW50cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRsZXQgaSA9IHBvdGVudGlhbEVsZW1lbnRzLmxlbmd0aDtcblxuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGlmIChwb3RlbnRpYWxFbGVtZW50c1tpXSA9PT0gdGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0XHRoYW5kbGVyLmNhbGwodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0JG9uKHRhcmdldCwgdHlwZSwgZGlzcGF0Y2hFdmVudCwgISFjYXB0dXJlKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvanMvaGVscGVycy5qcyJdLCJzb3VyY2VSb290IjoiIn0=