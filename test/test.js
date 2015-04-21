var assert = require("assert");
var c = require("../conway.js");

describe('Conway', function(){
  var conway;
  var size = 20

  beforeEach(function(done){
    conway = new c.Conway(size);
    done();
  })

  describe('#generateBox', function(){
    it('should construct a 3d box of correct size', function(){
      assert.equal(conway.box.length, size);
      assert.equal(conway.box[0].length, size);
      assert.equal(conway.box[0][0].length, size);
    })
  })

  describe('#isOutOfBounds', function(){

    it('should return false when not out of bounds', function(){
      assert.equal(conway.isOutOfBounds(0,0,0), false);
    })

    it('should return true when out of bounds', function(){

      assert.equal(conway.isOutOfBounds(-1,0,0), true);
      assert.equal(conway.isOutOfBounds(0,-1,0), true);
      assert.equal(conway.isOutOfBounds(0,0,-1), true);
      assert.equal(conway.isOutOfBounds(size,0,0), true);
      assert.equal(conway.isOutOfBounds(0,size,0), true);
      assert.equal(conway.isOutOfBounds(0,0,size), true);
    })
  })

})


describe('Cell', function(){
  var cell;

  beforeEach(function(done){
    cell = new c.Cell();
    done();
  })

  describe('#constructor', function(){
    it('should have zero neighbours on construction', function(){
      assert.equal(cell.neighbours, 0);
    })
  })

  describe('#isUnderPopulated', function(){
    it('should return true when under populated', function(){
      assert.equal(cell.isUnderPopulated(), true);
    })
  })

  describe('#isOverPopulated', function(){
    it('should return true when over populated', function(){
      assert.equal(cell.isOverPopulated(), false);
    })
  })
  describe('#isResurrectable', function(){
    it('should return true when resurrectable', function(){
      assert.equal(cell.isResurrectable(), false);
      cell.alive = false;
      cell.neighbours = cell.resurrection;
      assert.equal(cell.isResurrectable(), true);
    })
  })

  describe('#updates state', function(){
    it('should die when overpopulated', function(){
      cell.neighbours = cell.overPopulation + 1;
      cell.updateState();
      assert.equal(cell.alive, false);
    })

    it('should die when underpopulated', function(){
      cell.neighbours = cell.underPopulation - 1;
      cell.updateState();
      assert.equal(cell.alive, false);
    })

    it('should resurrect', function(){
      cell.neighbours = cell.resurrection;
      cell.alive = false;
      cell.updateState();
      assert.equal(cell.alive, true);
    })
  })


})
