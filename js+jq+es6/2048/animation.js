function showNumBackgroundColor(num){
    switch(num){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return  "#09c";break;
        case 4096:return  "#a6c";break;
        case 9186:return "#93c";break;
    }
}
function showNumColor(num){
    return num > 2 ? "#fff" : "#333";
}

function addNumber(i,j,num){
    let numberCell = $("#number-cell-" + i + "-" + j)
    numberCell.css({
        "background-color": showNumBackgroundColor(num),
        "color": showNumColor(num)
    }).text(num);
    numberCell.animate({
        top: getPos(i),
        left: getPos(j),
        width: "100px",
        height: "100px",
    },20)
}

function moveNumberCell(fromx, fromy, tox, toy) {
    let numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPos(tox),
        left: getPos(toy)
    }, 200)}

function updateScore(num){
    $(".score").text(num)
}