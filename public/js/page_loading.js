var Loop = function () {
	"use strict";
	return {
		init: function(mode, text, type) {
			var htmlText = '';
			switch (mode) {
				case 1:
					htmlText += '<div class="loop_container">';
					htmlText += '<div class="loop_content">';
					htmlText += '<div class="ball"></div>';
					htmlText += '<div class="ball1"></div>';
					htmlText += '<label class="triggerFull">' + text + '</label></div>';
					htmlText += '</div>';
					break;
				case 2:
					htmlText += '<div class="loop_container">';
					htmlText += '<div class="loop_content">';
					// htmlText += '<img class="loop_logo" src="img/logo_large.png" width=60/>'
					htmlText += '<div class="circle stop"></div>';
					htmlText += '<div class="circle1 stop"></div>';
					// htmlText += '<label class="triggerFull">' + text + '</label></div>';
					htmlText += '</div>';
					break;
				case 3:
					htmlText += '<div class="loop_container">';
					htmlText += '<div class="loop_contentBar">';
					htmlText += '<div id="block_1" class="barlittle"></div>';
					htmlText += '<div id="block_2" class="barlittle"></div>';
					htmlText += '<div id="block_3" class="barlittle"></div>';
					htmlText += '<div id="block_4" class="barlittle"></div>';
					htmlText += '<div id="block_5" class="barlittle"></div>';
					htmlText += '<label class="triggerFull">' + text + '</label></div>';
					htmlText += '</div>';
					break;
				default:
					return;
			}
			if(type == 1)
				htmlText += "<img src='assets/img/cancelCall.png' onclick='cancelWaiting()' align='center' style='height: 36px'>";
			$('#LoadingLoop').html(htmlText);
		}
	};
}();