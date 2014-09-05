/* globals describe, it, expect, beforeEach, jasmine */

require('../lib/incompleteMatch.js')

describe('jasmine.incompleteMatch', function() {
  var fakeFunction;
  beforeEach(function(){
    fakeFunction = jasmine.createSpy();
  });

  describe('matching primitives', function(){
    it ('should match like values', function(){
      fakeFunction(1);
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch(1));
    });

    it ('should fail unlike values', function(){
      fakeFunction(1);
      expect(fakeFunction).toHaveBeenCalled();
      expect(fakeFunction).not.toHaveBeenCalledWith(jasmine.incompleteMatch(2));
    });

    it('should differentiate zero and undefined', function(){
      fakeFunction();
      expect(fakeFunction).toHaveBeenCalled();
      expect(fakeFunction).not.toHaveBeenCalledWith(jasmine.incompleteMatch(1));
    });
  });

  describe('matching arrays', function(){
    it ('should match same arrays', function(){
      fakeFunction([1,2,3]);
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch([1,2,3]));
    });

    it ('should match similar arrays', function(){
      fakeFunction([1,2,3]);
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch([1,2]));
    });

    it ('should not skip array values', function(){
      fakeFunction([1,2,3]);
      expect(fakeFunction).toHaveBeenCalled();
      expect(fakeFunction).not.toHaveBeenCalledWith(jasmine.incompleteMatch([1,3]));
    });
  });

  describe('matching objects', function(){
    it ('should match same objects', function(){
      fakeFunction({a:1, b:2, c:3});
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch({a:1, b:2, c:3}));
    });

    it ('should match similar objects', function(){
      fakeFunction([1,2,3]);
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch([1,2]));
    });

    it ('should match nested objects', function(){
      fakeFunction( {a:[1,2,3], b: {x:9, y:8}, c: 'sea'} );
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch( {b: {x:9, y:8}} ));
      expect(fakeFunction).toHaveBeenCalledWith(jasmine.incompleteMatch( {b: {x:9, y:8}, c: 'sea'} ));
    });
  });
});
