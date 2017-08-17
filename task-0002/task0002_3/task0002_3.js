var container = document.getElementById("slideshow-container");
var lists = document.getElementById("slide-list");
var button_list = document.getElementById("slide-buttons");
var buttons = document.getElementById("slide-buttons").getElementsByTagName("span");
var prev = document.getElementsByClassName("slide-arrow")[0];
var next = document.getElementsByClassName("slide-arrow")[1];
var index = 0;
var animated = false;
var timer;
var play;

function showButton(curIndex) {
	for (var i = 0; i < buttons.length; i++) {
		if (i !== curIndex) {
			if (buttons[i].classList.contains("slide-on")) {
				buttons[i].classList.remove("slide-on");
			}
		}
	}
	buttons[curIndex].classList.add("slide-on");
}

function playAnimate(isReverse, isLoop, interval) {
	if (!isReverse) {
		if (isLoop) {
			timer = setInterval(function() {
				if (!animated) {
					if (index === 4) {
						index = -1;
					}
					index++;
					animate(-200);
					showButton(index);
				}
			}, interval);
		} else {
			timer = setInterval(function() {
				if (!animated) {
					//在执行判断前还要进行一次动画，所以index需要减1
					//即在第四张判断是否停下来，然后再执行一次向右的动画
					if (index === 3) {
						clearInterval(timer);
					}
					index++;
					animate(-200);
					showButton(index);
				}
			}, interval);
		}

	} else {
		index = 4;
		showButton(index);
		lists.style.left = (-200) * (index + 1) + "px";
		if (isLoop) {
			timer = setInterval(function() {
				if (!animated) {
					if (index === 0) {
						index = 5;
					}
					index--;
					animate(200);
					showButton(index);
				}
			}, interval);
		} else {
			timer = setInterval(function() {
				if (!animated) {
					//在执行判断前还要进行一次动画，所以index需要加1
					if (index === 1) {
						clearInterval(timer);
					}
					index--;
					animate(200);
					showButton(index);
				}
			}, interval);
		}

	}

}

function stopAnimate() {
	clearInterval(timer);
}

playAnimate(true, false, 1000);

function animate(offset) {
	animated = true;
	var newLeft = parseInt(lists.style.left) + offset;
	var time = 300; //位移总时间
	var interval = 10;
	//每次的位移量
	var speed = offset / (time / interval);
	var movement;

	function go() {
		if (movement) {
			clearTimeout(movement);
		}
		if ((speed < 0 && parseInt(lists.style.left) > newLeft) || (speed > 0 && parseInt(lists.style.left) < newLeft)) {
			lists.style.left = parseInt(lists.style.left) + speed + "px";
			movement = setTimeout(go, interval);
		} else {
			animated = false;
			if (newLeft > -200) {
				newLeft = -1000;
			}
			if (newLeft < -1000) {
				newLeft = -200;
			}
			lists.style.left = newLeft + "px";
		}
	}
	go();
}

button_list.addEventListener("click", function(e) {
	if (!animated) {
		var e = e || window.event;
		var target = e.srcElement || e.target;
		var curIndex = target.getAttribute("index") - 1;
		showButton(curIndex);
		animate((-200) * (curIndex - index));
		index = curIndex;
	}
}, false);

prev.addEventListener("click", function() {
	if (!animated) {
		if (index === 0) {
			index = 5;
		}
		index--;
		animate(200);
		showButton(index);
	}

}, false);

next.addEventListener("click", function() {
	if (!animated) {
		if (index === 4) {
			index = -1;
		}
		index++;
		animate(-200);
		showButton(index);
	}
}, false);

container.addEventListener("mouseover", function() {
	prev.style.display = "block";
	next.style.display = "block";
	stopAnimate();
}, false);

container.addEventListener("mouseout", function() {
	prev.style.display = "none";
	next.style.display = "none";
	playAnimate(true, false, 1000);
}, false);