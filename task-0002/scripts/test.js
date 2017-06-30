var num = 12;

var text = "hello";

var bool = false;

var time = new Date(1995, 11, 17);

var person = new Object();
person.firstname = "Bill";
person.lastname = "Gates";
person.age = 56;
person.eyecolor = "blue";

var myarr = new Array(1,2,3,4,5);

var aaa;


//返回传递给他的任意对象的类
// Begin public method /getVarType/
    // Returns 'Object', 'Array', 'String', 'Number', 'Boolean', 'Undefined'
    function getVarType(data) {
      if ( data === undefined  ) { return 'Undefined'; }
      if ( data === null  ) { return 'Null'; }
      return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();//为什么从8开始？
    };
    // End public method /getVarType/
var myReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; 

function cloneObject(data) {
	var objectType = getVarType(data);
	//the object for cloning is native object
	if (objectType == "null" || objectType == "undefined") {
		return data;
	}

	if (objectType == "string" || objectType == "number" || objectType == "boolean") {
		var copy = data;
		return copy;
	}
	else if (objectType == "date") {
		var copy = new Date();
		copy.setTime(data.getTime());
		return copy;
	}
	else if (objectType == "array") {
		var copy = [];
		for (var i = 0; i < data.length; i++) {
			copy[i] = cloneObject(data[i]);
		}
		return copy;
	}
	else if (objectType == "object") {
		var copy = {};
		for (var attr in data) {
			if (data.hasOwnProperty(attr)) {
				copy[attr] = cloneObject(data[attr]);
			}
		}
		return copy;
	}
}

var aaaaa = null;

var myobject = cloneObject(person);

var aa = person[3];

console.log(person["firstname"]);