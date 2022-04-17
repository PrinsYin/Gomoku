
var fixScore = function(type) {
    if(type < FOUR && type >= BLOCKED_FOUR) {
  
      if(type >= BLOCKED_FOUR && type < (BLOCKED_FOUR + THREE)) {
        //单独冲四，意义不大
        return THREE
      } else if(type >= BLOCKED_FOUR + THREE && type < BLOCKED_FOUR * 2) {
        return FOUR  //冲四活三，比双三分高，相当于自己形成活四
      } else {
        //双冲四 比活四分数也高
        return FOUR * 2
      }
    }
    return type
  }

function updateScore (p) 
{
    var radius = 4;
    function update(x, y, dir)
     {  
      var role = board1[x][y]
      if (role !== reverserole(COM)) {
        var cs = scorePoint( x, y,COM, dir)
        COMScore[x][y] = cs
        // statistic.table[x][y] += cs
      } else COMScore[x][y] = 0
      if (role !== reverserole(HUM)) {
        var hs = scorePoint(x, y,HUM, dir)
        HUMScore[x][y] = hs
        // statistic.table[x][y] += hs？？？？？？？？？？？？？？？？+=？
      } else HUMScore[x][y] = 0

    }
    // 无论是不是空位 都需要更新
    // -
    for(var i=-radius;i<=radius;i++) {
      var x = p[0], y = p[1]+i
      if(y<1) continue
      if(y>=15) break
      update(x, y, 0)
    }

    // |
    for(var i=-radius;i<=radius;i++) {
      var x = p[0]+i, y = p[1]
      if(x<1) continue
      if(x>=15) break
      update(x, y, 1)
    }

    // \
    for(var i=-radius;i<=radius;i++) {
      var x = p[0]+i, y = p[1]+i
      if(x<1 || y<1) continue
      if(x>=15 || y>=15) break
      update(x, y, 2)
    }

    // /
    for(var i=-radius;i<=radius;i++) {
      var x = p[0]+i, y = p[1]-i
      if(x<1 || y<1) continue
      if(x>=15 || y>=15) continue
      update(x, y, 3)
    }


  }
  function hasNeighbor (x, y, distance, count)
   {
    var startX = x-distance
    var endX = x+distance
    var startY = y-distance
    var endY = y+distance
    for(var i=startX;i<=endX;i++) {
      if(i<1||i>=15) continue
      for(var j=startY;j<=endY;j++) {
        if(j<1||j>=15) continue
        if(i==x && j==y) continue
        if(board1[i][j] != EMPTY) {
          count --
          if(count <= 0) return true
        }
      }
    }
    return false
  }


function initScore () 
{

    for(var i=x1;i<x2;i++) {
      for(var j=y1;j<y2;j++) {
        // 空位，对双方都打分
        if(board1[i][j] ==EMPTY) {
          if(hasNeighbor(i, j, 2, 2))
          { //必须是有邻居的才行
            var cs = scorePoint(i, j,COM)
            var hs = scorePoint(i, j,HUM)
            COMScore[i][j] = cs
            HUMScore[i][j] = hs
          }

        } else if (board1[i][j] ==COM) { // 对电脑打分，玩家此位置分数为0
          COMScore[i][j] = scorePoint(i, j,COM)
          HUMScore[i][j] = 0
        } else if (board1[i][j] ==HUM) { // 对玩家打分，电脑位置分数为0
          HUMScore[i][j] = scorePoint(i, j,HUM)
          COMScore[i][j] = 0
        }
      }
    }
  }

function evaluate(role,dd) 
{
  kill=2;
    var COMMaxScore = 0
    var HUMMaxScore = 0

    //遍历出最高分，开销不大
    for(var i=1;i<16;i++) 
    {
      for(var j=1;j<16;j++) 
      {
        if(board1[i][j] == COM) 
        {
          COMMaxScore += fixScore(COMScore[i][j])
        }
         else if (board1[i][j] == HUM) 
        {
          HUMMaxScore += fixScore(HUMScore[i][j])
        }
      }
    }
    // 有冲四延伸了，不需要专门处理冲四活三
    // 不过这里做了这一步，可以减少电脑胡乱冲四的毛病
    //COMMaxScore = fixScore(COMMaxScore)
    //HUMMaxScore = fixScore(HUMMaxScore)
    if(COMMaxScore == HUMMaxScore)
      return [0,0];
    if(dd&&dd==0)
      COMMaxScore*=3;
    else (dd&&dd==1)
      HUMMaxScore*=3;
    var result = (COMMaxScore - HUMMaxScore)
    if(result>5000000)
      kill=1;
    if(result<-5000000)
      kill=0;
    result = (role == COM ? 1 : -1) * result
    // if (config.cache) evaluateCache[zobrist.code] = result
    // console.log("evaluate",result)
    return [result,result]
}

// function getvalue()
// {
//     // console.log("gett")
//     var ss;
//     var ai=1;
//     var l;
//     var aisum=0;
//     var isum=0;
//     var sum1=0,sum2=0;
//     lian5=0,huo4=0,chong4=0,huo3=0,mian3=0,huo2=0,mian2=0;
//     lian51=0,huo41=0,chong41=0,huo31=0,mian31=0,huo21=0,mian21=0;
//     for(var i=x1;i<=x2;i++)
//     {
//         l="";
//         aisum=0;
//         isum=0;
//         for(var j=y1;j<=y2;j++)
//         {
//            l=l+board1[i][j];
//         //    console.log(l)
//            if(board1[i][j]==1)
//                 aisum++;
//             else if(board1[i][j]==0)
//                 isum++;
//            if(board1[i][j]==1)
//                 sum1+=board2[i][j];
//             else if(board1[i][j]==0)
//                 sum2+=board2[i][j];
//             // if(ss=checkkill())
//             //     return ss;
//         }
//         if(ongoing!=1)
//                 console.log(l)
//         if(aisum>1||isum>1)
//             analine(l);
        
//     }
//     ss=getscore();
//     // console.log("getsssss")
//     // console.log(lian5,huo4,chong4,huo3,mian3,huo2,mian2);
//     // console.log(lian51,huo41,chong41,huo31,mian31,huo21,mian21)
//     // console.log(ss)
//     return [ss[0]+sum1-sum2,ss[0]+sum1-sum2];
// }
