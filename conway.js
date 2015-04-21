var Cell = function(r,c,d){
  this.overPopulation = 3;
  this.underPopulation = 2;
  this.resurrection = 3;
  this.alive = Math.random() > 0.8;
  this.neighbours = 0;
  this.sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
  this.sphere.position.x = c;
  this.sphere.position.y = r;
  this.sphere.position.z = d;

}

Cell.prototype = {
  isOverPopulated: function(){
    return this.neighbours > this.overPopulation;
  },
  isUnderPopulated: function(){
    return this.neighbours < this.underPopulation;
  },
  isResurrectable: function(){
    return !this.alive && this.neighbours == this.resurrection;
  },
  updateState: function(){
    if(this.isOverPopulated() || this.isUnderPopulated()){
      this.alive = false;
    }else if(this.isResurrectable()){
      this.alive = true;
    }
  },
  render: function(){
    this.sphere.visibility = this.alive
  }
}


var Conway = function(size){
  this.size = size;
  this.box = [];
  this.generateBox(size);
  this.directions = [
  [1, 0, 1],
  [1, 1, 1],
  [1, 1, 0],
  [1, 1,-1],
  [1, 0,-1],
  [1,-1,-1],
  [1,-1, 0],
  [1,-1, 1],
  [1, 0, 0],

  [-1, 0, 1],
  [-1, 1, 1],
  [-1, 1, 0],
  [-1, 1,-1],
  [-1, 0,-1],
  [-1,-1,-1],
  [-1,-1, 0],
  [-1,-1, 1],
  [-1, 0, 0],

  [0, 0, 1],
  [0, 1, 1],
  [0, 1, 0],
  [0, 1,-1],
  [0, 0,-1],
  [0,-1,-1],
  [0,-1, 0],
  [0,-1, 1]

  ]
}

Conway.prototype= {
  generateBox: function(){
    for(var i = 0; i < this.size; i++ ){
      var row = [];
      for(var j = 0; j < this.size; j++ ){
        var col = [];
        for(var k = 0; k < this.size; k++ ){
          col.push(new Cell(i,j,k));
        }
        row.push(col);
      }
      this.box.push(row);
    }
  },

  isOutOfBound: function(v){
   return v < 0 || v >= this.size;
  },

  isOutOfBounds: function(r,c,d){
    return this.isOutOfBound(r) || this.isOutOfBound(c) || this.isOutOfBound(d);
  },

  updateNeighbourCount: function(r,c,d){

    var cell = this.box[r][c][d];
    cell.neighbours = 0;

    for(var i = 0; i < this.directions.length; i++){
      var direction = this.directions[i];

      neighbourR = direction[2] + r;
      neighbourC = direction[1] + c;
      neighbourD = direction[0] + d;

      if(!this.isOutOfBounds(neighbourR, neighbourC, neighbourD)){
        var neigbour = this.box[neighbourR][neighbourC][neighbourD];
        if(neigbour.alive){
          cell.neighbours ++;
        }
      }
    }
  },

  updateCellStates: function(){
    for(var i = 0; i < this.size; i++ ){
      for(var j = 0; j < this.size; j++ ){
        for(var k = 0; k < this.size; k++ ){
          var cell = this.box[i][j][k];
          cell.updateState();
        }
      }
    }
  },

  updateNeighboursCount: function(){
    for(var i = 0; i < this.size; i++ ){
      for(var j = 0; j < this.size; j++ ){
        for(var k = 0; k < this.size; k++ ){
          this.updateNeighbourCount(i,j,k);
        }
      }
    }
  },

  renderCells: function(){
    for(var i = 0; i < this.size; i++ ){
      for(var j = 0; j < this.size; j++ ){
        for(var k = 0; k < this.size; k++ ){
          var cell = this.box[i][j][k];
          cell.render();
        }
      }
    }
  },

  update: function(){
    this.updateNeighboursCount();
    this.updateCellStates();
    this.renderCells();

  }


}



//To stop error in browser from using exports object.
if(typeof exports == 'undefined'){
  var exports = this['mymodule'] = {};
}

exports.Conway = Conway;
exports.Cell = Cell;
