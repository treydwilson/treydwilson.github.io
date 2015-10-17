$(function() {
	$(".block").draggable();
	
	$(".slider").draggable({ containment: 'parent'});
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
	});
});