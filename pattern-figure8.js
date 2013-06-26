// Figure8

$(function() {
    
    Pattern = window.Pattern || {};
    
    var Chaser = function(ring, led, clockwise) {
        this.ring = ring;
        this.led = led;
        this.isClockwise = clockwise;
    };
    
    Pattern.ChasingLeds = function(chasers) {
        var states = chasers;/*[{
            ring: 0,
            led: 0,
            isClockwise: true
        },
        {
            ring: 2,
            led: 10,
            isClockwise: true
        },
        {
            ring: 3,
            led: 6,
            isClockwise: true
        }];*/
        
        // For V1, assume we're always changing directions
        var junctions = [
                {from: {ring: 0, led:  8}, to: {ring: 1, led:  0} },
                {from: {ring: 1, led:  0}, to: {ring: 0, led:  8} },
                {from: {ring: 1, led:  6}, to: {ring: 3, led: 14} },
                {from: {ring: 1, led: 10}, to: {ring: 2, led:  2} },
                {from: {ring: 2, led:  2}, to: {ring: 1, led: 10} },
                {from: {ring: 3, led: 14}, to: {ring: 1, led:  6} },
            ];
            
        var initialize = function(rings)
        {
            rings.setAllLeds(false);
        };
        
        var logic = function(rings) {
            states.forEach(function (s) {
                rings.setLed(s.ring, s.led, false);                
            });
                
            for (var s = 0; s < states.length; s++) {
                var state = states[s];
                
                // follow junction, reversing if necessary
                for (var i = 0; i < junctions.length; i++) {
                    if (junctions[i].from.ring == state.ring
                        && junctions[i].from.led == state.led) {
                        // Jump!
                        state.ring = junctions[i].to.ring;
                        state.led = junctions[i].to.led;
                        state.isClockwise = !state.isClockwise;
                        break;
                    }
                }
                
                if (state.isClockwise) {
                    state.led++;
                    if (state.led > 15) {
                        state.led = 0;
                    }
                }
                else {
                    state.led--;
                    if (state.led < 0) {
                        state.led = 15;
                    }
                }
                
                rings.setLed(state.ring, state.led, true);
            }
        };
        
        return {
            initialize: initialize,
            logic: logic 
        };
    };
    
    Pattern.ChasingLeds.Chaser = Chaser;
});