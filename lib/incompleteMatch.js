jasmine.incompleteMatch = function incompleteMatch(obj){
  return {
    jasmineMatches: function(other){
      // Allow recursing through levels
      function matchObject(mine, theirs){
        if (mine instanceof Object){
          for (var key in mine){
            if (mine[key] instanceof Object){
              if (key in theirs && theirs[key] instanceof Object){
                var match = matchObject(mine[key], theirs[key]);
                if (match === false){
                    return false;
                }
              } else {
                  return false; // They are missing a required field
              }
            } else {
              // If their key is not present, or it's present but the value id different
              if (!(key in theirs) || theirs[key] !== mine[key]){
                  return false; // Their key has a different value than mine
              }
            }
          }
        } else if (mine !== theirs) {
          // Handle primitives here
          return false;
        }

        // If everything matched and we didn't return false
        return true;
      }

      return matchObject(obj, other);
    },
    jasmineToString: function(){
      var fieldString = '';
      for (var key in obj){
        fieldString += key + ': ' + obj[key] + ', ';
      }
      return '<incompleteMatch('+fieldString+')>';
    }
  };
};
