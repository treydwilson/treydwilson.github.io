//$(function() {
	
	//jQuery focused approach:
	//$(".block").draggable();
	
	/*$(".slider").draggable({ containment: 'parent'});
	$(".slider").on("drag", function(ev) {
		var length = ($(ev.target).position().top / 2) + 50;
		$('.block').height(length);
		$('.block').width(length);
		
		//var mc = new Hammer.Manager(document.getElementById('slider-container'));
		var mc = new Hammer.Manager(document.body);
		
		mc.on('rotatemove', function(ev) {
			$('.color-one').addClass('color-two');
			$('.color-one').removeClass('color-one');
		});
	});*/

//});


		
	//Trying a HammerJS approach:
	
	

    var reqAnimationFrame = (function () {
        return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    var log = document.querySelector("#log");
    var el = document.querySelector("#hit");

    var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
    var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);

    var ticking = false;
    var transform;
    var timer;

    var mc = new Hammer.Manager(el);

    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

    mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    mc.add(new Hammer.Tap());

    mc.on("panstart panmove", onPan);
    mc.on("rotatestart rotatemove", onRotate);
    mc.on("pinchstart pinchmove", onPinch);
    mc.on("swipe", onSwipe);
    mc.on("tap", onTap);
    mc.on("doubletap", onDoubleTap);

    mc.on("hammer.input", function(ev) {
        if(ev.isFinal) {
            resetElement();
        }
    });


    function resetElement() {
        el.className = 'animate';
        transform = {
            translate: { x: START_X, y: START_Y },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };

        requestElementUpdate();

        if (log.textContent.length > 2000) {
            log.textContent = log.textContent.substring(0, 2000) + "...";
        }
    }

    function updateElementTransform() {
        var value = [
                    'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
                    'scale(' + transform.scale + ', ' + transform.scale + ')',
                    'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
        ];

        value = value.join(" ");
        el.textContent = value;
        el.style.webkitTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;
        ticking = false;
    }

    function requestElementUpdate() {
        if(!ticking) {
            reqAnimationFrame(updateElementTransform);
            ticking = true;
        }
    }

    function logEvent(str) {
        //log.insertBefore(document.createTextNode(str +"\n"), log.firstChild);
    }

    function onPan(ev) {
        el.className = '';
        transform.translate = {
            x: START_X + ev.deltaX,
            y: START_Y + ev.deltaY
        };

        requestElementUpdate();
        logEvent(ev.type);
    }

    var initScale = 1;
    function onPinch(ev) {
        if(ev.type == 'pinchstart') {
            initScale = transform.scale || 1;
        }

        el.className = '';
        transform.scale = initScale * ev.scale;

        requestElementUpdate();
        logEvent(ev.type);
    }

    var initAngle = 0;
    function onRotate(ev) {
        if(ev.type == 'rotatestart') {
            initAngle = transform.angle || 0;
        }

        el.className = '';
        transform.rz = 1;
        transform.angle = initAngle + ev.rotation;
        requestElementUpdate();
        logEvent(ev.type);
    }

    function onSwipe(ev) {
        var angle = 50;
        transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
        transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 300);
        requestElementUpdate();
        logEvent(ev.type);
    }

    function onTap(ev) {
        transform.rx = 1;
        transform.angle = 25;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 200);
        requestElementUpdate();
        logEvent(ev.type);
    }

    function onDoubleTap(ev) {
        transform.rx = 1;
        transform.angle = 80;

        clearTimeout(timer);
        timer = setTimeout(function () {
            resetElement();
        }, 500);
        requestElementUpdate();
        logEvent(ev.type);
    }

    resetElement();
	
	
	
    var el2 = document.querySelector("#hit2");

    var START_X2 = Math.round((window.innerWidth - el2.offsetWidth) / 2) + 100;
    var START_Y2 = Math.round((window.innerHeight - el2.offsetHeight) / 2) + 100;

    var ticking2 = false;
    var transform2;
    var timer2;

    var mc2 = new Hammer.Manager(el2);

    mc2.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc2.add(new Hammer.Swipe()).recognizeWith(mc2.get('pan'));
    mc2.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc2.get('pan'));
    mc2.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc2.get('pan'), mc2.get('rotate')]);

    mc2.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    mc2.add(new Hammer.Tap());

    mc2.on("panstart panmove", onPan2);
    mc2.on("rotatestart rotatemove", onRotate2);
    mc2.on("pinchstart pinchmove", onPinch2);
    mc2.on("swipe", onSwipe2);
    mc2.on("tap", onTap2);
    mc2.on("doubletap", onDoubleTap2);

    mc2.on("hammer.input", function(ev) {
        if(ev.isFinal) {
            resetElement2();
        }
    });


    function resetElement2() {
        el2.className = 'animate';
        transform2 = {
            translate: { x: START_X2, y: START_Y2 },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };

        requestElementUpdate2();

        if (log.textContent.length > 2000) {
            log.textContent = log.textContent.substring(0, 2000) + "...";
        }
    }

    function updateElementTransform2() {
        var value2 = [
                    'translate3d(' + transform2.translate.x + 'px, ' + transform2.translate.y + 'px, 0)',
                    'scale(' + transform2.scale + ', ' + transform2.scale + ')',
                    'rotate3d('+ transform2.rx +','+ transform2.ry +','+ transform2.rz +','+  transform2.angle + 'deg)'
        ];

        value2 = value2.join(" ");
        el2.textContent = value2;
        el2.style.webkitTransform = value2;
        el2.style.mozTransform = value2;
        el2.style.transform = value2;
        ticking2 = false;
    }

    function requestElementUpdate2() {
        if(!ticking2) {
            reqAnimationFrame(updateElementTransform2);
            ticking2 = true;
        }
    }

    function onPan2(ev) {
        el2.className = '';
        transform2.translate = {
            x: START_X2 + ev.deltaX,
            y: START_Y2 + ev.deltaY
        };

        requestElementUpdate2();
        logEvent(ev.type);
    }

    var initScale2 = 1;
    function onPinch2(ev) {
        if(ev.type == 'pinchstart') {
            initScale = transform2.scale || 1;
        }

        el2.className = '';
        transform2.scale = initScale * ev.scale;

        requestElementUpdate2();
        logEvent(ev.type);
    }

    var initAngle2 = 0;
    function onRotate2(ev) {
        if(ev.type == 'rotatestart') {
            initAngle = transform2.angle || 0;
        }

        el2.className = '';
        transform2.rz = 1;
        transform2.angle = initAngle2 + ev.rotation;
        requestElementUpdate2();
        logEvent(ev.type);
    }

    function onSwipe2(ev) {
        var angle = 50;
        transform2.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
        transform2.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        transform2.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            resetElement2();
        }, 300);
        requestElementUpdate2();
        logEvent(ev.type);
    }

    function onTap2(ev) {
        transform2.rx = 1;
        transform2.angle = 25;

        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            resetElement2();
        }, 200);
        requestElementUpdate2();
        logEvent(ev.type);
    }

    function onDoubleTap2(ev) {
        transform2.rx = 1;
        transform2.angle = 80;

        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            resetElement();
        }, 500);
        requestElementUpdate2();
        logEvent(ev.type);
    }

    resetElement2();
