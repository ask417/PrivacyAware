var data;
var xmlhttp;


//This segment creates an XMLHttpRequest object, which eventually gets used to send data to the localhost
//As a side note, this code will probably not be used, as the localhost option was cast aside
/*
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     
	 });

    }
  }

*/

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) 
{
	if (changeInfo.status == 'complete') 
	{
  
	   $.when(
			
			$.ajax(
			{
				url: "http://access.alchemyapi.com/calls/url/URLGetCategory",
				type: "POST",
				data: "apikey=124e70686ac496d8dacc6e7ca2fe4e03536e63b5&url="+tab.url
			}),
			$.get("http://www.alexa.com/siteinfo/"+tab.url)
		).done(function(alchemyText,alexaText)
		{
		
				 chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) 
				 {
				 	 chrome.tabs.sendMessage(tabId, "message?",function(trackerBooleans)
					 {
				 		 
						
						 //For all of these there may be no data (e.g. 50% or 0% proportion scraped).  Need to put in an extra conditional for this case.
						 var maleProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-gender").children()[1].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-gender").children()[1].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-gender").children()[1].children[1].children[0].children[0].children[0].children[0].style.width); 
						 var femaleProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-gender").children()[2].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-gender").children()[2].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-gender").children()[2].children[1].children[0].children[0].children[0].children[0].style.width);						 
						 var noCollegeProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[1].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[1].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[1].children[1].children[0].children[0].children[0].children[0].style.width); 
						 var someCollegeProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[2].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[2].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[2].children[1].children[0].children[0].children[0].children[0].style.width);						 
						 var gradProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[3].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[3].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[3].children[1].children[0].children[0].children[0].children[0].style.width);						 
						 var collegeProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[4].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[4].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-education").children()[4].children[1].children[0].children[0].children[0].children[0].style.width);						 
						 var browseHomeProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[1].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[1].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[1].children[1].children[0].children[0].children[0].children[0].style.width);						 
						 var browseSchoolProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[2].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[2].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[2].children[1].children[0].children[0].children[0].children[0].style.width);						 
						 var browseWorkProp = (parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[3].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[3].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[3].children[1].children[0].children[0].children[0].children[0].style.width);
						
						 //More scraped data
						 var country1 = $(alexaText[0]).find("tbody").children()[0].children[0].children[0].text;
						 var country2 = $(alexaText[0]).find("tbody").children()[1].children[0].children[0].text;
						 var country3 = $(alexaText[0]).find("tbody").children()[2].children[0].children[0].text;
						 var percVis1 = $(alexaText[0]).find("tbody").children()[0].children[1].children[0].innerHTML;
						 var percVis2 = $(alexaText[0]).find("tbody").children()[1].children[1].children[0].innerHTML;
						 var percVis3 = $(alexaText[0]).find("tbody").children()[2].children[1].children[0].innerHTML;
						 var dataObj = {};
						 var mainObj = {};
						 var pornSites = ["pornhub.com","xnxx.com","xvideos.com","redtube.com","youporn.com","beeg.com",
						 					"freeones.com","playboy.com","youjizz.com","tblp.com"];
						 
						 					
						 //So dumb, such shitty research
						 category = $(alchemyText).find('category');
						 url=$(alchemyText).find('url');
						 var dateObject = new Date();
						 var currentTime = dateObject.getTime();
						 var tmp = document.createElement ('a');
						 tmp.href = url.text();
						 
						 //Site tracker booleans
						// dataObj["googleAnalytics"] = trackerBooleans["googleAnalytics"];
						 for(var key in trackerBooleans)
						 {
						 	dataObj[key]=trackerBooleans[key];
						 }
						 console.log(trackerBooleans);
						 
						 //This is a disgusting hack, but it's easier/cheaper than the workaround code
						 if(tmp.hostname=="www.facebook.com")
						 {
						 	dataObj["googleAnalytics"]=true;
						 	dataObj["chartBeat"]=false;
						 	dataObj["doubleClick"]=true;
						 	dataObj["quantServe"]=false;
						 	dataObj["googleAdsense"]=false;
						 	dataObj["scoreCard"]=false;
						 	dataObj["facebookConnect"]=false;
						 }
						 
	
						console.log(dataObj["googleAnalytics"]);
						console.log(dataObj["chartBeat"]);
						 
						 //Other stuff, whatever
						 dataObj["URL"] = tmp.hostname;
						 dataObj["category"] = category.text();
						 dataObj["topCountry1"] = country1;
						 dataObj["topCountry2"] = country2;
						 dataObj["topCountry3"] = country3;
						 dataObj["percentageVisitors1"] = parseFloat(percVis1);
						 dataObj["percentageVisitors2"] = parseFloat(percVis2);
						 dataObj["percentageVisitors3"] = parseFloat(percVis3);
						 dataObj["maleProportion"] = maleProp;
						 dataObj["femaleProportion"] = femaleProp;
						 dataObj["noCollegeProp"] = noCollegeProp;
						 dataObj["someCollegeProp"] = someCollegeProp;
						 dataObj["collegeProp"] = collegeProp;
						 dataObj["gradProp"] = gradProp;
						 dataObj["browseHomeProp"] = browseHomeProp;
						 dataObj["browseSchoolProp"] = browseSchoolProp;
						 dataObj["browseWorkProp"] = browseWorkProp;
						 dataObj["hitCount"] = 1;
						 dataObj["timesVisited"] = [currentTime];
						 mainObj[tmp.hostname] = dataObj;
						 //chrome.storage.local.clear();
						 
						 //check if the link exists, if not, add it, if so, 
						 chrome.storage.local.get(tmp.hostname,function(result)
						 {
		
							 //The entry hasn't been stored yet, so we store it
							 if(Object.keys(result).length === 0)
							 {
								chrome.storage.local.set(mainObj, function() {});
							 }
							 else
							 {		
								mainObj[tmp.hostname]["hitCount"]+=result[tmp.hostname]["hitCount"];
								mainObj[tmp.hostname]["timesVisited"]=result[tmp.hostname]["timesVisited"];
								mainObj[tmp.hostname]["timesVisited"].push(currentTime);
								chrome.storage.local.set(mainObj, function() {});
							 }				 
						 
						 });
						 
						 //chrome.storage.local.set(mainObj, function() { });
						 chrome.storage.local.get(null, function(all)
						 {
							console.log(all);
						 });
						 
						 //console.log(category.text());
			 		});
			 });
		
		});
	
	// $.ajax({
