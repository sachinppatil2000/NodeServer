// BASE SETUP
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var dataAccess = require('./dataAccess.js');
var gcmMessageSender = require('./sendMessage.js')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 443;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var gcmrouter = express.Router();
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
   console.log("getfs called");
    // get message from mongodb
    res.json({ message: 'hooray! welcome to our get api!' });
});

router.post('/', function(req, res) {
    console.log("post called");
    console.log(req.body);
    dataAccess.updateDeviceState(req.body);
    gcmMessageSender.SendMessage(req.body);
    // save the recived information in mongodb and send Message
    res.json({ message: 'hooray! welcome to our api in post!'});
});

router.put('/', function(req, res) {

    console.log("put called");
    console.log(req.body);
     dataAccess.InsertFactoryDetails(req.body);
    res.json({ message: 'hooray! welcome to our  put api!' });
});

router.delete('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
})
// more routes for our API will happen here

router.get('/gcmtokens', function(req, res) {
   console.log("getfs called");
    // get message from mongodb
   // var output;
    dataAccess.GetRegistrationTokens(function(output){
                                                console.log(output);
                                            res.json(output);});

});

router.post('/gcm', function(req, res) {

    // save the recived information in mongodb and send Message
    res.json({ message: 'hooray! welcome to our api/gcm in post!'});
});

router.put('/gcmappid', function(req, res) {

        console.log("put called");
        console.log(req.body);
        dataAccess.InsertAppID(req.body);
    res.json({ message: 'hooray! welcome to our  put api/gcmappid!' });
});

router.put('/gcmtokens', function(req, res) {
        console.log("put called");
        console.log(req.body);
        dataAccess.InsertAppTokens(req.body);
        res.json({ message: 'hooray! welcome to our  put api/gcm!' });
});

router.delete('/gcm', function(req, res) {
    res.json({ message: 'hooray! welcome to our api/gcm!' });
})
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//app.use('/gcmtokens',gcmrouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);