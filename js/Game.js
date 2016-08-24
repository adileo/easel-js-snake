function init() {
  // code here.
  //Create a stage by getting a reference to the canvas
  var cell_width = 20;
  var cell_height = 20;
  var width = 900;
  var height = 500;
  createjs.Sound.registerSound("sfx/pop.mp3", "pop");

  stage = new createjs.Stage("demoCanvas");
  //RESIZE OF THE CANVAS
  if (window.devicePixelRatio) {
      // grab the width and height from canvas
      canvas = document.getElementById("demoCanvas");
      var height = canvas.getAttribute('height');
      var width = canvas.getAttribute('width');
      // reset the canvas width and height with window.devicePixelRatio applied
      canvas.setAttribute('width', Math.round(width * window.devicePixelRatio));
      canvas.setAttribute('height', Math.round( height * window.devicePixelRatio));
      // force the canvas back to the original size using css
      canvas.style.width = width+"px";
      canvas.style.height = height+"px";
      // set CreateJS to render scaled
      stage.scaleX = stage.scaleY = window.devicePixelRatio;
  }

  var grid = new Grid(stage, cell_width, cell_height, width, height);
  grid.drawGrid();
  var snake = new Snake(1,1, grid);


  //Update stage will render next frame
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setFPS(30);
  //called 60 times per second
  function handleTick() {
      //handle keyboard
      grid.spawnRandom();
      //update snake position
      snake.draw();
      //draw snake
      stage.update();
  }

  document.onkeydown = checkKey;

  function checkKey(e) {

      e = e || window.event;

      if (e.keyCode == '38') {
          snake.changeDirection('up');
      }
      else if (e.keyCode == '40') {
          snake.changeDirection('down');
      }
      else if (e.keyCode == '37') {
         snake.changeDirection('left');
      }
      else if (e.keyCode == '39') {
         snake.changeDirection('right');
      }

  }
  //Update stage will render next frame

}
