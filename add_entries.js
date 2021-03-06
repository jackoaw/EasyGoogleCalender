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
			// Comment
			if(lines[i].charAt(0) == "#" || lines[i].replace(" ","").length==0)
				continue;
			var parts = lines[i].split("=");
			var date = parts[0];
			var timeDate = dt(date.split(" "));
			var DescriptLocation = parts[1].split("AT");
			var location = '';
			if(DescriptLocation.length > 1)
				location = DescriptLocation[1];
			var descripion = DescriptLocation[0];
			var time1 = timeDate[0];
			var time2 = timeDate[1];
			// Make requests to Google Calendar API
			var add = {
				'summary': descripion,
				'location': location,
				'start': {
    				'dateTime': time1.toString(),
    				'timeZone': 'America/Los_Angeles'
  				},
			    'end': {
			    	'dateTime': time2.toString(),
			    	'timeZone': 'America/Los_Angeles'
  				},
			}
			console.log(add);		
		}
	}

	// date and time [d,t]
	// or for those more fun, downtown
	// RETURN: Dates to and from
	function dt(rawTime)
	{
		console.log(rawTime);
		// To and from entries expected in this array. On the same day for now.
		// TODO: Expanded capabilities for events that extend over multiple days
		var dates = [];
		var date = new Date();
		for (var i = 0; i < rawTime.length; i++) {
			console.log(rawTime[i]);
			// Time
			if(rawTime[i].split(":").length > 1)
			{
				// if a date is not set, assume today
				var time = rawTime[i].replace(" ","");
				var timeToFrom = time.split("-");
				var from = evaluateTime(timeToFrom[0]);
				if(timeToFrom.length > 1)
					var to = evaluateTime(timeToFrom[1]);
				// Set the time
				date.setHours(from[0]);
				date.setMinutes(from[1]);
				date.setSeconds(0);
				// There is a speficied end times
				if(timeToFrom.length > 1)
				{
					console.log(date.toString());
					// console.log(date.toString()); // Invalid date here
					dates.push(date);
					var date2 = new Date();
					date2.setDate(date.getDay());
					dates.push(date2.setTime(timeToFrom[1]));
				}
				// There is not
				else
				{
					console.log("I reached");
					dates.push(date);
					var date2 = new Date();
					date2.setDate(date.getDate());
					date2.setHours(date.getHours()+1);
					date2.setMinutes(date.getMinutes());
					date2.setSeconds(0);
					console.log(dates.length);
					// assume default time of one hour
					dates.push(date2);
				}
			}
			// Date
			else if(rawTime[i].split("/").length > 1)
			{
				date.setDate(rawTime[i]);
			}
			// Day of the week, assuming
			// Automatically determine the date based on a given day, chose the nearest one.
			else
			{
				// Sunday by default
				var day = ""
				var curDay = date.getDay();
				if (rawTime[i].toLowerCase() == "monday")
				{
					day = 1;
				}
				else if(rawTime[i].toLowerCase() == "tuesday")
				{
					day = 2;
				}
				else if(rawTime[i].toLowerCase() == "wednesday")
				{
					day = 3;
				}
				else if(rawTime[i].toLowerCase() == "thursday")
				{
					day = 4;
				}
				else if(rawTime[i].toLowerCase() == "friday")
				{
					day = 5;
				}
				else if(rawTime[i].toLowerCase() == "saturday")
				{
					day = 6;
				}
				else
					continue;
				if (day < curDay)
					day += 7;
				var daysNeeded = day - curDay;
				for (var i = 0; i < daysNeeded; i++) 
				{
					try
					{
						date.setDate(date.getDay()+1)
					}
					catch(e)
					{
						// Could not set date for some reason
					}	
				}
				console.log(i);
			}
		}
		if(dates.length < 1)
		{
			dates.push(date);
		}
		if(dates.length < 2)
		{
			var dateTo = new Date();
			dateTo.setHours(date.getHours()+1);
			dateTo.setDate(date.getDate());
			dates.push(dateTo);
		}
		console.log(dates[0].toString());
		console.log(dates[1].toString());
		return dates;
	}

	// Returns time as an int array where
	// index 0 is hours
	// index 1 is minutes
	function evaluateTime(time)
	{
		var r = [0,0];
		time = time.split(":");
		// Only hours listed
		if(time.length < 1)
		{
			if(time[0].substring(time[0].length-2).toLowerCase() == "pm")
				r[0] = (parseInt(time[0].substring(0, time[0].length-2)) + 12);
			else if(time[0].substring(time[0].length-2).toLowerCase() == "am")
				r[0] = (parseInt(time[0].substring(0, time[0].length-2)));
		}
		// There are minutes and hours
		else
		{
			r[0] = parseInt(time[0]);
			if(time[1].substring(time[1].length-2).toLowerCase() == "pm")
			{
				if(r[0] != 12)
					r[0] += 12;
			}
			else if(time[1].substring(time[1].length-2).toLowerCase() == "am")
			{
				console.log(r[0]);
				if(r[0] == 12)
					r[0] = 0;
			}
			r[1] = (parseInt(time[1].substring(0, time[1].length-2)));			
		}
		return r;
	}

	function findNextDay(dayOfWeek)
	{
		
	}

	function sendRequest()
	{

	}

});