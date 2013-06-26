$(function() {
    
    var rings = [
            [false, false, false, false, false,
             false, false, false, false, false],
            [false, false, false, false, false,
             false, false, false, false, false],
            [false, false, false, false, false,
             false, false, false, false, false],
            [false, false, false, false, false,
             false, false, false, false, false]
        ];
        
    rings.setLed = function(ring, led, value) {
        this[ring][led] = !!value;
    };
    
    rings.setLedAllRings = function(led, value) {
        this[0][led] = !!value;
        this[1][led] = !!value;
        this[2][led] = !!value;
        this[3][led] = !!value;
    };
    
    rings.setAllLeds = function(value) {
        for (var ring = 0; ring < 4; ring++)
        {
            for (var led = 0; led < 16; led++)
            {
                this[ring][led] = !!value;
            }
        }
    };
    
    var currentPattern = { initialize: function () { }, logic: function () { } };
    
    var interval = null;
    
    var DancingLeds = {
        setPattern: function(pattern) {
            currentPattern = pattern;
            currentPattern.initialize(rings);
        },
        
        start: function(msec) {
            if(interval) this.stop();
            interval = setInterval(tick, msec);
        },
        
        stop: function() {
            clearInterval(interval);
            interval = null;
        }
    };
    
    window.Rings = {};
    window.Rings.logic = function(rings) {};
    
    createCircles();
    
    updateView(rings);
    
    setInterval(tick, 50);
    
    function createCircles() {
        for (var i=0; i<16; i++)
        {
            $('.l' + (i+1)).css(
                {
                    transform: 'rotate(' + (12.25 + (i*22.5)) + 'deg)'
                }
            )
            .text(i);
        }
    }
    
    function updateView(rings) {
        for (var r = 0; r < 4; r++)
        {
            for (var l = 0; l < 16; l++)
            {
                var on = (rings[r][l]);
                
                var led = $('#r'+(r+1) + ' .l' + (l+1));
                
                if (on) {
                    led.addClass('on');
                }
                else {
                    led.removeClass('on');
                }
            }
        }
    }
    
    function tick() {
        currentPattern.logic(rings);
        updateView(rings);
    }
    
    window.DancingLeds = DancingLeds;
});


