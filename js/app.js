import '../scss/stye.scss';

document.addEventListener("DOMContentLoaded", function () {
    console.log("Wszystko działa!");
    let score = document.querySelector("#score div strong");
    let xxx = document.querySelector(".endWindow h3");
    let levelDiv = document.querySelector("#level div strong");


    //constructors
    function Furry() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }


    function Coin() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    function Bomb() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }


    function Game() {
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.bomb = new Bomb();
        this.index = function (x, y) {
            return x + (y * 10);
        };


        let furryChracter = document.querySelector(".furry");
        let pipBoyChracter = document.querySelector(".pip-boy");
        let gokuChracter = document.querySelector(".goku");


        //Zaznaczanie swojego Avatara!!!

        let charactersMenu = document.querySelector(".charactersMenu").children;
        for (let i = 0; i < charactersMenu.length; i++) {
            charactersMenu[i].addEventListener("click", function () {
                for (let j = 0; j < charactersMenu.length; j++) {
                    if (charactersMenu[j].className.indexOf("choose") > -1) {
                        charactersMenu[j].classList.remove("choose");
                    }
                }
                this.classList.add("choose");

                //Prototyp znikania opisu starego awatara! działa ale do ulepszenia!!

                if (charactersMenu[i].classList.contains("furry")) {
                    document.querySelector(".furry-info").classList.remove("invisible");
                    document.querySelector(".pip-boy-info").classList.add("invisible");
                    document.querySelector(".goku-info").classList.add("invisible");
                }else if (charactersMenu[i].classList.contains("pip-boy")) {
                    document.querySelector(".pip-boy-info").classList.remove("invisible");
                    document.querySelector(".furry-info").classList.add("invisible");
                    document.querySelector(".goku-info").classList.add("invisible");
                }else if (charactersMenu[i].classList.contains("goku")) {
                    document.querySelector(".goku-info").classList.remove("invisible");
                    document.querySelector(".furry-info").classList.add("invisible");
                    document.querySelector(".pip-boy-info").classList.add("invisible");
                }
            })
        }


        this.showFurry = function () {
            if (furryChracter.className.indexOf("choose") > -1) {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
            } else if (pipBoyChracter.className.indexOf("choose") > -1) {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('pip-boy');
            } else if (gokuChracter.className.indexOf("choose") > -1) {
                this.board[this.index(this.furry.x, this.furry.y)].classList.add('goku');
            }
        };

        //Nalzeży uważać i nie dodawać już nigdzie w index.html klasy  furry!!! bo sie skopie!! Dodawać np furryBackground i bedzie git!
        //To jest zrobione dobrze i diała, nie ruszać!
        this.hideVisibleFury = function () {
            if (furryChracter.className.indexOf("choose") > -1) {
                document.querySelector(".furry").classList.remove("furry");
                // console.log("furyy");
            } else if (pipBoyChracter.className.indexOf("choose") > -1) {
                document.querySelector(".pip-boy").classList.remove("pip-boy");
                // console.log("pip");
            } else if (gokuChracter.className.indexOf("choose") > -1) {
                document.querySelector(".goku").classList.remove("goku");
                // console.log("goku");
            }
        };

        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };

        this.showBomb = function () {
            this.board[this.index(this.bomb.x, this.bomb.y)].classList.add('bomb');
        };


        this.startGame = function () {
            let self = this;
            let timing = 250;
            if (levelDiv.innerText === 2){
                timing = 200;
            }else if (levelDiv.innerText === 3){
                timing = 150;
            }
            this.idSetinterval = setInterval(function () {
                self.hideVisibleFury();
                self.moveFury();
            }, timing);
        };

        //Move Furry! Poruszanie w lewo i w prawo itp.
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
                this.levels();
                this.coin = new Coin();
                this.showCoin();

            }
        };


        //What happened on the end of game

        this.gameOver = function () {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9 ||
                this.furry.x === this.bomb.x && this.furry.y === this.bomb.y) {
                clearInterval(this.idSetinterval);
                let over = document.querySelector("body");
                over.classList.add("endGame");
                document.querySelector('.bomb').classList.remove("bomb");
                document.querySelector('.coin').classList.remove("coin");
                let scoreDiv = document.querySelector("#score div");
                scoreDiv.innerText = "";
                scoreDiv.style.backgroundColor = "lightgray";
                scoreDiv.style.boxShadow = "none";
                scoreDiv.style.border = "none";
                document.getElementById('level').removeChild(document.getElementById('level').children[0]);
                document.getElementById('avatar-info').removeChild(document.getElementById('avatar-info').children[0]);
                document.querySelector(".endWindow").classList.remove("invisible");
                let buttonNewGame = document.querySelector(".endWindow button");
                buttonNewGame.addEventListener("click", function () {
                    window.location.reload()
                })
            }
        };

        // //Game levels
        this.levels = function () {
            if (score.innerText > 1 && score.innerText < 3) {
                levelDiv.innerText = 2;
            } else if (score.innerText > 9 && score.innerText < 11) {
                console.log("dupa2");
                levelDiv.innerText = 3;
            } else if (score.innerText > 19 && score.innerText < 21) {
                console.log("dupa3");
                levelDiv.innerText = 4;
            }
        };
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

    let charactersMenu = document.querySelector(".charactersMenu").children;
    startNewGame.addEventListener('click', function () {

        //BEZ WYBRANEJ KLASY WYSWIETLI SIE ALERT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            if(charactersMenu[0].className.indexOf("choose")===-1 && charactersMenu[1].className.indexOf("choose")===-1 && charactersMenu[2].className.indexOf("choose")===-1){
                alert("Wybierz Postać!!")
            }else{
                let startWindow = document.querySelector(".startWindow");
                startWindow.classList.add("invisible");
                newGame.startGame();
            }

    });

    // Poruszanie furrym strzałkami

    document.addEventListener('keydown', function (event) {
        newGame.turnFury(event);
    });

});