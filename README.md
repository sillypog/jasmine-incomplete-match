jasmine-incomplete-match [![Build Status](https://travis-ci.org/sillypog/jasmine-incomplete-match.svg?branch=master)](https://travis-ci.org/sillypog/jasmine-incomplete-match)
========================

Alternative to jasmine.any for when some object properties are known.

For example, you may have a complex object such as:

```
{
  a: [1,2,3],
  b: 'hello',
  c: {
    x: [1,2,3],
    y: [4,5,6],
    z: [7,8,9]
  }
}
```

If that object was passed into a method that you were spying on for the purposes of testing, jasmine allows you to do the following:

```
expect(foo).toHaveBeenCalledWith(jasmine.any(Object));
```

However, you may need to test the specific values of certain properties on the object. It would be redundant to have to include all of the other properties in each of your tests, and this would also increase the cost of maintenance.

jasmine.incompleteMatcher allows you to do this for any primitive, array, or object property as shown:

```
expect(foo).toHaveBeenCalledWith(jasmine.any(Object));
```

A real world example might be:

```
describe('sendFunnelData', function(){
    var data;

    beforeEach(function(){
        data = {
            params: { campaign_type: 'facebook-flyin', action: 'impression' },
            table: 'campaigns'
        };

        spyOn($,'ajax');
    });

    it('should send correct data', function(){
        BR.Analytics.sendFunnelData(data);

        expect($.ajax).toHaveBeenCalledWith(jasmine.any(String), jasmine.incompleteMatch({
            data: { tag_permalink: 'nfl', country: 'test_country' },
            dataType: 'jsonp'
        }));
    });
});
```

##Setup
### Browser
* Download the repo or `npm install jasmine-incomplete-match`.
* Include lib/incompleteMatch.js after including jasmine.

### Node
`npm install jasmine-incomplete-match`

```
// In spec files
require(jasmine-incomplete-match); // Nothing to assign, attaches to global jasmine object.
```
