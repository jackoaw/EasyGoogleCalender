$(document).ready(function(){

    $("button").click(function(){
        var text = $("textarea").val();
        parseText(text);
    });

	function parseText(text)
	{
		var e = {}
		var lines = String(text).split("\n")
		for (var i = 0; i < lines.length; i++) 
		{
			var parts = lines[i].split(":");
			var date = parts[0];
			var timeDate = dt(date.split(" "));
			var DescriptLocation = parts[1].split("AT");
			var location = DescriptLocation[1];
			var descripion = DescriptLocation[0];
			var time = timeDate[0];
			var date = timeDate[1];
		};
	}

	// date and time [d,t]
	// or for those more fun, downtown
	function dt(rawTime)
	{
		var date = new Date();
		for (var i = 0; i < rawTime.length; i++) {
			// Time
			if(rawTime[i].split(":").length > 0)
			{
				
			}
			// Date
			else if(rawTime[i].split("/").length > 0)
			{

			}
			// Day of the week, assuming
			// Automatically determine the date based on a given day, chose the nearest one.
			else
			{
				// Sunday by default
				var curDay = 0
				var day = date.getDay();
				if (rawTime[i].toLowerCase() == "monday")
				{
					curDay = 1;
				}
				if(rawTime[i].toLowerCase() == "tuesday")
				{
					curDay = 2;
				}
				if(rawTime[i].toLowerCase() == "wednesday")
				{
					curDay = 3;
				}
				if(rawTime[i].toLowerCase() == "thursday")
				{
					curDay = 4;
				}
				if(rawTime[i].toLowerCase() == "friday")
				{
					curDay = 5;
				}
				if(rawTime[i].toLowerCase() == "saturday")
				{
					curDay = 6;
				}
				if (day < curDay)
					day += 7
				var daysNeeded = day - curDay;
				for (var i = 0; i < daysNeeded; i++) 
				{
					try
					{
						date.setDay(date.getDay()+1)
					}
					catch(Exception e)
					{
						// Could not set date for some reason
					}
				}
			}
		}
		return date;
	}

	function findNextDay(dayOfWeek)
	{
		
	}

	function sendRequest()
	{

	}

});