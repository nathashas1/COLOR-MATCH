
document.addEventListener("DOMContentLoaded", () => {
});


window.addEventListener("load", () => {

  var ctx, balls = [];
  var orange = document.getElementById("orange");
  var red = document.getElementById("red");
  var blue = document.getElementById("blue");
  var green = document.getElementById("green");
  var grey = document.getElementById("grey");
  var purple = document.getElementById("purple");
  var circle = document.getElementById("circle");
  var rectangle = document.getElementById("rectangle");
  var imageList = [orange, red, blue, green, grey, purple];
  var gameOver = false

  function Ball(x,y) {
  }

  function hide() {
    const overlay = document.querySelector(".overlay-container");
    overlay.style.left = "100vw";
    overlay.style.opacity = 0;
    const main = document.querySelector(".maincontainer");
    main.style.width = "100%";
  }

  function unhide() {
    const overlay = document.querySelector(".overlay-container");
    overlay.style.left = "0";
    overlay.style.opacity = 1;
    const main = document.querySelector(".maincontainer");
    main.style.width = "100%";
    gameOver = false
    initialize();
  }
  window.unhide = unhide;

  const button = document.querySelector(".start");
    button.addEventListener("click", ()=> {
    hide();
  });



 var music1 = document.getElementById("myAudio1");
 var music2 = document.getElementById("myAudio2");
 var music3 = document.getElementById("myAudio3");
 var music4 = document.getElementById("myAudio4");
 var music5 = document.getElementById("myAudio5");
 var music6 = document.getElementById("myAudio6");
 var music7 = document.getElementById("myAudio7");
 var video = document.getElementById("myVideo");

 const button2 = document.querySelector(".startvideo");
  button2.addEventListener("click", ()=> {
  video.play();
 });

 function playAudio(music) {
   music.play();
 }

  const restartbutton = document.querySelector(".unhide");
  restartbutton.addEventListener("click", unhide);

  let score;
  let moves;
  function initialize(){
    //Create ball Objects

    score = 0;
    moves = 10;
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
    ctx.clearRect(0, 0, 600, 700);
    paint();
    // document.getElementById("canvas").addEventListener("click", clickHandler);
    document.getElementById("canvas").addEventListener("mousedown", dragStart,false);
    document.getElementById("canvas").addEventListener("mouseup", dragEnd,false);
    document.getElementById("canvas").addEventListener("mousemove", mousemove,false);
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


  function paint(deletedCount) {
        // drawImage(image, x, y, width, height)
    if (gameOver === true) return
    for (let j = 0; j < 10; j++) {
      for (let k = 9; k > 0; k--) {
        // replace deleted balls with balls from top
        if (balls[j][k] === undefined) {
            // playAudio(music2);
          let tempStore = balls[j][k-deletedCount];
          balls[j][k] = tempStore;
          balls[j][k-deletedCount] = undefined;
        }
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
          // create ballobjects in place of empty spaces
        if (balls[x][y] === undefined) {
            // playAudio(music2);
          balls[x][y] = new Ball(x,y);

        }
      }
    }

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
          // give color to newly created objects
        if (balls[x][y].color === undefined) {
          while (true) {
            var colorNum = Math.floor(Math.random() * 6);
            if (checkColor(x, y, colorNum)) {
              balls[x][y].color = colorNum;
              break;
            }
          }
        }
      }
    }
    // drawImage(image, x, y, width, height)
        for (let x = 0; x < 10; x++) {
          for (let y = 0; y < 10; y++) {
            ctx.drawImage(imageList[balls[x][y].color], x*60, y*60+100, 60, 60);
          }
        }
    ctx.font = 'bold 20px open Sans';
    ctx.textAlign = 'center';
    ctx.clearRect(200, 0, 300, 100);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.clearRect(0, 0, 300, 100);
    ctx.fillText('Moves Left :' , 150, 50);
    ctx.fillText(moves, 220, 50);
    ctx.clearRect(400, 0, 100, 100);
    ctx.fillText(score, 450, 50);
  }

  function win(){
    if (score > 390){
        document.getElementById("canvas").removeEventListener("mousedown", window.myDragStart);
        document.getElementById("canvas").removeEventListener("mouseup", window.myDragEnd);
      ctx.font = "60pt Calibri";
      ctx.fillText("You won!", 300, 400);
      gameOver = true
    } else if (moves === 0 && score <= 390){
          document.getElementById("canvas").removeEventListener("mousedown", window.myDragStart);
          document.getElementById("canvas").removeEventListener("mouseup", window.myDragEnd);
        ctx.font = "60pt Calibri";
        ctx.fillText("Game Over!", 300, 400);
        gameOver = true
    }
  }

  function findUnique(array){
      let set = new Set()
      let uniqueArray = []
      let i = 0
      let flagX = false
      let flagY = false
        if (array[i][0] === array[i+1][0]) {
          flagX = true
        } else {
          flagY = true
        }
      if (flagX === true) {
        for (let i = 0; i < array.length; i++) {
          if (!(set.has(array[i][1]))){
            uniqueArray.push(array[i])
            set.add(array[i][1])
          }
        }
      } else {
        for (let i = 0; i < array.length; i++) {
          if (!(set.has(array[i][0]))){
            uniqueArray.push(array[i])
            set.add(array[i][0])
          }
        }
      }
      return uniqueArray
    }

  async function checkStatus(){
    document.getElementById("canvas").addEventListener("mousedown", dragStart,false);
    document.getElementById("canvas").addEventListener("mouseup", dragEnd,false);
    var winChance = false
    let match;
    for (let x = 0; x < 10; x++) {
      match = [];
      for (let y = 0; y < 8; y++) {
            if (balls[x][y].color === balls[x][y+1].color && balls[x][y].color === balls[x][y+2].color) {
              match.push([x,y]);
              match.push([x,y+1]);
              match.push([x,y+2]);
            }
          }
          if (match.length >= 3) {
            matchUnique = findUnique(match)
            removeBalls(matchUnique,matchUnique.length);
            winChance = true
          }
        }

    for (let y = 0; y < 10; y++) {
      match = [];
      for (let x = 0; x < 8; x++) {
          if (balls[x][y].color === balls[x+1][y].color && balls[x][y].color === balls[x+2][y].color) {
            match.push([x,y]);
            match.push([x+1,y]);
            match.push([x+2,y]);
          }
        }
        if (match.length >= 3) {
          console.log("match",match)
          matchUnique = findUnique(match)
          console.log("matchuniq",matchUnique)
          removeBalls(matchUnique,1);
          winChance = true
        }
      }

    if (winChance === false) {
      win()
    }
  }

  initialize();

  let match = [];
  let x1 = -1;
  let y1 = -1;
  let x2 = -1;
  let y2 = -1;
  let color1 = -1;
  let color2 = -1 ;
  let swapTurn;
  var isDown = false;
  var isDrag = false;
  let prevX;
  let prevY;

  window.myDragStart = dragStart;
  window.myDragEnd = dragEnd;

  function addBackground(x,y) {
    ctx.drawImage(circle, x*60, 100 + (y*60), 60,60);
    paint();
  }

  function hitJackpot(x,y) {
    ctx.drawImage(rectangle, x*60, 100 + (y*60), 60,60);
  }

  function clearCanvas() {
    ctx.clearRect(0,0,600,700);
    paint()
  }

  async function showElementmove(posx,posy,element,prevX,prevY){
    clearCanvas()
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    clearCanvasforDrag(x1,y1)
    ctx.drawImage(circle, posx*60, 100 + (posy*60), 60,60);
    ctx.drawImage(element,posx*60,posy*60 + 100, 60,60);
  }

  function clearCanvasforDrag(cx1,cy1) {
    ctx.clearRect(cx1*60, 100 + (cy1*60), 60,60);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function displayHit(array){
    for (let i = 0; i < array.length; i++) {
      xpos = array[i][0]
      ypos = array[i][1]
      hitJackpot(xpos,ypos)
      paint()
    }
  }

   function dragStart(e){
    isDown = true
    isDrag = false;
    playAudio(music1);
    if (x1 === -1) {
      x1 = Math.floor(e.offsetX/60);
      y1 = Math.floor(e.offsetY/60)-2;
      color1 = balls[x1][y1].color;;
      addBackground(x1,y1);
    }
  }

  function dragEnd(e){
    swapTurn = 1
    isDown = false
    if (x1 !== -1) {
      x2 = Math.floor(e.offsetX/60);
      y2 = Math.floor(e.offsetY/60)-2;

      if (balls[x2][y2] === undefined) {
        clearCanvas()
      } else {
          color2 = balls[x2][y2].color;
      }

      let adjacent = checkAdjacent();
      if (adjacent) {
        swap(x1,y1,x2,y2,swapTurn);
      } else if(isDrag === true) {
        clearCanvas();
        playAudio(music6)
      } else if(isDrag === false){
        clearCanvas();
      }
      x1 = -1;
      y1 = -1;
    }
  }


  function mousemove(e){
    isDrag = true;
    if (isDown === true) {
      let posX = (e.offsetX-30)/60
      let posY = ((e.offsetY-30)/60)-1.65;
       prevX =  Math.floor(e.offsetX/60)
       prevY = Math.floor(e.offsetY/60)-2
      let element = imageList[balls[x1][y1].color]
      showElementmove(posX, posY,element,prevX,prevY)
    }
  }

  function checkAdjacent() {
    if ((x1 === x2 && (y2 === y1+1 || y2 === y1 - 1)) || (y1 === y2 && (x2 === x1+1 || x2 === x1 - 1))) {
      return true;
    }
      return false;
  }

    async function swap(bx1,by1,bx2,by2,turn) {
      debugger
      let canSwap = false;
      //check in x coordinate
      let matchRow = [];
      let yflag = true;
      let i = 1;
      while (true) {
        if ((bx2-i === -1) || (bx2-i === bx1) || (balls[bx2-i][by2].color !== balls[bx1][by1].color)) {
          break;
        }
        if (balls[bx2-i][by2].color === balls[bx1][by1].color) {
          matchRow.push([bx2-i,by2]);
          i+=1;
        }
      }
      i = 1;
      while(true){
        if ((bx2+i === 10) || (bx2+i === bx1) || (balls[bx2+i][by2].color !== balls[bx1][by1].color)) {
          break;
        }
        if (balls[bx2+i][by2].color === balls[bx1][by1].color) {
          matchRow.push([bx2+i,by2]);
          i+=1;
        }
      }

      if (matchRow.length >= 2){
        canSwap = true;
        if(!matchRow.includes([bx2,by2])) {
          matchRow.push([bx2,by2]);
        }

        let temp = balls[bx1][by1];
        balls[bx1][by1] = balls[bx2][by2];
        balls[bx2][by2] = temp;
        moves -= 1;
        yflag = false;
        clearCanvas();
        addBackground(x2,y2)
        playAudio(music1);
        await sleep(500)
        removeBalls(matchRow,1);
      }

    //check in y coordinate
    let j = 1;
    let matchColumn = [];
    while (yflag){
      while (true) {
        if ((by2-j === -1) || (by2-j === by1) || (balls[bx2][by2-j].color !== balls[bx1][by1].color)) {
            break;
        }
        if (balls[bx2][by2-j].color === balls[bx1][by1].color) {
          matchColumn.push([bx2,by2-j]);
          j+=1;
        }
      }

      j = 1;
      while(true){
        if ((by2+j === 10) || (by2+j === by1) || (balls[bx2][by2+j].color !== balls[bx1][by1].color)) {
          break;
        }
        if (balls[bx2][by2+j].color === balls[bx1][by1].color) {
          matchColumn.push([bx2,by2+j]);
          j+=1;
        }
      }
      yflag = false;
    }

  if (matchColumn.length >= 2){
    canSwap = true;

    if(!matchColumn.includes([bx2,by2])) {
      matchColumn.push([bx2,by2]);
    }
    let temp = balls[bx1][by1];
    balls[bx1][by1] = balls[bx2][by2];
    balls[bx2][by2] = temp;
    moves -= 1;
    clearCanvas();
    addBackground(x2,y2)
    playAudio(music1);
    await sleep(500)
    removeBalls(matchColumn, matchColumn.length);
  }
  if (canSwap === false && turn === 1) {
    swap(x2,y2,x1,y1,2)
  } else if (canSwap === false && turn === 2){
    playAudio(music6)
    clearCanvas();
  }
}

async function removeBalls(array, slideCount){
  document.getElementById("canvas").removeEventListener("mousedown", window.myDragStart);
  document.getElementById("canvas").removeEventListener("mouseup", window.myDragEnd);
  clearCanvas();
  displayHit(array)
  playAudio(music5)
  await sleep(1300)
  let i = 0;

  while (i < array.length) {
    playAudio(music3);
    delete balls[array[i][0]][array[i][1]];
    ctx.clearRect(array[i][0]*60, 100 + (array[i][1]*60), 60,60);
    i+=1 ;
  }
    await sleep(800)
    score += array.length*10;
    paint(slideCount);
    playAudio(music4)
    await sleep(500)
    checkStatus()
  }

});
