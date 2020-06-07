let map = document.getElementsByClassName("map")[0];
let mapWidth = map.offsetWidth;
let mapHeight = map.offsetHeight;
let timer = null;
let cover = true;

//创建food对象
function Food() {
    this.w = 20;
    this.h = 20;
    this.position = "absolute";
    this.pos = [0, 0];
    this.bgc = "green"
    this.food = null;
}
//添加显示方法
Food.prototype.show = function () {
    //没有oDIv的时候就创建
    if (!oDiv) {
        var oDiv = document.createElement("div")
        oDiv.style.width = this.w + "px";
        oDiv.style.height = this.h + "px";
        oDiv.style.position = this.position;
        oDiv.style.backgroundColor = this.bgc;
        // 产生随机数
        this.pos[0] = getRandomFood()[0];
        this.pos[1] = getRandomFood()[1];
        oDiv.style.left = this.pos[0] * this.w + "px";
        oDiv.style.top = this.pos[1] * this.h + "px";
        map.appendChild(oDiv);
        this.food = oDiv;
    }
}
let foodObj = new Food();

//创建蛇对象
function Snake() {
    this.w = 20;
    this.h = 20;
    this.pos = [];
    this.body = [
        { x: 3, y: 0, color: "red" },
        { x: 2, y: 0, color: "orange" },
        { x: 1, y: 0, color: "orange" }
    ];
    //用来存储身体div的
    this.snake = [];
    this.position = "absolute";
    //默认是往右边走
    this.direction = "right";
    this.score = 1;
    this.canMove = true;
    this.hunt = false;
}
//添加蛇显示方法
Snake.prototype.snakeShow = function () {
    //显示蛇的身体
    for (var i = this.body.length - 1; i >= 0; i--) {
        let snakeDiv = document.createElement("div");
        snakeDiv.style.width = this.w + "px";
        snakeDiv.style.height = this.h + "px";
        snakeDiv.style.position = this.position;
        snakeDiv.style.backgroundColor = this.body[i].color;
        snakeDiv.style.left = this.body[i].x * this.w + "px";
        snakeDiv.style.top = this.body[i].y * this.h + "px";
        map.appendChild(snakeDiv);
        this.snake.push(snakeDiv);
    }
}

//添加蛇的移动方法
Snake.prototype.move = function () {
    let snakeHeadLeft = this.body[0].x;
    let snakeHeadTop = this.body[0].y;
    let foodLeft = foodObj.pos[0];
    let foodTop = foodObj.pos[1];
    //先清除原来的身体
    this.snake.forEach(ele => {
        map.removeChild(ele);
    })
    //清空数组；
    this.snake.length = 0;

    //撞到自己
    for (var i = this.body.length - 1; i > 0; i--) {
        if (snakeHeadLeft === this.body[i].x && snakeHeadTop === this.body[i].y) {
            this.hunt = true;
        }
    }

    //游戏条件判断 吃到食物
    if (foodLeft === snakeHeadLeft && foodTop === snakeHeadTop) {
        this.body.push({
            x: this.body[this.body.length - 1].x,
            y: this.body[this.body.length - 1].y,
            color: "orange"
        })
        map.removeChild(foodObj.food);
        foodObj.show();
        this.score += 1;
    }

    //撞到墙壁
    if (
        (snakeHeadLeft === 0 && this.direction === "left") ||
        (snakeHeadLeft === (mapWidth - 40) / this.w && this.direction === "right") ||
        (snakeHeadTop === 0 && this.direction === "top") ||
        (snakeHeadTop === (mapHeight - 40) / this.h) && this.direction === "down" ||
        this.hunt
    ) {
        clearInterval(timer);
        this.canMove = false;
        alert("得分：" + this.score);
    }

    //身体移动
    for (var i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
    }
    //蛇头移动---蛇身体跟着一起就可以
    switch (this.direction) {
        case "right": this.body[0].x += 1; break;
        case "left": this.body[0].x -= 1; break;
        case "top": this.body[0].y -= 1; break;
        case "down": this.body[0].y += 1; break;
    }
}
let snakeObj = new Snake();

//创建游戏对象
function Game(food, snake) {
    this.food = food;
    this.snake = snake;
    //积分控制速度
    this.speed = 500 / Math.pow(snakeObj.score, 2);
}
Game.prototype.init = function () {
    const that = this;
    that.food.show();
    that.snake.snakeShow();
    function snakeAnimate() {
        that.snake.move();
        that.snake.snakeShow();
    }
    timer = setInterval(snakeAnimate, 200)
}

//控制方向
document.addEventListener("keydown", function (e) {
    if (snakeObj.canMove) {
        if (e.keyCode === 37 && snakeObj.direction !== "right") {
            snakeObj.direction = "left";
        } else if (e.keyCode === 38 && snakeObj.direction !== "down") {
            snakeObj.direction = "top";
        } else if (e.keyCode === 39 && snakeObj.direction !== "left") {
            snakeObj.direction = "right";
        } else if (e.keyCode === 40 && snakeObj.direction !== "top") {
            snakeObj.direction = "down";
        }
    }
})

let gameObj = new Game(foodObj, snakeObj)
gameObj.init();

//产生随机食物
function getRandomFood() {
    let randX = Math.floor(Math.random() * (mapWidth - 40) / 20)
    let randY = Math.floor(Math.random() * (mapHeight - 40) / 20)
    cover = true;
    while (cover) {
        snakeObj.body.forEach(ele => {
            if (!(ele.x === randX && ele.y === randY)) {
                cover = false;
            }
            randX = Math.floor(Math.random() * (mapWidth - 40) / 20)
            randY = Math.floor(Math.random() * (mapHeight - 40) / 20)
        })
    }
    return [randX, randY];
}

