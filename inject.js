/*All this file does is inject a script, currently the d3 one*/

//Record window.location
var link = window.location;

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log("greatt");
});

function injectJs(link) {
var scr = document.createElement('script');
scr.type="text/javascript";
scr.src=link;
document.getElementsByTagName('head')[0].appendChild(scr);
//document.body.appendChild(scr);
}

injectJs(chrome.extension.getURL('d3Injection.js'));



//$.jStorage.set("1",1);
/*
var visited = $.jStorage.get(String(link));

var keys = $.jStorage.get("1");

if(!keys)
{
	$.jStorage.set("1",1);
}
if(!visited)
{
	//I want to keep track of my keys by numbered index
	var key = $.jStorage.get("1")+1;
	$.jStorage.set("1",key);
	$.jStorage.set(String(key),link);
}

window.alert($.jStorage.get(String(key)));
*/