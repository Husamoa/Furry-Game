console.log('hello');

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}


function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    self = this;
    this.scoreElement = document.querySelector('#score div strong');
    console.log(this.scoreElement);
    this.board = document.querySelectorAll("section#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        var furryPossition = document.querySelector('.furry');
        if (furryPossition !== null) {
            furryPossition.classList.remove('furry');
        }
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };


    this.moveFurry = function () {
        var self = this;
        if (self.furry.direction === 'right') {
            self.furry.x = self.furry.x + 1;
        } else if (this.furry.direction === "left") {
            self.furry.x = self.furry.x - 1;
        } else if (this.furry.direction === "down") {
            self.furry.y = self.furry.y + 1;
        } else if (this.furry.direction === "up") {
            self.furry.y = self.furry.y - 1;
        }

        if (this.gameOver() === false) {
            this.showFurry();
            this.checkCoinCollision();
        } else {
            document.querySelector("#board").classList.add("invisible");
            document.querySelector("#over").classList.remove("invisible");
            document.querySelector("#game-over").classList.remove("invisible");
            document.querySelector("section#score").style.fontSize = "45px";
            document.querySelector("#game-over").innerText = "GAME OVER";


            clearInterval(this.intervalID);
            this.hideVisibleFurry();
        }
    };

    this.turnFurry = function (event) {
        var b = event.which;
        switch (b) {
            case 37:
                self.furry.direction = "left";
                break;
            case 38:
                self.furry.direction = "up";
                break;
            case 39:
                self.furry.direction = "right";
                break;
            case 40:
                self.furry.direction = "down"
        }
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {

            var coinPossition = this.index(this.coin.x, this.coin.y);
            this.board[coinPossition].classList.remove('coin');
            this.score++;
            this.scoreElement.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            return true;
        } else {
            return false;
        }
    };

    this.startGame = function (e) {
        this.intervalID = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
}

var game = new Game();
game.showFurry();
game.showCoin();

document.addEventListener('keydown', function (event) {
    var b = event.which;
    var start = document.getElementById("start");
    if (b === 13) {
        game.startGame();
        start.classList.add('invisible');
    }
});


document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});






