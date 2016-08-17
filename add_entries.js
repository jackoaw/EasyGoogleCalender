$(document).ready(function(){

    $("button").click(function(){
        var text = $("textarea").val();
        parseText(text);
    });

	function parseText(text)
	{
		var e = {}
		var lines = text.split("\n")
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
			else
			{
				if (rawTime[i].toLowerCase() == "monday")
				{

				}
				if(rawTime[i].toLowerCase() == "tuesday")
				{

				}
				if(rawTime[i].toLowerCase() == "wednesday")
				{

				}
				if(rawTime[i].toLowerCase() == "thursday")
				{

				}
				if(rawTime[i].toLowerCase() == "friday")
				{

				}
				if(rawTime[i].toLowerCase() == "saturday")
				{

				}
				if(rawTime[i].toLowerCase() == "sunday")
				{

				}
			}
		}
	}

	function findNextDay(dayOfWeek)
	{
		
	}

	function sendRequest()
	{

	}

});