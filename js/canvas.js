function undo()
{
    if(ongoing==1)
        return;
    if(n<=0)
    {
        alert("观棋不语真君子，落子无悔大丈夫！")
        return;
    }
    n-=2;
    gamend=0;
    var l=list.pop();
    var i=l[0],j=l[1];
    board[i][j]=0;
    board1[i][j]=2;
    updateScore([i,j]);
    l=list.pop();
    i=l[0],j=l[1];
    board[i][j]=0;
    board1[i][j]=2;
    updateScore([i,j]);
    document.getElementById("intro").innerHTML="五子棋ai <br><font style='font-size:30px;'>尹卓然</font>";
    // document.getElementById("aaa").innerHTML=n;
    ctx.clearRect(0, 0, 605,605);
    let canvasPic = new Image();
    cindex--;
    canvasPic.src = canvasHistory[cindex-1];
    canvasHistory.pop();
    
    // console.log(canvasHistory.length)
    canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
}