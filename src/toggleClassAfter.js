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
      callback = () => {
        window.setTimeout( () => {
          if ( timeouts.length <= 0 && intervals.length <= 0 ) {
            return jQuery( self ).toggleClass( value, stateVal );
          }
        }, 0 );
      },

      // Proxy setTimeout, setInterval, clearTimeout, and clearInterval for internal use
      timeout = ( func, duration ) => {
      	timeouts.push(
      		window.setTimeout( () => {
      			timeouts.shift();
      			callback();
      		}, duration )
      	);
      	return window.setTimeout( func, duration );
      },
      ctimeout = ( id ) => {
      	window.clearTimeout( timeouts.indexOf( timeouts[ id ] ) );
      	timeouts.splice( timeouts.indexOf( timeouts[ id ] ), 1 );
      	window.clearTimeout( id );
      	callback();
      },
      interval = ( func, duration ) => {
      	intervals.push(
      		window.setInterval( func, duration )
      	);
      	return intervals[ intervals.length - 1 ];
      },
      cinterval = ( id ) => {
      	intervals.splice( intervals.indexOf( intervals[ id ] ), 1 );
      	window.clearInterval( id );
      	callback();
      };
    func.call( null, timeout, ctimeout, interval, cinterval );
    callback();
  };
}( jQuery ));
