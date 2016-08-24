var Grid = function(stage, cell_width, cell_height, width, height){
  this.stage = stage;
  this.cell_width = cell_width;
  this.cell_height = cell_height;
  this.width = width;
  this.height = height;
  this.n_rows = this.height / this.cell_height;
  this.n_columns = this.width / this.cell_width;
  this.map = new Array(this.n_columns);
  for (var i = 0; i < this.n_columns; i++) {
    this.map[i] = new Array(this.n_rows);
  }
  this.apples = [];
  this.container = new createjs.Container();
  stage.addChild(this.container);
  this.container.appleLayer = new createjs.Container();

  /*
  createjs.Tween.get(this.container, { loop: true })
  .to({ rotation: 360 }, 1000, createjs.Ease.getPowInOut(4))
  .to({ rotation: 0}, 1000, createjs.Ease.getPowInOut(4));*/
  this.drawGrid = function(){
    var grid = new createjs.Shape();
    for (r=0; r <= this.n_rows; r++){
      grid.graphics.setStrokeStyle(1);
      grid.graphics.beginStroke("#ecf0f1");
      grid.graphics.moveTo(0, r*cell_height);
      grid.graphics.lineTo(width, r*cell_height);
      grid.graphics.endStroke();
      for (c=0; c <= this.n_columns; c++){
        grid.graphics.setStrokeStyle(1);
        grid.graphics.beginStroke("#ecf0f1");
        grid.graphics.moveTo(c*cell_width, 0);
        grid.graphics.lineTo(c*cell_width, height);
        grid.graphics.endStroke();
      }
    }
    grid.cache(0, 0, this.width,this.height,2);
    this.container.addChild(grid);
      this.container.addChild(this.container.appleLayer);
  };
  this.spawnRandom = function (){

    if(this.apples.length < 3){

      app = new Apple(this);
      app.x = Math.floor((Math.random() * (this.n_columns-1)) + 0);
      app.y = Math.floor((Math.random() * (this.n_rows-1)) + 0);
      //alert('spawn mela: X'+ app.x +'Y'+ app.y)
      app.id = 'apple-'+app.x+"-"+app.y;
      app.draw();
      this.apples.push(app);
      this.map[app.x][app.y] = app.id;
    }
  };
};
