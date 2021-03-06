function gen(role,d1)
{
if (n==1) 
{
    if(xini==1&&yini==1)
        return[[8,8]];
    else
        return [[max(1,xini-1), max(1,yini-1)]]
}
var fives = []
var comfours=[]
var humfours=[]
var comblockedfours = []
var humblockedfours = []
var comtwothrees=[]
var humtwothrees=[]
var comthrees = []
var humthrees = []
var comtwos = []
var humtwos = []
var neighbors = []

var reverseRole = reverserole(role)
// console.log("gen")
for(var i=x1;i<=x2;i++) {
    for(var j=y1;j<y2;j++) {
    var p = [i, j]
    if(board1[i][j] == EMPTY) {
        var neighbor = [2,2]
        if(n+d1 < 6) neighbor = [1, 1]
        if(hasNeighbor(i, j, neighbor[0], neighbor[1])) { //必须是有邻居的才行
            
        var scoreHum = HUMScore[i][j]
        var scoreCom =  COMScore[i][j]
        var maxScore = Math.max(scoreCom, scoreHum)
        let p1=p;
        if(scoreCom >= FIVE) {//先看电脑能不能连成5
            // console.log(fives.push(p1))
            fives.push(p1)
        } else if(scoreHum >= FIVE) {//再看玩家能不能连成5
            //别急着返回，因为遍历还没完成，说不定电脑自己能成五。
            fives.push(p1)
        } else if(scoreCom >= FOUR) {
            comfours.push(p1)
        } else if(scoreHum >= FOUR) {
            humfours.push(p1)
        } else if(scoreCom >= BLOCKED_FOUR) {
            comblockedfours.push(p1)
        } else if(scoreHum >= BLOCKED_FOUR) {
            humblockedfours.push(p1)
        } else if(scoreCom >= 2*THREE) {
            //能成双三也行
            comtwothrees.push(p1)
        } else if(scoreHum >= 2*THREE) {
            humtwothrees.push(p1)
        } else if(scoreCom >= THREE) {
            comthrees.push(p1)
        } else if(scoreHum >= THREE) {
            humthrees.push(p1)
        } else if(scoreCom >= TWO) {
            comtwos.shift(p1)
        } else if(scoreHum >= TWO) {
            humtwos.shift(p1)
        } else {
            neighbors.push(p1)
        }
        }
    }
    }
}

//如果成五，是必杀棋，直接返回

// console.log(fives.length>=1)
if(fives.length>=1) 
    return fives
// console.log(111)
// 自己能活四，则直接活四，不考虑冲四
if (role === COM && comfours.length) return comfours
if (role === HUM && humfours.length) return humfours

// 对面有活四冲四，自己冲四都没，则只考虑对面活四 （此时对面冲四就不用考虑了)

if (role === COM && humfours.length && !comblockedfours.length) return humfours
if (role === HUM && comfours.length && !humblockedfours.length) return comfours

// 对面有活四自己有冲四，则都考虑下
var fours = role === COM ? comfours.concat(humfours) : humfours.concat(comfours)
var blockedfours = role === COM ? comblockedfours.concat(humblockedfours) : humblockedfours.concat(comblockedfours)
if (fours.length) return fours.concat(blockedfours)

var result = []
if (role === COM) {
    result = 
    comtwothrees
    .concat(humtwothrees)
    .concat(comblockedfours)
    .concat(humblockedfours)
    .concat(comthrees)
    .concat(humthrees)
}
// console.log(result)
if (role === HUM) {
    result = 
    humtwothrees
    .concat(comtwothrees)
    .concat(humblockedfours)
    .concat(comblockedfours)
    .concat(humthrees)
    .concat(comthrees)
}
// console.log(result)
// result.sort(function(a, b) { return b.score - a.score })

//双三很特殊，因为能形成双三的不一定比一个活三强
if(comtwothrees.length || humtwothrees.length) {
    return result
}


// 只返回大于等于活三的棋
// if (onlyThrees) {
//     return result
// }


var twos
if (role === COM) twos = comtwos.concat(humtwos)
else twos = humtwos.concat(comtwos)

twos.sort(function(a, b) { return b.score - a.score })
result = result.concat(twos.length ? twos : neighbors)

//这种分数低的，就不用全部计算了
if(result.length>20) {
    return result.slice(0, 20)
}

return result
}

