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
			var parts = lines[i].split("=");
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
		// To and from entries expected in this array. On the same day for now.
		// TODO: Expanded capabilities for events that extend over multiple days
		var dates = [];
		var date = new Date();
		for (var i = 0; i < rawTime.length; i++) {
			// Time
			if(rawTime[i].split(":").length > 0)
			{
				// if a date is not set, assume today
				var time = rawTime[i].replace(" ","");
				var timeToFrom = time.split("-");
				// There is a speficied end time
				if(timeToFrom.length > 0) 
				{
					date.setTime(timeToFrom[0]);
					dates.push(date);
					var date2 = jQuery.extend(true, {}, date);
					dates.push(date2.setTime(timeToFrom[1]));
				}
				else
				{
					date.setTime(timeToFrom[0]);
					dates.push(date);
					var date2 = jQuery.extend(true, {}, date);
					// assume default time of one hour
					dates.push(date2.setTime(date.getTime()+1);
				}
			}
			// Date
			else if(rawTime[i].split("/").length > 0)
			{
				date.setDay(rawTime[i]);
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
				else if(rawTime[i].toLowerCase() == "tuesday")
				{
					curDay = 2;
				}
				else if(rawTime[i].toLowerCase() == "wednesday")
				{
					curDay = 3;
				}
				else if(rawTime[i].toLowerCase() == "thursday")
				{
					curDay = 4;
				}
				else if(rawTime[i].toLowerCase() == "friday")
				{
					curDay = 5;
				}
				else if(rawTime[i].toLowerCase() == "saturday")
				{
					curDay = 6;
				}
				else
					continue;
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
		return dates;
	}

	function findNextDay(dayOfWeek)
	{
		
	}

	function sendRequest()
	{

	}

});