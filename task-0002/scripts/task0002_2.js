var oInput = document.getElementById("timer");
var oButton = document.getElementById("count-button");
var oText = document.getElementById("count-text");


function checkDate(year, month, date) {
	var now = new Date(year, month - 1, date);
	if (now.getDate() == date && now.getFullYear() == year && now.getMonth() == (month - 1)) {
		return true;
	}
	return false;
}

function getCount(inputDate) {
	var curDate = new Date();
	var count = inputDate - curDate;
	if (count <= 0) {
		clearInterval(countInterval);
	}
	count = count / 1000;
	var day = parseInt(count / (24 * 60 * 60)); //计算整数天数
	var afterDay = count - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
	var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
	var afterHour = count - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
	var min = parseInt(afterHour / 60); //计算整数分
	var afterMin = count - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
	var second = Math.round(afterMin);
	oText.innerHTML = "<p>距离" + inputDate.getFullYear() + "年" + (inputDate.getMonth() + 1) + "月" + inputDate.getDate() + "日还有" + day + "天" + hour + "小时" + min + "分" + second + "秒</p>";
}
var reg = /^\d{4}-\d{2}-\d{2}$/;
var countInterval;
oButton.addEventListener("click", function() {
	var dates = oInput.value.split("-");
	if (reg.test(oInput.value) && checkDate(dates[0], dates[1], dates[2])) {
		var inputDate = new Date(dates[0] + "/" + dates[1] + "/" + dates[2] + " 00: 00: 00 ");
		if (countInterval) {
			clearInterval(countInterval);
		}
		var curDate = new Date();
		if (inputDate - curDate <= 0) {
			oText.innerHTML = "<p>请输入在当前日期之后的日期</p>"
		} else {
			countInterval = setInterval(function() {
				getCount(inputDate);
			}, 1000);
		}

	} else {
		oText.innerHTML = "<p>请输入格式正确的日期</p>";
	}
}, false);
// var mydate = new Date();
// document.write(mydate);