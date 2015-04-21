var Cell = function(){
  this.overPopulation = 9;
  this.underPopulation = 4;
  this.resurrection = 9;
  this.alive = Math.random() > 0.7;
  this.neighbours = 0;
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
          col.push(new Cell);
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

    var cell = this.grid[r][c][d];
    cell.neighbours = 0;

    for(var i = 0; i < this.directions.length; i++){
      var direction = this.directions[i];

      neighbourR = direction[2] + r;
      neighbourC = direction[1] + c;
      neighbourD = direction[0] + d;

      if(!this.isOutOfBounds(neighbourR, neighbourC, neighbourD)){
        var neigbour = this.grid[neighbourR][neighbourC][neighbourD];
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
          updateNeighbourCount(i,j,k);
        }
      }
    }
  },

  updateNeighboursCount: function(){
    for(var i = 0; i < this.size; i++ ){
      for(var j = 0; j < this.size; j++ ){
        for(var k = 0; k < this.size; k++ ){
          updateNeighbourCount(i,j,k);
        }
      }
    }
  }
}



//To stop error in browser from using exports object.
if(typeof exports == 'undefined'){
  var exports = this['mymodule'] = {};
}

exports.Conway = Conway;
exports.Cell = Cell;
