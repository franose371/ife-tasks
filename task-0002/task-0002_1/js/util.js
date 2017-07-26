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

function domQuery(selector, root) {
	var text;
	var elements = [];
	//if root is not defined, root = document
	if (!root) {
		root = document;
	}
	if (selector.charAt(0) === "#") {
		text = selector.replace(/^\#/, "");
		elements = root.getElementById(text);
	} else if (selector.charAt(0) === ".") {
		text = selector.replace(/^\./, "");
		elements = root.getElementsByClassName(text);
	} else if ((selector.charAt(0) === "[") && (selector.charAt(selector.length - 1) === "]")) {
		//get all the elements
		var eles = root.getElementsByTagName("*");
		//delete "[" and "]"
		selector = selector.replace(/^\[/, "");
		selector = selector.replace(/\]$/, "");

		var texts = selector.split("=");
		var attr = texts[0];
		var value = texts[1];
		//有属性值的情况
		if (texts[1]) {
			for (var i = 0, length1 = eles.length; i < length1; i++) {
				if (eles[i].hasAttribute(attr)) {
					if (eles[i].getAttribute(attr) === value) {
						elements = eles[i];
					}
				}
			}
		}
		//没有属性值
		else {
			for (var i = 0, length1 = eles.length; i < length1; i++) {
				if (eles[i].hasAttribute(attr)) {
					elements = eles[i];
				}
			}
		}
	} else {
		elements = root.getElementsByTagName(selector);
	}
	return elements;
}

function $(selector) {
	//multiple queries
	var result = [];
	var parents = [];
	if (selector.indexOf(" ") !== -1) {
		//split selector by space
		var selectors = selector.split(" ");
		parents = domQuery(selectors[0]);
		for (var i = 1, length1 = selectors.length; i < length1; i++) {
			if (parents.length) {
				parents = domQuery(selectors[i], parents[0]);
			} else {
				parents = domQuery(selectors[i], parents);
			}
		}
		result = parents;
	}
	//single query
	else {
		var result = domQuery(selector, document);
	}
	if (result.length) {
		return result[0];
	} else {
		return result;
	}
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false)
	}
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
	if (element.removeEventListener) { //标准
		element.removeEventListener(event, listener, false);
	}
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
	addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	addEvent(element, "keydown", function(e) {
		if (e.keyCode === 13) {
			listener();
		}
	});
}

$.on = function(selector, event, listener) {
	return addEvent($(selector), event, listener);
};

$.un = function(selector, event, listener) {
	return removeEvent($(selector), event, listener);
};

$.click = function(selector, listener) {
	return addClickEvent($(selector), listener);
};

$.enter = function(selector, listener) {
	return addEnterEvent($(selector), listener);
};

$.delegate = function(selector, tag, event, listener) {
	return delegateEvent($(selector), tag, eventName, listener);
};


var delegate = function(client, clientMethod) {
	return function() {
		return clientMethod.apply(client, arguments);
	}
}

function delegateEvent(element, tag, eventName, listener) {
	$.eventName(element, function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.nodeName.toLowerCase() === tag) {
			//?????
			listener.call(target, e);
		}
	});
}

function isIE() {
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		var version = getIEVersion();
		return version;
	} else {
		return -1;
	}
}

function getIEVersion() {
	var reg = /(Trident.*rv\:|MSIE\s)((\d+)\.0)/;
	var uaString = navigator.userAgent;
	var versionMatch = uaString.match(reg);
	if (versionMatch) {
		return versionMatch[3];
	}
}

function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}



// 
function ajax(url, options) {
	//新建一个XHR对象
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//若没有设置type，则默认为get

	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		options.onsuccess();
	} else {
		options.onfail();
	}
	type = options.type || get;
	xmlhttp.open(type, url, true);
	if (type === "get") {
		xmlhttp.send();
	} else {
		xmlhttp.send(options.data);
	}
}