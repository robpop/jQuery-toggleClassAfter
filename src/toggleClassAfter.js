/*
  Author: Robert F. Popeleski <therfp97@gmail.com>
  License: WTFPL
*/
(function ( $ ) {
  $.fn.toggleClassAfter = function( value, func, stateVal ) {
    if( typeof(value) === typeof(Function) ) {
      func = value;
      value = undefined;
    }
    var
      self = this,
      timeouts = [],
      intervals = [],

      // Make a call to toggleClass if no additional timeouts or intervals are present
      callback = function() {
        window.setTimeout( function() {
          if ( timeouts.length <= 0 && intervals.length <= 0 ) {
            return jQuery( self ).toggleClass( value, stateVal );
          }
        }, 0 );
      },

      // Proxy setTimeout, setInterval, clearTimeout, and clearInterval for internal use
      timeout = function( func, duration ) {
      	timeouts.push(
      		window.setTimeout( function() {
      			timeouts.shift();
      			callback();
      		}, duration )
      	);
      	return window.setTimeout( func, duration );
      },
      ctimeout = function( id ) {
      	window.clearTimeout( timeouts.indexOf( timeouts[ id ] ) );
      	timeouts.splice( timeouts.indexOf( timeouts[ id ] ), 1 );
      	window.clearTimeout( id );
      	callback();
      },
      interval = function( func, duration ) {
      	intervals.push(
      		window.setInterval( func, duration )
      	);
      	return intervals[ intervals.length - 1 ];
      },
      cinterval = function( id ) {
      	intervals.splice( intervals.indexOf( intervals[ id ] ), 1 );
      	window.clearInterval( id );
      	callback();
      };
    func.call( null, timeout, ctimeout, interval, cinterval );
    callback();
  };
}( jQuery ));
