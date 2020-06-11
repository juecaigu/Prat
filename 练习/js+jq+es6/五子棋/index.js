var i, j, curi, curj;
var over = false;
var count = 0;//用来计数，并判断是展现白棋还是黑棋；
var canvas = document.getElementById("board");
var reload = document.getElementById("reload");
var prev = document.getElementById("prev"); 
var can = canvas.getContext("2d");
var oTex = document.getElementsByClassName("winner")[0];
var chessList = [];
window.onload = function () {
    drawChessBoard();
}
//重新开始
reload.onclick=function(){
    window.location.reload();
}
//赢的条件判断；用数组列举出所有赢的形式
var win = [];
var winCount = 0;
var whiteWin = [];
var blackWin = [];
//定义赢的数组
for (i = 0; i < 15; i++) {
    win[i] = [];
    for (j = 0; j < 15; j++) {
        win[i][j] = [];
    }
}
//横向赢
for (i = 0; i < 15; i++) {
    for (j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            win[i][j + k][winCount] = true;
        }
        winCount++;
    }
};
//竖向赢
for (i = 0; i < 11; i++) {
    for (j = 0; j < 15; j++) {
        for (var k = 0; k < 5; k++) {
            win[i + k][j][winCount] = true;
        }
        winCount++
    }
}
//反斜向赢
for (i = 0; i < 11; i++) {
    for (j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            win[i + k][j + k][winCount] = true;
        }
        winCount++;
    }
}
//正斜向赢
for (i = 0; i < 11; i++) {
    for (j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            win[i + k][j - k][winCount] = true;
        }
        winCount++;
    }
}
//黑棋赢还是白棋赢，数量达到5个就赢
for(var i = 0;i<winCount;i++){
    blackWin[i]=0;
    whiteWin[i]=0;
}
//画棋盘
function drawChessBoard() {
    for (var i = 0; i < 15; i++) {
        can.beginPath();
        can.moveTo(30, 30 + 30 * i);
        can.lineTo(450, 30 + 30 * i);
        can.moveTo(30 + 30 * i, 30);
        can.lineTo(30 + 30 * i, 450);
        can.stroke();
    }
}
//画棋子
function drawChess(i, j, count) {//传入棋子的位置
    can.beginPath();
    can.arc(30 * i, 30 * j, 12, 0, 2 * Math.PI);
    can.closePath();
    var gradient = can.createRadialGradient(30 * i + 2, 30 * j, 12, 30 * i, 30 * j + 2, 0);
    if (count == 1) {
        //黑棋
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    } else if (count == 0) {
        //白棋
        gradient.addColorStop(0, "#d1d1d1");
        gradient.addColorStop(1, "#f9f9f9");
    }
    can.fillStyle = gradient;
    can.fill();
}
//把棋子存入棋盘中,并且初始的值为0；
for (i = 0; i < 15; i++) {
    chessList[i] = [];
    for (j = 0; j < 15; j++) {
        chessList[i][j] = 0;
    }
}
//点击事件
canvas.onclick = function (e) {
    if(over){
        return;
    }
    e = e || window.event;
    var curX = e.clientX;
    var curY = e.clientY;
    var canX = canvas.offsetLeft;
    var canY = canvas.offsetTop;
    i = Math.round((curX - canX - 30) / 30);
    j = Math.round((curY - canY - 30) / 30);
    count = count % 2;//用来区分是白色还是黑色棋子；
    if (chessList[i][j] == 0) {//判断当前位置没有放棋子
        curi = i;
        curj = j;
        drawChess(curi + 1, curj + 1, count);
        count++;
        chessList[i][j] = 1;//表示已经占位
        //根据赢的数组，判断是否出现了其中的情况
        for (var k = 0; k < winCount; k++) {
            if (win[i][j][k]) {
                if(count == 2){
                    blackWin[k]++;
                }else{
                    whiteWin[k]++;
                }
                if (blackWin[k] == 5 || whiteWin[k] == 5) {
                    oTex.innerHTML =count == 2 ? "黑棋赢" : "白棋赢";
                    over=true;
                }
            }
        }
    }
}