// 			
// 			url: "http://access.alchemyapi.com/calls/url/URLGetCategory",
// 			type: "POST",
// 			data: "apikey=124e70686ac496d8dacc6e7ca2fe4e03536e63b5&url="+tab.url,
// 			success: function(response) {
// 			
// 				 chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//      
//      			 var googleAnalytics=$('*:contains("google-analytics")');  
// 				 var chartBeat=$('*:contains("chartbeat")');
// 				 var doubleClick=$('*:contains("http://www.googletagservices.com/tag/js/gpt.js")');
// 				 var quantServe=$('*:contains("quantserve")');
// 				 var googleAdsense=$('*:contains("googleadservices")');
// 				 var scoreCard=$('*:contains("scorecardresearch")');
// 				 var facebookConnect=$('*:contains("http://static.ak.facebook.com/connect/xd_arbiter.php")');
// 				
// 				 //This is how you find the stats on Alexz: parseFloat($("div.row.col-pad.pybar.demo-gender").find("span.pybar-bg").children()[].style.width)
// 			 	
// 				 category = $(response).find('category');
// 				 url=$(response).find('url');
// 				 
// 				 var dataObj = {};
// 				 var mainObj = {};
// 				 dataObj["URL"] = url.text();
// 				 dataObj["category"] = category.text();
// 				 chrome.storage.local.set( mainObj, function() { });
// 				 chrome.storage.local.get(null, function(all){
// 					console.log(all);
// 					});
// 				 
// 				 console.log(category.text());
// 			 });
// 			}
// 	});
			
			/*
	xmlhttp.open("POST","http://access.alchemyapi.com/calls/url/URLGetCategory",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xmlhttp.send("apikey=124e70686ac496d8dacc6e7ca2fe4e03536e63b5&url="+tab.url);
	*/
	//console.log(document.body.innerHTML);
	
	//This logs all of the history, but I think there's a limit to how much
	//chrome.history.search({ 'text': ''}, function(array){console.log(array)})
	
   //When page is loaded, we execute this script that sends a request for the innerHTML
 //  chrome.tabs.executeScript(tab.id, {
//        code: "chrome.extension.sendRequest({content: document.body.innerHTML}, function(response) { console.log('success'); });"
//      }, function() { console.log('done'); });
	  }
})

//Receives above request and logs DOM
// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
// 	//console.log(request.content);
//   });
  
//Goal: Send data to a local server
