/**
	// Purpose: desaturate an image.

 	`$("img").saturate(); // adds a <canvas> object before your <img> element.`

	// Use CSS to hide the img:  canvas + img { display:none; }
 */

(function ($) {

	var tagType = /img/i;	// only works on these tags

	$.fn.desaturate = function() {

		return this.each(function(){

			if( tagType.exec(this.tagName) !== null) { 
				var imgData,
					canvas = document.createElement("canvas"),
					context = canvas.getContext("2d"),
					w = $(this).outerWidth(),
					h = $(this).outerHeight(),
					x,
					y,
					i,
					avg;

				if (!(canvas.getContext && context)) {
					return;
				}

				canvas.width = w;
				canvas.height = h;
				context.drawImage(this, 0, 0);

				if( w > 0 && h > 0) {
					imgData = context.getImageData(0, 0, w, h);

					// loop through all the pixel data - consider doing this with a worker
					for (y = imgData.height - 1; y >= 0; y--) {
						for (x = imgData.width - 1; x >= 0; x--) {
							i = (y * 4) * imgData.width + x * 4;
							avg = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
							imgData.data[i] = avg;
							imgData.data[i + 1] = avg;
							imgData.data[i + 2] = avg;
						}
					}

					// TODO cache canvas image

					context.putImageData(imgData, 0, 0, 0, 0, imgData.width, imgData.height);

					$(canvas).insertBefore(this);
				}
			}
		});
	};
}(jQuery));