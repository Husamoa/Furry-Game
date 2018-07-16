import '../scss/stye.scss';

document.addEventListener("DOMContentLoaded", function () {
    console.log("Wszystko działa!");
    let score = document.querySelector("#score div strong");
    let xxx = document.querySelector(".endWindow h3");


    //constructors
    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    };


    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };

    function Bomb() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };


    function Game() {
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.bomb = new Bomb();
        this.score = 0;
        this.index = function (x, y) {
            return x + (y * 10);
        };

        this.showFurry = function () {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };
        this.hideVisibleFury = function () {
            let elementWithClass = document.querySelector('.furry').classList.remove("furry");
        };

        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };

        this.showBomb = function () {
            this.board[this.index(this.bomb.x, this.bomb.y)].classList.add('bomb');
        };

        this.startGame = function () {
            let self = this;
            this.idSetinterval = setInterval(function () {
                self.hideVisibleFury();
                self.moveFury();
            }, 250);
        };


        this.moveFury = function () {
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "top") {
                this.furry.y = this.furry.y + 1;
            } else if ((this.furry.direction === "bottom")) {
                this.furry.y = this.furry.y - 1;
            }


            this.gameOver();
            this.showFurry();
            this.checkCoinCollision();
        };


        //change Furry move direction
        this.turnFury = function (event) {
            // console.log(this.furry.direction);
            // this.furry.direction = "bottom"
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'bottom';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'top';
            }
        };
        let newScore = 0;
        this.checkCoinCollision = function () {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
                newScore += 1;
                score.innerText = newScore;
                xxx.innerText = newScore;
                this.coin = new Coin();
                this.showCoin();
                this.levels();
            }
        };


        //What happend on end of game

        this.gameOver = function () {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9 ||
                this.furry.x === this.bomb.x && this.furry.y === this.bomb.y) {
                clearInterval(this.idSetinterval)
                let over = document.querySelector("body");
                over.classList.add("endGame");
                document.querySelector('.bomb').classList.remove("bomb");
                document.querySelector('.coin').classList.remove("coin");
                let scoreDiv = document.querySelector("#score div");
                scoreDiv.innerText = "";
                scoreDiv.style.backgroundColor = "lightgray";
                scoreDiv.style.boxShadow = "none";
                scoreDiv.style.border = "none";
                document.querySelector(".endWindow").classList.remove("invisible");
                let buttonNewGame = document.querySelector(".endWindow button");
                buttonNewGame.addEventListener("click", function () {
                    window.location.reload()
                })
            }
        };

        // //Game levels
        this.levels = function () {
            if(score.innerText>4&&score.innerText<6){
                // this.bombOne = new Bomb();
                // this.board[this.index(this.bombOne.x, this.bombOne.y)].classList.add('bomb');
                console.log("dupa1");
                this.startGame.idSetinterval

            }else if(score.innerText>9&&score.innerText<11){
                // this.bombTwo = new Bomb();
                // this.board[this.index(this.bombTwo.x, this.bombTwo.y)].classList.add('bomb');
                console.log("dupa2");
                this.startGame= function () {
                    let self = this;
                    this.idSetinterval = setInterval(function() {
                        self.hideVisibleFury();
                        self.moveFury();
                    }, 2000);
                };
            }else if(score.innerText>19&&score.innerText<21){
                // this.bombThird = new Bomb();
                // this.board[this.index(this.bombThird.x, this.bombThird.y)].classList.add('bomb');
                console.log("dupa3");
                this.startGame= function () {
                    let self = this;
                    this.idSetinterval = setInterval(function() {
                        self.hideVisibleFury();
                        self.moveFury();
                    }, 3000);
                };
            }
        }
    }


    let newGame = new Game();
    newGame.showFurry();
    newGame.showCoin();
    newGame.showBomb();
    // newGame.startGame();


    //Rozpoczynanie gry na "enter"

    // document.addEventListener('keypress', function (event) {
    //     var b = event.which;
    //     var start = document.getElementById("start");
    //     if (b === 13) {
    //         newGame.startGame();
    //         start.classList.add('invisible');
    //     }
    // });

    //Rozpoczynanie gry na kliknięcie myszką

    const startNewGame = document.querySelector(".btn-start");
    console.log(startNewGame);

    startNewGame.addEventListener('click', function (event) {
        let start = document.getElementById("start");
        let startWindow = document.querySelector(".startWindow");
        startWindow.classList.add("invisible");
        newGame.startGame();
        start.classList.add('invisible');

    });

    // Poruszanie furym strzałkami

    document.addEventListener('keydown', function (event) {
        newGame.turnFury(event);
    });

});