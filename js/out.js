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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    console.log(\"Wszystko działa!\");\n    var score = document.querySelector(\"#score div strong\");\n    var xxx = document.querySelector(\".endWindow h3\");\n\n    //constructors\n    function Furry() {\n        this.x = 0;\n        this.y = 0;\n        this.direction = \"right\";\n    };\n\n    function Coin() {\n        this.x = Math.floor(Math.random() * 10);\n        this.y = Math.floor(Math.random() * 10);\n    };\n\n    function Bomb() {\n        this.x = Math.floor(Math.random() * 10);\n        this.y = Math.floor(Math.random() * 10);\n    };\n\n    function Game() {\n        this.board = document.querySelectorAll(\"#board div\");\n        this.furry = new Furry();\n        this.coin = new Coin();\n        this.bomb = new Bomb();\n        this.score = 0;\n        this.index = function (x, y) {\n            return x + y * 10;\n        };\n\n        this.showFurry = function () {\n            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');\n        };\n        this.hideVisibleFury = function () {\n            var elementWithClass = document.querySelector('.furry').classList.remove(\"furry\");\n        };\n\n        this.showCoin = function () {\n            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');\n        };\n\n        this.showBomb = function () {\n            this.board[this.index(this.bomb.x, this.bomb.y)].classList.add('bomb');\n        };\n\n        this.startGame = function () {\n            var self = this;\n            this.idSetinterval = setInterval(function () {\n                self.hideVisibleFury();\n                self.moveFury();\n            }, 250);\n        };\n\n        this.moveFury = function () {\n            if (this.furry.direction === \"right\") {\n                this.furry.x = this.furry.x + 1;\n            } else if (this.furry.direction === \"left\") {\n                this.furry.x = this.furry.x - 1;\n            } else if (this.furry.direction === \"top\") {\n                this.furry.y = this.furry.y + 1;\n            } else if (this.furry.direction === \"bottom\") {\n                this.furry.y = this.furry.y - 1;\n            }\n            this.gameOver();\n            this.showFurry();\n            this.checkCoinCollision();\n        };\n\n        //change Furry move direction\n        this.turnFury = function (event) {\n            // console.log(this.furry.direction);\n            // this.furry.direction = \"bottom\"\n            switch (event.which) {\n                case 37:\n                    this.furry.direction = 'left';\n                    break;\n                case 38:\n                    this.furry.direction = 'bottom';\n                    break;\n                case 39:\n                    this.furry.direction = 'right';\n                    break;\n                case 40:\n                    this.furry.direction = 'top';\n            }\n        };\n        var newScore = 0;\n        this.checkCoinCollision = function () {\n            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {\n                this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');\n                newScore += 1;\n                score.innerText = newScore;\n                xxx.innerText = newScore;\n                this.coin = new Coin();\n                this.showCoin();\n                // this.levels();\n            }\n        };\n\n        //What happend on end of game\n\n        this.gameOver = function () {\n            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9 || this.furry.x === this.bomb.x && this.furry.y === this.bomb.y) {\n                clearInterval(this.idSetinterval);\n                var over = document.querySelector(\"body\");\n                over.classList.add(\"endGame\");\n                document.querySelector('.bomb').classList.remove(\"bomb\");\n                document.querySelector('.coin').classList.remove(\"coin\");\n                var scoreDiv = document.querySelector(\"#score div\");\n                scoreDiv.innerText = \"\";\n                scoreDiv.style.backgroundColor = \"lightgray\";\n                scoreDiv.style.boxShadow = \"none\";\n                scoreDiv.style.border = \"none\";\n                document.querySelector(\".endWindow\").classList.remove(\"invisible\");\n                var buttonNewGame = document.querySelector(\".endWindow button\");\n                buttonNewGame.addEventListener(\"click\", function () {\n                    window.location.reload();\n                });\n            }\n        };\n\n        // //Game levels\n        // this.levels = function () {\n        //     if(score.innerText>4&&score.innerText<6){\n        //         this.bombOne = new Bomb();\n        //         this.board[this.index(this.bombOne.x, this.bombOne.y)].classList.add('bomb');\n        //\n        //     }else if(score.innerText>9&&score.innerText<11){\n        //         this.bombTwo = new Bomb();\n        //         this.board[this.index(this.bombTwo.x, this.bombTwo.y)].classList.add('bomb');\n        //     }else if(score.innerText>19&&score.innerText<20){\n        //         this.bombThird = new Bomb();\n        //         this.board[this.index(this.bombThird.x, this.bombThird.y)].classList.add('bomb');\n        //     }\n        // }\n    }\n\n    var newGame = new Game();\n    newGame.showFurry();\n    newGame.showCoin();\n    newGame.showBomb();\n    // newGame.startGame();\n\n    document.addEventListener('keydown', function (event) {\n        newGame.turnFury(event);\n    });\n\n    document.addEventListener('keydown', function (event) {\n        var b = event.which;\n        var start = document.getElementById(\"start\");\n        if (b === 13) {\n            newGame.startGame();\n        }\n    });\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });