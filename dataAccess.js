var mongodb = require('mongodb');
var assert = require('assert');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/factorydb';
var locationDetails;
module.exports = {

       updateDeviceState : function(location){
      // locationDetails = location;
       var Vendoridkey = 'Vendorid';
       var locationkey = 'Location';
       var devices = location;
       MongoClient.connect(url, function (err, db) {
          var searchCriteria = {}; //['Location'];
          searchCriteria.Vendorid= location[Vendoridkey] ;
           searchCriteria.Location =location[locationkey];
         //  searchCriteria.Vendorid=locationDetails['Vendorid'];

           console.log(' print search criteria  ' +JSON.stringify(searchCriteria));
           console.log(' update device status  ' +JSON.stringify(devices));
         if (err) {
           console.log('Unable to connect to the mongoDB server. Error:', err);
         } else {
           //HURRAY!! We are connected. :)
           console.log('Connection established to', url);

           // do some work here with the database.
           // replace where vendor id and location matches.

          db.collection('factories').update(
            searchCriteria,devices,{w: 1},
            function(err, results) {
             console.log("updated the status in the collection")
               console.log(results);
              //  callback();
             });
            }
           //Close connection
           db.close();
         });
       },
// Use connect method to connect to the Server

 InsertFactoryDetails : function(location){


        var insertDocument = function(db, callback) {
                                     console.log("the mongo version is " + db.version );
                                     var coll = db.collection('factories');
                                     coll.insert( location,{w: 1},function(err, result) {
                                                                          assert.equal(err, null);
                                                                          console.log("Inserted a document into the factories collection.");
                                                                          callback(result);
                                                                           });

                                                     }
                                     MongoClient.connect(url, function (err, db) {
                                                                        assert.equal(null, err);
                                                                        insertDocument(db, function() {
                                                                        db.close();
                                                                                  });

                                                          });
// Use connect method to connect to the Server
                                            },
 InsertAppTokens: function (token){
                                     console.log('called by mobile devices to save the tokens');
                                     var insertDocument = function(db, callback) {
                                                                   console.log("the mongo version is " + JSON.stringify(token));
                                                                   var coll = db.collection('gcmkeys');
                                            // need to check the exact way in which we can insert data in array.

                                                            db.collection('gcmkeys', function(error, tokencollection) {
                                                                   if(error) {
                                                                       console.error(error); return;
                                                                   }
                                                                  // var obj = JSON.parse(token);
                                                                 console.log(token["token"]);
                                                                   tokencollection.update( { _id: 1 }, {"$push":
                                                                   { tokens: token["token"] }},{upsert : true},
                                                                       function(error, result) {
                                                                           if(error) {
                                                                               console.error(error); return;
                                                                           }
                                                                           callback();
                                                                       });
                                                               });

                                                          // coll.insert( token,{w: 1},function(err, result) {
                                                          //                                        assert.equal(err, null);
                                                          //                                        console.log("Inserted a document into the gcmkeys collection.");
                                                          //                                        callback(result);
                                                           //                                        });
                                                                             }
                                     MongoClient.connect(url, function (err, db){
                                                           assert.equal(null, err);
                                                           insertDocument(db, function() {
                                                                          db.close();
                                                                         });

                                                           });
                                 },
 InsertAppID: function(appid){
                              console.log('called to insert App ID ');
                              var insertDocument = function(db, callback) {
                                                           console.log("the mongo version is " + db.version );
                                                           var coll = db.collection('appid');
                                                           coll.insert( appid,{w: 1},function(err, result) {
                                                                      assert.equal(err, null);
                                                                      console.log("Inserted a document into the gcmkeys collection.");
                                                                      callback(result);
                                                                       });
                                                                           }
                              MongoClient.connect(url, function (err, db) {
                                                                           assert.equal(null, err);
                                                                           insertDocument(db, function() {
                                                                           db.close();
                                                                                                        });

                                                      });
                    },
 GetAPIKey:function(){
                    console.log('called to Message Meta data ');
                    },
 GetRegistrationTokens:function(senddata){
                              //  var output ="{}";
                                console.log('Registration function ');
                                var findTokens = function(db,senddata,callback) {
                                var cursor = db.collection('gcmkeys').find({ _id: 1 });

                             // output = db.collection('gcmkeys').findone();
     //                           console.log("fetching the token object " + JSON.stringify(output));
                                //output = '{"tokens" : ';
                                 //     if (tokens.length > 0) {printjson (tokens[0]); }

                                 cursor.each(function(err, doc) {
                                                      assert.equal(err, null);
                                                     if (doc != null) {
                                                     console.log(doc);
                                                  //   output = doc.tokens;
                                                 //    console.log("document value : " +JSON.stringify(output));
                                                    // output = output + JSON.stringify(doc);
                                                    senddata(doc);

                                                                } else {
                                                    // output +  '}';
                                                     callback();
                                                     }
                                            });
                                         };

                                 MongoClient.connect(url, function(err, db) {
                                 assert.equal(null, err);
                                 findTokens(db,senddata ,function() {
                                                               db.close();
                                                             });
                                 // console.log("value in connect value : " +JSON.stringify(output));
                                                           });
                                 console.log('end of function ');
                               //  return output;
                                 }
                    ,
 GetMessageContent:function(){
                       console.log('called to Message data ');
                        }
                  };

