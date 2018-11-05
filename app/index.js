

window.addEventListener("load", () => {

var ctx, balls = [];
var orange = document.getElementById("orange");
var red = document.getElementById("red");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
var grey = document.getElementById("grey");
var purple = document.getElementById("purple");
var imageList = [orange, red, blue, green, grey, purple];

function Ball(x,y) {
  this.x1 = x;
  this.y1 = y;
  this.x2 = x;
  this.y2 = y;
}

function initialize(){
  //Create ball Objects
  for (let x = 0; x < 10; x++) {
    balls[x] = [];
    for (let y = 0; y < 10; y++) {
      balls[x][y] = new Ball(x,y);
    }
  }

  //Set Color
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      while (true) {
        var colorNum = Math.floor(Math.random() * 6);
        if (checkColor(x, y, colorNum)) {
          balls[x][y].color = colorNum;
          break;
        }
      }
    }
  }
  // initialize canvas
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  paint();
}

function checkColor(x, y, c) {
  let flag =true;

  if(x > 1) {
    let c0 = balls[x-2][y].color;
    let c1 = balls[x-1][y].color;
    if (c0 === c1 && c1 === c) {
      flag = false;
    }
  }

  if(y > 1) {
    let c0 = balls[x][y-2].color;
    let c1 = balls[x][y-1].color;
    if (c0 === c1 && c1 === c) {
      flag = false;
    }
  }
  return flag;
}

let match = [];
function paint() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      // drawImage(image, x, y, width, height)


      if (balls[x][y] === undefined) {

        balls[x][y] = new Ball(x,y);
        console.log("color",balls[x][y].color);
        while (true) {
          var colorNum = Math.floor(Math.random() * 6);
          if (checkColor(x, y, colorNum)) {
            balls[x][y].color = colorNum;
            break;
          }
        }
      }



      ctx.drawImage(imageList[balls[x][y].color], x*60, y*60+100, 60, 60);
  


  }
}
  ctx.font = 'bold 20px open Sans';
  ctx.textAlign = 'center';
  ctx.fillText('Moves Left : 10', 150, 50);
  ctx.fillText('Score : 33333', 450, 50);
}

initialize();


let x1 = -1;
let y1 = -1;
let x2 = -1;
let y2 = -1;
let color1 = -1;
let color2 = -1 ;
document.getElementById("canvas").addEventListener("click", (e) => {
  if (x1 === -1) {
   x1 = Math.floor(e.offsetX/60);
   y1 = Math.floor(e.offsetY/60)-2;
   color1 = balls[x1][y1].color;
  }else {
    x2 = Math.floor(e.offsetX/60);
    y2 = Math.floor(e.offsetY/60)-2;
    color2 = balls[x2][y2].color;

    let adjacent = checkAdjacent(x1,y1,x2,y2);
    if (adjacent) {
      console.log("true adjacent", x1,y1,x2,y2);
      swap(x1,y1,x2,y2);
    }
    x1 = -1;
    y1 = -1;
  }
  });

  function checkAdjacent(x1,y1,x2,y2) {
    if ((x1 === x2 && (y2 === y1+1 || y2 === y1 - 1)) || (y1 === y2 && (x2 === x1+1 || x2 === x1 - 1))) {
      return true;
    }
    return false;
  }

  function swap(bx1,by1,bx2,by2) {
    //check in x coordinate
    match = [];
    let flag = true;
    let count = 0;
    let i = 1;
    while (flag){
      while (true) {
        if ((bx2-i === -1) || (bx2-i === bx1) || (balls[bx2-i][by2].color !== balls[bx1][by1].color)) {
            break;
          }
        if (balls[bx2-i][by2].color === balls[bx1][by1].color) {
          count += 1;
          match.push([bx2-i,by2]);
          i+=1;
        }
      }
      i = 1;
      while(true){
        if ((bx2+i === 10) || (bx2+i === bx1) || (balls[bx2+i][by2].color !== balls[bx1][by1].color)) {
          break;
        }
        if (balls[bx2+i][by2].color === balls[bx1][by1].color) {
          count += 1;
          match.push([bx2+i,by2]);
          i+=1;
        }
      }
      flag = false;
  }
  if (match.length >= 2) {
   match.push([bx2,by2]) ;
  }
  if (count >= 2){

    let temp = balls[bx1][by1];
    balls[bx1][by1] = balls[bx2][by2];
    balls[bx2][by2] = temp;
  }

  let n = 0;

  while (n < match.length) {
    delete balls[match[n][0]][match[n][1]];
    n+=1 ;
  }

  paint();
  if (match.length < 3) {
    match = [];
  }
  //check in y coordinate
  let yflag = true;
  let ycount = 0;
  let j = 1;
  while (yflag){
    while (true) {
      if ((by2-j === -1) || (by2-j === by1) || (balls[bx2][by2-j].color !== balls[bx1][by1].color)) {
          break;
        }
      if (balls[bx2][by2-j].color === balls[bx1][by1].color) {
        ycount += 1;
         match.push([bx2,by2-j]);
        j+=1;
      }
    }

    j = 1;
    while(true){
      if ((by2+j === 10) || (by2+j === by1) || (balls[bx2][by2+j].color !== balls[bx1][by1].color)) {
        break;
      }
      if (balls[bx2][by2+j].color === balls[bx1][by1].color) {
        ycount += 1;
        match.push([bx2,by2+j]);
        j+=1;
      }
    }
    yflag = false;
}

if (match.length >= 2) {
 match.push([bx2,by2]);
}
if (ycount >= 2){
  let temp = balls[bx1][by1];
  balls[bx1][by1] = balls[bx2][by2];
  balls[bx2][by2] = temp;
}
let m = 0;
while (m < match.length) {
  delete balls[match[m][0]][match[m][1]];
  m+=1 ;
}



paint();



  }

});
