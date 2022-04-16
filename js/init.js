var list=[];
var board=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
var board1=[
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];
var board2=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
var canvas= document.getElementById('canvas')
var ctx=document.getElementById("canvas").getContext("2d");
var n=0;
var x1=6,y1=6,x2=10,y2=10;
var nx,ny;
var ongoing=0;
var allexpand=0;
var choose=0;//0:player first

function max(a,b)
{
    if(a>b)
        return a;
    else
        return b;
}

function min(a,b)
{
    if(a<b)
        return a;
    else
        return b;
}

function expand(i,j)
{
    if(i-2<x1)
        x1=max(i-2,1);
    if(i+2>x2)
        x2=min(i+2,15);
    if(j-2<y1)
        y1=max(j-2,1);
    if(j+2>y2)
        y2=min(j+2,15);
    if(x1==1&&y1==1&&x2==15&&y2==15)
        allexpand=1;
}

function put(i,j)
{
    document.getElementById("aaa").innerHTML=n;
    console.log(n)
    console.log("value:"+getvalue())
    if(board[i][j]!=0)
        return;
    list.push([i,j])
    // console.log(i,j)
    n++;
    drawchess(i,j);
    board[i][j]=n;
    console.log(i,j)
    if(n%2==choose)
        board1[i][j]=1;
    else
        board1[i][j]=0;
    if(!allexpand)
        expand(i,j);
    if(n%2!=choose)
    {
        ongoing=1;
        digui=0;
        minmax(-99999999,9999999,0);
        put(nx,ny);
        ongoing=0;
    }
    console.log(board1,board2,digui)
}

canvas.addEventListener('click', function(event)
{
    if(ongoing==1)
        return;
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left * (canvas.width / rect.width);
    var y = event.clientY - rect.top * (canvas.height / rect.height);
    // console.log(x,y)
    x-=21;
    y-=21;
    x/=20;
    y/=20;
    x=parseInt(x);
    y=parseInt(y);
    x++;
    y++;
    x/=2;
    y/=2;
    x=parseInt(x);
    y=parseInt(y);
    y++;
    x++;
    // console.log(x,y)
    put(y,x);
})

function drawchess(i,j)
{
    
    ctx.beginPath();
    if(n%2==1)
    {
        ctx.fillStyle="black";
        ctx.strokeStyle="black";
    }
    else
    {
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
    }
    ctx.arc(j*40-19,i*40-19,15,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(j*40-19,i*40-19,15,0,Math.PI*2,true);
    ctx.stroke();
    // ontext.arc(x,y,半径，开始角度，结束角度，是否逆时针旋转)
}


function drawboard()
{
    ctx.fill();
    ctx.shadowBlur=10;
    ctx.shadowOffsetX=5;
    ctx.shadowOffsetY=5;
    ctx.shadowColor="black";
    ctx.fillStyle="white";
    ctx.fillRect(21,21,561,561);
    ctx.shadowBlur=0;
    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    for(var i = 0; i < 15; i++)
    {
        // ctx.strokeStyle="red";
        ctx.moveTo(21+i * 40 , 21);
        ctx.lineTo(21+i * 40 , 581);
        //垂直方向画15根，相距30px
        ctx.stroke();
        ctx.moveTo(21 , 21+i * 40);
        ctx.lineTo(581, 21+ i * 40); 
        //水平方向画15根，相距30px
        ctx.stroke();
    }
    

}

function iniboard2(x,y)
{
    for(var i=1;i<=15;i++)
        for(var j=1;j<=15;j++)
            board2[i][j]=parseInt((14-Math.abs(i-x)-Math.abs(j-y)));
}

function init()
{
    var ll="22221122222";
    var temp,t1=0;
    console.log(t1+=(temp=ll.match(/221122/g))?temp.length:0)
    console.log(temp.length)
    drawboard();
    var xi=8,yi=8;
    iniboard2(xi,yi)
}


