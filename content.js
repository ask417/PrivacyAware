chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
 			
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		function isEmpty(obj) 
		{
		
			// null and undefined are "empty"
			if (obj == null) return true;
		
			// Assume if it has a length property with a non-zero value
			// that that property is correct.
			if (obj.length > 0)    return false;
			if (obj.length === 0)  return true;
		
			// Otherwise, does it have any properties of its own?
			// Note that this doesn't handle
			// toString and valueOf enumeration bugs in IE < 9
			for (var key in obj) 
			{
				if (hasOwnProperty.call(obj, key)) return false;
			}
		
			return true;
		 }
		 

		//!isEmpty returns True if the tracker is present
  		var googleAnalytics=(!isEmpty($('*:contains("google-analytics")')) || !isEmpty($('*:contains("analytics.js")')));  
		var chartBeat = !isEmpty($('*:contains("chartbeat")'));
		var doubleClick=(!isEmpty($('*:contains("http://www.googletagservices.com/tag/js/gpt.js")')) || !isEmpty($('*:contains("Doubleclick")')));
		var quantServe=!isEmpty($('*:contains("quantserve")'));
		var googleAdsense=!isEmpty($('*:contains("googleadservices")'));
		var scoreCard=!isEmpty($('*:contains("scorecardresearch")'));
		var facebookConnect=!isEmpty($('*:contains("http://static.ak.facebook.com/connect/xd_arbiter.php")'));


		sendResponse({"googleAnalytics": googleAnalytics, "chartBeat": chartBeat, "doubleClick": doubleClick, 
			  "quantServe": quantServe, "googleAdsense":googleAdsense, "scoreCard": scoreCard, "facebookConnect": facebookConnect});
	
});