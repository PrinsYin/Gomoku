var lian5=0,huo4=0,chong4=0,huo3=0,mian3=0,huo2=0,mian2=0;
var lian51=0,huo41=0,chong41=0,huo31=0,mian31=0,huo21=0,mian21=0;
var digui=0,cutnum=0;
var canvasHistory = [];
var cindex=0;
function analine(l)
{
    // console.log("analine")
    var temp;    
    lian5 +=(( temp=l.match(/11111/g))?temp.length:0);
    lian51 +=(( temp=l.match(/00000/g))?temp.length:0);
    huo4+=(( temp=l.match(/211112/g))?temp.length:0);
    huo41+=(( temp= l.match(/200002/g))?temp.length:0);

    if(lian5||lian51||huo4||huo41)
        return;

    chong4+=(( temp= l.match(/011112/g))?temp.length:0);
    chong4+=(( temp= l.match(/211110/g))?temp.length:0);
    chong41+=(( temp= l.match(/100002/g))?temp.length:0);
    chong41+=(( temp= l.match(/200001/g))?temp.length:0);
    chong4+=(( temp= l.match(/11121/g))?temp.length:0);
    chong4+=(( temp= l.match(/11211/g))?temp.length:0);
    chong4+=(( temp= l.match(/12111/g))?temp.length:0);
    chong41+=(( temp= l.match(/00020/g))?temp.length:0);
    chong41+=(( temp= l.match(/00200/g))?temp.length:0);
    chong41+=(( temp= l.match(/02000/g))?temp.length:0);

    huo3+=(( temp= l.match(/21112/g))?temp.length:0);
    // huo3+=(( temp= l.match(/221112/g))?temp.length:0);
    huo3+=(( temp= l.match(/211212/g))?temp.length:0);
    huo3+=(( temp= l.match(/212112/g))?temp.length:0);

    mian3+=(( temp= l.match(/011122/g))?temp.length:0);
    mian3+=(( temp= l.match(/011212/g))?temp.length:0);
    mian3+=(( temp= l.match(/012112/g))?temp.length:0);
    mian3+=(( temp= l.match(/11221/g))?temp.length:0);
    mian3+=(( temp= l.match(/12121/g))?temp.length:0);
    mian3+=(( temp= l.match(/0211120/g))?temp.length:0);

    mian3+=(( temp= l.match(/221110/g))?temp.length:0);
    mian3+=(( temp= l.match(/212110/g))?temp.length:0);
    mian3+=(( temp= l.match(/211210/g))?temp.length:0);
    mian3+=(( temp= l.match(/12211/g))?temp.length:0);

    huo2+=(( temp= l.match(/221122/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(temp)
    huo2+=(( temp= l.match(/21212/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(temp)
    huo2+=(( temp= l.match(/212212/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(temp)

    mian2+=(( temp= l.match(/011222/g))?temp.length:0);
    mian2+=(( temp= l.match(/012122/g))?temp.length:0);
    mian2+=(( temp= l.match(/012212/g))?temp.length:0);
    mian2+=(( temp= l.match(/2122212/g))?temp.length:0);
    mian2+=(( temp= l.match(/222110/g))?temp.length:0);
    mian2+=(( temp= l.match(/221210/g))?temp.length:0);
    mian2+=(( temp= l.match(/212210/g))?temp.length:0);

    huo31+=(( temp= l.match(/20002/g))?temp.length:0);
    // huo31+=(( temp= l.match(/220002/g))?temp.length:0);
    huo31+=(( temp= l.match(/200202/g))?temp.length:0);
    huo31+=(( temp= l.match(/202002/g))?temp.length:0);

    mian31+=(( temp= l.match(/100022/g))?temp.length:0);
    mian31+=(( temp= l.match(/100202/g))?temp.length:0);
    mian31+=(( temp= l.match(/102002/g))?temp.length:0);
    mian31+=(( temp= l.match(/00220/g))?temp.length:0);
    mian31+=(( temp= l.match(/02020/g))?temp.length:0);
    mian31+=(( temp= l.match(/1200021/g))?temp.length:0);

    mian31+=(( temp= l.match(/220001/g))?temp.length:0);
    mian31+=(( temp= l.match(/202001/g))?temp.length:0);
    mian31+=(( temp= l.match(/200201/g))?temp.length:0);
    mian31+=(( temp= l.match(/02200/g))?temp.length:0);

    huo21+=(( temp= l.match(/220022/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(temp)
    huo21+=(( temp= l.match(/20202/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(temp)
    huo21+=(( temp= l.match(/202202/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(temp)

    mian21+=(( temp= l.match(/100222/g))?temp.length:0);
    mian21+=(( temp= l.match(/102022/g))?temp.length:0);
    mian21+=(( temp= l.match(/102202/g))?temp.length:0);
    mian21+=(( temp= l.match(/2022202/g))?temp.length:0);
    mian21+=(( temp= l.match(/222001/g))?temp.length:0);
    mian21+=(( temp= l.match(/220201/g))?temp.length:0);
    mian21+=(( temp= l.match(/202201/g))?temp.length:0);
    // if(ongoing!=1)
    //     console.log(huo3,mian3,huo2,mian2,huo31,mian31,huo21,mian21)
}

function checkkill()
{
    // console.log(lian5,huo4,chong4,huo3,mian3,huo2,mian2);
    // console.log(lian51,huo41,chong41,huo31,mian31,huo21,mian21)
    
}

function getscore()
{
    // console.log("getsssss")
//     白棋连5，评分为10000
// 黑棋连5，评分为 -10000
// 白棋两个冲四可以当成一个活四
// 黑棋有活四，评分为 -9050
// 黑棋有冲四，评分为 -9040
// 白棋有活四，评分为 9030
// 白棋有冲四和活三，评分为 9020
// 白棋没有冲四，且黑棋有活三，评分为 9010
// 白棋有2个活三，且黑棋没有活三或眠三，评分为 9000
// 下面针对白棋或黑棋的活三，眠三，活二，眠二的个数依次增加分数，评分为（白棋得分 - 黑棋得分）
    if(lian5)
    return [20000,20000];
    if(lian51)
    return [-20000,-20000];
    if(huo4)
    return [16050,16050];
    if(chong4)
    return [16040,16040];
    if(huo41||(chong41>=2))
    return [-16030,-16030];
    if(chong41&&huo31)
    return [-14020,-14020];
    if(!chong41&&huo3)
    return [14010,14010];
    if(huo31>=2&&!huo3&&!mian3)
    return [-14000,-14000];
    var sum1=0,sum2=0;
    sum1+=huo4*2000+chong4*2000+huo3*1000+mian3*50+huo2*30+mian2*10;
    sum2+=huo41*2000+chong41*2000+huo31*1000+mian31*50+huo21*30+mian21*10;
    sum1+=100;
    
    return [sum1-sum2,sum1-sum2];
}

function getvalue()
{
    // console.log("gett")
    var ss;
    var ai=1;
    var l;
    var aisum=0;
    var isum=0;
    var sum1=0,sum2=0;
    lian5=0,huo4=0,chong4=0,huo3=0,mian3=0,huo2=0,mian2=0;
    lian51=0,huo41=0,chong41=0,huo31=0,mian31=0,huo21=0,mian21=0;
    for(var i=x1;i<=x2;i++)
    {
        l="";
        aisum=0;
        isum=0;
        for(var j=y1;j<=y2;j++)
        {
           l=l+board1[i][j];
        //    console.log(l)
           if(board1[i][j]==1)
                aisum++;
            else if(board1[i][j]==0)
                isum++;
           if(board1[i][j]==1)
                sum1+=board2[i][j];
            else if(board1[i][j]==0)
                sum2+=board2[i][j];
            // if(ss=checkkill())
            //     return ss;
        }
        if(ongoing!=1)
                console.log(l)
        if(aisum>1||isum>1)
            analine(l);
        
    }

    for(var i=y1;i<=y2;i++)
    {
        l="";
        aisum=0;
        isum=0;
        for(var j=x1;j<=x2;j++)
        {
           l=l+board1[j][i];
           if(board1[j][i]==1)
                aisum++;
            else if(board1[j][i]==0)
                isum++;
            // if(ss=checkkill())
            //     return ss;
        }
        if(ongoing!=1)
                console.log(l)
        if(aisum>1||isum>1)
            analine(l);
    }

    for(var i=3;i<=15;i++)
    {
        l="";
        aisum=0;
        isum=0;
        for(var j=i;j>=1;j--)
        {
           l=l+board1[i-j+1][j];
           if(board1[i-j+1][j]==1)
                aisum++;
            else if(board1[i-j+1][j]==0)
                isum++;
            // if(ss=checkkill())
            //     return ss;
                
        }
        if(ongoing!=1)
                console.log(l)
        if(aisum>1||isum>1)
            analine(l);
    }

    for(var i=14;i>=3;i--)
    {
        l="";
        aisum=0;
        isum=0;
        for(var j=15;j>=16-i;j--)
        {
           l=l+board1[31-i-j][j];
           if(board1[31-i-j][j]==1)
                aisum++;
            else if(board1[31-i-j][j]==0)
                isum++;
            // if(ss=checkkill())
            //     return ss;
        }
        if(ongoing!=1)
                console.log(l)
        if(aisum>1||isum>1)
            analine(l);
    }



    for(var i=15;i>=1;i--)
    {
        l="";
        aisum=0;
        isum=0;
        for(var j=1;j<=16-i;j++)
        {
           l=l+board1[i+j-1][j];
           if(board1[i+j-1][j]==1)
                aisum++;
            else if(board1[i+j-1][j]==0)
                isum++;
        }
        if(ongoing!=1)
                console.log(l)
        if(aisum>1||isum>1)
            analine(l);
        // if(ss=checkkill())
        //     return ss;
    }

    for(var i=2;i<=15;i++)
    {
        l="";
        aisum=0;
        isum=0;
        for(var j=1;j<=16-i;j++)
        {
           l=l+board1[j][i+j-1];
           if(board1[j][i+j-1]==1)
                aisum++;
            else if(board1[j][i+j-1]==0)
                isum++;
        }
        if(ongoing!=1)
        console.log(l)
        if(aisum>1||isum>1)
            analine(l);
        // if(ss=checkkill())
        //     return ss;
    }
    ss=getscore();
    // console.log("getsssss")
    // console.log(lian5,huo4,chong4,huo3,mian3,huo2,mian2);
    // console.log(lian51,huo41,chong41,huo31,mian31,huo21,mian21)
    // console.log(ss)
    return [ss[0]+sum1-sum2,ss[0]+sum1-sum2];
}
