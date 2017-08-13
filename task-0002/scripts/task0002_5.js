'use strict'

var block_container = document.getElementsByClassName("block-container");
var isDown = false;
for (var i = block_container.length - 1; i >= 0; i--) {
	block_container[i].addEventListener("mousedown", (function() {
		return function(ev) {
			isDown = true;
			var e = ev || window.event;
			var tagChild = e.srcElement || e.target;
			tagChild.style.opacity = '0.5';
			var parent = tagChild.parentElement;
			var width = tagChild.offsetWidth;
			var left = e.clientX - (tagChild.offsetLeft);
			var top = e.clientY - (tagChild.offsetTop);
			fnDown(tagChild, left, top);
			tagChild.addEventListener("mouseup", function(ev) {
				isDown = false;
				var e = ev || window.event;
				var tagChild = e.srcElement || e.target;
				tagChild.style.opacity = '1';
				tagChild.style.position = 'static';
				if (parseInt(block_container[1].offsetLeft) - parseInt(tagChild.style.left) < tagChild.offsetWidth/2) {
					block_container[1].appendChild(tagChild);
				}
			}, false);
		}
	})(i), false);
}


function fnDown(tag, left, top) {
	tag.addEventListener("mousemove", function(ev) {
		if (isDown) {
			var e = ev || window.event;
			tag.style.position = 'absolute';
			tag.style.left = e.clientX - left + 'px';
			tag.style.top = e.clientY - top + 'px';
			if (parseInt(block_container[1].offsetLeft) - parseInt(tag.style.left) < tag.offsetWidth/2) {
				tag.style.opacity = '1';
			}
		}
	}, false);
}