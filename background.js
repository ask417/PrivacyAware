var data;
var xmlhttp;

function createDataAlternate(alchemyText,tab, trackerBooleans)
{

	console.log("Alexa Call Failed, using alternate data source.");

	var maleProp = 50;

	var femaleProp = 50;					 

	var noCollegeProp = 50;

	var someCollegeProp = 50;					 

	var gradProp = 50;					 

	var collegeProp = 50;				 

	var browseHomeProp = null;						 
	var browseSchoolProp = null;					 
	var browseWorkProp = null;


	// //More scraped data
	var country1 = " United States";
	var country2 = " India";
	var country3 = " China";
	var percVis1 = 0;
	var percVis2 = 0;
	var percVis3 = 0;


	var dataObj = {};
	var mainObj = {};
	var pornSites = ["pornhub.com","xnxx.com","xvideos.com","redtube.com","youporn.com","beeg.com",
				"freeones.com","playboy.com","youjizz.com","tblp.com", "spankbang.com","pornoid.com",
				"hentaigasm.com","xhamster.com","madthumbs.com","PornerBros.com","xxx.com",
				"eporner.com","FreudBox.com","porn.com","tube8.com","spankwire.com","alphaporno.com",
				"shufuni.com","fastjizz.com","fapdu.com","hdpornstar.com"];

	var dateObject = new Date();
	var currentTime = dateObject.getTime();
	var tmp = document.createElement ('a');
	tmp.href =  tab.url;//url.text();
		


	//Site tracker booleans
	for(var key in trackerBooleans)
	{
	dataObj[key]=trackerBooleans[key];
	console.log(trackerBooleans[key]);
	}

	//This is a disgusting hack, but it's easier/cheaper than the workaround code
	if(tmp.hostname=="www.facebook.com" || tmp.hostname=="www.youtube.com")
	{
	dataObj["googleAnalytics"]=true;
	dataObj["chartBeat"]=false;
	dataObj["doubleClick"]=true;
	dataObj["quantServe"]=false;
	dataObj["googleAdsense"]=false;
	dataObj["scoreCard"]=false;
	dataObj["facebookConnect"]=false;
	}



	dataObj["URL"] = (tmp.hostname).replace("www.","");


	if($.inArray(dataObj["URL"],pornSites)!=-1)
	{
		dataObj["category"] = "porn";
	}

	else
	{
		category = $(alchemyText).find('category');
		dataObj["category"] = category.text();
		if(dataObj["URL"]=="facebook.com")
		{
			dataObj["category"] = "recreation";
		}
	}

	if(dataObj["URL"].indexOf("wikipedia")>-1)
	{
		dataObj["category"] = "science_technology";
	}

	if(dataObj["URL"].indexOf("youtube")>-1)
	{
		dataObj["category"] = "arts_entertainment";
	}

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



	chrome.storage.local.get(tmp.hostname,function(result)
	{
		if(dataObj["category"]!="")
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
		}	
	});
}


