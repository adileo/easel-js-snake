var Apple = function(grid){
  this.x = 0;
  this.y = 0;
  this.id = '';
  this.grid = grid;
  this.shape =  grid.container.appleLayer.addChild(new createjs.Shape());
  this.getById = function (id){
    for(var i = 0; i < this.grid.apples.length; i++){
      if(this.grid.apples[i].id == id){
        return this.grid.apples[i];
      }
    }
  }
  this.draw = function (){
    //this.shape.graphics.clear();
    this.shape.graphics.beginFill("#e54d42");
    this.shape.graphics.drawRect(this.x*this.grid.cell_width, this.y*this.grid.cell_height, this.grid.cell_width, this.grid.cell_height);
    this.shape.graphics.endFill();
    //this.shape.graphics.cache(0, 0, this.grid.cell_width,this.grid.cell_height,2);
  };
  this.eat = function (){
    //alert('eaten');
    //RIMUOVO DA MAPPA
    createjs.Sound.play("pop");
    this.grid.container.appleLayer.removeChild(this.shape);
    this.grid.map[this.x][this.y] = 0;
    //RIMUOVO DA LISTA
    for (var i = 0; i < this.grid.apples.length; i++){
      if(this.grid.apples[i].id == this.id){
        this.grid.apples.splice(i,1);
      }
    }
  };
};
