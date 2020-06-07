(function () {
    //先创建一个二维数组
    let board = new Array()
    let score = 0;
    let lock = true;
    let hasConfig = new Array();
    $(document).ready(function () {
        init();
        generateNumber();
        generateNumber();
    })
    $("#newgame").click(function(){
        init();
        generateNumber();
        generateNumber();
    })
    function init() {
        for (var i = 0; i < 4; i++) {
            board[i] = new Array()
            hasConfig[i] = new Array()
            for (var j = 0; j < 4; j++) {
                board[i][j] = 0;
                hasConfig[i][j] = false;
                //定位
                $("#grid-cell-" + i + '-' + j)
                    .css({
                        "top": getPos(i),
                        "left": getPos(j)
                    })
            }
        }
        //创建盛放数字的容器
        updateView();
    }
    function updateView() {
        $(".number-cell").remove()
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $(".container").append(
                    `<div class = 'number-cell' id = 'number-cell-${i}-${j}' ></div>`
                )
                let numCell = $("#number-cell-" + i + "-" + j)
                if (board[i][j] === 0) {
                    numCell.css({
                        "top": getPos(i) + 50,
                        "left": getPos(j) + 50,
                        "width": "0px",
                        "height": "0px",
                    })
                } else {
                    numCell.css({
                        "top": getPos(i),
                        "left": getPos(j),
                        "width": "100px",
                        "height": "100px",
                        "background-color": showNumBackgroundColor(board[i][j]),
                        "color": showNumColor(board[i][j])
                    }).text(board[i][j])
                }
                hasConfig[i][j] = false;
            }
        }
    }
    function generateNumber() {
        //判断是否有空位
        if (noSpace(board)) {
            return false
        }
        //获取随机的一个位置
        let randx = getRandom();
        let randy = getRandom();
        //记录随机的次数
        let time = 0;
        while (time < 50) {
            if (board[randx][randy] === 0) {
                break;
            }
            randx = getRandom();
            randy = getRandom();
            time++
        }
        //随机次数太多之后，就手动添加
        if (time === 50) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] === 0) {
                        randx = i
                        randy = j
                    }
                }
            }
        }
        //产生2或者4
        let renderNum = Math.random() > 0.5 ? 2 : 4;
        board[randx][randy] = renderNum;
        //把数字加进去
        addNumber(randx, randy, renderNum)
    }
    //键盘控制事件
    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                if(moveLeft()){
                    setTimeout(generateNumber,200);
                }
                isGameOver();
                break;
            case 38:
                if(moveUp()){
                    setTimeout(generateNumber,200);
                }
                isGameOver();
                break;
            case 39:
                if(moveRight()){
                    setTimeout(generateNumber,200);
                }
                isGameOver();
                break;
            case 40:
                if(moveDown()){
                    setTimeout(generateNumber,200);
                }
                isGameOver();
                break;
        }
    })
    function moveLeft() {
        if (!canMoveLeft(board)) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] !== 0) {
                    for (var k = 0; k < j; k++) {
                        //有空位且中间没有障碍
                        if (board[i][k] === 0 && noBlockRow(i, k, j, board)) {
                            moveNumberCell(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            //满足就直接进下一循环，不用再进else if
                            continue;
                        } else if (board[i][k] === board[i][j] && noBlockRow(i, k, j, board) && !hasConfig[i][k]) {
                            moveNumberCell(i, j, i, k);
                            board[i][k] += board[i][j];
                            score += board[i][k]
                            board[i][j] = 0;
                            updateScore(score);
                            hasConfig[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        //返回页面效果
        setTimeout(updateView, 200);
        return true;
    }
    function moveRight() {
        if (!canMoveRight(board)) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] !== 0) {
                    for (var k = 3; k > j; k--) {
                        //有空位且中间没有障碍
                        if (board[i][k] === 0 && noBlockRow(i, j, k, board)) {
                            moveNumberCell(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            //满足就直接进下一循环，不用再进else if
                            continue;
                        } else if (board[i][k] === board[i][j] && noBlockRow(i, j, k, board) && !hasConfig[i][k] ){
                            moveNumberCell(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            score += board[i][k]
                            updateScore(score);
                            hasConfig[i][k] = true;
                            continue;
                        }
                    }
                }
            }
        }
        //返回页面效果
        setTimeout(updateView, 200);
        return true;
    }
    function moveUp() {
        if (!canMoveUp(board)) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    for (var k = 0; k < i; k++) {
                        //有空位且中间没有障碍
                        if (board[k][j] === 0 && noBlockCol(j, k, i, board)) {
                            moveNumberCell(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            //满足就直接进下一循环，不用再进else if
                            continue;
                        } else if (board[k][j] === board[i][j] && noBlockCol(j, k, i, board) && !hasConfig[k][j]) {
                            moveNumberCell(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j]
                            updateScore(score);
                            hasConfig[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        //返回页面效果
        setTimeout(updateView, 200);
        return true;
    }
    function moveDown() {
        if (!canMoveDown(board)) {
            return false;
        }
        for (var i = 2; i >= 0; i--) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    for (var k = 3; k > i; k--) {
                        //有空位且中间没有障碍
                        if (board[k][j] === 0 && noBlockCol(j, i, k, board)) {
                            moveNumberCell(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            //满足就直接进下一循环，不用再进else if
                            continue;
                        } else if (board[k][j] === board[i][j] && noBlockCol(j, i, k, board) && !hasConfig[k][j]) {
                            moveNumberCell(i, j, k, j);
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j]
                            updateScore(score);
                            hasConfig[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        //返回页面效果
        setTimeout(updateView, 200);
        return true;
    }
    function isGameOver(){
        if( !canMove(board) && noSpace(board)){
            alert("game over")
        }
    }
})()