function createData(alchemyText,alexaText,tab,trackerBooleans)
{
	console.log("All calls appear to have succeeded.");

	 var maleProp = (parseFloat($("#demographics-content > div > span.span4.demo-col1 > div > div:nth-child(2) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width)==50) ? 50+parseFloat($("#demographics-content > div > span.span4.demo-col1 > div > div:nth-child(2) > span.pybar-bars > div > span.pybar-bar.pybar-r > span > span",alexaText[0])[0].style.width) : parseFloat($("#demographics-content > div > span.span4.demo-col1 > div > div:nth-child(2) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width); 
	 
	 var femaleProp = (parseFloat($("#demographics-content > div > span.span4.demo-col1 > div > div:nth-child(3) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width)==50) ? 50+parseFloat($("#demographics-content > div > span.span4.demo-col1 > div > div:nth-child(3) > span.pybar-bars > div > span.pybar-bar.pybar-r > span > span",alexaText[0])[0].style.width) : parseFloat($("#demographics-content > div > span.span4.demo-col1 > div > div:nth-child(3) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width);					 
	 
	 var noCollegeProp = (parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(2) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width)==50) ? 50+parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(2) > span.pybar-bars > div > span.pybar-bar.pybar-r > span > span",alexaText[0])[0].style.width) : parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(2) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width); 
	 
	 var someCollegeProp = (parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(3) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width)==50) ? 50+parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(3) > span.pybar-bars > div > span.pybar-bar.pybar-r > span > span",alexaText[0])[0].style.width) : parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(3) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width);					 
	 
	 var gradProp = (parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(4) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width)==50) ? 50+parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(4) > span.pybar-bars > div > span.pybar-bar.pybar-r > span > span",alexaText[0])[0].style.width) : parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(4) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width);					 
	 
	 var collegeProp = (parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(5) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width)==50) ? 50+parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(5) > span.pybar-bars > div > span.pybar-bar.pybar-r > span > span",alexaText[0])[0].style.width) : parseFloat($("#demographics-content > div > span.span4.demo-col2 > div > div:nth-child(5) > span.pybar-bars > div > span.pybar-bar.pybar-l > span > span",alexaText[0])[0].style.width);					 
	 
	 var browseHomeProp = null;//(parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[1].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[1].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[1].children[1].children[0].children[0].children[0].children[0].style.width);						 
	 var browseSchoolProp = null;//(parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[2].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[2].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[2].children[1].children[0].children[0].children[0].children[0].style.width);						 
	 var browseWorkProp = null;//(parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[3].children[1].children[0].children[0].children[0].children[0].style.width)==50) ? 50+parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[3].children[1].children[0].children[1].children[0].children[0].style.width) : parseFloat($(alexaText[0]).find("div.row.col-pad.pybar.demo-location").children()[3].children[1].children[0].children[0].children[0].children[0].style.width);
	

	 // //More scraped data
	 var country1 = $(alexaText[0]).find("tbody").children()[0].children[0].children[0].text;
	 var country2 = $(alexaText[0]).find("tbody").children()[1].children[0].children[0].text;
	 var country3 = $(alexaText[0]).find("tbody").children()[2].children[0].children[0].text;
	 var percVis1 = $(alexaText[0]).find("tbody").children()[0].children[1].children[0].innerHTML;
	 var percVis2 = $(alexaText[0]).find("tbody").children()[1].children[1].children[0].innerHTML;
	 var percVis3 = $(alexaText[0]).find("tbody").children()[2].children[1].children[0].innerHTML;

	
	 var dataObj = {};
	 var mainObj = {};
	 var pornSites = ["pornhub.com","xnxx.com","xvideos.com","redtube.com","youporn.com","beeg.com",
	 					"freeones.com","playboy.com","youjizz.com","tblp.com", "spankbang.com","pornoid.com",
	 					"hentaigasm.com","xhamster.com","madthumbs.com","PornerBros.com","xxx.com",
	 					"eporner.com","FreudBox.com","porn.com","tube8.com","spankwire.com","alphaporno.com",
	 					"shufuni.com","fastjizz.com","fapdu.com","hdpornstar.com"];
	 
	 // url=$(alchemyText).find('url');
	 var dateObject = new Date();
	 var currentTime = dateObject.getTime();
	 var tmp = document.createElement ('a');
	 tmp.href =  tab.url;//url.text();
	 			
	
	 
	 //Site tracker booleans
	 for(var key in trackerBooleans)
	 {
	 	dataObj[key]=trackerBooleans[key];
	 }
	 
	 //This is a disgusting hack, but it's easier/cheaper than the workaround code
	 if(tmp.hostname=="www.facebook.com" || tmp.hostname=="www.youtube.com")
	 {
	 	dataObj["googleAnalytics"]=true;
	 	dataObj["chartBeat"]=false;
	 	dataObj["doubleClick"]=true;
	 	dataObj["quantServe"]=false;
	 	dataObj["googleAdsense"]=false;
	 	dataObj["scoreCard"]=false;
	 	dataObj["facebookConnect"]=false;
	 }
	 
	 /*
		The categorization is good.  So is the 
	 */
	 
	 //Other stuff, whatever
	 dataObj["URL"] = (tmp.hostname).replace("www.","");
	 

	 //So dumb, such shitty research
	 if($.inArray(dataObj["URL"],pornSites)!=-1)
	 {
	 	dataObj["category"] = "porn";
	 }

	 else
	 {
	 	category = $(alchemyText).find('category');
	 	dataObj["category"] = category.text();
	 	if(dataObj["URL"]=="facebook.com")
	 	{
	 		dataObj["category"] = "recreation";
	 	}
	 }

	 if(dataObj["URL"].indexOf("wikipedia")>-1)
	 {
	 	dataObj["category"] = "science_technology";
	 }
	 
	 if(dataObj["URL"].indexOf("youtube")>-1)
	 {
	 	dataObj["category"] = "arts_entertainment";
	 }

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
	 


	 chrome.storage.local.get(tmp.hostname,function(result)
	 {
		  if(dataObj["category"]!="")
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
		 }	
 
	 });
	 


}


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) 
{
	if (changeInfo.status == 'complete') 
	{
  				
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) 
		{


	 		chrome.storage.local.get(null, function(more)
	 		{

	 			var tmp = document.createElement ('a');
				tmp.href =  tab.url;


				if(tmp.hostname in more)
				{
					var dateObject = new Date();
					var currentTime = dateObject.getTime();
					console.log("this key exists");
					more[tmp.hostname]["hitCount"]+=1;
					more[tmp.hostname]["timesVisited"].push(currentTime);
					chrome.storage.local.set(more, function() {});
				}
				else
				{
					console.log("this key doesn't exist");
				
				    $.when(
					
						$.ajax(
						{
							url: "http://access.alchemyapi.com/calls/url/URLGetCategory",
							type: "POST",
							data: "apikey=124e70686ac496d8dacc6e7ca2fe4e03536e63b5&url="+tab.url
						}),
						$.get("http://www.alexa.com/siteinfo/"+(tab.url))
					).then(function(alchemyText,alexaText)
					{
						chrome.tabs.sendMessage(tabId, "message?", function(trackerBooleans)
						{	
							createData(alchemyText,alexaText,tab, trackerBooleans);
						});	

					}, function()
					{
						$.ajax(
						{
							url: "http://access.alchemyapi.com/calls/url/URLGetCategory",
							type: "POST",
							data: "apikey=124e70686ac496d8dacc6e7ca2fe4e03536e63b5&url="+tab.url
						}
						).done(function(alchemyText)
						{
							chrome.tabs.sendMessage(tabId, "message?", function(trackerBooleans)
							{	
								createDataAlternate(alchemyText,tab, trackerBooleans);
							});
	
						}); //Final interior ajax done call

					});//remove this for the added when ajax done bit

				}//Cut off the else statement for when a url hasn't been stored yet

			});//remove this one for the added chrome storage get
				 

		});
		
	}

});


