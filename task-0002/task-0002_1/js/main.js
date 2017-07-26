var hobbyBtn = document.getElementById("show-hobby");
var oCon = document.getElementsByClassName("container")[0];

function showList(list, seperator, parentEle) {
	var lists = uniqArray(list.split(seperator));
	//若存在div#show-list，则直接删除div中的html后再添加
	var oShow = document.getElementById("show-list");
	if (oShow) {
		document.getElementById("show-list").innerHTML = "";
	} else {
		oShow = document.createElement("div");
		oShow.id = "show-list";
		parentEle.appendChild(oShow);
	}

	if (lists.length === 0) {
		return "empty";
	} else if (lists.length > 10) {
		return "too many";
	} else {
		for (var i = 0, length1 = lists.length; i < length1; i++) {
			var oLabel = document.createElement("label");
			oLabel.innerHTML = lists[i];
			var oInput = document.createElement("input");
			oInput.setAttribute("type", "checkbox");
			oLabel.appendChild(oInput);
			oShow.appendChild(oLabel);
		}
	}
}

hobbyBtn.addEventListener("click", function() {
	var hobbies = document.getElementById("hobbies").value;
	var reg = /[^\u4e00-\u9fa5a-zA-Z\d]/;
	var oInfo = document.getElementById("err-info");
	var info,seperator;
	if (!hobbies) {
		info = "empty";
	} else {
		seperator = hobbies.match(reg)[0];
		info = showList(hobbies, seperator, oCon);
	}

	if (info) {
		oInfo.innerHTML = info;
	}
	else {
		oInfo.innerHTML = "";
	}
}, false);