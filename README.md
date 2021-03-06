# jQuery-toggleClassAfter
jQuery plugin that invokes a handler and then makes a callback to toggleClass()

![GitHub release (latest by date)](https://img.shields.io/github/v/release/robpop/jQuery-toggleClassAfter)
![GitHub file size in bytes](https://img.shields.io/github/size/robpop/jQuery-toggleClassAfter/src/toggleClassAfter.min.js)
![GitHub](https://img.shields.io/github/license/robpop/jQuery-toggleClassAfter)


## Usage
### toggleClassAfter( className, handler, state )
This method takes three arguments:   

*className*   
One or more class names (separated by spaces) to be toggled for each element in the matched set.    

*handler*   
A function to execute before making a callback to [toggleClass()](https://api.jquery.com/toggleClass/).   

*state*   
A boolean value to determine whether the class should be added or removed.    

## Scheduling
This method's handler can wait for timeouts and intervals to complete before invoking the callback by providing proxies for setTimeout, clearTimeout, setInterval, and clearInterval.

If scheduling is needed, the handler will provide the functions in the following order:
```
toggleClassAfter( function( setTimeout, clearTimeout, setInterval, clearInterval ) )
```

## Examples
The example below will toggle the class *bar* after executing the handler.
```
var count = 0;
$( "#foo" ).toggleClassAfter( "bar", () => {
  for ( var i = 0; i < 4; i++ ) {
    count++;
  }
} );
```
The examples below will toggle the class *bar* after executing the handler with scheduling.
```
var count = 0;
var interval;
$( "#foo" ).toggleClassAfter( "bar", ( setTimeout, clearTimeout, setInterval, clearInterval ) => {
  interval = setInterval( () => {
    count++;
    if ( count > 3 ) {
      clearInterval( interval );
    }
  }, 1000 );
} );
```
```
var count = 0;
$( "#foo" ).toggleClassAfter( "bar", ( setTimeout, clearTimeout, setInterval, clearInterval ) => {
  setTimeout( () => {
    count++;
    if ( count > 1 ) {
      count--;
    } else {
      setTimeout( () => {
        count++;
      }, 1000 );
    }
  }, 3000 );
} );
```
