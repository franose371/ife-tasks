function addClass(element, newClassname) {
	if (!document.getElementById) return false;
	var odiv = document.getElementById(element);
	if (!odiv.className) {
		odiv.className = newClassname;
	}
	else {
		odiv.className+= " "+ newClassname;
	}
}

function removeClass(element, oldClassname) {
	if (!document.getElementById) return false;
	var odiv = document.getElementById(element);
	if (!odiv.className) {
		odiv.className = "";
	}
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	if (!document.getElementById) return false;
    var snode = document.getElementById(siblingNode).parentNode;
    var enode = document.getElementById(element).parentNode;
    if (snode == enode) {
    	return true;
    }
    else {
    	return false;
    }
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	if (!document.getElementById) return false;
    var offposition = new Array();
    var odiv = document.getElementById(element);
    offposition.push(odiv.offsetLeft);
    offposition.push(odiv.offsetTop);
    return offposition;
}

// 实现一个简单的Query
function $(selector) {
	//handle the combine query
	if (selector.indexOf(" ") != -1) {
		var selectors = selector.split(" ");
		for (i=0;i<selectors.length;i++) {
			// how to use traversal????
		}
		return ids;
	}
    else if (selector.indexOf("#") != -1) {
    	//delete #
    	var text = selector.replace(/^\#/, "");
    	var id = document.getElementById(text);
    	return id;
    }
    else if (selector.indexOf(".") != -1) {
    	//delete .
    	var text = selector.replace(/^\./, "");
    	var ids = document.getElementsByClassName(text);
    	return ids[0];
    }
    else if (selector.indexOf("[") && selector.indexOf("]") != -1) {
    	// ???可以通过attribute匹配获取DOM对象，例如????
    }
    else {
    	var ids = document.getElementsByTagName(selector);
    	return ids[0];
    }
}

// // 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象

// // 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象

// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象

// // 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象

// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// // 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象