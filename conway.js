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
  }
}


var Conway = function(size){
  this.size = size;
  this.box = [];
  this.generateBox(size);
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
  }

}



//To stop error in browser from using exports object.
if(typeof exports == 'undefined'){
  var exports = this['mymodule'] = {};
}

exports.Conway = Conway;
exports.Cell = Cell;
