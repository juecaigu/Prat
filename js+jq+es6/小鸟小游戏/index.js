const skyObj = document.getElementsByClassName("sky")[0];
const landObj = document.getElementsByClassName("land")[0];
const birdObj = document.getElementsByClassName("bird")[0];
const gameObj = document.getElementsByClassName("game")[0];
const gameHeight = gameObj.clientHeight;
const gameWidth = gameObj.clientWidth;

//先创建父类，有共同的特征
//有宽高，位置，速度还有子元素等需要传入的属性
class Father {
    constructor(width, height, left, top, speedX, speedY, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        //定义完成属性之后要渲染一下;
        this.render();
    }
    //渲染的方法
    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    //有移动的方法
    move(duration) {
        this.left = this.left + this.speedX * duration;
        this.top = this.top + this.speedY * duration;
        //监听子组件的onMove方法
        if (this.onMove) {
            this.onMove()
        }
        //改变位置后再渲染一次
        this.render();
    }

}

//获取sky对象的一些css属性
const skyStyle = getComputedStyle(skyObj);
//获取的是带有px单位的;
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);
//创建天空类，继承自父类
class Sky extends Father {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyObj)
    }
    //这里判断是否到最左边，因为继承了父类的move方法，在父类中定义onMove方法，一旦执行move方法就会进onMove
    onMove() {
        if (Math.abs(this.left) >= skyWidth / 2) {
            this.left = 0;

        }
    }
}

//获取land对象的一些css属性
const landStyle = getComputedStyle(landObj);
//获取的是带有px单位的;
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = gameHeight - landHeight;
//创建天空类，继承自父类
class land extends Father {
    constructor() {
        super(landWidth, landHeight, 0, landTop, -100, 0, landObj)
    }
    //这里判断是否到最左边，因为继承了父类的move方法，在父类中定义onMove方法，一旦执行move方法就会进onMove
    onMove() {
        if (Math.abs(this.left) >= landWidth / 2) {
            this.left = 0;
        }
    }
}

//bird类
const birdStyle = getComputedStyle(birdObj);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
//继承父类
class Bird extends Father {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdObj)
        //bird特有的属性
        //加速度
        this.g = 2000;
        //最大值
        this.maxTop = gameHeight - landHeight - this.height;
        //翅膀挥动状态
        this.swingStatus = 1;
        //用于记录定时器
        this.timer = null;
        this.render();
    }
    //重写move方法
    move(duration) {
        super.move(duration);
        this.speedY += this.g * duration;
    }
    //判断位置
    onMove() {
        this.top = this.top <= 0 ? 0 : this.top;
        this.top = this.top >= this.maxTop ? this.maxTop : this.top;
    }
    //重写render方法
    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`
    }
    //煽动翅膀;
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = parseInt(this.swingStatus % 3);
            this.swingStatus++;
            this.render();
        }, 200);
    }
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
    jump() {
        this.speedY = -450;
    }
}

//管道类
class Pipe extends Father {
    constructor(height, top, dom) {
        super(52, height, gameWidth, top, -100, 0, dom);
    }
    //添加判断条件
    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}
//上下两根管道
class PipePaper {
    constructor() {
        //中间的空隙固定
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = skyHeight - this.minHeight - this.spaceHeight;
        //随机生成一根柱子的高度
        const upHeight = Math.random() * (this.maxHeight - this.minHeight) + this.minHeight
        const downHeight = skyHeight - upHeight - this.spaceHeight;
        const downTop = upHeight + this.spaceHeight;
        const upDom = document.createElement("div");
        upDom.className = "pipe up";
        const downDom = document.createElement("div");
        downDom.className = "pipe down";
        //创建上下两个柱子组的对象
        this.upPipe = new Pipe(upHeight, 0, upDom);
        this.downPipe = new Pipe(downHeight, downTop, downDom);
        //添加到game对象中；
        gameObj.appendChild(upDom);
        gameObj.appendChild(downDom);
    }
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
    //如果移除出画面了，就没有用，可以删除掉
    useLess() {
        return this.upPipe.left < -this.upPipe.width
    }
}

class PipePaperProduce {
    constructor() {
        //用来存储管道对
        this.pair = [];
        this.timer = null;
    }
    start() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            //不断添加管道组
            this.pair.push(new PipePaper())
            //如果管道组移出去了就从数组中删除
            for (let i = 0; i < this.pair.length; i++) {
                if (this.pair[i].useLess()) {
                    this.pair.splice(i, 1);
                    //因为删除了一个，下一次循环需要从当前位置继续进行
                    i--;
                }
            }
        }, 2000)
    }
    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

//游戏对象，控制游戏进行
class Game {
    constructor() {
        this.bird = new Bird();
        this.sky = new Sky();
        this.land = new land();
        this.pipe = new PipePaperProduce();
        this.timer = null;
        this.gameOver = false;
        //记录时间间隔
        this.dur = 16;
    }
    startGame() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        //开启所有的运动开关
        this.bird.startSwing();
        this.pipe.start();
        this.timer = setInterval(() => {
            const duration = this.dur / 1000
            this.bird.move(duration);
            this.sky.move(duration);
            this.land.move(duration);
            this.pipe.pair.forEach((ele) => {
                ele.move(duration);
            })
            if (this.isGameOver()) {
                this.stopGame();
                this.gameOver = true;
            }
        }, this.dur)
    }
    stopGame() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipe.stop();
    }
    isGameOver() {
        if (this.bird.top === this.bird.maxTop) {
            return true;
        }
        for (let i = 0; i < this.pipe.pair.length; i++) {
            const ele = this.pipe.pair[i];
            //如果上下有管子碰到了，就结束游戏
            if (this.hit(this.bird, ele.upPipe) || this.hit(this.bird, ele.downPipe)) {
                return true;
            }
        }
        return false;
    }
    //两者碰撞
    hit(cel1, cel2) {
        const centerX1 = cel1.left + cel1.width / 2;
        const centerY1 = cel1.top + cel1.height / 2;
        const centerX2 = cel2.left + cel2.width / 2;
        const centerY2 = cel2.top + cel2.height / 2;
        const disX = Math.abs(centerX1 - centerX2);
        const disY = Math.abs(centerY1 - centerY2);
        if (disX < (cel1.width + cel2.width) / 2 && disY < (cel1.height + cel2.height) / 2) {
            return true;
        }
        return false;
    }
    //键盘事件
    key() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                this.timer ? this.stopGame() : this.startGame();
            }
            if (e.key === " ") {
                this.bird.jump();
            }
        }
    }
}

var game = new Game();
game.key();


