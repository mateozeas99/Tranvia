var conn=null;

function callClient(id, device, value){
	var now = new Date();
	var command = '{"address":"'+id+'","values":[{"device":"'+device+'","value":"'+value+'"}]}';
	conn.send(command);
	var msg;
	if(value==2)
	{
		msg="Encendido";
	}
	else if(value==1)
	{
		msg="Apagado";
	}
	
	appendLog(now, "Electro valvula "+device, msg,3);
	//conn.send('{"id":"switch-'+device+'","value":"'+value+'"}');
	/*var data = {"id":id,"device":device,"value":value};
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
	});*/
	
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
		conn = new WebSocket('ws://10.0.1.18:4040');
		//conn = new WebSocket('ws://192.168.88.246:4040');
		//conn = new WebSocket('ws://11.22.33.45:4040');
		//conn = new WebSocket('ws://127.0.0.1:4040');
	conn.onopen = function(e) {
	    console.log("Connection established!");
	    Materialize.toast("Conexión Establecida", 4000);
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
					appendLog(now, "Electro valvula "+obj.values[i].device, "Encendido",3);
				}
				else if(obj.values[i].value==1)
				{
					document.getElementById('31-'+obj.values[i].device).checked=false;
					appendLog(now, "Electro valvula "+obj.values[i].device, "Apagado",3);
				}
			};
	    }
	    else if(obj.message!=null)
	    {
			appendLog(now, obj.desc, obj.message,obj.priority);
	    }
	};
}

function loadCam (ip,port){
	$('#cam_draw').attr('src','http://'+ip+':'+port+'/videostream.cgi?user=admin&pwd=maradona68&resolution=32&rate=0');
}
function message(type)
{
	switch(type)
	{
		case 0:
		var command = '{"desc":"Zona #1 de Bombeo","message":"Disparo Termico","priority":"1"}';
		conn.send(command);
		break;
		case 1:
		var command = '{"desc":"Zona #1 de Bombeo","message":"Nivel de Agua Bajo","priority":"2"}';
		conn.send(command);
		break;
		case 2:
		var command = '{"desc":"Pileta","message":"Mantenimiento","priority":"2"}';
		conn.send(command);
		break;
		case 3:
		var command = '{"desc":"Zona #1 de Bombeo","message":"Falta de Energia","priority":"1"}';
		conn.send(command);
		break;
		default:
		break;
	}
}
function appendLog(date, desc, msg, priority)
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
  	if(priority==3)
  	{
  		newCellDate.style.color = "green";
  		newCellDesc.style.color = "green";
  		newCellMsg.style.color = "green";
  	}
  	else if(priority==2)
  	{
		newCellDate.style.color = "#ffc107";
  		newCellDesc.style.color = "#ffc107";
  		newCellMsg.style.color = "#ffc107";
  	}
  	else if(priority==1)
  	{
  		newCellDate.style.color = "red";
  		newCellDesc.style.color = "red";
  		newCellMsg.style.color = "red";
  		Materialize.toast(msg, 4000);
  	}
}