function minmax(a,b,d,i1,j1)
{
    var d1=d;
    // console.log(i,j+"d"+d)
    var list=0;
    digui++;
    var xn=0,yn=0;
    
    if(d1>=DEPTH)
    {
        // console.log(DEPTH)
    //     console.log(lian5,huo4,chong4,huo3,mian3,huo2,mian2);
    // // if(ongoing!=1)
    // console.log(lian51,huo41,chong41,huo31,mian31,huo21,mian21)
    // console.log(evaluate(1))
        return evaluate(1,d1%2);//d为偶数，AI下棋，返回先手
    }
    var a1=a,b1=b;
    // if(d%2==1)
    // else
    // console.log("ab",a,b)
    // console.log("minmax",cons)
    var cons=gen((d1+1)%2,d1)
    // console.log("minmax",cons)
    var i,j;
    //有没有时候灭有更新nxny
    while(cons.length>0)
    {
        var cons1=cons.shift();
        // if(d1==0&&i1==nx&&j1==ny)
        //  {
        //     nx=cons1[0];
        //     ny=cons1[1];
        //     console.log("refresh"+d1,i,j+" "+list[1],a1,nx,ny);
        // }
        i=cons1[0];
        j=cons1[1];
        list=0;
        d1++;
        if(d1%2==1)
            board1[i][j]=1;
        else
            board1[i][j]=0;
        updateScore([i,j]);
        // console.log(i+"aaa"+j)
        evaluate(1,5);
        if(kill==1&&d1%2==1)
        {
            console.log("kill"+d1,i,j);
            a1=9999999997-d1;
            b1=9999999997-d1;
            if(d1==1){
                 nx=i;
            ny=j;
            console.log("refresh"+d1,i,j+" "+list[1],a1,nx,ny);
            return;
            }
            else
            {
                board1[i][j]=2;
                d1--;
                updateScore([i,j]);
                return [a1,b1]
            }
        }
        else if(kill==0&&d1%2==0)
        {
            console.log("kill"+d1,i,j);
            a1=-9999999995+d1;
            b1=-9999999995+d1;
            board1[i][j]=2;
            d1--;
            updateScore([i,j]);
            return [a1,b1]
        }
        else if(kill==1&&d1%2==0)
        {
            ;
        }
        else if(kill==0&&d1%2==1)
        {
            ;
        }
        else if(kill==2)
            list=minmax(a1,b1,d1,i,j);
        
        board1[i][j]=2;
        d1--;
        updateScore([i,j]);
        if(!list)
            continue;
        else if(list[1]>a1&&d1%2==0)
        {
            a1=list[1];
            if(d1==0)
            {
            nx=i;
            ny=j;
            console.log("refresh"+d1,i,j+" "+list[1],a1,nx,ny);
            }
            // console.log("refresh"+d1,i,j+" "+list[1],a1);
        }
        if(list[0]<b1&&d1%2==1)
        {
            b1=list[0];
        }
        if(b1<=a1)
        {
            cutnum++;
            return 0;
        }
    }
    if(d==0&&i1==nx&&j1==ny)
        console.log("error1")
    if(d==0)
        console.log("nx ny",nx,ny,i1,j1)
    return [a1,b1];
}


// for(var i=max(1,i1-1);i<=min(15,i1+1);i++)
//     {
//         for(var j=max(1,j1-1);j<=min(15,j1+1);j++)
//         {
//             list=0;
//             if(board1[i][j]==0)
//             {
                
//                 // console.log("minmax",n)
//                 //initial n:1 d:0
//                 n++;
//                 d1++;
//                 board1[i][j]=n;
//                 if(d1%2==1)
//                     board1[i][j]=1;
//                 else
//                     board1[i][j]=0;
//                 updateScore([i,j]);
//                 evaluate(1);
//                 // if(kill==1)
//                 //     a1=b1=99999999;
//                 // else if(kill==0)
//                 //     a1=b1=-99999999;
//                 // else
//                     list=minmax(a1,b1,d1,i,j);
                
//                 // console.log("list",list,a1,b1,xn,yn,nx,ny)
//                 // console.log(list)
//                 board1[i][j]=0;
//                 board1[i][j]=2;
//                 // board2[i][j]=0;
//                 n--;
//                 d1--;
//                 updateScore([i,j]);
//                 if(!list)
//                     continue;
//                 else if(list[1]>a1&&d1%2==0)
//                 {
//                     a1=list[1];
//                     if(d1==0)
//                     {
//                     nx=i;
//                     ny=j;
//                     console.log("refresh"+d1,i,j+" "+list[1],a1,nx,ny);
//                     }
//                     // console.log("refresh"+d1,i,j+" "+list[1],a1);
//                 }
//                 if(list[0]<b1&&d1%2==1)
//                 {
//                     b1=list[0];
//                 }
//                 if(b1<=a1)
//                 {
//                     cutnum++;
//                     return 0;
//                 }
//             }
//         }
//     }
//     for(var i=x1;i<=x2;i++)
//     {
//         for(var j=y1;j<=y2;j++)
//         {
//             list=0;
//             if((i-i1==1||i1-i==1)&&(j-j1==1||j1-j==1))
//                 continue;
//             if(board1[i][j]==0)
//             {
//                 // console.log(i,j+"d"+d)
//                 // console.log("minmax",n)
//                 //initial n:1 d:0
//                 n++;
//                 d1++;
//                 board1[i][j]=n;
//                 if(d1%2==1)
//                     board1[i][j]=1;
//                 else
//                     board1[i][j]=0;
//                 updateScore([i,j]);
//                 // var bbb=evaluate(1)
//                 evaluate(1);
//                 // if(kill==1)
//                 //     a1=b1=99999999;
//                 // else if(kill==0)
//                 //     a1=b1=-99999999;
//                 // else
//                     list=minmax(a1,b1,d1,i,j);
//                 // console.log("list",list,a1,b1,xn,yn,nx,ny)
//                 board1[i][j]=0;
//                 board1[i][j]=2;
//                 // board2[i][j]=0;
//                 n--;
//                 d1--;
//                 updateScore([i,j]);
//                 // var bba=evaluate(1)
//                 // var s2=COMScore;
//                 // var s4=HUMScore;
//                 // console.log("2222",bbb[0]-bba[0],s2,s4)
//                 if(!list)
//                     continue;
//                 if(list[1]>a1&&d1%2==0)
//                 {
                   
//                     a1=list[1];
//                     if(d1==0)
//                     {
//                     nx=i;
//                     ny=j;
//                     console.log("refresh"+d1,i,j+" "+list[1],a1,nx,ny);
//                     }
                    
//                 }
//                 if(list[0]<b1&&d1%2==1)
//                 {
//                     b1=list[0];
//                 }
//                 if(b1<=a1)
//                 {
//                     cutnum++;
//                     return 0;
//                 }
//             }
            
//         }
//     }
//     // if(d1==0)
//     //     console.log(COMScore,HUMScore)
//         // console.log("d"+d1+" "+a1+b1+' '+i1+' '+j1+' '+i+' '+j+' '+nx+' '+ny)
