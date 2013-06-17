// Figure8

$(function() {
    
    Pattern = window.Pattern || {};
    
    var Chaser = function(ring, led, clockwise) {
        this.ring = ring;
        this.led = led;
        this.isClockwise = clockwise;
    };
    
    Pattern.ChasingLeds = function() {
        var states = [{
            position: {
                ring: 0,
                led: 0
            },
            direction: true
        },
        {
            position: {
                ring: 2,
                led: 10
            },
            direction: true
        },
        {
            position: {
                ring: 3,
                led: 6
            },
            direction: true
        }];
        
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
                rings.setLed(s.position.ring, s.position.led, false);                
            });
                
            for (var s = 0; s < states.length; s++) {
                var state = states[s];
                
                // follow junction, reversing if necessary
                for (var i = 0; i < junctions.length; i++) {
                    if (junctions[i].from.ring == state.position.ring
                        && junctions[i].from.led == state.position.led) {
                        // Jump!
                        state.position.ring = junctions[i].to.ring;
                        state.position.led = junctions[i].to.led;
                        state.direction = !state.direction;
                        break;
                    }
                }
                
                if (state.direction) {
                    state.position.led++;
                    if (state.position.led > 15) {
                        state.position.led = 0;
                    }
                }
                else {
                    state.position.led--;
                    if (state.position.led < 0) {
                        state.position.led = 15;
                    }
                }
                
                rings.setLed(state.position.ring, state.position.led, true);
            }
        };
        
        return {
            initialize: initialize,
            logic: logic 
        };
    };
    
    Pattern.ChasingLeds.Chaser = Chaser;
});