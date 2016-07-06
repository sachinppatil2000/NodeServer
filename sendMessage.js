// use node gcm to send message to Devices
// take details form Mongo DB and send the message
 var dataAccess = require('./dataAccess.js');
// these methods are called from BasicRestful service.
// var nodegcm = require('./node-gcm.js');
 var gcm = require('node-gcm');
module.exports =
{
    SendMessage :function(messagedata){
    // Create a message
    // ... with default values
    var message = new gcm.Message();

    // ... or some given values
    var message = new gcm.Message({
    	collapseKey: 'demo',
    	priority: 'high',
    	contentAvailable: true,
    	delayWhileIdle: true,
	timeToLive: 3,
    	restrictedPackageName: "com.machineuser.smartmanager_ver2",
    //	dryRun: true,
    	data: {},
	//notification: {
    	//	title: "Hello, World",
    	//	icon: "ic_launcher",
    	//	body: "This is a notification that will be displayed ASAP.",
	//	"click_action" : "OPEN_MAIN_ACTIVITY"
    	//}
    	
    });

    // Change the message data
    // ... as key-value
    message.addData('key1',messagedata);
 //   message.addData('key2','message2');

    // ... or as a data object (overwrites previous data object)
    message.addData({
  //  	key1:messagedata
  //  	key2: 'message2'
    });

    // Set up the sender with you API key
    //
    //var sender = new gcm.Sender(dataAccess.getAPIKey());

    //186598140791
    var sender = new gcm.Sender("AIzaSyBpeUPJkhlCkh_lYAqIuRS7y6c792NucfY");
//notificationproject-1185//AIzaSyBpeUPJkhlCkh_lYAqIuRS7y6c792NucfY//AIzaSyCT2rKWler-7Y3uw-IuWAjjUi-S73w5yDA
    // Add the registration tokens of the devices you want to send to
    var registrationTokens;
    dataAccess.GetRegistrationTokens(function(output)
    {
   // for each element in output.tokens update registration tokens.
 //   registrationTokens=output.tokens;

     console.log("inside registration send GCM message" + JSON.stringify(message));
     sender.send(message, { topic:"/topics/status"},10, function (err, response) {
          if(err) {
                    console.log(" in error  " + response);
                    console.error(err);
                    }

          else   {
          console.log(" success sending message  " );
          console.log(response); }
        });
    });//[];
    //registrationTokens.push('regToken1');
    //registrationTokens.push('regToken2');

    // Send the message
    // ... trying only once
    //sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
    //  if(err) console.error(err);
    //  else    console.log(response);
    //});

    // ... or retrying
  //  sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
  //    if(err) console.error(err);
   //   else    console.log(response);
 //   });

    // ... or retrying a specific number of times (10)
    //sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
    //  if(err) console.error(err);
    //  else    console.log(response);
    //});
    }
}