var Cell = function(){
  this.alive = Math.random() > 0.7;
  this.neighbours = 0;

}

Cell.prototype = {

}


var Conway = function(size){
  this.size = size;
  this.box = [];
  this.generateGrid(size);
}

Conway.prototype= {
  generateGrid: function(){
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
