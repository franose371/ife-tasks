//返回传递给他的任意对象的类
// Begin public method /getVarType/
// Returns 'Object', 'Array', 'String', 'Number', 'Boolean', 'Undefined'
function getVarType(data) {
	if (data === undefined) {
		return 'Undefined';
	}
	if (data === null) {
		return 'Null';
	}
	return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};
// End public method /getVarType/

function isArray(arr) {
	if (getVarType(arr) == 'array') {
		return true;
	} else return false;
}

function isFunction(fn) {
	if (getVarType(fn) == 'function') {
		return true;
	} else return false;
}

function cloneObject(data) {
	var objectType = getVarType(data);
	//the object for cloning is native object
	if (objectType == "null" || objectType == "undefined") {
		return data;
	}

	if (objectType == "string" || objectType == "number" || objectType == "boolean") {
		var copy = data;
		return copy;
	} else if (objectType == "date") {
		var copy = new Date();
		copy.setTime(data.getTime());
		return copy;
	} else if (objectType == "array") {
		var copy = [];
		for (var i = 0; i < data.length; i++) {
			copy[i] = cloneObject(data[i]);
		}
		return copy;
	} else if (objectType == "object") {
		var copy = {};
		for (var attr in data) {
			if (data.hasOwnProperty(attr)) {
				copy[attr] = cloneObject(data[attr]);
			}
		}
		return copy;
	}
}

function uniqArray(arr) {
	var uniqarr = [];
	for (i = 0; i < arr.length; i++) {
		if (uniqarr.indexOf(arr[i]) == -1) {
			uniqarr.push(arr[i]);
		}

	}
	return uniqarr;
}


function trim(str) {
	var reg = /^\s+|\s+$/g;
	return str.replace(reg, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
	for (var i = 0, length1 = arr.length; i < length1; i++) {
		fn(arr[i], i);
	}
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var length = 0;
	for (item in obj) {
		length += 1;
	}
	return length;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
	var reg = /^[a-zA-z0-9_\.-]+@[a-zA-z0-9\.-]+\.[a-z]{2,6}$/g;
	if (reg.test(emailStr) == true) {
		return true;
	} else return false;
}

// 判断是否为手机号
function isMobilePhone(phone) {
	var reg = /^1[34578]\d{9}$/g;
	if (reg.test(phone) == true) {
		return true;
	} else return false;
}

function addClass(element, newClassname) {
	if (!document.getElementById) return false;
	var odiv = document.getElementById(element);
	if (!odiv.className) {
		odiv.className = newClassname;
	} else {
		odiv.className += " " + newClassname;
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
	} else {
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

function $(selector) {
	//handle the combine query
	if (selector.indexOf(" ") != -1) {
		var selectors = selector.split(" ");
		var ids = new Array();
		for (i = 0; i < selectors.length; i++) {
			// how to use traversal????
			ids[i] = $(selectors[i]); //selector = "#adom"
		}
		return ids;
	} else if (selector.indexOf("#") != -1) {
		//delete #
		var text = selector.replace(/^\#/, "");
		var id = document.getElementById(text);
		return id;
	} else if (selector.indexOf(".") != -1) {
		//delete .
		var text = selector.replace(/^\./, "");
		var ids = document.getElementsByClassName(text);
		return ids[0];
	} else if (selector.indexOf("[") != -1) {
		//get all the elements
		var eles = document.getElementsByTagName("*");
		selector = selector.replace(/^\[/, "");
		selector = selector.replace(/\]$/, "");
		var dates = selector.split("=");
		var atr = dates[0];
		var value = dates[1];
		if (value) {
			for (var i = 0, length1 = eles.length; i < length1; i++) {
				if (eles[i].hasAttribute(atr)) {
					if (eles[i].getAttribute(atr) == value) {
						return eles[i];
					}
				}
			}
		} else {
			for (var i = 0, length1 = eles.length; i < length1; i++) {
				if (eles[i].hasAttribute(atr)) {
					return eles[i];
				}
			}
		}
	} else {
		var ids = document.getElementsByTagName(selector);
		return ids[0];
	}
}


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	var myelement = element;
	if (event === "click") {
		myelement.onclick = listener(event);
	}
}

// // 例如：
function clicklistener(event) {
	//...
	if (event === "click") {
		alert("clicking");
	}

}

addEvent($("#doma"), "click", clicklistener);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
	// your implement
}


// // 实现一个简单的Query
// function $(selector) {
// 	//handle the combine query
// 	var selectors = selector.split(" ");
// 	var ids = new Array();
// 	for (var i = 0, length1 = selectors.length; i < length1; i++) {
// 		//multiple selectors
// 		if (selectors.length > 1) {
// 			for (var i = 0, length1 = selectors.length; i < length1; i++) {
// 				switch (selectors.[i]) {
// 					case "label_1":
// 						// statements_1
// 						break;
// 					default:
// 						// statements_def
// 						break;
// 				}
// 			}

// 		}

// 		if (selectors[i].indexOf("#") != -1) {
// 			//delete #
// var text = selectors[i].replace(/^\#/, "");
// ids[0] = document.getElementById(text);
// 		} else if (selectors[i].indexOf(".") != -1) {
// 			//delete .
// 			var text = selectors[i].replace(/^\./, "");
// 			ids = document.getElementsByClassName(text);
// 		} else if (selectors[i].indexOf("[") != -1) {
// 			//get all the elements
// 			var eles = document.getElementsByTagName("*");
// 			selectors[i] = selectors[i].replace(/^\[/, "");
// 			selectors[i] = selectors[i].replace(/\]$/, "");
// 			var dates = selectors[i].split("=");
// 			var atr = dates[0];
// 			var value = dates[1];
// 			if (value) {
// 				for (var i = 0, length1 = eles.length; i < length1; i++) {
// 					if (eles[i].hasAttribute(atr)) {
// 						if (eles[i].getAttribute(atr) == value) {
// 							ids[0] = eles[i];
// 						}
// 					}
// 				}
// 			} else {
// 				for (var i = 0, length1 = eles.length; i < length1; i++) {
// 					if (eles[i].hasAttribute(atr)) {
// 						ids[0] = eles[i];
// 					}
// 				}

// 			}
// 		} else {
// 			ids = document.getElementsByTagName(selectors[i]);
// 		}
// 	}
// 	return ids[0];
// }

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