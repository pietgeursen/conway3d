var assert = require("assert");
var c = require("../conway.js");

describe('Conway', function(){
  var conway;
  var size = 20

  beforeEach(function(done){
    conway = new c.Conway(size);
    done();
  })

  describe('#construct', function(){
    it('should construct a 3d box of correct size', function(){
      assert.equal(conway.box.length, size);
      assert.equal(conway.box[0].length, size);
      assert.equal(conway.box[0][0].length, size);
    })
  })

})


describe('Cell', function(){
  var cell;

  beforeEach(function(done){
    cell = new c.Cell();
    done();
  })

  describe('#construct', function(){
    it('should have zero neighbours on construction', function(){
      assert.equal(cell.neighbours, 0);
    })
  })

})
