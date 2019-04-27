
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
  var goldCircle = document.getElementById("gold");
  var imageList = [orange, red, blue, green, grey, purple];

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
    ctx.clearRect(0, 0, 600, 600);
    paint();
    document.getElementById("canvas").addEventListener("click", clickHandler);
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
    ctx.fillText('Moves Left :' , 150, 50);
    ctx.fillText(moves, 220, 50);
    ctx.clearRect(400, 0, 100, 100);
    ctx.fillText(score, 450, 50);

    if (score > 390){
      document.getElementById("canvas").removeEventListener("click", window.myClickHandler);
      ctx.font = "60pt Calibri";
      ctx.fillText("You won!", 300, 400);
    }
  }


  function checkStatus(){
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 8; y++) {
        match = [];
        let callpaintx = false;
            if (balls[x][y].color === balls[x][y+1].color && balls[x][y].color === balls[x][y+2].color) {
              match.push([x,y]);
              match.push([x,y+1]);
              match.push([x,y+2]);
              removeBalls(match,3);
            }
          }
        }

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 8; x++) {
        match = [];
        let callpainty = false;
        if (balls[x][y].color === balls[x+1][y].color && balls[x][y].color === balls[x+2][y].color) {
          match.push([x,y]);
          match.push([x+1,y]);
          match.push([x+2,y]);
          removeBalls(match,1);
        }
        }
      }
    if (moves === 0 && score <= 390){
      document.getElementById("canvas").removeEventListener("click", window.myClickHandler);
      ctx.font = "60pt Calibri";
      ctx.fillText("Game Over!", 300, 400);
    }
  }

  window.setInterval(function(){
    checkStatus();
  }, 1000);


  initialize();

  let match = [];
  let x1 = -1;
  let y1 = -1;
  let x2 = -1;
  let y2 = -1;
  let color1 = -1;
  let color2 = -1 ;

  window.myClickHandler = clickHandler;

  function addBackground(x,y) {
    ctx.fillStyle = 'rgba(0,255,0,1)';
    ctx.fillRect(x*60, 100 + (y*60), 60,60);
    ctx.drawImage(goldCircle, x*60, 100 + (y*60), 60,60);
  }


  function clearBackground(cx1,cy1,cx2,cy2) {
    ctx.clearRect(cx1*60, 100 + (cy1*60), 60,60);
    ctx.clearRect(cx2*60, 100 + (cy2*60), 60,60);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function clickHandler(e) {
    debugger
    playAudio(music1);
    if (x1 === -1) {
      x1 = Math.floor(e.offsetX/60);
      y1 = Math.floor(e.offsetY/60)-2;
      color1 = balls[x1][y1].color;;
      addBackground(x1,y1);
      paint();
    } else {
      debugger
      x2 = Math.floor(e.offsetX/60);
      y2 = Math.floor(e.offsetY/60)-2;
      color2 = balls[x2][y2].color;
      let adjacent = checkAdjacent();

      if (adjacent) {
        swap(x1,y1,x2,y2);
      } else {
        clearBackground(x1,y1,x2,y2);
        paint();
        alert("Please select adjacent balls");
      }
      x1 = -1;
      y1 = -1;
    }
  }

  function checkAdjacent() {
    if ((x1 === x2 && (y2 === y1+1 || y2 === y1 - 1)) || (y1 === y2 && (x2 === x1+1 || x2 === x1 - 1))) {
      return true;
    }
      return false;
  }

    function swap(bx1,by1,bx2,by2) {
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
        clearBackground(x1,y1,x2,y2);
        paint();
        setTimeout(function () {
          removeBalls(matchRow,1);
        }, 1000);
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
    clearBackground(x1,y1,x2,y2);
    paint();
    setTimeout(function () {
      removeBalls(matchColumn, matchColumn.length);
    }, 800);
  }
  if (canSwap == false) {
    alert("Cant be swapped.Please bring 3 same color balls together by swapping");
    clearBackground(x1,y1,x2,y2);
    paint();
  } else {
      addBackground(x2,y2)
      paint()
  }
}

function removeBalls(array, slideCount){
  debugger
  let i = 0;
  while (i < array.length) {
    playAudio(music3);
    delete balls[array[i][0]][array[i][1]];
    ctx.clearRect(array[i][0]*60, 100 + (array[i][1]*60), 60,60);
    i+=1 ;
  }
  setTimeout(function(){
    score += array.length*10;
    paint(slideCount);
  }, 1000);


  }

});
