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
	var command = '{"address":"'+id+'","values":[{"device":"'+device+'","value":"'+value+'"}]}';
	conn.send(command);
	var msg;
	if(value==2)
	{
		msg="Encendido";
	}
	else
	{
		msg="Apagado";
	}
	var now = new Date();
	appendLog(now, "Electro valvula "+device, msg);
	//conn.send('{"id":"switch-'+device+'","value":"'+value+'"}');
}

function initial(page)
{
	console.log(now);
	if(page=='camera')
	{
		loadCam('192.168.88.230','3030');
	}
	else if(page=='dashboard')
	{
		$.ajax({
		url: '../api/v1/status',
		headers: {
			"Authorization": "Basic " + btoa(user + ":" + apiKey)
		},
		contentType: 'application/json',
		type: 'GET',
		dataType: "json",
		success: function (data) {
				console.log(data);
				for (var i = 0; i < data.values.length; i++) {
					if(data.values[i].value==1)
					{
						document.getElementById('31-'+data.values[i].device).checked=true;
					}
					else if(data.values[i].value==0)
					{
						document.getElementById('31-'+data.values[i].device).checked=false;
					}
				};
			//console.log(data.values[0].device);
	    },
	    error: function (data) {
	        console.log(data.responseText);
	    }
	});
	}
}
function connectWebSocket()
{
	if(conn==null)
		conn = new WebSocket('ws://192.168.88.246:4040');
		//conn = new WebSocket('ws://11.22.33.45:4040');
		//conn = new WebSocket('ws://127.0.0.1:4040');
	conn.onopen = function(e) {
	    console.log("Connection established!");
	};
	conn.onmessage = function(e) {
		//{"address":"31","values":[{"device":"1","value":"0"},{"device":"2","value":"0"},{"device":"3","value":"0"},{"device":"4","value":"0"}]}
		//console.log(e.data);
		var now = new Date();
	    var obj = JSON.parse(e.data);
	    //console.log(obj);
	    if(obj.address!=null)
	    {
	    	for (var i = 0; i < obj.values.length; i++) {
				if(obj.values[i].value==2)
				{
					document.getElementById('31-'+obj.values[i].device).checked=true;
					appendLog(now, "Electro valvula "+obj.values[i].device, "Encendido");
				}
				else if(obj.values[i].value==1)
				{
					document.getElementById('31-'+obj.values[i].device).checked=false;
					appendLog(now, "Electro valvula "+obj.values[i].device, "Apagado");
				}
			};
	    }
	    else if(obj.message!=null)
	    {

	    }
	};
}

function loadCam (ip,port){
	$('#cam_draw').attr('src','http://'+ip+':'+port+'/videostream.cgi?user=admin&pwd=maradona68&resolution=32&rate=0');
}

function appendLog(date, desc, msg)
{
	var tableRef = document.getElementById('tableLog').getElementsByTagName('tbody')[0];

  	// Insert a row in the table at row index 0
  	var newRow   = tableRef.insertRow(tableRef.rows.length);

  	// Insert a cell in the row at index 0
  	var newCellDate  = newRow.insertCell(0);
  	var newCellDesc  = newRow.insertCell(1);
  	var newCellMsg  = newRow.insertCell(2);

  	// Append a text node to the cell
  	var newTextDate  = document.createTextNode(date);
  	var newTextDesc  = document.createTextNode(desc);
  	var newTextMsg  = document.createTextNode(msg);
  	//
  	newCellDate.appendChild(newTextDate);
  	newCellDesc.appendChild(newTextDesc);
  	newCellMsg.appendChild(newTextMsg);
}