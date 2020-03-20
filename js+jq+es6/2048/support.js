function getPos(i){
    return 20 + 120 * i
}
function noSpace(board){
    for(var i = 0;i<4;i++){
        for(var j =0;j<4;j++){
            if(board[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}
function getRandom(){
    return parseInt(Math.floor(Math.random() * 4))
}

function canMoveLeft(num){
    //左边有空位，或者是有相同的数字
    for(var i = 0;i<4;i++){
        for(var j = 1;j<4;j++){
            if(num[i][j] !== 0){
                if(num[i][j-1] === 0 || num[i][j] === num[i][j-1]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(num){
    //右边有空位，或者是有相同的数字
    for(var i = 0;i<4;i++){
        for(var j = 2;j>=0;j--){
            if(num[i][j] !== 0){
                if(num[i][j+1] === 0 || num[i][j] === num[i][j+1]){
                    return true;
                }  
            }
        }
    }
    return false;
}

function canMoveUp(num){
    //上边有空位，或者是有相同的数字
    for(var i = 1;i<4;i++){
        for(var j = 0;j<4;j++){
            if(num[i][j] !== 0){
                if(num[i-1][j] === 0 || num[i][j] === num[i-1][j]){
                    return true;
                }  
            }
        }
    }
    return false;
}

function canMoveDown(num){
    //下边有空位，或者是有相同的数字
    for(var i = 2;i>=0;i--){
        for(var j = 0;j<4;j++){
            if(num[i][j] !== 0){
                if(num[i+1][j] === 0 || num[i][j] === num[i+1][j]){
                    return true;
                }  
            }
        }
    }
    return false;
}

function noBlockRow(row,col1,col2,num){
    for(var i = col1 + 1;i<col2;i++){
        if(num[row][i] !== 0){
            return false;
        };
    }
    return true;
}
function noBlockCol(col,row1,row2,num){
    for(var i = row1 + 1;i<row2;i++){
        if(num[i][col] !== 0){
            return false;
        };
    }
    return true;
}

function canMove(num){
    if( canMoveDown(num) || canMoveLeft(num) || canMoveRight(num) || canMoveUp(num) ){
        return true;
    }
    return false;
}