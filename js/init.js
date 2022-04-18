var gamend=0;
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

function mutea()
{
    document.getElementById("mutep").src=(mute==1)?"media/mute.png":"media/nmute.png";
    mute=(mute==1)?0:1;
    
}

function audioPlayer(name, type) 
{
    if(mute==1)
        return;
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
    if(xini==0&&yini==0)
    {
        xini=i;
        yini=j;
    }
    // console.log(n)
    if(gamend==1)
        return;
    
    if(board[i][j]!=0)
        return;
    list.push([i,j])
    // console.log(i,j)
    n++;
    console.log(nx,ny,n)
    win=0;
    
    // document.getElementById("aaa").innerHTML=n;
    if(n%2==choose)
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
    console.log(kill)
    if(kill==0)
    {
        audioPlayer("victory","mp3")
        document.getElementById("intro").innerHTML="you won!";
    }
    else if(kill==1)
    {
        audioPlayer("loss","mp3")
        document.getElementById("intro").innerHTML="AI won!loser!!!!!!";
    }
    if(kill!=2)
        gamend=1;
    if(!allexpand)
        expand(i,j);
        
    if(n%2!=choose)
    {

        ongoing=1;
        digui=0;
        drawchess(i,j);
        audioPlayer("chess","mp3")
        // document.getElementById("ai").innerHTML="thinking.......AI"
        setTimeout(function () {
            if (drawdone) {
                
                minmax(-9999999999,9999999999,0,nx,ny);
                put(nx,ny);
                
                
        }}, 1);
        // document.getElementById("ai").innerHTML="AI"
        audioPlayer("chess","mp3")
        // console.log(nx,ny,n)
        
        // console.log(nx,ny,n)
        console.log(COMScore,HUMScore,board1)
        console.log("value:"+evaluate(0))
        ongoing=0;
    }
    
    // console.log("digui",digui,cutnum)
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
    drawdone=0;
    console.log("draw",i,j,n)
    ctx.beginPath();
    if(n%2==1)
    {
        ctx.fillStyle="black";
        ctx.strokeStyle="black";
    }
    else
    {
        // ctx.fillStyle="lightgrey";
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
    }
    ctx.arc(j*40-19,i*40-19,15,0,Math.PI*2,true);
    ctx.fill();
    ctx.arc(j*40-19,i*40-19,15,0,Math.PI*2,true);
    ctx.stroke();
    if(n%2==1)
    {
        ctx.strokeStyle="white";
    }
    else
    {
        ctx.strokeStyle="black";
    }
    ctx.arc(j*40-19,i*40-19,12,0,Math.PI*2,true);
    ctx.stroke();
    
    ctx.font = "normal 15px Arial";
      if(n%2==0)
    {
        ctx.fillStyle="black";
        ctx.strokeStyle="black";
    }
    else
    {
        ctx.fillStyle="white";
        ctx.strokeStyle="white";
    }
    ctx.textAlign='center';
      ctx.strokeText(n, j*40-19,i*40-13);

    if(list.length>1)
    {
    i=list[list.length-2][0];
    j=list[list.length-2][1];

    ctx.beginPath();
    if(n%2==0)
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
    
    ctx.font = "normal 15px Arial";
      if(n%2==1)
    {
        ctx.fillStyle="black";
        ctx.strokeStyle="black";
    }
    else
    {
        ctx.fillStyle="white";
        ctx.strokeStyle="white";
    }
    ctx.textAlign='center';
      ctx.strokeText(n-1, j*40-19,i*40-13);
    }
    
      

      
      if(n%2==choose)
      {
          canvasHistory.push(canvas.toDataURL());
          cindex++;
      }
      drawdone=1;
      
    // console.log("canvasHistory.length"+canvasHistory.length)
    // ontext.arc(x,y,半径，开始角度，结束角度，是否逆时针旋转)
}


function drawboard()
{
    ctx.clearRect(0, 0, 605,605);
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
    ctx.beginPath();
    for(var i = 0; i < 15; i++)
    {
        // ctx.strokeStyle="red";
        ctx.moveTo(21+i * 40 , 21);
        ctx.lineTo(21+i * 40 , 581);
        // //垂直方向画15根，相距30px
        ctx.stroke();
        ctx.moveTo(21 , 21+i * 40);
        ctx.lineTo(581, 21+ i * 40); 
        // //水平方向画15根，相距30px
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
    xini=0,yini=0;
     list=[];
     mute=0;
 board=[
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
 board1=[
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
 win=0;
 n=0;
 x1=6,y1=6,x2=10,y2=10;
 nx,ny;
 ongoing=0;
 allexpand=0;
 choose=0;//0:player first
 document.getElementById("intro").innerHTML="五子棋ai <br><font style='font-size:30px;'>尹卓然</font>";

 kill=2;
 digui=0,cutnum=0;
 canvasHistory = [];
 cindex=0;
 HUMScore=[
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
 COMScore=[
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
    gamend=0;
    drawboard();
    drawboard();
    // var xi=8,yi=8;
    // iniboard2(xi,yi);
    initScore();
}

function main()
{
    ctx.clearRect(0, 0, 605,605);
    init();
}

