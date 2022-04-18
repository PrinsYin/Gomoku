/*
 * 启发式评价函数
 * 这个是专门给某一个位置打分的，不是给整个棋盘打分的
 * 并且是只给某一个角色打分
 */
/*
 * 表示在当前位置下一个棋子后的分数
 * 为了性能考虑，增加了一个dir参数，如果没有传入则默认计算所有四个方向，如果传入值，则只计算其中一个方向的值
 */

//问题：先搜索附近的点，结果弄错了
//问题3.17 评估函数不对，nx没更新，没有画点
//问题，对a1b1赋值而没有改变nx，
//判断到杀结果数字一样数字没差别导致没更新了。
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
var win=0;
var mute=0;
var canvas= document.getElementById('canvas')
var ctx=document.getElementById("canvas").getContext("2d");
var n=0;
var x1=6,y1=6,x2=10,y2=10;
var nx,ny;
var ongoing=0;
var allexpand=0;
var choose=0;//0:player first
var drawdone=0;

var kill=2;
var digui=0,cutnum=0;
var canvasHistory = [];
var cindex=0;
var xini=0,yini=0;
var HUMScore=[
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
var COMScore=[
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
const EMPTY=2;
const COM=1;
const HUM=0;

 const ONE=10;
 const TWO=100;
 const THREE= 1000;
 const FOUR= 100000;
 const  FIVE= 10000000;
 const BLOCKED_ONE=1;
 const  BLOCKED_TWO= 10;
 const  BLOCKED_THREE= 100;
 const BLOCKED_FOUR= 10000;
 const SIZE=16;
function createa(w, h) {
  var r = []
  for(var i=0;i<w;i++) {
    var row = new Array()
    for(var j=0;j<h;j++) {
      row.push(0)
    }
    r.push(row)
  }
  return r
}
var scoreCache = [
  
  [ // for role 1
    createa(SIZE, SIZE),
    createa(SIZE, SIZE),
    createa(SIZE, SIZE),
    createa(SIZE, SIZE)
  ],
  [ // for role 2
    createa(SIZE, SIZE),
    createa(SIZE, SIZE),
    createa(SIZE, SIZE),
    createa(SIZE, SIZE)
  ],
  []
]


function reverserole(r) 
{
  return r == 1 ? 0 : 1;
}

var scorePoint = function(px, py, role, dir)
{
  // var board1=board1;
  var result = 0,
    radius = 8,//???????????????
    empnum = 0;
  var count = 0, block = 0, secondCount = 0  //另一个方向的count


  function reset() 
  {
    count = 1
    block = 0
    empnum = -1;
    secondCount = 0  //另一个方向的count
  }
  

  if (dir === undefined || dir === 0) 
  {
    reset()

    for(var i=py+1;true;i++) 
    {
      if(i>=16) {
        block ++
        break
      }
      // console.log(px,i)
      var t = board1[px][i]
      if(t === EMPTY) {
        if(empnum == -1 && i<16-1 && board1[px][i+1] == role) {
          empnum = count
          continue
        } else {
          break
        }
      }
      if(t === role) {
        count ++
        continue
      } else {
        block ++
        break
      }
    }


    for(var i=py-1;true;i--) {
      if(i<1) {
        block ++
        break
      }
      var t = board1[px][i]
      if(t === EMPTY) {
        if(empnum == -1 && i>1 && board1[px][i-1] == role) {
          empnum = 0  //注意这里是0，因为是从右往左走的
          continue
        } else {
          break
        }
      }
      if(t === role) {
        secondCount ++
        empnum !== -1 &&empnum++  //注意这里，如果左边又多了己方棋子，那么EMPTY的位置就变大了
        continue
      } else {
        block ++
        break
      }
    }

    count+= secondCount

    scoreCache[role][0][px][py]= countToScore(count, block, empnum)
  }
  result += scoreCache[role][0][px][py];

  if (dir === undefined || dir === 1) {

    // |
    reset()

    for(var i=px+1;true;i++) {
      if(i>=16) {
        block ++
        break
      }
      var t = board1[i][py]
      if(t === EMPTY) {
        if(empnum== -1 && i<16-1 && board1[i+1][py] == role) {
          empnum = count
          continue
        } else {
          break
        }
      }
      if(t === role) {
        count ++
        continue
      } else {
        block ++
        break
      }
    }

    for(var i=px-1;true;i--) {
      if(i<1) {
        block ++
        break
      }
      var t = board1[i][py]
      if(t === EMPTY) {
        if(empnum == -1 && i>1 && board1[i-1][py] == role) {
          empnum = 0
          continue
        } else {
          break
        }
      }
      if(t === role) {
        secondCount++
        empnum !== -1 && empnum ++  //注意这里，如果左边又多了己方棋子，那么EMPTY的位置就变大了
        continue
      } else {
        block ++
        break
      }
    }

    count += secondCount

    scoreCache[role][1][px][py] = countToScore(count, block, empnum)
  } 
  result += scoreCache[role][1][px][py]


  // \
  if (dir === undefined || dir === 2) {
    reset()

    for(var i=1;true;i++) {
      var x = px+i, y = py+i
      if(x>15 || y>15) {
        block ++
        break
      }
      var t = board1[x][y]
      if(t === EMPTY) {
        if(empnum== -1 && (x<16-1 && y < 16-1) && board1[x+1][y+1] == role) {
          empnum = count
          continue
        } else {
          break
        }
      }
      if(t === role) {
        count ++
        continue
      } else {
        block ++
        break
      }
    }

    for(var i=1;true;i++) {
      var x = px-i, y = py-i
      if(x<1||y<1) {
        block ++
        break
      }
      var t = board1[x][y]
      if(t === EMPTY) {
        if(empnum == -1 && (x>1 && y>1) && board1[x-1][y-1] == role) {
          empnum = 0
          continue
        } else {
          break
        }
      }
      if(t === role) {
        secondCount ++
        empnum !== -1 && empnum ++  //注意这里，如果左边又多了己方棋子，那么EMPTY的位置就变大了
        continue
      } else {
        block ++
        break
      }
    }

    count+= secondCount

    scoreCache[role][2][px][py] = countToScore(count, block, empnum)
  }
  result += scoreCache[role][2][px][py]


  // /
  if (dir === undefined || dir === 3) {
    reset()

    for(var i=1; true;i++) {
      var x = px+i, y = py-i
      if(x<0||y<0||x>=15||y>=15) {
        block ++
        break
      }
      var t = board1[x][y]
      if(t === EMPTY) {
        if(empnum== -1 && (x<16-1 && y>1) && board1[x+1][y-1] == role) {
          empnum= count
          continue
        } else {
          break
        }
      }
      if(t === role) {
        count ++
        continue
      } else {
        block ++
        break
      }
    }

    for(var i=1;true;i++) {
      var x = px-i, y = py+i
      if(x<0||y<0||x>=15||y>=15) {
        block ++
        break
      }
      var t = board1[x][y]
      if(t === EMPTY) {
        if(empnum == -1 && (x>01&& y<16-1) && board1[x-1][y+1] == role) {
          empnum = 0
          continue
        } else {
          break
        }
      }
      if(t === role) {
        secondCount++
        empnum !== -1 && empnum ++  //注意这里，如果左边又多了己方棋子，那么EMPTY的位置就变大了
        continue
      } else {
        block ++
        break
      }
    }

    count += secondCount

    scoreCache[role][3][px][py]= countToScore(count, block, empnum)
  }
  result += scoreCache[role][3][px][py]

  return result
}


var countToScore = function(count, block, empnum) 
{

  if(empnum === undefined) empnum = 0

  //没有空位
  if(empnum <= 0) {
    if(count >= 5) return FIVE
    if(block === 0) {
      switch(count) {
        case 1: return ONE
        case 2: return TWO
        case 3: return THREE
        case 4: return FOUR
      }
    }

    if(block === 1) {
      switch(count) {
        case 1: return BLOCKED_ONE
        case 2: return BLOCKED_TWO
        case 3: return BLOCKED_THREE
        case 4: return BLOCKED_FOUR
      }
    }

  } else if(empnum === 1 || empnum == count-1) {
    //第1个是空位
    if(count >= 6) {
      return FIVE
    }
    if(block === 0) {
      switch(count) {
        case 2: return TWO/2
        case 3: return THREE
        case 4: return BLOCKED_FOUR
        case 5: return FOUR
      }
    }

    if(block === 1) {
      switch(count) {
        case 2: return BLOCKED_TWO
        case 3: return BLOCKED_THREE
        case 4: return BLOCKED_FOUR
        case 5: return BLOCKED_FOUR
      }
    }
  } else if(empnum === 2 || empnum == count-2) {
    //第二个是空位
    if(count >= 7) {
      return FIVE
    }
    if(block === 0) {
      switch(count) {
        case 3: return THREE
        case 4: 
        case 5: return BLOCKED_FOUR
        case 6: return FOUR
      }
    }

    if(block === 1) {
      switch(count) {
        case 3: return BLOCKED_THREE
        case 4: return BLOCKED_FOUR
        case 5: return BLOCKED_FOUR
        case 6: return FOUR
      }
    }

    if(block === 2) {
      switch(count) {
        case 4:
        case 5:
        case 6: return BLOCKED_FOUR
      }
    }
  } else if(empnum === 3 || empnum == count-3) {
    if(count >= 8) {
      return FIVE
    }
    if(block === 0) {
      switch(count) {
        case 4:
        case 5: return THREE
        case 6: return BLOCKED_FOUR
        case 7: return FOUR
      }
    }

    if(block === 1) {
      switch(count) {
        case 4:
        case 5:
        case 6: return BLOCKED_FOUR
        case 7: return FOUR
      }
    }

    if(block === 2) {
      switch(count) {
        case 4:
        case 5:
        case 6:
        case 7: return BLOCKED_FOUR
      }
    }
  } else if(empnum === 4 || empnum == count-4) {
    if(count >= 9) {
      return FIVE
    }
    if(block === 0) {
      switch(count) {
        case 5:
        case 6:
        case 7:
        case 8: return FOUR
      }
    }

    if(block === 1) {
      switch(count) {
        case 4:
        case 5:
        case 6:
        case 7: return BLOCKED_FOUR
        case 8: return FOUR
      }
    }

    if(block === 2) {
      switch(count) {
        case 5:
        case 6:
        case 7:
        case 8: return BLOCKED_FOUR
      }
    }
  } else if(empnum === 5 || empnum == count-5) {
    return FIVE
  }

  return 0
}