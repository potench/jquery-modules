// like the original fitText plugin .. except this one actually works
(function ($) {

	$.fn.fitText = function(startSize, fontDecrement, customWidth, customHeight) {
		
		var h,	// current height of text
			w,	// current width of text
			maxH,	// maximum height allowed
			maxW,	// maximum width
			fontsize,  // current font size
			neverHang = 400; // after enough iterations give up and go play some ps3... instead of frying the browser

		fontDecrement = fontDecrement || 2;

		return this.each(function(){

			if (startSize) {
				$(this).css("font-size", startSize);
			}

			h = $(this).height(); 
			w = $(this).width();
			maxH = customHeight || $(this).parent().height();
			maxW = customWidth || $(this).parent().outerWidth();
			fontsize = parseInt($(this).css("font-size"), 10);

			while( (h > maxH || w > maxW) && fontsize > 1) {
				fontsize -= fontDecrement;
				
				$(this).css({
					"font-size" : fontsize
				});

				h = $(this).height();
				w = $(this).width();
			}

			$(this).parent().css("height", "auto");
		});
	};
}(jQuery));