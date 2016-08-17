var CLIENT_ID = "";
$.get('http://localhost:8000/clientid.txt', function(id)
	{
		CLIENT_ID = id;
	});
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

function checkAuth() {
	gapi.auth.authorize(
	    {
	        'client_id': CLIENT_ID,
	        'scope': SCOPES.join(' '),
	        'immediate': true
	    }, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
	    // Hide auth UI, then load client library.
	    loadCalendarApi();
	} else {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
	}
}
/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
	gapi.client.load('calendar', 'v3');
}
