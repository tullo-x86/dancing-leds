// spin

$(function() {
    
    window.Pattern = window.Pattern || {};
    
    window.Pattern.Spin = function() {
        var state = {};
        var exports = {};
        
        var initialize = function() {
            state.led = 0;
        };
        
        var spinLogic = function(rings) {
            if (!state)
                initialize();
            
            rings.setLedAllRings(state.led, false);
            
            state.led++;
            if (state.led >= 16)
                state.led = 0;
            
            rings.setLedAllRings(state.led, true);
        }
        
        initialize();
        
        exports.logic = spinLogic;
        
        return exports;
    };
});