var xmlHttp

var input = document.getElementById('input-text');
var list = document.getElementById('hint-list');
var curIndex = -1;
list.style.marginLeft = input.offsetLeft - 1 + 'px';


input.addEventListener('keydown', function(e) {
    var e = e || window.event;
    var target = e.srcElement || e.target;
    var which = e.keyCode || e.which;
    var lists = list.childNodes;
    if (curIndex < lists.length - 1) {
        if (which === 40) {
            curIndex++;
        }
    }
    if (which === 38) {
        if (curIndex !== -1) {
            curIndex = curIndex - 1;
        }
    }
    if (curIndex !== -1 && curIndex < lists.length) {
        lists[curIndex].style.backgroundColor = '#ccc';
    }
    if (which === 13 && curIndex !== -1 && curIndex < lists.length) {
        input.value = lists[curIndex].innerHTML;
        input.style.display = 'none';
        curIndex = -1;
    }
}, false);

input.addEventListener('keyup', function(e) {
    var str = input.value
    if (str.length == 0) {
        document.getElementById("hint-list").innerHTML = "";
        if (list.style.display === 'block') {
            list.style.display = 'none';
        }
        return;
    }
    xmlHttp = GetXmlHttpObject()
    if (xmlHttp == null) {
        alert("Browser does not support HTTP Request")
        return;
    }
    var url = "task0002_4.php"
    url = url + "?q=" + str
    url = url + "&sid=" + Math.random()
    xmlHttp.onreadystatechange = stateChanged
    xmlHttp.open("GET", url, true)
    xmlHttp.send(null)
}, false);

function stateChanged() {
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
        var response = xmlHttp.responseText;
        if (response) {
            var lists = response.split(",");
            var text = '';
            for (var i = lists.length - 1; i >= 0; i--) {
                text += '<li>' + lists[i] +
                    '</li>';
            }
            list.innerHTML = text;
            if (list.style.display === 'none') {
                list.style.display = 'block';
            }
        } else if (list.style.display === 'block') {
            list.style.display = 'none';
        }
    }
}

function GetXmlHttpObject() {
    var xmlHttp = null;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

list.addEventListener('click', function(e) {
    var e = e || window.event;
    var target = e.srcElement || e.target;
    input.value = target.innerHTML;
    if (list.style.display === 'block') {
        list.style.display = 'none';
        curIndex = -1;
    }
}, false);