
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
}

function put(i,j)
{
    
    // console.log(n)
    
    console.log(nx,ny,n)
    if(board[i][j]!=0)
        return;
    list.push([i,j])
    // console.log(i,j)
    n++;
    win=0;
    
    document.getElementById("aaa").innerHTML=n;
    drawchess(i,j);
    board[i][j]=n;
    // console.log(i,j)
    if(n%2==choose)
        board1[i][j]=1;
    else
    {
        board1[i][j]=0;
        
    // console.log(lian5,huo4,chong4,huo3,mian3,huo2,mian2);
    // console.log(lian51,huo41,chong41,huo31,mian31,huo21,mian21)
    }
    updateScore([i,j]);
    
    evaluate(1);
    
    // if(win==0)
    //     document.getElementById("intro").innerHTML="you won!";
    // else if(win==1)
    //     document.getElementById("intro").innerHTML="AI won!loser!!!!!!";
    // if(win!=2)
    //     return;
    // if(!allexpand)
        expand(i,j);
        
    if(n%2!=choose)
    {

        ongoing=1;
        digui=0;
        // console.log(nx,ny,n)
        minmax(-999999999,999999999,0,i,j);
        // console.log(nx,ny,n)
        put(nx,ny);
        console.log(COMScore,HUMScore,board1)
        console.log("value:"+evaluate(0))
        ongoing=0;
    }
    
    console.log("digui",digui,cutnum)
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
    console.log("draw",i,j,n)
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
    if(n%2==choose)
    {
        canvasHistory.push(canvas.toDataURL());
        cindex++;
    }
    function audioPlayer(name, type) 
    {
        var pre = document.getElementById('audio-player-snowt')
        if (pre) {
          pre.parentNode.removeChild(pre)
        }
        if (!name || !type) return
        const body = document.body
        const au = document.createElement('audio')
        // 这里的路径使用相对路径 传入音频名字和格式就可以 assets下建一个audio存放所有音频
        au.src = 'media/' + name + '.' + type
        // au.src = '/' + name + '.' + type
        au.autoplay = true
        au.id = 'audio-player-snowt'
        // au.loop = loop
        body.appendChild(au)
      }
      audioPlayer("chess","mp3")
    // console.log("canvasHistory.length"+canvasHistory.length)
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

    
    ctx.fillStyle="black";
    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.arc(3*40-19,3*40-19,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(3*40-19,3*40-19,3,0,Math.PI*2,true);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(3*40-19,13*40-19,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(3*40-19,13*40-19,3,0,Math.PI*2,true);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(13*40-19,3*40-19,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(13*40-19,3*40-19,3,0,Math.PI*2,true);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(13*40-19,13*40-19,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(13*40-19,13*40-19,3,0,Math.PI*2,true);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(8*40-19,8*40-19,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(8*40-19,8*40-19,3,0,Math.PI*2,true);
    ctx.stroke();
    console.log("canvasHistory.length"+canvasHistory.length)

    canvasHistory.push(canvas.toDataURL());
    cindex++;

}

function iniboard2(x,y)
{
    for(var i=1;i<=15;i++)
        for(var j=1;j<=15;j++)
            board2[i][j]=parseInt((14-Math.abs(i-x)-Math.abs(j-y)));
}

function init()
{
    drawboard();
    // var xi=8,yi=8;
    // iniboard2(xi,yi);
    initScore();
}

function main()
{
    init();
}
