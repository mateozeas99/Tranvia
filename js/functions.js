var conn=null;
function callClient(id, device, value){
	var data = {"id":id,"device":device,"value":value};
	$.ajax({
		url: '../api/v1/send',
		headers: {
			"Authorization": "Basic " + btoa(user + ":" + apiKey)
		},
		contentType: 'application/json',
		type: 'POST',
		dataType: "json",
		data: JSON.stringify(data),
		success: function (data) {
			console.log(data);
        },
        error: function (data) {
            console.log(data.responseText);
        }
	});
	conn.send('{"id":"switch-'+device+'","value":"'+value+'"}');
}

function connectWebSocket()
{
	if(conn==null)
		conn = new WebSocket('ws://11.22.33.45:4040');
		//conn = new WebSocket('ws://127.0.0.1:4040');
	conn.onopen = function(e) {
	    console.log("Connection established!");
	};
	conn.onmessage = function(e) {
	    var obj = JSON.parse(e.data);
	    console.log(obj.id);
	    console.log(obj.value);
	    if(obj.value==2)
	    {
	    	document.getElementById(obj.id).checked=true;
	    }
	    else
	    {
	    	document.getElementById(obj.id).checked=false;
	    }
	};
}