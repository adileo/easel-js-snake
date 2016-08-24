var Snake = function(x_cell,y_cell, grid) {
  //snake list in position 0 coord of the head
  this.snake_pieces = [];
  this.snake_pieces.push ({x: x_cell,   y: y_cell});
  this.snake_pieces.push ({x: x_cell-1, y: y_cell});
  this.snake_pieces.push ({x: x_cell-2, y: y_cell});
  this.snake_pieces.push ({x: x_cell-3, y: y_cell});
  this.snake_pieces.push ({x: x_cell-4, y: y_cell});
  this.snake_pieces.push ({x: x_cell-5, y: y_cell});
  this.snake_pieces.push ({x: x_cell-6, y: y_cell});
  this.snake_pieces.push ({x: x_cell-7, y: y_cell});
  this.snake_pieces.push ({x: x_cell-8, y: y_cell});
  this.snake_pieces.push ({x: x_cell-9, y: y_cell});
  this.snake_pieces.push ({x: x_cell-10,y: y_cell});
  this.snake_pieces.push ({x: x_cell-11,y: y_cell});
  this.snake_pieces.push ({x: x_cell-12,y: y_cell});
  this.lenght = 12;
  this.direction = 'down';
  this.next_direction = 'down';
  this.speed = 20; //cells per second
  this.animationStep = 0;
  this.grid = grid;
  this.sshape = grid.container.addChild(new createjs.Shape());
  this.last_piece_previous_position = {};
  this.draw = function() {

    //se ho concluso animazione cambio direzione
    if (this.animationStep == 0){
      //this.move();
      //If head eat Apple
      cell = this.grid.map[this.snake_pieces[0].x][this.snake_pieces[0].y];

      if(cell){
        apple = new Apple(this.grid);
        apple = apple.getById(cell);
        apple.eat();
        this.snake_pieces.push(this.last_piece_previous_position);
        this.lenght +=1;
      }
      this.move();
    }

    this.sshape.graphics.clear();

    for (i=0; i<this.lenght; i++){
      //primo pezzo, testa

      if (i==0){

        if(this.direction == "up"){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[0].x * this.grid.cell_width, this.snake_pieces[0].y*this.grid.cell_height+this.grid.cell_height, this.grid.cell_width, -(this.grid.cell_height*this.animationStep/100));
          this.sshape.graphics.endFill();
        }else if(this.direction == "down"){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[0].x*this.grid.cell_width, this.snake_pieces[0].y*this.grid.cell_height, this.grid.cell_width, (this.grid.cell_height*this.animationStep/100));
          this.sshape.graphics.endFill();
        }else if(this.direction == "right"){

          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[0].x*this.grid.cell_width, this.snake_pieces[0].y*this.grid.cell_height, (this.grid.cell_width*this.animationStep/100), this.grid.cell_height);
          this.sshape.graphics.endFill();
        }else if(this.direction == "left"){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[0].x*this.grid.cell_width+this.grid.cell_width, this.snake_pieces[0].y*this.grid.cell_height, -(this.grid.cell_width*this.animationStep/100), this.grid.cell_height);
          this.sshape.graphics.endFill();
        }

      }else if (i==this.lenght-1){
        //empty box from right to left
        if (this.snake_pieces[i-1].x < this.snake_pieces[i].x){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[i].x*this.grid.cell_width, this.snake_pieces[i].y*this.grid.cell_height, this.grid.cell_width-(this.grid.cell_width*this.animationStep/100), this.grid.cell_height);
          this.sshape.graphics.endFill();
        }
        //empty box from left to right
        else if (this.snake_pieces[i-1].x > this.snake_pieces[i].x){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[i].x*this.grid.cell_width+(this.grid.cell_width*this.animationStep/100), this.snake_pieces[i].y*this.grid.cell_height, this.grid.cell_width-(this.grid.cell_width*this.animationStep/100), this.grid.cell_height);
          this.sshape.graphics.endFill();
        }
        //empty box from bottom to top
        else if (this.snake_pieces[i-1].y < this.snake_pieces[i].y ){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[i].x*this.grid.cell_width, this.snake_pieces[i].y*this.grid.cell_height, this.grid.cell_width, this.grid.cell_height-(this.grid.cell_height*this.animationStep/100));
          this.sshape.graphics.endFill();
        }
        //empty box from top to bottom ()
        else if (this.snake_pieces[i-1].y > this.snake_pieces[i].y){
          this.sshape.graphics.beginFill("#2c3e4f");
          this.sshape.graphics.drawRect(this.snake_pieces[i].x*this.grid.cell_width, this.snake_pieces[i].y*this.grid.cell_height+(this.grid.cell_height*this.animationStep/100), this.grid.cell_width, this.grid.cell_height-(this.grid.cell_height*this.animationStep/100));
          this.sshape.graphics.endFill();
        }
      }else{

      this.sshape.graphics.beginFill("#2c3e4f");
      this.sshape.graphics.drawRect(this.snake_pieces[i].x*this.grid.cell_width, this.snake_pieces[i].y*this.grid.cell_height, this.grid.cell_width, this.grid.cell_height);
      this.sshape.graphics.endFill();
      }

    }

    this.animationStep += 1*this.speed;
    if (this.animationStep >= 100){
        this.animationStep = 0;
    }
  };


  this.move = function(){

    //Move first piece of snake
    if (this.next_direction == "up"){
      //warp top -> bottom
      if(this.snake_pieces[0].y-1 < 0){
        head_piece = {x: this.snake_pieces[0].x, y: this.grid.n_rows-1};
      }else{
        head_piece = {x: this.snake_pieces[0].x, y: this.snake_pieces[0].y-1};
      }
    }else if (this.next_direction == "right"){
      //warp right -> left
      if(this.snake_pieces[0].x+1 > this.grid.n_columns-1){
        head_piece = {x: 0, y: this.snake_pieces[0].y};
      }else{
        head_piece = {x: this.snake_pieces[0].x+1, y: this.snake_pieces[0].y};
      }
    }else if (this.next_direction == "down"){
      //warp bottom -> up
      if(this.snake_pieces[0].y+1 > this.grid.n_rows-1){
        head_piece = {x: this.snake_pieces[0].x, y: 0};
      }else{
        head_piece = {x: this.snake_pieces[0].x, y: this.snake_pieces[0].y+1};
      }
    }else if (this.next_direction == "left"){
      //warp left -> right
      if(this.snake_pieces[0].x-1 < 0){
        head_piece = {x: this.grid.n_columns-1, y: this.snake_pieces[0].y};
      }else{
        head_piece = {x: this.snake_pieces[0].x-1, y: this.snake_pieces[0].y};
      }
    }
    this.direction = this.next_direction;

    temp = this.snake_pieces.slice(0);
    this.snake_pieces[0] = head_piece;
    //Move other pieces
    for(i=1; i<this.lenght;i++){

      //temp = this.snake_pieces[i];
      this.snake_pieces[i] = temp[i-1];
      //prev_piece = temp;
      this.last_piece_previous_position = this.snake_pieces[i];
    }

  };


  this.changeDirection = function(direction){

    if (direction == "up"){
      if (this.direction != "down"){
      this.next_direction = "up";
      }
    }else if (direction == "right"){
      if (this.direction != "left"){
      this.next_direction = "right";
      }
    }else if (direction == "down"){
      if (this.direction != "up"){
      this.next_direction = "down";
      }
    }else if (direction == "left"){
      if (this.direction != "right"){
      this.next_direction = "left";
      }
    }
  };

};
