
function minmax(a,b,d)
{
    digui++;
    var xn=0,yn=0;
    if(d>=2)
        return getvalue();//d为偶数，AI下棋
    if(d%2==1)
        a1=a;
    else
        b1=b;
    var a1=-9999999,b1=9999999;
    for(var i=x1;i<=x2;i++)
    {
        for(var j=y1;j<=y2;j++)
        {
            if(board[i][j]==0)
            {
                // console.log("minmax",n)
                //initial n:1 d:0
                n++;
                d++;
                board[i][j]=n;
                if(n%2==choose)
                    board1[i][j]=1;
                else
                    board1[i][j]=0;
                var list=minmax(a1,b1,d);
                if(!list)
                    continue;
                // console.log("list",list,a1,b1,xn,yn,nx,ny)
                // console.log(list)
                board[i][j]=0;
                board1[i][j]=2;
                // board2[i][j]=0;
                n--;
                d--;
                if(list[0]<b1&&d%2==1)
                {
                    b1=list[0];
                    xn=i;
                    yn=j;
                }
                if(list[1]>a1&&d%2==0)
                {
                    a1=list[1];
                    xn=i;
                    yn=j;
                }
                if(b1<a1)
                    return 0;
            }
        }
    }
    nx=xn;
    ny=yn;
    return [a1,b1];
}

