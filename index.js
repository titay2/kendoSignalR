// var nom = "cliant2"
// var msg= "hello000"

// var hubUrl ="http://127.0.0.1:8088/";

// var connection = $.hubConnection(hubUrl, { useDefaultPath: true});
// var hub = connection.createHubProxy("MyHub");

// hub.on('addMessage', function(name, message){
// 	console.log( name + ' said ' + message)
// })


// connection
//     .start()
// 	//.done(function(){ console.log(' connected!! connection ID=' + connection.id); })
// 	.done(function (){
// 		hub.invoke('Send',nom, msg )
// 	})
// 	.fail(function(error){ console.log('Could not connect!!' + error); });

				
// 		to establish a connection without generated proxy
//    this is hub which is a collection of these methods
   /**
    * var hubUrl = "https://demos.telerik.com/kendo-ui/service/signalr/hubs";
           var connection = $.hubConnection(hubUrl, { useDefaultPath: false});
           var hub = connection.createHubProxy("productHub");
    * Plus on Connection method  
    */
   var dataSource1 = new kendo.data.DataSource({
	transport: {
	read: { url: "http://localhost:52273/api/FleetStates/dispatchStatus"},
	   
	},
	batch: true,
	pageSize: 20,
	
});  
  

//    const connection = new signalR.HubConnection("http://localhost:52273/dispatchStatusHub");
//    //const connection = new signalR.HubConnection('http://localhost:51116/logMessageHub');
//    const button = document.getElementById("startStreaming");
   
//    const hub = connection.on("startSendingDispatch", (logMessageUpdate) => {
// 	   //startStreaming();
// 	   console.log(JSON.parse(logMessageUpdate))
// 	   return JSON.parse(logMessageUpdate)

//    })

	$.ajax({
		 url: "http://localhost:52273/api/FleetStates/dispatchStatus" ,
		 method: "GET",
		 dataType: "json",
		 success: function(data){
			console.log(data)
		 },
		 error: function (jqXHR, textStatus, errorThrown) {
			 alert("error: " + textStatus + ": " + errorThrown);
		 }
	 });
 

   
   try {

   
	const hubStart = connection.start()
	//.done();
	var dataSource = new kendo.data.DataSource({
		type: "signalr",
	
		transport: {
		 signalr: {
		  promise:hubStart,
		  hub: hub,
		//   server: {read: "startSendingDispatch"},
		//   client: {read: "startSendingDispatch"}
		 }
		}
	   })
	  
   } catch (err) {
       (err => showErr(err));
   }
  
  
   $("#grid").kendoGrid({
	dataSource: dataSource1,
	height: 850,
	dataBound: function(){
		console.log("API data source " + dataSource)
	},
	columns: [
		{field:"dispatchCount", title:"dispatchCount"},
		{field:"dispatchStatus", title:"dispatchStatus"},
	   ]     
   });
   
			
		
