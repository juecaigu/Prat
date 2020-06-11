var dataArr = [
    {name:"王",src:"1.jpg",sex:"Male",age:"22",tex:"六六六"},
    {name:"张三",src:"2.jpg",sex:"Male",age:"19",tex:"七七七"},
    {name:"李四",src:"3.jpg",sex:"Female",age:"32",tex:"呜呜呜"},
    {name:"钱其",src:"4.jpg",sex:"Male",age:"42",tex:"啊哈哈"},
    {name:"赵八",src:"5.jpg",sex:"Female",age:"25",tex:"十多个傻"},
]
//先定义好对象
var oUl = document.getElementsByClassName("content")[0];
var oInp = document.getElementsByTagName("input")[0];
var oBtn = document.getElementsByClassName("btn")
var state = {
    text:"",
    sex:"a"
}
//渲染数组
function renderPage(dom,data){
    var htmlStr = "";
    dom.innerHTML = "";
    data.forEach(function(elem,index,self){
        //根据数据创建标签
        htmlStr = htmlStr + "<li><img src = 'images/"+elem.src+"'><span>" + elem.name + "</span><p>" + elem.tex + "</p></li>"
    })
    dom.innerHTML = htmlStr;
}
renderPage(oUl,dataArr);
//构造函数判断文本框输入的对象
oInp.oninput = function(){
    state.text = this.value;
    renderPage(oUl,lastFilterArr(dataArr));
} 
//构造函数判断输入的文本是否在数组列表内
function filterArrByText(data,text){
    //判断是否为空
    if(text == ""){
        return data;
    }else{
        //注意这里要返回过滤后的数组
        return data.filter(function(elem,index,self){
                //indexOf 用于判断text是否在elem.name里面，如果在是话返回索引，不在的话返回-1
                //filter方法如果返回ture 就会保留当前的elem，返回false就不保留
                return elem.name.indexOf(text) != -1;
            })
    }

}
//用forEach来做选项卡的切换
oBtn = [].slice.call(oBtn,0)//先把oBtn变成数组
var lastActive = oBtn[2];
oBtn.forEach(function(elem,index,self){
    elem.onclick=function(){
        changeActive(this);
        state.sex = this.getAttribute("sex");
        //getAttribute("sex")可以获取标签上的sex属性
        renderPage(oUl,lastFilterArr(dataArr));
    }
})
function changeActive(elem){
    elem.className = "btn active"
    lastActive.className = "btn";
    lastActive = elem;
}
//构造函数判断点击的性别
function filterArrBySex(data,sex){
    if(sex == "a"){
        return data;
    }else{
        return data.filter(function(elem,index,self){
                    return elem.sex == sex;
                })
    }
}

//用来管理筛选的条件的函数,不管理的话会导致筛选条件重合
function combineFilter(config){
    return function(data){
        for(var prop in config){
            //关键是这一步；用循环的方式调用了lastFilterArr里面存的函数
            data = config[prop](data,state[prop]) //让最后的值等于data是因为点完性别之后会传回给data
        }
        return data;
    }
}
var lastFilterArr = combineFilter({
    //这边先把过滤函数存起来，方便调用
    text:filterArrByText,
    sex:filterArrBySex
}
)
   