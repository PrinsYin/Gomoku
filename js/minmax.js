
function minmax(a,b,d,i1,j1)
{
    var d1=d;
    // console.log(i,j+"d"+d)
    var list;
    digui++;
    var xn=0,yn=0;
    if(d1>=2)
    {
    //     console.log(getvalue())
    //     console.log(lian5,huo4,chong4,huo3,mian3,huo2,mian2);
    // // if(ongoing!=1)
    // console.log(lian51,huo41,chong41,huo31,mian31,huo21,mian21)
        return getvalue();//d为偶数，AI下棋
    }
    var a1=a,b1=b;
    // if(d%2==1)
    // else
    // console.log("ab",a,b)
    for(var i=max(1,i1-1);i<=min(15,i1+1);i++)
    {
        for(var j=max(1,j1-1);j<=min(15,j1+1);j++)
        {
            if(board[i][j]==0)
            {
                
                // console.log("minmax",n)
                //initial n:1 d:0
                n++;
                d1++;
                board[i][j]=n;
                if(d1%2==1)
                    board1[i][j]=1;
                else
                    board1[i][j]=0;
                list=minmax(a1,b1,d1,i,j);
                
                // console.log("list",list,a1,b1,xn,yn,nx,ny)
                // console.log(list)
                board[i][j]=0;
                board1[i][j]=2;
                // board2[i][j]=0;
                n--;
                d1--;
                if(!list)
                    continue;
                if(list[1]>a1&&d1%2==0)
                {
                    a1=list[1];
                    nx=i;
                    ny=j;
                    
                }
                if(list[0]<b1&&d1%2==1)
                {
                    b1=list[0];
                    // console.log("refresh"+b1);
                    // xn=i;
                    // yn=j;
                }
                if(b1<a1)
                {
                    cutnum++;
                    // return 0;
                }
            }
        }
    }
    for(var i=x1;i<=x2;i++)
    {
        for(var j=y1;j<=y2;j++)
        {
            if((i-i1==1||i1-i==1)&&(j-j1==1||j1-j==1))
                continue;
            if(board[i][j]==0)
            {
                // console.log(i,j+"d"+d)
                // console.log("minmax",n)
                //initial n:1 d:0
                n++;
                d1++;
                board[i][j]=n;
                if(d1%2==1)
                    board1[i][j]=1;
                else
                    board1[i][j]=0;
                list=minmax(a1,b1,d1,i,j);
                // console.log("list",list,a1,b1,xn,yn,nx,ny)
                // console.log(list)
                board[i][j]=0;
                board1[i][j]=2;
                // board2[i][j]=0;
                n--;
                d1--;
                if(!list)
                    continue;
                if(list[1]>a1&&d1%2==0)
                {
                   
                    a1=list[1];
                    nx=i;
                    ny=j;
                    // console.log("d"+d1+a1+b1+nx+' '+ny+list)
                }
                if(list[0]<b1&&d1%2==1)
                {
                    b1=list[0];
                    // console.log("refresh"+b1);
                    // xn=i;
                    // yn=j;
                }
                if(b1<a1)
                {
                    cutnum++;
                    return 0;
                }
            }
            
        }
    }
    // console.log("d"+d+a1+b1+' '+i1+' '+j1+' '+i+' '+j+' '+nx+' '+ny)
    return [a1,b1];
}

