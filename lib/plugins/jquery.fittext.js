/*!
 * jQuery fittext v0.1 
 * http://benalman.com/
 * 
 * Copyright (c) 2012 "potench" Christian Harden
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * @param startSize / OPTIONAL INT / maximum font-size allowed
 * @param fontDecrement / OPTIONAL INT / reduces font-size by this amount on each pass / defaults to 2
 * @param customWidth / OPTIONAL INT / max width available for font to fit in
 * @param customHeight / OPTIONAL INT / max height available for font to fit in
 */
(function ($) {

	$.fn.fitText = function(startSize, fontDecrement, customWidth, customHeight) {
		
		var h,	// current height of text
			w,	// current width of text
			maxH,	// maximum height allowed
			maxW,	// maximum width
			fontsize,  // current font size
			neverHang = 400; // after enough iterations give up and go play some ps3... instead of frying the browser

		fontDecrement = fontDecrement || 2;
		startSize = startSize || 300;

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